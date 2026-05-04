import { useState, useEffect } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { QuoteData } from '@/types/quote'
import { ReviewForm } from '@/components/ReviewForm'
import { ChevronRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

export default function Review() {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [data, setData] = useState<QuoteData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulating loading to show the skeleton as requested
    const timer = setTimeout(() => {
      const stateData = location.state?.quote
      if (stateData) {
        setData(stateData)
      }
      setLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [location.state])

  const handleBack = () => navigate(-1)

  return (
    <div className="space-y-6 animate-fade-in pb-12 max-w-5xl mx-auto">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleBack}
          className="text-gray-500 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500 font-medium mb-1">
            <span
              className="cursor-pointer hover:text-gray-900 transition-colors"
              onClick={() => navigate('/')}
            >
              Cotações
            </span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-primary font-semibold">Revisar</span>
          </div>
          <h1 className="text-2xl font-heading font-bold text-gray-900">Conferência de Cotação</h1>
        </div>
      </div>

      {loading ? (
        <div className="space-y-6">
          <Skeleton className="h-[300px] w-full rounded-xl" />
          <Skeleton className="h-[400px] w-full rounded-xl" />
        </div>
      ) : !data ? (
        <div className="text-center py-16 bg-white rounded-xl border border-dashed border-gray-300">
          <h3 className="text-lg font-medium text-gray-900">Nenhuma cotação para revisar</h3>
          <p className="text-gray-500 mt-1">Os dados não puderam ser carregados ou não existem.</p>
          <Button onClick={() => navigate('/')} className="mt-4">
            Voltar para Cotações
          </Button>
        </div>
      ) : (
        <ReviewForm initialData={data} onBack={handleBack} />
      )}
    </div>
  )
}
