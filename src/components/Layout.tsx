import { Outlet, useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import logoImg from '@/assets/logo-brasporto-colorido-e159c.png'

export default function Layout() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await signOut()
    navigate('/login')
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-md shadow-sm">
            <img src={logoImg} alt="Brasporto Logo" className="h-8 w-auto object-contain" />
            <span className="font-bold text-lg hidden sm:inline-block uppercase tracking-wider">
              <span className="text-[#818285]">BRAS</span>
              <span className="text-[#3A879E]">PORTO</span>{' '}
              <span className="text-[#818285] font-medium text-xs tracking-widest ml-2">
                LOGÍSTICA
              </span>
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm font-medium opacity-90">
            <span className="hidden md:inline-block text-xs bg-white/20 px-2 py-1 rounded-md">
              {user?.email}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="hover:bg-primary-foreground/10 text-white"
              title="Sair"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 max-w-5xl">
        <Outlet />
      </main>

      <footer className="bg-white border-t py-6 mt-auto">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} Brasporto International Logistics. Todos os direitos
            reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}
