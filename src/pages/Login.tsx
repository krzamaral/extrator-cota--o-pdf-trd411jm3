import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import logoImg from '@/assets/logo-brasporto-colorido-e159c.png'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn, user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (user) {
      navigate(location.state?.from?.pathname || '/', { replace: true })
    }
  }, [user, navigate, location])

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.endsWith('@brasporto.com')) {
      toast.error('Acesso restrito', {
        description: 'Apenas emails @brasporto.com são permitidos.',
      })
      return
    }

    setLoading(true)
    try {
      const { error } = await signIn(email, password)

      if (error) throw error

      toast.success('Login realizado com sucesso!')
      navigate(location.state?.from?.pathname || '/', { replace: true })
    } catch (error: any) {
      console.error('Auth error:', error)
      let errorMsg = 'E-mail ou senha incorretos. Verifique suas credenciais.'
      if (
        error.message?.toLowerCase().includes('network') ||
        error.message?.toLowerCase().includes('fetch')
      ) {
        errorMsg = 'Sem conexão. Tente novamente.'
      }
      toast.error('Erro na autenticação', {
        description: errorMsg,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <Card className="w-full max-w-md shadow-lg border-gray-100">
        <CardHeader className="text-center space-y-2 pb-6">
          <div className="flex flex-col items-center justify-center gap-4 mb-6">
            <img src={logoImg} alt="Brasporto Logo" className="h-20 w-auto object-contain" />
            <span className="font-bold text-2xl tracking-wider uppercase text-center">
              <span className="text-[#818285]">BRAS</span>
              <span className="text-[#3A879E]">PORTO</span>
              <span className="block text-[#818285] font-medium text-sm tracking-[0.2em] mt-1">
                LOGÍSTICA
              </span>
            </span>
          </div>
          <CardTitle className="text-xl font-medium font-heading text-gray-500">
            Portal Brasporto
          </CardTitle>
          <CardDescription>Acesse a plataforma de gestão de cotações</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAuth} className="space-y-5">
            <div className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="email"
                  aria-label="E-mail de acesso"
                  placeholder="seu.nome@brasporto.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-gray-50 min-h-[48px] border-gray-200 focus-visible:ring-[#FF6B35]"
                />
              </div>
              <div className="space-y-2">
                <Input
                  type="password"
                  aria-label="Senha de acesso"
                  placeholder="Sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-gray-50 min-h-[48px] border-gray-200 focus-visible:ring-[#FF6B35]"
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full h-12 text-md font-medium bg-[#3A879E] hover:bg-[#3A879E]/90 text-white"
              disabled={loading}
            >
              {loading ? 'Aguarde...' : 'Entrar'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
