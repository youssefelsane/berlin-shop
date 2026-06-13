import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthContext } from '@/context/AuthContext'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

export default function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuthContext()
  const location = useLocation()

  // لسه بنتأكد من الحالة → استنى
  if (loading) return <LoadingSpinner />

  // مش logged in → روح للـ login (مع حفظ الصفحة المطلوبة)
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // logged in → اعرض الصفحة المطلوبة
  return <Outlet />
}