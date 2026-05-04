import { useState, useCallback } from 'react'
import { UploadCloud, File as FileIcon, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

interface UploadAreaProps {
  onFilesSelected: (files: File[]) => void
  maxFiles?: number
  maxSizeMB?: number
}

export function UploadArea({ onFilesSelected, maxFiles = 10, maxSizeMB = 5 }: UploadAreaProps) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const validateFiles = (files: File[]): File[] => {
    const validFiles: File[] = []
    let hasErrors = false

    if (files.length > maxFiles) {
      toast.error(`Máximo de ${maxFiles} arquivos permitidos por vez.`)
      files = files.slice(0, maxFiles)
      hasErrors = true
    }

    for (const file of files) {
      if (file.type !== 'application/pdf') {
        toast.error(`O arquivo ${file.name} não é um PDF válido.`)
        hasErrors = true
        continue
      }

      if (file.size > maxSizeMB * 1024 * 1024) {
        toast.error(`O arquivo ${file.name} excede o limite de ${maxSizeMB}MB.`)
        hasErrors = true
        continue
      }

      validFiles.push(file)
    }

    if (!hasErrors && validFiles.length > 0) {
      toast.success(`${validFiles.length} arquivo(s) selecionado(s) com sucesso.`)
    }

    return validFiles
  }

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const droppedFiles = Array.from(e.dataTransfer.files)
        const validFiles = validateFiles(droppedFiles)
        if (validFiles.length > 0) {
          onFilesSelected(validFiles)
        }
      }
    },
    [onFilesSelected, maxFiles, maxSizeMB],
  )

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const selectedFiles = Array.from(e.target.files)
        const validFiles = validateFiles(selectedFiles)
        if (validFiles.length > 0) {
          onFilesSelected(validFiles)
        }
        // Reset input
        e.target.value = ''
      }
    },
    [onFilesSelected, maxFiles, maxSizeMB],
  )

  return (
    <div
      className={cn(
        'relative flex flex-col items-center justify-center w-full p-12 border-2 border-dashed rounded-xl transition-all duration-200 bg-white/50 backdrop-blur-sm',
        isDragging
          ? 'border-secondary bg-secondary/5 scale-[1.02]'
          : 'border-gray-300 hover:border-primary/50 hover:bg-gray-50/50',
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        multiple
        accept=".pdf"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        onChange={handleFileInput}
        title="Arraste PDFs aqui ou clique para selecionar"
      />

      <div className="flex flex-col items-center justify-center space-y-4 text-center pointer-events-none">
        <div
          className={cn(
            'p-4 rounded-full transition-colors duration-300',
            isDragging ? 'bg-secondary/10 text-secondary' : 'bg-primary/5 text-primary',
          )}
        >
          <UploadCloud className="w-10 h-10" />
        </div>

        <div className="space-y-1">
          <h3 className="text-xl font-heading font-semibold text-gray-900">Arraste PDFs aqui</h3>
          <p className="text-sm text-gray-500 max-w-sm">
            ou clique no botão abaixo para selecionar arquivos do seu computador.
          </p>
        </div>

        <div className="pt-2">
          <Button type="button" variant="outline" className="pointer-events-none">
            Selecionar arquivos
          </Button>
        </div>

        <div className="flex items-center gap-4 text-xs text-gray-400 font-medium">
          <span className="flex items-center gap-1">
            <FileIcon className="w-3 h-3" /> Apenas PDFs
          </span>
          <span>•</span>
          <span>Máximo {maxSizeMB}MB</span>
          <span>•</span>
          <span>Até {maxFiles} arquivos</span>
        </div>
      </div>
    </div>
  )
}
