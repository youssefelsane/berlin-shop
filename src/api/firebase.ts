import { initializeApp } from 'firebase/app'
import { 
  getAuth, 
//   connectAuthEmulator 
} from 'firebase/auth'
import { 
  getFirestore, 
//   connectFirestoreEmulator 
} from 'firebase/firestore'

// Firebase config من .env
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Auth instance — بتستخدمه في كل الـ Authentication logic
export const auth = getAuth(app)

// Firestore instance — للـ data read/write
export const db = getFirestore(app)

// Development: Firebase Emulator (optional)
if (import.meta.env.VITE_APP_ENV === 'development') {
  // Emulator بتسمح بـ testing بدون الـ actual Firebase
  // connectAuthEmulator(auth, 'http://localhost:9099')
  // connectFirestoreEmulator(db, 'localhost', 8080)
}

export default app

