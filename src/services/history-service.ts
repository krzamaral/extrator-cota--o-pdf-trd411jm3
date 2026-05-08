import { supabase } from '@/lib/supabase/client'

export interface QuoteFilters {
  modal?: string
  status?: string
  dateRange?: string
  agent?: string
  search?: string
  page: number
  limit: number
}

export const getHistory = async (filters: QuoteFilters) => {
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (!session?.user) throw new Error('Usuário não autenticado')

  let query = supabase
    .from('cotacoes')
    .select('*, scoring(nota_final)', { count: 'exact' })
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false })

  if (filters.modal && filters.modal !== 'all') {
    query = query.eq('modal', filters.modal)
  }
  if (filters.status && filters.status !== 'all') {
    query = query.eq('status', filters.status)
  }
  if (filters.agent && filters.agent !== 'all') {
    query = query.eq('agente', filters.agent)
  }
  if (filters.search) {
    query = query.or(`numero_cotacao.ilike.%${filters.search}%,agente.ilike.%${filters.search}%`)
  }
  if (filters.dateRange && filters.dateRange !== 'all') {
    const days = parseInt(filters.dateRange)
    const date = new Date()
    date.setDate(date.getDate() - days)
    query = query.gte('created_at', date.toISOString())
  }

  const from = (filters.page - 1) * filters.limit
  const to = from + filters.limit - 1
  query = query.range(from, to)

  const { data, error, count } = await query

  if (error) throw error
  return { data, count }
}

export const getAgents = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (!session?.user) return []

  const { data, error } = await supabase
    .from('cotacoes')
    .select('agente')
    .eq('user_id', session.user.id)

  if (error) throw error

  const agents = Array.from(new Set(data.map((d) => d.agente).filter(Boolean)))
  return agents.sort()
}

export const duplicateQuote = async (quoteId: string) => {
  const { data: quote, error: fetchError } = await supabase
    .from('cotacoes')
    .select('*')
    .eq('id', quoteId)
    .single()

  if (fetchError) throw fetchError

  const { id, created_at, updated_at, numero_cotacao, ...rest } = quote

  const { data, error } = await supabase
    .from('cotacoes')
    .insert({
      ...rest,
      numero_cotacao: `${numero_cotacao}-COPY-${Math.floor(Math.random() * 1000)}`,
      status: 'rascunho',
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export const deleteQuote = async (quoteId: string) => {
  const { error } = await supabase.from('cotacoes').delete().eq('id', quoteId)

  if (error) throw error
}
