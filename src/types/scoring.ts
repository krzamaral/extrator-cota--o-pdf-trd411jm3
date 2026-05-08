export interface ScoredQuote {
  id: string
  agent: string
  modal: string
  origin: string
  destination: string
  cost: number
  transitTime: number
  etd: string
  freeTime: number
  tariffs: { name: string; value: number }[]
  scores: {
    cost: number
    transitTime: number
    etd: number
    freeTime: number
    final: number
  }
  justification: string[]
}
