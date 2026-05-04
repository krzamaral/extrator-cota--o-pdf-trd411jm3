import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import OpenAI from 'npm:openai'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, x-supabase-client-platform, apikey, content-type',
}
import pdf from 'npm:pdf-parse'
import { Buffer } from 'node:buffer'

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const bodyText = await req.text()
    if (!bodyText) {
      throw new Error('Corpo da requisição vazio.')
    }

    const body = JSON.parse(bodyText)
    const fileData = body.fileData
    const mimeType = body.mimeType
    const fileName = body.fileName

    if (!fileData) {
      throw new Error('Nenhum dado de arquivo (fileData) fornecido.')
    }

    const apiKey = Deno.env.get('OPENAI_API_KEY')

    if (!apiKey) {
      throw new Error('A chave da API da OpenAI não está configurada nos secrets do Supabase.')
    }

    const openai = new OpenAI({ apiKey })
    let textContent = ''

    if (mimeType === 'application/pdf') {
      try {
        const fileBuffer = Buffer.from(fileData, 'base64')

        // Tolerância a variações de estrutura e metadados atípicos
        const pdfData = await pdf(fileBuffer, {
          max: 0,
          pagerender: function (pageData: any) {
            return pageData
              .getTextContent({
                normalizeWhitespace: true,
                disableCombineTextItems: false,
              })
              .then(function (textContent: any) {
                let lastY,
                  text = ''
                for (const item of textContent.items) {
                  if (lastY == item.transform[5] || !lastY) {
                    text += item.str
                  } else {
                    text += '\n' + item.str
                  }
                  lastY = item.transform[5]
                }
                return text
              })
              .catch((err: any) => {
                console.warn('Aviso: falha ao extrair texto de uma página', err)
                return '' // Ignora a página defeituosa e continua
              })
          },
        })

        textContent = pdfData.text || ''
      } catch (err: any) {
        console.error('Erro no pdf-parse:', err.message || err)
        throw new Error(
          'Falha ao extrair texto do PDF. A estrutura do arquivo é inválida ou o PDF está protegido.',
        )
      }
    }

    const systemPrompt = `Você é um analista especialista em comércio exterior e agenciamento de cargas.
Sua tarefa é analisar a cotação de frete e extrair os dados EXATOS para um JSON estruturado.

REGRAS CRÍTICAS:
1. Valores numéricos (taxas, peso, totais) devem ser extraídos como NÚMERO (float). Exemplo: se o texto diz "1.500,50", converta para 1500.50. NUNCA envie strings para valores monetários ou pesos. Remova os símbolos monetários (USD, R$, EUR).
2. Identifique corretamente os nomes das taxas e suas respectivas moedas.
3. Datas devem estar no formato YYYY-MM-DD. Converta outros formatos.
4. ATENÇÃO CRÍTICA AO PESO (weight): Procure detalhadamente por indicadores como "KG", "Kgs", "Gross Weight" ou "Detalhes de carga" (ex: "1cx - 89 x 69 x 96 cm - 60 KG" -> weight é 60). Certifique-se de extrair o peso correto e NÃO o confunda com dimensões (cm) ou quantidades de caixas (cx).
5. Se um campo não constar na cotação, retorne null.

Schema esperado:
{
  "quoteNumber": "string",
  "modal": "string (Aéreo, FCL, LCL)",
  "agent": "string",
  "origin": "string",
  "destination": "string",
  "incoterm": "string",
  "etd": "string (YYYY-MM-DD)",
  "eta": "string (YYYY-MM-DD)",
  "freeTime": number,
  "weight": number,
  "currency": "string",
  "tariffs": [
    { "name": "string", "value": number, "currency": "string" }
  ]
}`

    const messages: any[] = [{ role: 'system', content: systemPrompt }]

    if (textContent && textContent.trim().length > 50) {
      messages.push({
        role: 'user',
        content: `Nome do Arquivo Original: ${fileName || 'Desconhecido'}\n\nExtraia os dados da seguinte cotação:\n\n${textContent.substring(0, 15000)}`,
      })
    } else {
      if (mimeType === 'application/pdf') {
        throw new Error(
          'O PDF enviado não contém texto legível (parece ser uma imagem escaneada). Por favor, envie um PDF com texto pesquisável.',
        )
      } else {
        messages.push({
          role: 'user',
          content: [
            { type: 'text', text: 'Extraia os dados desta imagem de cotação de frete:' },
            { type: 'image_url', image_url: { url: `data:${mimeType};base64,${fileData}` } },
          ],
        })
      }
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages,
      response_format: { type: 'json_object' },
      temperature: 0.1,
    })

    const content = response.choices[0].message.content
    let quote = null

    if (content) {
      try {
        quote = JSON.parse(content)
      } catch (e) {
        console.error('Failed to parse OpenAI JSON response', e)
        throw new Error('A inteligência artificial retornou um formato de dados inválido.')
      }
    }

    return new Response(JSON.stringify({ quote }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    })
  } catch (error: any) {
    console.error('Edge Function Error:', error)
    const isRateLimit = error.status === 429 || error.message?.includes('429')

    // Retornar 400 para erros de formato/validação para o frontend identificar a rejeição
    const isBadRequest =
      error.message?.includes('vazio') ||
      error.message?.includes('inválid') ||
      error.message?.includes('corrompido') ||
      error.message?.includes('protegido')

    return new Response(
      JSON.stringify({ error: error.message || 'Erro interno no processamento.' }),
      {
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
        status: isRateLimit ? 429 : isBadRequest ? 400 : 200,
      },
    )
  }
})
