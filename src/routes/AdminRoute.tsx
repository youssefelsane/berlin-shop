import { Navigate, Outlet } from 'react-router-dom'
import { useAuthContext } from '@/context/AuthContext'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

export default function AdminRoute() {
  const { isAuthenticated, isAdmin, loading } = useAuthContext()

  if (loading) return <LoadingSpinner />

  // مش logged in → login
  if (!isAuthenticated) return <Navigate to="/login" replace />

  // logged in بس مش admin → الصفحة الرئيسية
  if (!isAdmin) return <Navigate to="/" replace />

  return <Outlet />
}