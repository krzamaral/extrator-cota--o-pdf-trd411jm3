import { useState, useCallback } from 'react'
import { UploadArea } from '@/components/UploadArea'
import { QuoteResultCard } from '@/components/QuoteResultCard'
import { QuoteSkeleton } from '@/components/QuoteSkeleton'
import { QuoteErrorState } from '@/components/QuoteErrorState'
import { ProcessedFile } from '@/types/quote'
import { extractQuoteFromPdf } from '@/services/quote-service'
import { toast } from 'sonner'
import { Bot, ChevronRight, FileText } from 'lucide-react'

export default function Index() {
  const [processedFiles, setProcessedFiles] = useState<ProcessedFile[]>([])

  const handleFilesSelected = useCallback(async (files: File[]) => {
    // Add files to state immediately with 'loading' status
    const newFiles: ProcessedFile[] = files.map((file) => ({
      id: crypto.randomUUID(),
      file,
      status: 'loading',
    }))

    setProcessedFiles((prev) => [...newFiles, ...prev])

    // Process each file
    for (const pFile of newFiles) {
      try {
        const data = await extractQuoteFromPdf(pFile.file)

        setProcessedFiles((current) =>
          current.map((f) => (f.id === pFile.id ? { ...f, status: 'success', data } : f)),
        )
      } catch (error: any) {
        setProcessedFiles((current) =>
          current.map((f) =>
            f.id === pFile.id
              ? { ...f, status: 'error', error: error.message || 'Erro desconhecido' }
              : f,
          ),
        )
      }
    }
  }, [])

  const handleRetry = async (id: string, file: File) => {
    setProcessedFiles((current) =>
      current.map((f) => (f.id === id ? { ...f, status: 'loading', error: undefined } : f)),
    )

    try {
      const data = await extractQuoteFromPdf(file)
      setProcessedFiles((current) =>
        current.map((f) => (f.id === id ? { ...f, status: 'success', data } : f)),
      )
    } catch (error: any) {
      setProcessedFiles((current) =>
        current.map((f) => (f.id === id ? { ...f, status: 'error', error: error.message } : f)),
      )
    }
  }

  const handleDiscard = (id: string) => {
    setProcessedFiles((current) => current.filter((f) => f.id !== id))
    toast('Cotação descartada', {
      description: 'O arquivo foi removido da lista.',
    })
  }

  const handleReview = (id: string) => {
    toast.success('Pronto para revisão!', {
      description: 'Esta ação levaria para a página de conferência detalhada.',
    })
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-gray-500 font-medium mb-4">
          <span className="flex items-center hover:text-gray-900 cursor-pointer transition-colors">
            Cotações <ChevronRight className="w-4 h-4 mx-1" />
          </span>
          <span className="text-primary font-semibold">Nova Extração</span>
        </div>

        <h1 className="text-3xl font-heading font-bold text-gray-900 flex items-center gap-3">
          Extrator Inteligente de Cotações
          <Badge
            variant="secondary"
            className="bg-secondary/15 text-secondary border-none px-2 py-0.5 text-xs"
          >
            <Bot className="w-3 h-3 mr-1 inline" /> AI Powered
          </Badge>
        </h1>
        <p className="text-gray-500 max-w-2xl text-lg">
          Faça o upload dos PDFs recebidos dos agentes. Nossa inteligência artificial fará a leitura
          e extração automática dos dados de frete e tarifas.
        </p>
      </div>

      {/* Upload Zone */}
      <UploadArea onFilesSelected={handleFilesSelected} maxFiles={10} maxSizeMB={5} />

      {/* Results Section */}
      {processedFiles.length > 0 && (
        <div className="space-y-6 pt-4">
          <div className="flex items-center justify-between border-b pb-4">
            <h2 className="text-xl font-heading font-semibold text-gray-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-gray-400" />
              Arquivos Processados
              <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs font-bold ml-2">
                {processedFiles.length}
              </span>
            </h2>
          </div>

          <div className="space-y-6">
            {processedFiles.map((file) => (
              <div key={file.id} className="w-full">
                {file.status === 'loading' && <QuoteSkeleton fileName={file.file.name} />}

                {file.status === 'success' && file.data && (
                  <QuoteResultCard
                    fileName={file.file.name}
                    data={file.data}
                    onReview={() => handleReview(file.id)}
                    onDiscard={() => handleDiscard(file.id)}
                  />
                )}

                {file.status === 'error' && (
                  <QuoteErrorState
                    fileName={file.file.name}
                    errorMsg={file.error}
                    onRetry={() => handleRetry(file.id, file.file)}
                    onDiscard={() => handleDiscard(file.id)}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Inline badge component for the header
function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<'div'> & { variant?: string }) {
  return (
    <div
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}
      {...props}
    />
  )
}
