import { useState, useEffect } from 'react'
import { subscribeToCart, updateCart } from '@/services/firestore.service'
import type  { CartItem, Product } from '@/types'
import { calculateCartTotal } from '@/utils/helpers'

export const useCart = (userId: string | null) => {
  // الـ state الحقيقي من Firestore
  const [items, setItems] = useState<CartItem[]>([])
  // الـ optimistic state (UI بيعرض ده)
  const [optimisticItems, setOptimisticItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)

  // ═══ REAL-TIME LISTENER ═══
  useEffect(() => {
    if (!userId) {
      setItems([])
      setOptimisticItems([])
      setLoading(false)
      return
    }

    // اشترك في تغييرات Firestore
    const unsubscribe = subscribeToCart(userId, (newItems) => {
      setItems(newItems)
      setOptimisticItems(newItems) // زامن الـ optimistic مع الحقيقي
      setLoading(false)
    })

    // ⚠️ مهم جداً: unsubscribe عند الـ cleanup
    return () => unsubscribe()
  }, [userId])

  // ═══ ADD ITEM (optimistic) ═══
  const addItem = async (product: Product) => {
    if (!userId) return

    const existing = optimisticItems.find(
      (i) => i.productId === product.id
    )

    const newItems = existing
      ? optimisticItems.map((i) =>
          i.productId === product.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      : [...optimisticItems, {
          productId: product.id,
          product,
          quantity: 1,
          addedAt: new Date()
        }]

    // ① حدّث الـ UI فوراً
    setOptimisticItems(newItems)

    try {
      // ② اكتب في Firestore
      await updateCart(userId, newItems)
    } catch {
      // ③ لو فشل → ارجع للحالة الأخيرة الصحيحة
      setOptimisticItems(items)
    }
  }

  // ═══ REMOVE ITEM ═══
  const removeItem = async (productId: number) => {
    if (!userId) return
    const newItems = optimisticItems.filter(
      (i) => i.productId !== productId
    )
    setOptimisticItems(newItems)
    try {
      await updateCart(userId, newItems)
    } catch {
      setOptimisticItems(items)
    }
  }

  return {
    items: optimisticItems, // الـ UI يعرض الـ optimistic
    total: calculateCartTotal(optimisticItems),
    itemCount: optimisticItems.length,
    loading,
    addItem,
    removeItem
  }
}
