import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ScoredQuote } from '@/types/scoring'
import { ArrowLeft, Check, Download, Mail } from 'lucide-react'
import { toast } from 'sonner'
import { format } from 'date-fns'

const MOCK_SCORED_QUOTES: ScoredQuote[] = [
  {
    id: '3',
    agent: 'DSV',
    modal: 'FCL',
    origin: 'Santos, BR',
    destination: 'Miami, US',
    cost: 3200,
    transitTime: 24,
    etd: '2026-05-12',
    freeTime: 21,
    tariffs: [
      { name: 'Frete FCL', value: 2800 },
      { name: 'Despacho', value: 400 },
    ],
    scores: { cost: 9.2, transitTime: 8.1, etd: 10, freeTime: 7.0, final: 8.9 },
    justification: [
      'Melhor custo-benefício.',
      'Menor tempo de trânsito (24 dias) e free time generoso (21 dias).',
    ],
  },
  {
    id: '1',
    agent: 'DHL Global Forwarding',
    modal: 'Aéreo',
    origin: 'Guarulhos, BR',
    destination: 'Frankfurt, DE',
    cost: 3600,
    transitTime: 26,
    etd: '2026-05-15',
    freeTime: 14,
    tariffs: [
      { name: 'Frete Base', value: 3000 },
      { name: 'Taxas', value: 600 },
    ],
    scores: { cost: 8.5, transitTime: 7.2, etd: 10, freeTime: 4.7, final: 8.2 },
    justification: [
      'Custo intermediário: R$ 3.600,00.',
      'Tempo de trânsito aceitável: 26 dias.',
      'Data de saída dentro da janela.',
    ],
  },
  {
    id: '2',
    agent: 'Kuehne+Nagel',
    modal: 'LCL',
    origin: 'Santos, BR',
    destination: 'Hamburgo, DE',
    cost: 4200,
    transitTime: 28,
    etd: '2026-05-20',
    freeTime: 7,
    tariffs: [
      { name: 'Frete Marítimo', value: 3800 },
      { name: 'THC', value: 400 },
    ],
    scores: { cost: 7.0, transitTime: 6.5, etd: 5.0, freeTime: 2.3, final: 6.3 },
    justification: [
      'Custo mais elevado: R$ 4.200,00.',
      'Maior tempo de trânsito: 28 dias.',
      'Pouco free time: 7 dias.',
    ],
  },
]

const steps = [
  { label: 'Solicitação', status: 'done' },
  { label: 'Conferência Técnica', status: 'done' },
  { label: 'Cotações', status: 'done' },
  { label: 'Validação', status: 'done' },
  { label: 'Decisão', status: 'active' },
]

function formatDateSafe(dateString: string) {
  if (!dateString) return ''
  return dateString.split('-').reverse().join('/')
}

function formatDateShort(dateString: string) {
  if (!dateString) return ''
  return dateString.split('-').slice(1).reverse().join('/')
}

export default function Report() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const quotes = MOCK_SCORED_QUOTES
  const bestQuote = quotes[0]

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
      toast.success('Relatório gerado com sucesso')
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  const handlePrint = () => {
    const prevTitle = document.title
    document.title = `COT-20260515-01-${format(new Date(), 'yyyyMMdd')}`
    window.print()
    document.title = prevTitle
  }

  const handleEmail = () => {
    toast.info('Funcionalidade de e-mail será integrada em breve.')
  }

  return (
    <div className="max-w-5xl mx-auto pb-16 animate-fade-in print-hide-container">
      <style>{`
        @media print {
          @page { size: A4; margin: 10mm; }
          body { background: white; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          header, nav, aside, .print-hide { display: none !important; }
          .print-content { 
            position: absolute; 
            left: 0; 
            top: 0; 
            margin: 0 !important; 
            padding: 0 !important; 
            width: 100% !important; 
            box-shadow: none !important;
          }
          .print-hide-container { max-width: 100% !important; padding: 0 !important; }
        }
      `}</style>

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 print-hide px-4 sm:px-0">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500 font-medium mb-2">
            <span
              className="cursor-pointer hover:text-gray-900 transition-colors"
              onClick={() => navigate('/')}
            >
              Cotações
            </span>
            <span>/</span>
            <span
              className="cursor-pointer hover:text-gray-900 transition-colors"
              onClick={() => navigate('/scoring')}
            >
              Scoring
            </span>
            <span>/</span>
            <span className="text-[#003366] font-semibold">Relatório</span>
          </div>
          <h1 className="text-3xl font-heading font-bold text-[#003366]">
            Exportação do Relatório
          </h1>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleEmail}
            className="text-gray-600 hover:bg-gray-100"
          >
            <Mail className="w-4 h-4 mr-2" /> Enviar por Email
          </Button>
          <Button
            onClick={handlePrint}
            className="bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white shadow-sm border-0"
          >
            <Download className="w-4 h-4 mr-2" /> Baixar PDF
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="w-full max-w-[210mm] min-h-[297mm] mx-auto bg-white p-12 shadow-lg animate-pulse flex flex-col gap-8 rounded-md print-hide">
          <div className="flex justify-between items-start">
            <div className="h-16 w-32 bg-gray-200 rounded"></div>
            <div className="h-12 w-64 bg-gray-200 rounded"></div>
          </div>
          <div className="h-10 bg-gray-200 rounded w-full"></div>
          <div className="h-40 bg-gray-200 rounded w-full"></div>
          <div className="h-40 bg-gray-200 rounded w-full"></div>
          <div className="h-40 bg-gray-200 rounded w-full"></div>
        </div>
      ) : (
        <div className="w-full max-w-[210mm] min-h-[297mm] mx-auto bg-white p-8 sm:p-10 shadow-lg print-content font-sans text-gray-800 rounded-md relative">
          <header className="flex justify-between items-start mb-8 border-b-2 border-[#003366] pb-6">
            <div className="flex flex-col items-start">
              <div className="h-[80px] w-[200px] bg-gray-50 flex items-center justify-center border border-dashed border-gray-200 mb-2">
                {/* Placeholder as requested for "Logo Brasporto PNG 120px" but adapted for aesthetics */}
                <img
                  src="https://img.usecurling.com/i?q=logistics+maritime&shape=fill&color=solid-black"
                  alt="Brasporto Logo"
                  className="h-[60px] object-contain opacity-80"
                />
              </div>
              <span className="text-[#003366] font-bold text-xl tracking-tight">BRASPORTO</span>
            </div>
            <div className="text-right mt-2">
              <h1
                className="text-xl font-bold text-[#003366] tracking-tight"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                COMPARAÇÃO DE FRETES INTERNACIONAIS
              </h1>
              <p className="text-sm text-gray-600 font-medium mt-1">
                Análise de Cotações e Recomendação de Modal
              </p>
              <p className="text-xs text-gray-400 mt-2 font-mono">
                Emissão: {format(new Date(), 'dd/MM/yyyy')} | Ref: COT-20260515-01
              </p>
            </div>
          </header>

          <div className="flex items-center w-full mb-10 px-2 sm:px-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}
              >
                <div
                  className={`flex items-center justify-center shrink-0 w-6 h-6 rounded-full text-xs font-bold
                  ${
                    step.status === 'done'
                      ? 'bg-[#10B981] text-white'
                      : step.status === 'active'
                        ? 'bg-[#FF6B35] text-white'
                        : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step.status === 'done' ? <Check className="w-4 h-4" /> : index + 1}
                </div>
                <span
                  className={`ml-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider whitespace-nowrap ${step.status === 'active' ? 'text-[#FF6B35]' : 'text-gray-500'}`}
                >
                  {step.label}
                </span>
                {index < steps.length - 1 && (
                  <div
                    className={`h-0.5 flex-1 mx-2 sm:mx-4 ${step.status === 'done' ? 'bg-[#10B981]' : 'bg-gray-200'}`}
                  />
                )}
              </div>
            ))}
          </div>

          <section className="mb-10">
            <h2
              className="text-sm font-bold text-[#003366] mb-4 border-l-4 border-[#FF6B35] pl-3 uppercase tracking-wider"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Resumo Executivo
            </h2>
            <div className="grid grid-cols-3 gap-y-6 gap-x-4 bg-gray-50/80 p-5 rounded-lg border border-gray-200">
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">
                  Rota
                </p>
                <p className="text-sm font-semibold text-gray-900">
                  {bestQuote.origin} → {bestQuote.destination}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">
                  Incoterm
                </p>
                <p className="text-sm font-semibold text-gray-900">CIF</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">
                  Data de Saída (ETD)
                </p>
                <p className="text-sm font-semibold text-gray-900">
                  {formatDateSafe(bestQuote.etd)}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">
                  Modal Recomendado
                </p>
                <p className="text-sm font-bold text-[#10B981] bg-[#10B981]/10 inline-block px-2 py-0.5 rounded">
                  {bestQuote.modal}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">
                  Agente Recomendado
                </p>
                <p className="text-sm font-semibold text-gray-900">{bestQuote.agent}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">
                  Valor Total
                </p>
                <p className="text-sm font-bold text-gray-900">
                  R$ {bestQuote.cost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </section>

          <section className="mb-10">
            <h2
              className="text-sm font-bold text-[#003366] mb-4 border-l-4 border-[#FF6B35] pl-3 uppercase tracking-wider"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Conformidade: Cliente × Requisitos
            </h2>
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-100/80 text-[#003366]">
                    <th className="p-3 text-left font-semibold text-xs uppercase tracking-wider">
                      Requisito
                    </th>
                    <th className="p-3 text-left font-semibold text-xs uppercase tracking-wider w-36">
                      Status
                    </th>
                    <th className="p-3 text-left font-semibold text-xs uppercase tracking-wider">
                      Observação
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="bg-white">
                    <td className="p-3 font-medium text-gray-900">Data de Saída</td>
                    <td className="p-3 text-[#10B981] font-bold flex items-center gap-1.5">
                      <Check className="w-4 h-4" /> Atendido
                    </td>
                    <td className="p-3 text-gray-600">Dentro da janela estabelecida</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-3 font-medium text-gray-900">Free Time</td>
                    <td className="p-3 text-[#10B981] font-bold flex items-center gap-1.5">
                      <Check className="w-4 h-4" /> Atendido
                    </td>
                    <td className="p-3 text-gray-600">14 dias solicitados, 21 dias oferecidos</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-3 font-medium text-gray-900">Peso/Volume</td>
                    <td className="p-3 text-[#10B981] font-bold flex items-center gap-1.5">
                      <Check className="w-4 h-4" /> Atendido
                    </td>
                    <td className="p-3 text-gray-600">18.000 kg capacidade suportada</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-3 font-medium text-gray-900">Incoterm</td>
                    <td className="p-3 text-[#10B981] font-bold flex items-center gap-1.5">
                      <Check className="w-4 h-4" /> Atendido
                    </td>
                    <td className="p-3 text-gray-600">CIF garantido pelo fornecedor</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-10 print:break-inside-avoid">
            <h2
              className="text-sm font-bold text-[#003366] mb-4 border-l-4 border-[#FF6B35] pl-3 uppercase tracking-wider"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Ranking Top 3
            </h2>
            <div className="space-y-4">
              {quotes.map((quote, idx) => (
                <div
                  key={quote.id}
                  className="border border-gray-200 rounded-lg p-5 flex gap-5 bg-white relative overflow-hidden shadow-sm"
                >
                  {idx === 0 && <div className="absolute top-0 left-0 w-1.5 h-full bg-[#10B981]" />}
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-50 flex items-center justify-center rounded-lg border border-gray-200 font-black text-[#003366] text-xl shadow-inner">
                    {idx + 1}º
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                          {quote.agent}
                          <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-bold uppercase tracking-wider border border-gray-200">
                            {quote.modal}
                          </span>
                        </h3>
                        <p className="text-xs text-gray-600 mt-1 font-medium italic">
                          "{quote.justification.join(' ')}"
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="inline-flex flex-col items-end">
                          <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">
                            Nota Final
                          </span>
                          <span
                            className={`text-lg font-black ${quote.scores.final >= 9 ? 'text-[#10B981]' : quote.scores.final >= 7 ? 'text-[#F59E0B]' : 'text-[#EF4444]'}`}
                          >
                            {quote.scores.final.toFixed(1)}
                          </span>
                        </div>
                        <p className="text-base font-bold text-gray-900 mt-1 tracking-tight">
                          R$ {quote.cost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 mb-2 mt-3">
                      <div
                        className={`h-2 rounded-full ${quote.scores.final >= 9 ? 'bg-[#10B981]' : quote.scores.final >= 7 ? 'bg-[#F59E0B]' : 'bg-[#EF4444]'}`}
                        style={{ width: `${quote.scores.final * 10}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-6 print:break-inside-avoid">
            <h2
              className="text-sm font-bold text-[#003366] mb-4 border-l-4 border-[#FF6B35] pl-3 uppercase tracking-wider"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Análise Detalhada Comparativa
            </h2>
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-gray-100/80 text-[#003366]">
                    <th className="p-3 text-left font-bold uppercase tracking-wider">Agente</th>
                    <th className="p-3 text-center font-bold uppercase tracking-wider">Modal</th>
                    <th className="p-3 text-right font-bold uppercase tracking-wider">Custo</th>
                    <th className="p-3 text-center font-bold uppercase tracking-wider">Tempo</th>
                    <th className="p-3 text-center font-bold uppercase tracking-wider">ETD</th>
                    <th className="p-3 text-center font-bold uppercase tracking-wider">
                      Free Time
                    </th>
                    <th className="p-3 text-center font-bold uppercase tracking-wider">Nota</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {quotes.map((quote) => (
                    <tr key={quote.id} className="bg-white">
                      <td className="p-3 font-semibold text-gray-900">{quote.agent}</td>
                      <td className="p-3 text-center text-gray-600 font-medium">{quote.modal}</td>
                      <td className="p-3 text-right font-bold text-gray-900">
                        R$ {quote.cost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="p-3 text-center text-gray-600">{quote.transitTime} d</td>
                      <td className="p-3 text-center text-gray-600">
                        {formatDateShort(quote.etd)}
                      </td>
                      <td className="p-3 text-center text-gray-600">{quote.freeTime} d</td>
                      <td className="p-3 text-center font-black text-[#003366] text-sm">
                        {quote.scores.final.toFixed(1)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <footer className="mt-8 pt-6 border-t-2 border-gray-100 text-center text-xs text-gray-400 print:absolute print:bottom-8 print:w-[calc(100%-80px)] print:mt-0 print:border-t">
            <div className="flex justify-between items-center px-4">
              <div className="text-left">
                <p className="font-bold text-[#003366]">
                  Brasporto Logística e Assessoria Aduaneira
                </p>
                <p className="text-gray-500 mt-0.5">www.brasporto.com.br</p>
              </div>
              <div className="text-right">
                <p>Relatório gerado automaticamente em</p>
                <p className="font-mono text-gray-500 mt-0.5">
                  {format(new Date(), 'dd/MM/yyyy HH:mm')}
                </p>
              </div>
            </div>
          </footer>
        </div>
      )}
    </div>
  )
}
