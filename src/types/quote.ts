export interface TariffComponent {
  name: string
  value: number
}

export interface QuoteData {
  modal: string
  agent: string
  tariffs: TariffComponent[]
  weight: string
  etd: string
  eta: string
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
