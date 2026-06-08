// ═══════════════════════════════════════════════════════════════
// FORMAT PRICE — سعر مع الـ Euro symbol
// ═══════════════════════════════════════════════════════════════

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR'
  }).format(price)
}

// ═══════════════════════════════════════════════════════════════
// SANITIZE IMAGE URL — الـ Magic Function
// حل مشكلة الـ Platzi images اللي تجي بـ formats غريبة
// ═══════════════════════════════════════════════════════════════

export const sanitizeImageUrl = (
  raw: string | string[] | unknown,fallbackId?: number): string => {
  const fallback = `https://picsum.photos/seed/${fallbackId ?? 1}/300/300`

  try {
    // Step 1: إذا مصفوفة → خذ أول element
    let url = Array.isArray(raw) ? raw[0] : raw

    // Step 2: إذا مش string → error
    if (typeof url !== 'string') return fallback

    // Step 3: Unwrap nested JSON arrays مثل "[\"https://...\"]"
    while (url.startsWith('[') || url.startsWith('"')) {
      url = JSON.parse(url)
      if (Array.isArray(url)) url = url[0]
    }

    // Step 4: Validate الـ URL
    new URL(url as string)
    return url as string
  } catch {
    // أي error → استخدم الـ fallback
    return fallback
  }
}

// ═══════════════════════════════════════════════════════════════
// TRUNCATE TEXT — قص النص لـ characters معينة
// ═══════════════════════════════════════════════════════════════

export const truncateText = (
  text: string,
  maxLength: number = 100
): string => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

// ═══════════════════════════════════════════════════════════════
// CALCULATE CART TOTAL
// ═══════════════════════════════════════════════════════════════

import type { CartItem } from '@/types'

export const calculateCartTotal = (items: CartItem[]): number => {
  return items.reduce(
    (total, item) => total + (item.product.price * item.quantity),
    0
  )
}