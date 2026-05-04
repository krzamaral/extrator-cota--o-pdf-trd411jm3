import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { corsHeaders } from '../_shared/cors.ts'
import OpenAI from 'npm:openai'
import pdf from 'npm:pdf-parse'
import { Buffer } from 'node:buffer'

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { fileData, mimeType } = await req.json()

    if (!fileData) {
      throw new Error('No file data provided')
    }

    const apiKey = Deno.env.get('OPENAI_API_KEY')

    if (!apiKey) {
      throw new Error('OPENAI_API_KEY is not configured in Edge Function secrets.')
    }

    const openai = new OpenAI({ apiKey })
    let textContent = ''

    // Se for PDF, tentamos extrair o texto diretamente usando pdf-parse
    if (mimeType === 'application/pdf') {
      try {
        const fileBuffer = Buffer.from(fileData, 'base64')
        const pdfData = await pdf(fileBuffer)
        textContent = pdfData.text
      } catch (err) {
        console.error('Erro no pdf-parse:', err)
        // Continua sem textContent, tentaremos usar a imagem como fallback
      }
    }

    const systemPrompt = `Você é um analista especialista em comércio exterior e agenciamento de cargas.
Sua tarefa é analisar a cotação de frete e extrair os dados EXATOS para um JSON estruturado.

REGRAS CRÍTICAS:
1. Valores numéricos (taxas, peso, totais) devem ser extraídos como NÚMERO (float). Exemplo: se o texto diz "1.500,50", converta para 1500.50. NUNCA envie strings para valores monetários ou pesos. Remova os símbolos monetários (USD, R$, EUR).
2. Identifique corretamente os nomes das taxas e suas respectivas moedas.
3. Datas devem estar no formato YYYY-MM-DD. Converta outros formatos.
4. Se um campo não constar na cotação, retorne null.

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

    // Se o PDF foi lido como texto com sucesso e possui conteúdo considerável
    if (textContent && textContent.trim().length > 50) {
      messages.push({
        role: 'user',
        content: `Extraia os dados da seguinte cotação:\n\n${textContent.substring(0, 15000)}`,
      })
    } else {
      // Fallback para envio como imagem (caso seja uma imagem base64 ou fallback do pdf-parse)
      messages.push({
        role: 'user',
        content: [
          { type: 'text', text: 'Extraia os dados desta imagem de cotação de frete:' },
          { type: 'image_url', image_url: { url: `data:${mimeType};base64,${fileData}` } },
        ],
      })
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages,
      response_format: { type: 'json_object' },
      temperature: 0.1, // temperatura baixa para extração de dados estrita
    })

    const content = response.choices[0].message.content
    let quote = null

    if (content) {
      try {
        quote = JSON.parse(content)
      } catch (e) {
        console.error('Failed to parse OpenAI JSON response', e)
      }
    }

    return new Response(JSON.stringify({ quote }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    })
  } catch (error: any) {
    console.error('Edge Function Error:', error)
    const isRateLimit = error.status === 429 || error.message?.includes('429')

    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
      status: isRateLimit ? 429 : 400,
    })
  }
})
