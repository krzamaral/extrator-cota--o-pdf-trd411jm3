import { useState, useEffect, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {
  Search,
  Edit,
  FileText,
  Copy,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Plus,
  AlertCircle,
  Package,
} from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { getHistory, getAgents, duplicateQuote, deleteQuote } from '@/services/history-service'
import { useDebounce } from '@/hooks/use-debounce'

export default function History() {
  const navigate = useNavigate()

  const [quotes, setQuotes] = useState<any[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [modal, setModal] = useState('all')
  const [status, setStatus] = useState('all')
  const [dateRange, setDateRange] = useState('all')
  const [agent, setAgent] = useState('all')
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 300)

  const [agents, setAgents] = useState<string[]>([])

  const [page, setPage] = useState(1)
  const limit = 20

  const [quoteToDelete, setQuoteToDelete] = useState<string | null>(null)

  const loadData = useCallback(async () => {
    try {
      if (debouncedSearch !== search) {
        setIsSearching(true)
        return
      }

      setIsSearching(debouncedSearch !== '')
      setError(null)

      const { data, count } = await getHistory({
        modal,
        status,
        dateRange,
        agent,
        search: debouncedSearch,
        page,
        limit,
      })

      setQuotes(data || [])
      setTotal(count || 0)
    } catch (err: any) {
      console.error(err)
      let errorMsg = 'Erro ao processar. Tente novamente.'
      if (
        err.message?.toLowerCase().includes('network') ||
        err.message?.toLowerCase().includes('fetch')
      ) {
        errorMsg = 'Sem conexão. Tente novamente.'
      } else if (err.status === 401) {
        errorMsg = 'Sessão expirada. Faça login novamente.'
      }
      setError(errorMsg)
    } finally {
      setLoading(false)
      setIsSearching(false)
    }
  }, [modal, status, dateRange, agent, debouncedSearch, search, page, limit])

  useEffect(() => {
    loadData()
  }, [loadData])

  useEffect(() => {
    getAgents().then(setAgents).catch(console.error)
  }, [])

  useEffect(() => {
    setPage(1)
  }, [modal, status, dateRange, agent, debouncedSearch])

  const handleDuplicate = async (id: string) => {
    try {
      toast.loading('Duplicando cotação...', { id: 'duplicating' })
      await duplicateQuote(id)
      toast.success('Cotação duplicada com sucesso!', { id: 'duplicating' })
      loadData()
    } catch (err: any) {
      toast.error('Erro ao duplicar: ' + err.message, { id: 'duplicating' })
    }
  }

  const handleDelete = async () => {
    if (!quoteToDelete) return
    try {
      toast.loading('Deletando cotação...', { id: 'deleting' })
      await deleteQuote(quoteToDelete)
      toast.success('Cotação deletada com sucesso!', { id: 'deleting' })
      loadData()
    } catch (err: any) {
      toast.error('Erro ao deletar: ' + err.message, { id: 'deleting' })
    } finally {
      setQuoteToDelete(null)
    }
  }

  const clearFilters = () => {
    setModal('all')
    setStatus('all')
    setDateRange('all')
    setAgent('all')
    setSearch('')
  }

  const getScoreColor = (score: number) => {
    if (score >= 9) return 'bg-[#10B981] hover:bg-[#10B981]/90 text-white border-transparent'
    if (score >= 7) return 'bg-[#F59E0B] hover:bg-[#F59E0B]/90 text-white border-transparent'
    return 'bg-[#EF4444] hover:bg-[#EF4444]/90 text-white border-transparent'
  }

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'rascunho':
        return 'bg-gray-200 text-gray-800 hover:bg-gray-300'
      case 'conferido':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200'
      case 'scoring':
        return 'bg-[#FF6B35]/20 text-[#FF6B35] hover:bg-[#FF6B35]/30'
      case 'finalizado':
        return 'bg-[#10B981]/20 text-[#10B981] hover:bg-[#10B981]/30'
      default:
        return 'bg-gray-100'
    }
  }

  return (
    <div className="space-y-6 pb-10 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#003366]">Histórico de Cotações</h1>
          <p className="text-gray-500 text-sm">
            Gerencie, busque e acompanhe todas as suas cotações de frete.
          </p>
        </div>
        <Button
          onClick={() => navigate('/')}
          className="bg-[#FF6B35] hover:bg-[#E85D2A] text-white"
        >
          <Plus className="h-4 w-4 mr-2" /> Nova Cotação
        </Button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 animate-slide-in-bottom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="relative lg:col-span-2">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" aria-hidden="true" />
            <Input
              placeholder="Buscar por número ou agente..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Buscar cotação"
              className="pl-9 bg-gray-50/50"
            />
            {isSearching && (
              <Loader2 className="absolute right-3 top-3 h-4 w-4 animate-spin text-primary" />
            )}
          </div>

          <Select value={modal} onValueChange={setModal}>
            <SelectTrigger className="min-h-[44px] bg-gray-50/50" aria-label="Filtrar por Modal">
              <SelectValue placeholder="Modal" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Modais</SelectItem>
              <SelectItem value="Aéreo">Aéreo</SelectItem>
              <SelectItem value="FCL">FCL</SelectItem>
              <SelectItem value="LCL">LCL</SelectItem>
            </SelectContent>
          </Select>

          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="min-h-[44px] bg-gray-50/50" aria-label="Filtrar por Status">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Status</SelectItem>
              <SelectItem value="rascunho">Rascunho</SelectItem>
              <SelectItem value="conferido">Conferido</SelectItem>
              <SelectItem value="scoring">Scoring</SelectItem>
              <SelectItem value="finalizado">Finalizado</SelectItem>
            </SelectContent>
          </Select>

          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="min-h-[44px] bg-gray-50/50" aria-label="Filtrar por Período">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todo o Período</SelectItem>
              <SelectItem value="7">Últimos 7 dias</SelectItem>
              <SelectItem value="30">Últimos 30 dias</SelectItem>
              <SelectItem value="90">Últimos 90 dias</SelectItem>
            </SelectContent>
          </Select>

          <Select value={agent} onValueChange={setAgent}>
            <SelectTrigger
              className="min-h-[44px] bg-gray-50/50 lg:col-start-5"
              aria-label="Filtrar por Agente"
            >
              <SelectValue placeholder="Agente" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Agentes</SelectItem>
              {agents.map((a) => (
                <SelectItem key={a} value={a}>
                  {a}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {error ? (
        <div className="flex flex-col items-center justify-center py-12 text-center bg-white rounded-xl border border-gray-100 shadow-sm">
          <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
          <h2 className="text-xl font-bold text-[#003366] mb-2">Erro ao carregar histórico</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button onClick={loadData} className="bg-[#003366]">
            Tentar Novamente
          </Button>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-slide-in-bottom">
          {/* Mobile View (Cards) */}
          <div className="md:hidden divide-y divide-gray-100">
            {loading && !isSearching ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </div>
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-4 w-32" />
                  <div className="flex justify-between items-center pt-2">
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-8 w-32" />
                  </div>
                </div>
              ))
            ) : quotes.length === 0 ? (
              <div className="p-8 flex flex-col items-center justify-center text-center">
                <Package className="h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-[#003366] mb-1">
                  Nenhuma cotação encontrada
                </h3>
                <p className="text-gray-500 mb-4 text-sm">
                  Ajuste os filtros de busca para encontrar o que procura.
                </p>
                <Button onClick={clearFilters} variant="outline">
                  Limpar Filtros
                </Button>
              </div>
            ) : (
              quotes.map((quote) => {
                const nota = Array.isArray(quote.scoring)
                  ? quote.scoring[0]?.nota_final
                  : quote.scoring?.nota_final
                return (
                  <div key={quote.id} className="p-4 space-y-3 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-bold text-[#003366] text-base block">
                          {quote.numero_cotacao}
                        </span>
                        <span className="text-sm text-gray-500">
                          {format(new Date(quote.created_at), 'dd/MM/yyyy')}
                        </span>
                      </div>
                      <Badge variant="secondary" className={getStatusColor(quote.status)}>
                        {quote.status?.toUpperCase() || 'DESCONHECIDO'}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-500 block text-xs uppercase tracking-wider">
                          Agente
                        </span>
                        <span className="font-medium text-gray-900">{quote.agente}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block text-xs uppercase tracking-wider">
                          Modal
                        </span>
                        <span className="font-medium text-gray-900">{quote.modal}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-gray-500 block text-xs uppercase tracking-wider">
                          Rota
                        </span>
                        <span className="text-gray-900">
                          {quote.origem} → {quote.destino}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500 block text-xs uppercase tracking-wider">
                          Valor
                        </span>
                        <span className="font-bold text-gray-900">
                          R${' '}
                          {quote.valor_total?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500 block text-xs uppercase tracking-wider">
                          Nota
                        </span>
                        {nota ? (
                          <Badge variant="outline" className={getScoreColor(nota)}>
                            {Number(nota).toFixed(1)}
                          </Badge>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-1 pt-2 border-t border-gray-100 mt-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => navigate(`/review/${quote.id}`)}
                        title="Editar"
                        aria-label="Editar"
                        className="h-10 w-10 text-[#003366]"
                      >
                        <Edit className="h-5 w-5" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => navigate(`/report?id=${quote.id}`)}
                        title="Visualizar PDF"
                        aria-label="Visualizar PDF"
                        className="h-10 w-10 text-gray-600"
                      >
                        <FileText className="h-5 w-5" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleDuplicate(quote.id)}
                        title="Duplicar"
                        aria-label="Duplicar"
                        className="h-10 w-10 text-gray-600"
                      >
                        <Copy className="h-5 w-5" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setQuoteToDelete(quote.id)}
                        title="Deletar"
                        aria-label="Deletar"
                        className="h-10 w-10 text-red-500"
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                )
              })
            )}
          </div>

          {/* Desktop View (Table) */}
          <div className="hidden md:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 hover:bg-gray-50 border-b border-gray-200">
                  <TableHead className="font-semibold text-[#003366]">Número</TableHead>
                  <TableHead className="font-semibold text-[#003366]">Agente</TableHead>
                  <TableHead className="font-semibold text-[#003366]">Modal</TableHead>
                  <TableHead className="font-semibold text-[#003366]">Rota</TableHead>
                  <TableHead className="font-semibold text-[#003366]">Valor Total</TableHead>
                  <TableHead className="font-semibold text-[#003366]">Nota</TableHead>
                  <TableHead className="font-semibold text-[#003366]">Status</TableHead>
                  <TableHead className="font-semibold text-[#003366]">Data</TableHead>
                  <TableHead className="text-right font-semibold text-[#003366]">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading && !isSearching ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <Skeleton className="h-5 w-24" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-32" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 w-16 rounded-full" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-28" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-24" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 w-12 rounded-full" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 w-20 rounded-full" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-24" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-8 w-32 ml-auto" />
                      </TableCell>
                    </TableRow>
                  ))
                ) : quotes.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="h-64 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <Package className="h-12 w-12 text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium text-[#003366] mb-1">
                          {debouncedSearch ||
                          modal !== 'all' ||
                          status !== 'all' ||
                          dateRange !== 'all' ||
                          agent !== 'all'
                            ? 'Nenhum resultado encontrado'
                            : 'Nenhuma cotação salva'}
                        </h3>
                        <p className="text-gray-500 mb-4 text-sm max-w-sm">
                          {debouncedSearch ||
                          modal !== 'all' ||
                          status !== 'all' ||
                          dateRange !== 'all' ||
                          agent !== 'all'
                            ? 'Ajuste os filtros de busca para encontrar o que procura.'
                            : 'Você ainda não possui cotações no seu histórico.'}
                        </p>
                        {debouncedSearch ||
                        modal !== 'all' ||
                        status !== 'all' ||
                        dateRange !== 'all' ||
                        agent !== 'all' ? (
                          <Button variant="outline" onClick={clearFilters}>
                            Limpar Filtros
                          </Button>
                        ) : (
                          <Button
                            onClick={() => navigate('/')}
                            className="bg-[#FF6B35] hover:bg-[#E85D2A] text-white"
                          >
                            Começar agora
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  quotes.map((quote, idx) => {
                    const nota = Array.isArray(quote.scoring)
                      ? quote.scoring[0]?.nota_final
                      : quote.scoring?.nota_final
                    return (
                      <TableRow
                        key={quote.id}
                        className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}
                      >
                        <TableCell className="font-medium text-[#003366]">
                          {quote.numero_cotacao}
                        </TableCell>
                        <TableCell className="text-gray-700">{quote.agente}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-white">
                            {quote.modal}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-600 whitespace-nowrap">
                          {quote.origem} <span className="text-gray-400 mx-1">→</span>{' '}
                          {quote.destino}
                        </TableCell>
                        <TableCell className="font-medium">
                          R${' '}
                          {quote.valor_total?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </TableCell>
                        <TableCell>
                          {nota ? (
                            <Badge variant="outline" className={getScoreColor(nota)}>
                              {Number(nota).toFixed(1)}
                            </Badge>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={getStatusColor(quote.status)}>
                            {quote.status?.toUpperCase() || 'DESCONHECIDO'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-500 text-sm">
                          {format(new Date(quote.created_at), 'dd/MM/yyyy', { locale: ptBR })}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => navigate(`/review/${quote.id}`)}
                              title="Editar"
                              aria-label="Editar cotação"
                              className="h-10 w-10 text-[#003366] hover:text-[#003366] hover:bg-blue-50"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => navigate(`/report?id=${quote.id}`)}
                              title="Visualizar PDF"
                              aria-label="Visualizar relatório PDF"
                              className="h-10 w-10 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                            >
                              <FileText className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => handleDuplicate(quote.id)}
                              title="Duplicar"
                              aria-label="Duplicar cotação"
                              className="h-10 w-10 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => setQuoteToDelete(quote.id)}
                              title="Deletar"
                              aria-label="Deletar cotação"
                              className="h-10 w-10 text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </div>

          {quotes.length > 0 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 bg-gray-50">
              <span className="text-sm text-gray-500">
                Mostrando {(page - 1) * limit + 1} a {Math.min(page * limit, total)} de{' '}
                <span className="font-medium text-gray-900">{total}</span> cotações
              </span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === 1 || loading}
                  onClick={() => setPage((p) => p - 1)}
                  className="bg-white"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" /> Anterior
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page * limit >= total || loading}
                  onClick={() => setPage((p) => p + 1)}
                  className="bg-white"
                >
                  Próxima <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      <AlertDialog open={!!quoteToDelete} onOpenChange={(open) => !open && setQuoteToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deletar Cotação?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. A cotação será permanentemente removida do seu
              histórico.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Deletar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
