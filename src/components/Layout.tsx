import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom'
import { LogOut, Menu, User, Upload, History as HistoryIcon, Shield } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import logoImg from '@/assets/logo-brasporto-colorido-e159c.png'
import { cn } from '@/lib/utils'

export default function Layout() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = async () => {
    try {
      await signOut()
      navigate('/login')
    } catch (e) {
      console.error(e)
    }
  }

  const navLinks = [
    { name: 'Nova Extração', path: '/', icon: Upload },
    { name: 'Histórico', path: '/history', icon: HistoryIcon },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-md shadow-sm hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
              aria-label="Ir para a página inicial"
            >
              <img src={logoImg} alt="Brasporto Logo" className="h-8 w-auto object-contain" />
              <span className="font-bold text-lg hidden sm:inline-block uppercase tracking-wider text-primary">
                <span className="text-[#818285]">BRAS</span>
                <span className="text-[#3A879E]">PORTO</span>
              </span>
            </Link>

            <nav
              className="hidden md:flex items-center gap-4 text-sm font-medium"
              aria-label="Navegação Principal"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    'px-3 py-2 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white',
                    location.pathname === link.path
                      ? 'bg-white/20 text-white font-semibold'
                      : 'text-white/80 hover:text-white hover:bg-white/10',
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-4 text-sm font-medium opacity-90">
              <span className="text-xs bg-white/20 px-3 py-1.5 rounded-md flex items-center gap-2">
                <User className="w-4 h-4" aria-hidden="true" />
                {user?.email}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="hover:bg-primary-foreground/10 text-white min-h-[44px] min-w-[44px]"
                aria-label="Sair do sistema"
                title="Sair"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden text-white hover:bg-white/10 min-h-[44px] min-w-[44px]"
                  aria-label="Abrir menu"
                >
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] bg-primary text-white border-l-primary/20"
              >
                <SheetTitle className="sr-only">Menu de Navegação</SheetTitle>
                <div className="flex flex-col gap-6 pt-8">
                  <div className="flex items-center gap-3 bg-white px-3 py-2 rounded-md">
                    <img src={logoImg} alt="Brasporto Logo" className="h-8 w-auto object-contain" />
                  </div>
                  <div className="text-xs bg-white/10 px-3 py-2 rounded-md break-all flex items-center gap-2">
                    <User className="w-4 h-4 shrink-0" />
                    {user?.email}
                  </div>
                  <nav className="flex flex-col gap-2" aria-label="Menu Mobile">
                    {navLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        className={cn(
                          'flex items-center gap-3 px-4 py-3 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white',
                          location.pathname === link.path
                            ? 'bg-white/20 font-bold text-white'
                            : 'text-white/80 hover:bg-white/10 hover:text-white',
                        )}
                      >
                        <link.icon className="w-5 h-5" aria-hidden="true" />
                        {link.name}
                      </Link>
                    ))}
                  </nav>
                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="justify-start px-4 py-3 text-white/80 hover:bg-white/10 hover:text-white mt-auto text-left min-h-[44px]"
                  >
                    <LogOut className="w-5 h-5 mr-3" aria-hidden="true" />
                    Sair
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 max-w-5xl animate-fade-in relative z-0">
        <Outlet />
      </main>

      <footer className="bg-[#003366] text-white py-8 mt-auto">
        <div className="container mx-auto px-4 max-w-5xl flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-300">
          <div className="flex gap-6">
            <a
              href="#"
              className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded px-1 min-h-[44px] flex items-center"
            >
              Sobre
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded px-1 min-h-[44px] flex items-center"
            >
              Contato
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded px-1 min-h-[44px] flex items-center"
            >
              Privacidade
            </a>
          </div>
          <p className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-secondary" />© {new Date().getFullYear()} Brasporto
            Logística. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}
