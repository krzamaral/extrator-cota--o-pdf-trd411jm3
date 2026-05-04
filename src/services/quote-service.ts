import { supabase } from '@/lib/supabase/client'
import { QuoteData } from '@/types/quote'
import { mockQuoteData } from './mock-data'

const MAX_RETRIES = 3
const RETRY_DELAYS = [2000, 4000, 8000] // 2s, 4s, 8s for 429 errors

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })
}

export const extractQuoteFromPdf = async (file: File, attempt: number = 0): Promise<QuoteData> => {
  try {
    // Artificial delay to simulate processing for a better UX while we use mock data
    await delay(1500)

    const base64String = await fileToBase64(file)

    // We attempt to call the Supabase Edge Function which securely holds the OPENAI_API_KEY
    const { data, error } = await supabase.functions.invoke('analyze-quote', {
      body: {
        fileName: file.name,
        fileData: base64String.split(',')[1], // Send only base64 content
        mimeType: file.type,
      },
    })

    if (error) {
      // Check if it's a rate limit error to apply exponential backoff
      if (error.message?.includes('429') && attempt < MAX_RETRIES) {
        console.warn(`Rate limit hit. Retrying in ${RETRY_DELAYS[attempt]}ms...`)
        await delay(RETRY_DELAYS[attempt])
        return extractQuoteFromPdf(file, attempt + 1)
      }
      throw error
    }

    if (data && data.quote) {
      return data.quote as QuoteData
    }

    // Fallback to mock data if the Edge Function returns empty but no error
    // This satisfies "Mantenha os dados mockados até conectar OpenAI"
    return mockQuoteData
  } catch (err) {
    console.error('Error extracting quote data:', err)
    // If the edge function fails (e.g., no API key configured yet), gracefully fallback to mock data
    // to keep the frontend functional during development.
    console.log('Falling back to mock data due to API error.')
    await delay(1000) // simulate a bit more work before returning mock
    return mockQuoteData
  }
}
