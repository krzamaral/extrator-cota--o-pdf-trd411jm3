import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ScoredQuote } from '@/types/scoring'
import { ScoringCard } from '@/components/ScoringCard'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { AlertTriangle, ArrowLeft, FileText, Trophy } from 'lucide-react'
import { toast } from 'sonner'

const MOCK_SCORED_QUOTES: ScoredQuote[] = [
  {
    id: '1',
    agent: 'DHL Global Forwarding',
    modal: 'Aéreo',
    origin: 'Guarulhos, BR',
    destination: 'Frankfurt, DE',
    cost: 3600,
    transitTime: 26,
    etd: '2026-05-15',
    freeTime: 14,
    tariffs: [
      { name: 'Frete Base', value: 3000 },
      { name: 'Taxas', value: 600 },
    ],
    scores: { cost: 8.5, transitTime: 7.2, etd: 10, freeTime: 4.7, final: 8.2 },
    justification: [
      'Custo intermediário: R$ 3.600,00',
      'Tempo de trânsito aceitável: 26 dias',
      'Data de saída dentro da janela',
      'Free time razoável: 14 dias',
    ],
  },
  {
    id: '2',
    agent: 'Kuehne+Nagel',
    modal: 'LCL',
    origin: 'Santos, BR',
    destination: 'Hamburgo, DE',
    cost: 4200,
    transitTime: 28,
    etd: '2026-05-20',
    freeTime: 7,
    tariffs: [
      { name: 'Frete Marítimo', value: 3800 },
      { name: 'THC', value: 400 },
    ],
    scores: { cost: 7.0, transitTime: 6.5, etd: 5.0, freeTime: 2.3, final: 6.3 },
    justification: [
      'Custo mais elevado: R$ 4.200,00',
      'Maior tempo de trânsito: 28 dias',
      'Data de saída fora da janela (penalização)',
      'Pouco free time: 7 dias',
    ],
  },
  {
    id: '3',
    agent: 'DSV',
    modal: 'FCL',
    origin: 'Santos, BR',
    destination: 'Miami, US',
    cost: 3200,
    transitTime: 24,
    etd: '2026-05-12',
    freeTime: 21,
    tariffs: [
      { name: 'Frete FCL', value: 2800 },
      { name: 'Despacho', value: 400 },
    ],
    scores: { cost: 9.2, transitTime: 8.1, etd: 10, freeTime: 7.0, final: 8.9 },
    justification: [
      'Melhor custo: R$ 3.200,00',
      'Menor tempo de trânsito: 24 dias',
      'Data de saída dentro da janela',
      'Free time generoso: 21 dias',
    ],
  },
]

export default function Scoring() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [quotes, setQuotes] = useState<ScoredQuote[]>([])

  const loadData = () => {
    setLoading(true)
    setError(false)
    // Simulating algorithmic calculation delay
    setTimeout(() => {
      try {
        setQuotes(MOCK_SCORED_QUOTES)
        setLoading(false)
        toast.success('Scoring concluído', { description: 'Ranqueamento gerado com sucesso.' })
      } catch (err) {
        setError(true)
        setLoading(false)
      }
    }, 2000)
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleDiscard = (id: string) => {
    setQuotes((prev) => prev.filter((q) => q.id !== id))
    toast.info('Cotação removida do ranking')
  }

  const handleGeneratePdf = () => {
    toast.success('Iniciando geração do relatório PDF...')
    navigate('/report')
  }

  const sortedQuotes = [...quotes].sort((a, b) => b.scores.final - a.scores.final).slice(0, 3)

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center space-y-5 animate-fade-in max-w-5xl mx-auto">
        <div className="p-5 bg-red-50 rounded-full text-red-500">
          <AlertTriangle className="w-10 h-10" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 font-heading">
            Erro ao calcular scoring
          </h2>
          <p className="text-gray-500 mt-2 max-w-md mx-auto">
            Ocorreu um problema inesperado ao processar a matriz de pesos das cotações.
          </p>
        </div>
        <Button onClick={loadData} variant="outline" className="mt-4">
          Tentar novamente
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto pb-16 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500 font-medium mb-2">
            <span
              className="cursor-pointer hover:text-gray-900 transition-colors"
              onClick={() => navigate('/')}
            >
              Cotações
            </span>
            <span>/</span>
            <span className="text-primary font-semibold">Scoring Automático</span>
          </div>
          <h1 className="text-3xl font-heading font-bold text-primary flex items-center gap-3">
            <Trophy className="w-8 h-8 text-secondary" />
            Ranking de Cotações
          </h1>
          <p className="text-gray-500 mt-1">
            Análise inteligente baseada na matriz de pesos (Custo, Tempo, ETD e Free Time)
          </p>
        </div>
      </div>

      {loading ? (
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="w-full border-gray-100 shadow-sm animate-pulse">
              <CardContent className="p-6 h-[250px] flex items-center justify-center">
                <div className="flex flex-col items-center gap-3 text-gray-400">
                  <div className="w-8 h-8 rounded-full border-2 border-gray-200 border-t-primary animate-spin" />
                  <p className="text-sm font-medium">Aplicando matriz matemática...</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : sortedQuotes.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
          <h3 className="text-lg font-medium text-gray-900">Nenhuma cotação no ranking</h3>
          <p className="text-gray-500 mt-1">
            Todas as cotações foram descartadas ou não puderam ser avaliadas.
          </p>
          <Button onClick={() => navigate('/')} className="mt-6">
            Voltar para Cotações
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {sortedQuotes.map((quote, index) => (
            <ScoringCard key={quote.id} quote={quote} rank={index + 1} onDiscard={handleDiscard} />
          ))}

          <div className="flex flex-col sm:flex-row items-center justify-between pt-8 mt-8 border-t border-gray-200 gap-4">
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto text-gray-600 hover:bg-gray-100"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
            </Button>
            <Button
              onClick={handleGeneratePdf}
              className="w-full sm:w-auto bg-secondary hover:bg-secondary/90 text-white shadow-sm"
            >
              <FileText className="w-4 h-4 mr-2" /> Gerar Relatório PDF
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
