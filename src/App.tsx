import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { AuthProvider, useAuth } from './hooks/use-auth'
import { Loader2 } from 'lucide-react'

const Index = lazy(() => import('./pages/Index'))
const Review = lazy(() => import('./pages/Review'))
const Scoring = lazy(() => import('./pages/Scoring'))
const Report = lazy(() => import('./pages/Report'))
const History = lazy(() => import('./pages/History'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Layout = lazy(() => import('./components/Layout'))
const Login = lazy(() => import('./pages/Login'))

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50">
    <div className="flex flex-col items-center gap-4 animate-fade-in">
      <Loader2 className="w-12 h-12 animate-spin text-[#003366]" aria-hidden="true" />
      <p className="text-[#003366] font-medium font-heading">Carregando...</p>
    </div>
  </div>
)

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return null

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}

const App = () => (
  <BrowserRouter future={{ v7_startTransition: false, v7_relativeSplatPath: false }}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner position="top-right" richColors />
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route path="/" element={<Index />} />
              <Route path="/review/:id" element={<Review />} />
              <Route path="/scoring" element={<Scoring />} />
              <Route path="/report" element={<Report />} />
              <Route path="/history" element={<History />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </TooltipProvider>
    </AuthProvider>
  </BrowserRouter>
)

export default App
