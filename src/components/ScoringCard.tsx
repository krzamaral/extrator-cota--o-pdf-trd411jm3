import { ScoredQuote } from '@/types/scoring'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Plane, Ship, Trash2, Info, ArrowRight, DollarSign } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ScoringCardProps {
  quote: ScoredQuote
  rank: number
  onDiscard: (id: string) => void
}

export function ScoringCard({ quote, rank, onDiscard }: ScoringCardProps) {
  const getStatusColor = (score: number) => {
    if (score >= 8.0)
      return { bg: 'bg-emerald-500', text: 'text-emerald-600', fill: 'bg-emerald-500' }
    if (score >= 7.0) return { bg: 'bg-amber-500', text: 'text-amber-600', fill: 'bg-amber-500' }
    return { bg: 'bg-red-500', text: 'text-red-600', fill: 'bg-red-500' }
  }

  const colors = getStatusColor(quote.scores.final)
  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val)

  return (
    <Card className="relative overflow-hidden border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in-up bg-white group">
      <div className={cn('absolute top-0 left-0 w-1.5 h-full', colors.bg)} />
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          {/* Left Content */}
          <div className="flex-1 p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Badge
                  className={cn(
                    'px-3 py-1 text-sm font-bold shadow-sm',
                    rank === 1
                      ? 'bg-secondary hover:bg-secondary/90 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-transparent',
                  )}
                >
                  {rank}º Lugar
                </Badge>
                <h3 className="text-xl font-heading font-bold text-primary">{quote.agent}</h3>
              </div>
              <Badge variant="outline" className="bg-gray-50 flex items-center gap-1.5">
                {quote.modal === 'Aéreo' ? (
                  <Plane className="w-3 h-3" />
                ) : (
                  <Ship className="w-3 h-3" />
                )}
                {quote.modal}
              </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500 mb-1 font-medium">Rota</p>
                <div className="flex items-center gap-2 font-semibold text-gray-900">
                  {quote.origin} <ArrowRight className="w-4 h-4 text-gray-400" />{' '}
                  {quote.destination}
                </div>
              </div>
              <div>
                <p className="text-gray-500 mb-1 font-medium">Valor Total</p>
                <div className="font-bold text-lg text-primary">{formatCurrency(quote.cost)}</div>
              </div>
            </div>

            <div className="space-y-2 border-t border-gray-100 pt-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5" /> Componentes Tarifários
              </p>
              <div className="flex flex-wrap gap-2">
                {quote.tariffs.map((t, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-50 border border-gray-100 rounded px-2.5 py-1.5 text-xs text-gray-700 flex items-center gap-2"
                  >
                    <span>{t.name}</span>
                    <span className="font-semibold">{formatCurrency(t.value)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50/40 border border-blue-100/50 rounded-lg p-4 mt-2">
              <h4 className="text-xs font-semibold text-primary mb-2 flex items-center gap-1.5">
                <Info className="w-4 h-4" /> Justificativa do Sistema
              </h4>
              <ul className="text-sm text-gray-600 space-y-1.5">
                {quote.justification.map((text, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-1.5 shrink-0" />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Score Area */}
          <div className="w-full md:w-72 bg-gray-50 border-l border-gray-100 p-6 flex flex-col justify-between">
            <div className="text-center space-y-2">
              <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                Nota Final
              </h4>
              <div className={cn('text-5xl font-black font-heading tracking-tight', colors.text)}>
                {quote.scores.final.toFixed(1).replace('.', ',')}
              </div>

              <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden mt-4">
                <div
                  className={cn('h-full transition-all duration-1000 ease-out', colors.fill)}
                  style={{ width: `${quote.scores.final * 10}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 mt-6 text-center">
              <div className="bg-white border border-gray-100 rounded py-2 shadow-sm">
                <div className="text-[10px] text-gray-400 font-bold uppercase mb-0.5">Custo</div>
                <div className="text-sm font-bold text-gray-800">
                  {quote.scores.cost.toFixed(1)}
                </div>
              </div>
              <div className="bg-white border border-gray-100 rounded py-2 shadow-sm">
                <div className="text-[10px] text-gray-400 font-bold uppercase mb-0.5">Tempo</div>
                <div className="text-sm font-bold text-gray-800">
                  {quote.scores.transitTime.toFixed(1)}
                </div>
              </div>
              <div className="bg-white border border-gray-100 rounded py-2 shadow-sm">
                <div className="text-[10px] text-gray-400 font-bold uppercase mb-0.5">ETD</div>
                <div className="text-sm font-bold text-gray-800">{quote.scores.etd.toFixed(1)}</div>
              </div>
              <div className="bg-white border border-gray-100 rounded py-2 shadow-sm">
                <div className="text-[10px] text-gray-400 font-bold uppercase mb-0.5">F.Time</div>
                <div className="text-sm font-bold text-gray-800">
                  {quote.scores.freeTime.toFixed(1)}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDiscard(quote.id)}
                className="text-gray-400 hover:text-red-600 hover:bg-red-50 w-full transition-colors"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Descartar Cotação
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
