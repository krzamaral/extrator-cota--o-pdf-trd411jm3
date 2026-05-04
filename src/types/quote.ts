export interface TariffComponent {
  name: string
  value: number
  currency: string
}

export interface QuoteData {
  quoteNumber?: string
  modal: string
  agent: string
  origin?: string
  destination?: string
  incoterm?: string
  tariffs: TariffComponent[]
  weight: number
  etd: string
  eta?: string
  freeTime: number
  currency: string
  total: number
}

export interface ProcessedFile {
  id: string
  file: File
  status: 'loading' | 'success' | 'error'
  data?: QuoteData
  error?: string
  progress?: number
}
