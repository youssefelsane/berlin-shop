import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, loading, error } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // الصفحة اللي كان المستخدم رايحها (أو الرئيسية)
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname ?? '/'

  const handleSubmit = async () => {
    try {
      await login({ email, password })
      navigate(from, { replace: true })
    } catch {
      // الـ error بيتعرض من الـ hook
    }
  }

  return (
    <div className="max-w-md mx-auto mt-12">
      <h1 className="text-2xl font-bold mb-6">Anmelden</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <input
        type="email"
        placeholder="E-Mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border rounded p-2 mb-3 dark:bg-gray-800"
      />
      <input
        type="password"
        placeholder="Passwort"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border rounded p-2 mb-4 dark:bg-gray-800"
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-primary-500 text-white py-2 rounded disabled:opacity-50"
      >
        {loading ? 'Wird angemeldet...' : 'Anmelden'}
      </button>

      <p className="mt-4 text-sm">
        Noch kein Konto? <Link to="/register" className="text-primary-500">Registrieren</Link>
      </p>
    </div>
  )
}