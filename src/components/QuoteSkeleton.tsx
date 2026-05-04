import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Loader2 } from 'lucide-react'

interface QuoteSkeletonProps {
  fileName: string
}

export function QuoteSkeleton({ fileName }: QuoteSkeletonProps) {
  return (
    <Card className="w-full animate-pulse border-gray-200">
      <CardHeader className="bg-gray-50/50 pb-4 border-b">
        <div className="flex items-start justify-between">
          <div className="space-y-3 w-full max-w-sm">
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-20 rounded-full" />
              <div className="text-xs text-gray-400 font-medium truncate max-w-[200px]">
                Processando: {fileName}
              </div>
            </div>
            <Skeleton className="h-8 w-3/4 rounded-md" />
          </div>
          <div className="flex flex-col items-center justify-center p-2 text-primary">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span className="text-[10px] font-medium mt-1">IA Lendo...</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-12 rounded" />
              <Skeleton className="h-5 w-24 rounded" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-12 rounded" />
              <Skeleton className="h-5 w-24 rounded" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-20 rounded" />
              <Skeleton className="h-5 w-16 rounded" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-16 rounded" />
              <Skeleton className="h-5 w-20 rounded" />
            </div>
          </div>
        </div>

        <div className="bg-gray-50/50 rounded-lg p-4 space-y-4 border border-gray-100">
          <Skeleton className="h-5 w-40 rounded mb-4" />
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex justify-between items-center">
              <Skeleton className="h-4 w-24 rounded" />
              <Skeleton className="h-4 w-16 rounded" />
            </div>
          ))}
          <div className="pt-3 border-t border-gray-100 mt-2 flex justify-between items-center">
            <Skeleton className="h-5 w-12 rounded" />
            <Skeleton className="h-6 w-24 rounded" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
