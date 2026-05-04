import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertCircle, RefreshCcw, Trash2 } from 'lucide-react'

interface QuoteErrorStateProps {
  fileName: string
  errorMsg?: string
  onRetry: () => void
  onDiscard: () => void
}

export function QuoteErrorState({ fileName, errorMsg, onRetry, onDiscard }: QuoteErrorStateProps) {
  return (
    <Card className="w-full border-red-200 bg-red-50/30 overflow-hidden animate-fade-in-up">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="p-4 bg-red-100 rounded-full text-destructive shrink-0">
            <AlertCircle className="w-8 h-8" />
          </div>

          <div className="flex-1 text-center sm:text-left space-y-1">
            <h3 className="font-semibold text-red-900 text-lg">Falha na extração de dados</h3>
            <p className="text-sm text-red-700 max-w-md">
              Não foi possível ler as informações do arquivo{' '}
              <span className="font-medium">{fileName}</span>.
              {errorMsg
                ? ` Detalhes: ${errorMsg}`
                : ' Verifique se o PDF é uma cotação válida e não está corrompido.'}
            </p>
          </div>

          <div className="flex flex-row sm:flex-col gap-2 shrink-0 w-full sm:w-auto mt-4 sm:mt-0">
            <Button
              onClick={onRetry}
              variant="outline"
              className="flex-1 sm:flex-none bg-white border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800"
            >
              <RefreshCcw className="w-4 h-4 mr-2" />
              Tentar novamente
            </Button>
            <Button
              onClick={onDiscard}
              variant="ghost"
              className="flex-1 sm:flex-none text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Descartar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
