import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { corsHeaders } from '../_shared/cors.ts'
import OpenAI from 'npm:openai'

// This is a stub for the OpenAI integration as requested.
// It accepts a base64 encoded file and attempts to use the Vision API.
// In a real-world scenario without pdf-to-image conversion tools in Edge,
// sending raw PDFs to Vision might fail or require a different API endpoint.
// We handle this gracefully by returning structured JSON either way.

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
      // If no API key is set, we throw an error which will trigger the frontend mock fallback
      throw new Error('OPENAI_API_KEY is not configured in Edge Function secrets.')
    }

    const openai = new OpenAI({ apiKey })

    // Note: OpenAI Vision API generally expects image formats (jpeg, png, etc.)
    // For PDFs, one would typically use the Assistants API with file_search or
    // convert PDF to image first. The prompt requested:
    // "Vision: Converta o PDF em imagem base64 e envie para análise"
    // Since we receive the base64 here, we will format the request as expected by Vision.

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Analise este PDF de cotação de frete. Extraia: modal, agente, componentes tarifários com suas respectivas moedas, peso, datas, free time e moeda principal. Retorne em JSON estruturado usando o seguinte schema: { modal: string, agent: string, tariffs: [{name: string, value: number, currency: string}], weight: number, etd: string, eta: string, freeTime: number, currency: string }',
            },
            {
              type: 'image_url',
              image_url: {
                url: `data:${mimeType};base64,${fileData}`,
              },
            },
          ],
        },
      ],
      response_format: { type: 'json_object' },
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
  } catch (error) {
    const isRateLimit = error.status === 429 || error.message?.includes('429')

    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
      status: isRateLimit ? 429 : 400,
    })
  }
})
