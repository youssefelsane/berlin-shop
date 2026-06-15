import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

export default function RegisterPage() {
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [validationError, setValidationError] = useState('')
  const { signUp, loading, error } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async () => {
    // validation بسيط
    if (password.length < 6) {
      setValidationError('Passwort muss mindestens 6 Zeichen haben')
      return
    }
    setValidationError('')

    try {
      await signUp({ email, password, displayName })
      navigate('/', { replace: true })
    } catch {
      // error من الـ hook
    }
  }

  return (
    <div className="max-w-md mx-auto mt-12">
      <h1 className="text-2xl font-bold mb-6">Registrieren</h1>

      {(error || validationError) && (
        <p className="text-red-500 mb-4">{validationError || error}</p>
      )}

      <input placeholder="Name" value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        className="w-full border rounded p-2 mb-3 dark:bg-gray-800" />
      <input type="email" placeholder="E-Mail" value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border rounded p-2 mb-3 dark:bg-gray-800" />
      <input type="password" placeholder="Passwort" value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border rounded p-2 mb-4 dark:bg-gray-800" />

      <button onClick={handleSubmit} disabled={loading}
        className="w-full bg-primary-500 text-white py-2 rounded disabled:opacity-50">
        {loading ? 'Wird erstellt...' : 'Konto erstellen'}
      </button>

      <p className="mt-4 text-sm">
        Bereits ein Konto? <Link to="/login" className="text-primary-500">Anmelden</Link>
      </p>
    </div>
  )
}