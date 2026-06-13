import {
  createContext, useContext, useEffect, useState,
  type ReactNode
} from 'react'
import { onAuthStateChanged, type User } from 'firebase/auth'
import { auth } from '@/api/firebase'
import { getUserProfile } from '@/services/firestore.service'
import type { AppUser } from '@/types'

interface AuthContextValue {
  user: User | null          // Firebase user
  profile: AppUser | null    // Firestore profile (فيه الـ role)
  isAuthenticated: boolean
  isAdmin: boolean
  loading: boolean
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<AppUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // يستمع لتغيّر الحالة — مرة واحدة في حياة التطبيق
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser)

      if (firebaseUser) {
        // جيب الـ profile من Firestore (فيه الـ role)
        const userProfile = await getUserProfile(firebaseUser.uid)
        setProfile(userProfile)
      } else {
        setProfile(null)
      }

      setLoading(false)
    })

    // cleanup — مهم
    return () => unsubscribe()
  }, [])

  const value: AuthContextValue = {
    user,
    profile,
    isAuthenticated: !!user,
    isAdmin: profile?.role === 'admin',
    loading
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Custom hook — أسهل من useContext في كل مكان
export const useAuthContext = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuthContext must be used within AuthProvider')
  return ctx
}