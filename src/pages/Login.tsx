import { useState } from 'react'
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
  const [isSignUp, setIsSignUp] = useState(false)
  const [loading, setLoading] = useState(false)
  const { signIn, signUp } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/'

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
      const { error } = isSignUp ? await signUp(email, password) : await signIn(email, password)

      if (error) throw error

      if (isSignUp) {
        toast.success('Conta criada!', { description: 'Verifique seu email ou faça login.' })
        setIsSignUp(false)
      } else {
        navigate(from, { replace: true })
      }
    } catch (error: any) {
      toast.error('Erro na autenticação', { description: error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <Card className="w-full max-w-md shadow-lg border-gray-200">
        <CardHeader className="text-center space-y-2 pb-6">
          <div className="flex justify-center mb-4">
            <div className="bg-primary p-3 rounded-xl text-primary-foreground shadow-sm">
              <Package2 className="w-8 h-8" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold font-heading">Portal Brasporto</CardTitle>
          <CardDescription>
            {isSignUp
              ? 'Crie sua conta de acesso corporativo'
              : 'Faça login para acessar o sistema'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAuth} className="space-y-5">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="seu.nome@brasporto.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-gray-50 h-12"
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-gray-50 h-12"
              />
            </div>
            <Button type="submit" className="w-full h-12 text-md font-medium" disabled={loading}>
              {loading ? 'Aguarde...' : isSignUp ? 'Criar Conta' : 'Entrar'}
            </Button>
            <div className="text-center mt-6">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-sm text-primary font-medium hover:underline"
              >
                {isSignUp ? 'Já tenho uma conta' : 'Criar nova conta'}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
