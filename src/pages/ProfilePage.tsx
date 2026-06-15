import { useAuthContext } from '@/context/AuthContext'

export default function ProfilePage() {
  const { user, profile } = useAuthContext()

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Mein Profil</h1>

      <div className="space-y-3">
        <p><strong>Name:</strong> {user?.displayName ?? '—'}</p>
        <p><strong>E-Mail:</strong> {user?.email}</p>
        <p><strong>Rolle:</strong> {profile?.role}</p>
      </div>
    </div>
  )
}