import { useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth'
import { auth } from '@/api/firebase'
import { createUserProfile } from '@/services/firestore.service'
import type { SignUpRequest, LoginRequest } from '@/types'

export const useAuth = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // ─── SIGN UP ───
  const signUp = async ({ email, password, displayName }: SignUpRequest) => {
    setLoading(true)
    setError(null)
    try {
      // 1) أنشئ user في Firebase Auth
      const { user } = await createUserWithEmailAndPassword(auth, email, password)
      // 2) ضيّف الاسم
      await updateProfile(user, { displayName })
      // 3) أنشئ Firestore profile
      await createUserProfile({ uid: user.uid, email, displayName })
      return user
    } catch (err) {
      setError(getAuthErrorMessage(err))
      throw err
    } finally {
      setLoading(false)
    }
  }

  // ─── LOGIN ───
  const login = async ({ email, password }: LoginRequest) => {
    setLoading(true)
    setError(null)
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password)
      return user
    } catch (err) {
      setError(getAuthErrorMessage(err))
      throw err
    } finally {
      setLoading(false)
    }
  }

  // ─── LOGOUT ───
  const logout = () => signOut(auth)

  return { signUp, login, logout, loading, error }
}

// ترجمة أخطاء Firebase لرسائل ألمانية مفهومة
function getAuthErrorMessage(err: unknown): string {
  const code = (err as { code?: string })?.code
  switch (code) {
    case 'auth/email-already-in-use': return 'E-Mail bereits registriert'
    case 'auth/wrong-password': return 'Falsches Passwort'
    case 'auth/user-not-found': return 'Benutzer nicht gefunden'
    default: return 'Ein Fehler ist aufgetreten'
  }
}