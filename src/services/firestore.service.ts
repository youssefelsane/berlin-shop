import {
  doc, setDoc, getDoc, updateDoc,
  collection, addDoc, query, where,
  getDocs, onSnapshot, serverTimestamp,
  type Unsubscribe
} from 'firebase/firestore'
import { db } from '@/api/firebase'
import type { CartItem, Order, AppUser } from '@/types'
import { FIRESTORE_COLLECTIONS } from '@/utils/constants'

// ═══════════════════════════════════════════════════════════════
// CART — subscribeToCart بترجع listener real-time
// ═══════════════════════════════════════════════════════════════

export const subscribeToCart = (
  userId: string,
  callback: (items: CartItem[]) => void
): Unsubscribe => {
  const cartRef = doc(db, FIRESTORE_COLLECTIONS.carts, userId)

  // onSnapshot = يستمع لأي تغيير ويستدعي الـ callback فوراً
  return onSnapshot(cartRef, (snapshot) => {
    const data = snapshot.data()
    callback(data?.items ?? [])
  })
}

// تحديث السلة كاملة (للـ optimistic update)
export const updateCart = async (
  userId: string,
  items: CartItem[]
): Promise<void> => {
  const cartRef = doc(db, FIRESTORE_COLLECTIONS.carts, userId)
  await setDoc(cartRef, {
    items,
    updatedAt: serverTimestamp()
  }, { merge: true })
}

// ═══════════════════════════════════════════════════════════════
// USER PROFILE — يتنشئ عند Sign Up
// ═══════════════════════════════════════════════════════════════

export const createUserProfile = async (
  user: Partial<AppUser> & { uid: string }
): Promise<void> => {
  const userRef = doc(db, FIRESTORE_COLLECTIONS.users, user.uid)
  await setDoc(userRef, {
    email: user.email,
    displayName: user.displayName ?? null,
    role: 'user', // كل user جديد role: user
    createdAt: serverTimestamp()
  })
}

export const getUserProfile = async (
  uid: string
): Promise<AppUser | null> => {
  const userRef = doc(db, FIRESTORE_COLLECTIONS.users, uid)
  const snapshot = await getDoc(userRef)
  return snapshot.exists() ? (snapshot.data() as AppUser) : null
}

// ═══════════════════════════════════════════════════════════════
// ORDERS — إنشاء طلب عند checkout
// ═══════════════════════════════════════════════════════════════

export const createOrder = async (
  order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>
): Promise<string> => {
  const ordersRef = collection(db, FIRESTORE_COLLECTIONS.orders)
  const docRef = await addDoc(ordersRef, {
    ...order,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  })
  return docRef.id
}

export const getUserOrders = async (
  userId: string
): Promise<Order[]> => {
  const ordersRef = collection(db, FIRESTORE_COLLECTIONS.orders)
  const q = query(ordersRef, where('userId', '==', userId))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }) as Order)
}