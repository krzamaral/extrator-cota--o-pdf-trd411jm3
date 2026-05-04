import { QuoteData } from '@/types/quote'

export const mockQuoteData: QuoteData = {
  quoteNumber: 'COT-2026-05-001',
  modal: 'FCL',
  agent: 'DHL Global Forwarding',
  origin: 'Santos (SSZ)',
  destination: 'Rotterdam (RTM)',
  incoterm: 'CIF',
  tariffs: [
    { name: 'Frete Base', value: 2500 },
    { name: 'BAF', value: 350 },
    { name: 'THC', value: 450 },
    { name: 'Seguro', value: 180 },
    { name: 'Documentação', value: 120 },
  ],
  weight: 18000,
  etd: '2026-05-15',
  eta: '2026-06-10',
  freeTime: 14,
  currency: 'USD',
  total: 3600,
}
