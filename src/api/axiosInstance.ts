import axios from 'axios'
import { auth } from './firebase'
import { API_BASE_URL } from '@/utils/constants'

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// ═══════════════════════════════════════════════════════════════
// REQUEST INTERCEPTOR — Firebase Token Injection
// ═══════════════════════════════════════════════════════════════

api.interceptors.request.use(
  async (config) => {
    // الـ Firebase user الحالي (null لو مش logged in)
    const currentUser = auth.currentUser
    
    // لو في user → اطلب الـ ID Token
    if (currentUser) {
      try {
        const token = await currentUser.getIdToken()
        // ضيّف في الـ header
        config.headers.Authorization = `Bearer ${token}`
      } catch (error) {
        console.error('Token error:', error)
      }
    }
    
    return config
  },
  (error) => Promise.reject(error)
)

// ═══════════════════════════════════════════════════════════════
// RESPONSE INTERCEPTOR — Error Handling
// ═══════════════════════════════════════════════════════════════

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Token انتهت أو مش valid → روح للـ Login
    if (error.response?.status === 401) {
      // لاحقاً في الـ Part 2، هنضيف: navigate('/login')
      console.warn('Unauthorized: redirecting to login')
    }
    return Promise.reject(error)
  }
)

export default api