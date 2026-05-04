import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Package2 } from 'lucide-react'
import { toast } from 'sonner'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

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
      toast.error('Erro na autenticação', {
        description: 'E-mail ou senha incorretos. Verifique suas credenciais.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <Card className="w-full max-w-md shadow-lg border-gray-100">
        <CardHeader className="text-center space-y-2 pb-6">
          <div className="flex justify-center mb-4">
            <div className="bg-primary p-3 rounded-xl text-primary-foreground shadow-sm">
              <Package2 className="w-8 h-8" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold font-heading text-[#003366]">
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
                  placeholder="seu.nome@brasporto.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-gray-50 h-12 border-gray-200 focus-visible:ring-[#FF6B35]"
                />
              </div>
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-gray-50 h-12 border-gray-200 focus-visible:ring-[#FF6B35]"
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full h-12 text-md font-medium bg-[#003366] hover:bg-[#003366]/90"
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
