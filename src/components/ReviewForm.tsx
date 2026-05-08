import { useNavigate } from 'react-router-dom'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { saveQuoteToDb } from '@/services/quote-service'
import * as z from 'zod'
import { QuoteData } from '@/types/quote'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { AlertTriangle, Plus, Trash2, Save, X, DollarSign, Calculator } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

const tariffSchema = z.object({
  name: z.string().min(1, 'Nome obrigatório'),
  value: z.coerce.number().min(0, 'Valor inválido'),
  currency: z.string().min(1, 'Moeda obrigatória'),
})

const reviewSchema = z
  .object({
    quoteNumber: z.string().min(1, 'Obrigatório'),
    modal: z.string().min(1, 'Obrigatório'),
    agent: z.string().min(1, 'Obrigatório'),
    origin: z.string().min(1, 'Obrigatório'),
    destination: z.string().min(1, 'Obrigatório'),
    incoterm: z.string().min(1, 'Obrigatório'),
    etd: z.string().min(1, 'Obrigatório'),
    eta: z.string().optional(),
    freeTime: z.coerce.number().min(0).default(0),
    tariffs: z.array(tariffSchema),
    weight: z.coerce.number().min(0).default(0),
    currency: z.string().min(1, 'Obrigatório'),
  })
  .superRefine((data, ctx) => {
    if (data.modal === 'Aéreo' && (!data.weight || data.weight <= 0)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Peso é obrigatório para frete Aéreo',
        path: ['weight'],
      })
    }
  })

type ReviewFormValues = z.infer<typeof reviewSchema>

interface ReviewFormProps {
  initialData: QuoteData
  onBack: () => void
}

export function ReviewForm({ initialData, onBack }: ReviewFormProps) {
  const navigate = useNavigate()
  const defaultCurrency = initialData.currency || 'USD'

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      quoteNumber: initialData.quoteNumber || `COT-${new Date().getFullYear()}-001`,
      modal: initialData.modal || 'FCL',
      agent: initialData.agent || '',
      origin: initialData.origin || '',
      destination: initialData.destination || '',
      incoterm: initialData.incoterm || 'CIF',
      etd: initialData.etd || '',
      eta: initialData.eta || '',
      freeTime: initialData.freeTime || 0,
      tariffs: (initialData.tariffs || []).map((t) => ({
        ...t,
        currency: t.currency || defaultCurrency,
      })),
      weight: initialData.weight || 0,
      currency: defaultCurrency,
    },
    mode: 'onChange',
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'tariffs',
  })

  const modal = form.watch('modal')
  const currency = form.watch('currency')
  const etd = form.watch('etd')
  const freeTime = form.watch('freeTime')
  const tariffs = form.watch('tariffs')

  const totalsByCurrency = tariffs.reduce(
    (acc, t) => {
      const curr = t.currency || 'USD'
      if (!acc[curr]) acc[curr] = 0

      let val = t.value
      if (typeof val === 'string') {
        const strVal = String(val).replace(/[^\d.,-]/g, '')
        const dotIndex = strVal.lastIndexOf('.')
        const commaIndex = strVal.lastIndexOf(',')
        if (commaIndex > dotIndex) {
          val = Number(strVal.replace(/\./g, '').replace(',', '.'))
        } else {
          val = Number(strVal.replace(/,/g, ''))
        }
      }

      acc[curr] += Number(val) || 0
      return acc
    },
    {} as Record<string, number>,
  )

  const totalsEntries = Object.entries(totalsByCurrency)

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const isEtdPast = etd ? new Date(etd) < today : false
  const isFreeTimeShort = freeTime < 7

  const onSubmit = async (data: ReviewFormValues) => {
    try {
      await saveQuoteToDb({ ...data, id: initialData.id, status: 'conferido' } as any)
      toast.success('Cotação salva com sucesso!', {
        description: 'Os dados foram validados e gravados no banco de dados.',
      })
      setTimeout(() => navigate('/scoring'), 1500)
    } catch (error: any) {
      toast.error('Erro ao salvar. Tente novamente.', {
        description: error.message || 'Ocorreu um erro inesperado.',
      })
    }
  }

  const handleDiscard = () => {
    toast.error('Cotação descartada', {
      description: 'Os dados não foram salvos.',
    })
    setTimeout(onBack, 500)
  }

  const formatCurrency = (val: number, cur: string) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: cur }).format(val)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="bg-gray-50/50 border-b pb-4">
            <CardTitle className="text-lg text-gray-900 font-heading">Dados Principais</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="quoteNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Nº da Cotação <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      aria-label="Número da Cotação"
                      className={cn('bg-gray-50 font-medium', !field.value && 'border-red-300')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="modal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Modal <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger
                        aria-label="Modal"
                        className={cn('min-h-[44px]', !field.value && 'border-red-300')}
                      >
                        <SelectValue placeholder="Selecione..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Aéreo">Aéreo</SelectItem>
                      <SelectItem value="FCL">FCL (Marítimo)</SelectItem>
                      <SelectItem value="LCL">LCL (Marítimo)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="agent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Agente <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      aria-label="Nome do Agente"
                      placeholder="Ex: DHL Global Forwarding"
                      className={cn(!field.value && 'border-red-300')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="origin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Origem <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Porto/Aeroporto"
                      className={cn(!field.value && 'border-red-300')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="destination"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Destino <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Porto/Aeroporto"
                      className={cn(!field.value && 'border-red-300')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="incoterm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Incoterm <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className={cn(!field.value && 'border-red-300')}>
                        <SelectValue placeholder="Selecione..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="EXW">EXW</SelectItem>
                      <SelectItem value="FOB">FOB</SelectItem>
                      <SelectItem value="CIF">CIF</SelectItem>
                      <SelectItem value="DDP">DDP</SelectItem>
                      <SelectItem value="DAP">DAP</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="etd"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    ETD <span className="text-red-500">*</span>
                    {isEtdPast && (
                      <span className="flex items-center text-yellow-600 text-[10px] font-medium bg-yellow-50 px-1.5 py-0.5 rounded border border-yellow-200 uppercase tracking-wide">
                        <AlertTriangle className="w-3 h-3 mr-1" /> Passado
                      </span>
                    )}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                      className={cn(
                        !field.value && 'border-red-300',
                        isEtdPast && 'border-yellow-400 focus-visible:ring-yellow-400',
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="eta"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ETA</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="freeTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    Free Time (Dias)
                    {isFreeTimeShort && freeTime > 0 && (
                      <span className="flex items-center text-yellow-600 text-[10px] font-medium bg-yellow-50 px-1.5 py-0.5 rounded border border-yellow-200 uppercase tracking-wide">
                        <AlertTriangle className="w-3 h-3 mr-1" /> Curto
                      </span>
                    )}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      {...field}
                      className={cn(
                        isFreeTimeShort &&
                          freeTime > 0 &&
                          'border-yellow-400 focus-visible:ring-yellow-400',
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Peso (kg) {modal === 'Aéreo' && <span className="text-red-500">*</span>}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      {...field}
                      className={cn(
                        modal === 'Aéreo' && (!field.value || field.value <= 0) && 'border-red-300',
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Moeda Padrão <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className={cn(!field.value && 'border-red-300')}>
                        <SelectValue placeholder="Selecione..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="USD">USD - Dólar</SelectItem>
                      <SelectItem value="EUR">EUR - Euro</SelectItem>
                      <SelectItem value="BRL">BRL - Real</SelectItem>
                      <SelectItem value="GBP">GBP - Libra</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm overflow-hidden">
          <CardHeader className="bg-gray-50/50 border-b pb-4 flex flex-row items-center justify-between">
            <CardTitle className="text-lg text-gray-900 font-heading flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-gray-500" /> Componentes Tarifários
            </CardTitle>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append({ name: '', value: 0, currency: currency || 'USD' })}
              className="text-primary border-primary/20 hover:bg-primary/5"
            >
              <Plus className="w-4 h-4 mr-1" /> Adicionar
            </Button>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            {fields.length === 0 ? (
              <div className="text-center py-8 text-gray-500 italic text-sm border border-dashed rounded-lg bg-gray-50">
                Nenhum componente tarifário adicionado.
              </div>
            ) : (
              <div className="space-y-3">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="flex flex-col sm:flex-row items-start gap-4 animate-fade-in-up"
                  >
                    <FormField
                      control={form.control}
                      name={`tariffs.${index}.name`}
                      render={({ field }) => (
                        <FormItem className="flex-1 w-full sm:w-auto">
                          <FormControl>
                            <Input placeholder="Nome da tarifa (Ex: Frete Base)" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex w-full sm:w-auto gap-3 items-start">
                      <FormField
                        control={form.control}
                        name={`tariffs.${index}.currency`}
                        render={({ field }) => (
                          <FormItem className="w-24 shrink-0">
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="USD">USD</SelectItem>
                                <SelectItem value="EUR">EUR</SelectItem>
                                <SelectItem value="BRL">BRL</SelectItem>
                                <SelectItem value="GBP">GBP</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`tariffs.${index}.value`}
                        render={({ field }) => (
                          <FormItem className="flex-1 sm:w-32">
                            <FormControl>
                              <Input type="number" step="0.01" className="font-medium" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="text-gray-400 hover:text-destructive hover:bg-destructive/10 shrink-0 mt-0.5"
                        onClick={() => remove(index)}
                      >
                        <X className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-8 bg-primary/5 border border-primary/10 rounded-lg p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-white shadow-sm border border-primary/10 rounded-full">
                  <Calculator className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-sm font-medium text-gray-600">Total por Moeda</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {totalsEntries.length === 0 ? (
                  <p className="text-gray-500 text-sm">Nenhum valor adicionado</p>
                ) : (
                  totalsEntries.map(([curr, val]) => (
                    <div
                      key={curr}
                      className="bg-white p-4 rounded-md border border-gray-100 shadow-sm"
                    >
                      <p className="text-xs text-gray-500 font-medium mb-1">{curr}</p>
                      <p className="text-xl font-bold text-gray-900">{formatCurrency(val, curr)}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col-reverse sm:flex-row items-center justify-between pt-2 pb-8 gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleDiscard}
            className="w-full sm:w-auto text-gray-500 hover:text-destructive hover:border-destructive hover:bg-destructive/5"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Descartar Cotação
          </Button>

          <div className="flex flex-col-reverse sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Button type="button" variant="ghost" onClick={onBack} className="w-full sm:w-auto">
              Voltar
            </Button>

            <div className="flex flex-col items-center sm:items-end w-full sm:w-auto">
              <Button
                type="submit"
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 min-w-[160px]"
                disabled={!form.formState.isValid || form.formState.isSubmitting}
              >
                <Save className="w-4 h-4 mr-2" />
                {form.formState.isSubmitting ? 'Salvando...' : 'Salvar e Avançar'}
              </Button>
              {!form.formState.isValid && (
                <span className="text-xs text-red-600 mt-2 font-medium bg-red-50 px-3 py-1.5 rounded-md border border-red-100 flex items-center">
                  <AlertTriangle className="w-3.5 h-3.5 mr-1.5" aria-hidden="true" />
                  Preencha os campos obrigatórios
                </span>
              )}
            </div>
          </div>
        </div>
      </form>
    </Form>
  )
}
