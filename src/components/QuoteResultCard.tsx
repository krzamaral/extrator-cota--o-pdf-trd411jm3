import { QuoteData } from '@/types/quote'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  CheckCircle2,
  Package,
  Calendar,
  Clock,
  DollarSign,
  Trash2,
  ArrowRight,
} from 'lucide-react'

interface QuoteResultCardProps {
  fileName: string
  data: QuoteData
  onReview: () => void
  onDiscard: () => void
}

export function QuoteResultCard({ fileName, data, onReview, onDiscard }: QuoteResultCardProps) {
  const formatCurrency = (value: number, currency: string) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: currency || 'BRL',
    }).format(value)
  }

  const formatDate = (dateStr: string) => {
    try {
      if (!dateStr) return '--'
      const date = new Date(dateStr)
      return new Intl.DateTimeFormat('pt-BR').format(date)
    } catch {
      return dateStr
    }
  }

  return (
    <Card className="w-full animate-fade-in-up border-green-100 overflow-hidden group">
      <CardHeader className="bg-gray-50/50 pb-4 border-b">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                <Package className="w-3 h-3 mr-1" />
                {data.modal || 'Desconhecido'}
              </Badge>
              <Badge variant="outline" className="text-gray-500 border-gray-200">
                {fileName}
              </Badge>
            </div>
            <h3 className="font-heading text-xl font-bold text-gray-900">
              {data.agent || 'Agente não identificado'}
            </h3>
          </div>
          <div className="p-2 bg-green-50 rounded-full">
            <CheckCircle2 className="w-6 h-6 text-green-500" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Details */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm">
            <div className="space-y-1">
              <div className="flex items-center text-gray-500 gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>ETD</span>
              </div>
              <p className="font-medium">{formatDate(data.etd)}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center text-gray-500 gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>ETA</span>
              </div>
              <p className="font-medium">{formatDate(data.eta)}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center text-gray-500 gap-1.5">
                <Clock className="w-4 h-4" />
                <span>Free Time</span>
              </div>
              <p className="font-medium">{data.freeTime ? `${data.freeTime} dias` : '--'}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center text-gray-500 gap-1.5">
                <Package className="w-4 h-4" />
                <span>Peso/Vol</span>
              </div>
              <p className="font-medium">{data.weight ? `${data.weight} kg` : '--'}</p>
            </div>
          </div>
        </div>

        {/* Right Column: Tariffs */}
        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
          <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-1.5 mb-3">
            <DollarSign className="w-4 h-4" />
            Componentes Tarifários
          </h4>

          <div className="space-y-2 text-sm">
            {data.tariffs && data.tariffs.length > 0 ? (
              data.tariffs.map((t, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <span className="text-gray-600">{t.name}</span>
                  <span className="font-medium">{formatCurrency(t.value, data.currency)}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic text-xs">Nenhuma tarifa extraída</p>
            )}
          </div>

          <Separator className="my-3" />

          <div className="flex justify-between items-center text-base">
            <span className="font-bold text-gray-900">Total</span>
            <span className="font-bold text-primary">
              {formatCurrency(data.total, data.currency)}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="bg-gray-50/50 border-t flex justify-end gap-3 pt-4 pb-4">
        <Button
          variant="outline"
          onClick={onDiscard}
          className="text-gray-500 hover:text-destructive hover:bg-destructive/10 border-transparent hover:border-destructive/20"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Descartar
        </Button>
        <Button onClick={onReview} className="bg-primary hover:bg-primary/90 text-white shadow-sm">
          Revisar Dados
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  )
}
