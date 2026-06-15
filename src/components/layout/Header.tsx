import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, Sun, Moon } from 'lucide-react'
import { useAuthContext } from '@/context/AuthContext'
import { useAuth } from '@/hooks/useAuth'
import { useCart } from '@/hooks/useCart'
import { useUIStore } from '@/store/uiStore'

export default function Header() {
  const { user, isAuthenticated } = useAuthContext()
  const { logout } = useAuth()
  const { itemCount } = useCart(user?.uid ?? null)
  const theme = useUIStore((s) => s.theme)
  const toggleTheme = useUIStore((s) => s.toggleTheme)
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <header className="border-b dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-900 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">Berlin Shop</Link>

        <nav className="flex items-center gap-6">
          <Link to="/products">Produkte</Link>

          {/* Theme toggle */}
          <button onClick={toggleTheme} aria-label="Theme wechseln">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Cart مع badge */}
          <Link to="/cart" className="relative">
            <ShoppingCart size={22} />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>

          {/* Auth */}
          {isAuthenticated ? (
            <button onClick={handleLogout}>Abmelden</button>
          ) : (
            <Link to="/login">Anmelden</Link>
          )}
        </nav>
      </div>
    </header>
  )
}