import { Outlet, useNavigate } from 'react-router-dom'
import { Package2, LogOut } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'

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
          <div className="flex items-center gap-2">
            {/* Logo placeholder icon aligned with Brasporto brand */}
            <div className="bg-white p-1.5 rounded-md text-primary">
              <Package2 className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-xl leading-none tracking-tight">
                BRASPORTO
              </span>
              <span className="text-[10px] tracking-widest uppercase opacity-80 mt-0.5">
                International Logistics
              </span>
            </div>
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
