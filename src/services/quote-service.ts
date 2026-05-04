import { supabase } from '@/lib/supabase/client'
import { QuoteData } from '@/types/quote'

const MAX_RETRIES = 3
const RETRY_DELAYS = [2000, 4000, 8000]

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })
}

const parseNumber = (val: any): number => {
  if (typeof val === 'number') return val
  if (typeof val === 'string') {
    // Remove tudo que não for dígito, ponto, vírgula ou sinal de menos
    const clean = val.replace(/[^\d.,-]/g, '')
    // Se tiver ambos vírgula e ponto (ex: 1.500,50 ou 1,500.50)
    if (clean.includes(',') && clean.includes('.')) {
      if (clean.indexOf(',') > clean.indexOf('.')) {
        // Formato BR (1.500,50) -> remove ponto, substitui vírgula
        return parseFloat(clean.replace(/\./g, '').replace(',', '.'))
      } else {
        // Formato US (1,500.50) -> remove vírgula
        return parseFloat(clean.replace(/,/g, ''))
      }
    }
    // Se tiver apenas vírgula (ex: 1500,50)
    if (clean.includes(',')) {
      return parseFloat(clean.replace(',', '.'))
    }
    const parsed = parseFloat(clean)
    return isNaN(parsed) ? 0 : parsed
  }
  return 0
}

const sanitizeQuoteData = (quote: any): QuoteData => {
  return {
    ...quote,
    weight: parseNumber(quote.weight),
    freeTime: parseNumber(quote.freeTime),
    tariffs: Array.isArray(quote.tariffs)
      ? quote.tariffs.map((t: any) => ({
          ...t,
          value: parseNumber(t.value),
        }))
      : [],
  }
}

export const extractQuoteFromPdf = async (file: File, attempt: number = 0): Promise<QuoteData> => {
  try {
    const base64String = await fileToBase64(file)

    const { data, error } = await supabase.functions.invoke('analyze-quote', {
      body: {
        fileName: file.name,
        fileData: base64String.split(',')[1],
        mimeType: file.type,
      },
    })

    if (error) {
      if (error.message?.includes('429') && attempt < MAX_RETRIES) {
        console.warn(`Rate limit hit. Retrying in ${RETRY_DELAYS[attempt]}ms...`)
        await delay(RETRY_DELAYS[attempt])
        return extractQuoteFromPdf(file, attempt + 1)
      }
      throw new Error(error.message || 'Falha de comunicação com a Edge Function.')
    }

    if (data && data.error) {
      throw new Error(`Erro na análise: ${data.error}`)
    }

    if (data && data.quote) {
      return sanitizeQuoteData(data.quote) as QuoteData
    }

    throw new Error('Falha ao processar cotação no servidor: resposta inválida.')
  } catch (err: any) {
    console.error('Error extracting quote data:', err)
    throw new Error(err.message || 'Erro inesperado durante a extração dos dados.')
  }
}

const generateMockQuote = (): QuoteData => ({
  quoteNumber: `COT-MOCK-${Math.floor(Math.random() * 10000)}`,
  modal: 'Aéreo',
  agent: 'Fast Logistics Ltd',
  origin: 'Shanghai (PVG)',
  destination: 'Guarulhos (GRU)',
  incoterm: 'EXW',
  etd: new Date().toISOString().split('T')[0],
  eta: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  freeTime: 7,
  weight: 1250.5,
  currency: 'USD',
  tariffs: [
    { name: 'Air Freight', value: 4500, currency: 'USD' },
    { name: 'Fuel Surcharge', value: 350, currency: 'USD' },
    { name: 'Security Surcharge', value: 150, currency: 'USD' },
    { name: 'Handling', value: 80, currency: 'USD' },
  ],
  status: 'rascunho',
})

export const saveQuoteToDb = async (quoteData: QuoteData & { status?: string }) => {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session?.user) throw new Error('Usuário não autenticado')

  const componentes =
    quoteData.tariffs?.reduce(
      (acc, t) => {
        acc[t.name] = { valor: t.value, moeda: t.currency }
        return acc
      },
      {} as Record<string, any>,
    ) || {}

  const total = quoteData.tariffs?.reduce((sum, t) => sum + (Number(t.value) || 0), 0) || 0

  const payload = {
    user_id: session.user.id,
    numero_cotacao: quoteData.quoteNumber || `COT-${Date.now()}`,
    modal: quoteData.modal || 'Aéreo',
    agente: quoteData.agent || 'Desconhecido',
    origem: quoteData.origin || 'Desconhecido',
    destino: quoteData.destination || 'Desconhecido',
    incoterm: quoteData.incoterm || 'EXW',
    etd: quoteData.etd || new Date().toISOString().split('T')[0],
    eta: quoteData.eta || null,
    free_time: quoteData.freeTime || 0,
    peso_volume: quoteData.weight || 0,
    moeda_original: quoteData.currency || 'USD',
    valor_total: total,
    componentes,
    status: quoteData.status || 'conferido',
  }

  if (quoteData.id) {
    const { data, error } = await supabase
      .from('cotacoes')
      .update(payload)
      .eq('id', quoteData.id)
      .select()
      .single()

    if (error) throw error
    return data
  } else {
    const { data, error } = await supabase.from('cotacoes').insert(payload).select().single()

    if (error) throw error
    return data
  }
}
