// ═══════════════════════════════════════════════════════════════
// API ENDPOINTS
// ═══════════════════════════════════════════════════════════════

export const API_BASE_URL = import.meta.env.VITE_PLATZI_API_BASE_URL
  ?? 'https://api.escuelajs.co/api/v1'

export const API_ENDPOINTS = {
  products: '/products',
  product: (id: number) => `/products/${id}`,
  categories: '/categories',
  category: (id: number) => `/categories/${id}`
} as const

// ═══════════════════════════════════════════════════════════════
// TANSTACK QUERY KEYS
// ═══════════════════════════════════════════════════════════════

export const QUERY_KEYS = {
  products: {
    all: ['products'] as const,
    list: (limit?: number, offset?: number) =>
      ['products', { limit, offset }] as const,
    detail: (id: number) => ['products', id] as const
  },
  categories: {
    all: ['categories'] as const,
    detail: (id: number) => ['categories', id] as const
  }
} as const

// ═══════════════════════════════════════════════════════════════
// FIRESTORE COLLECTIONS
// ═══════════════════════════════════════════════════════════════

export const FIRESTORE_COLLECTIONS = {
  users: 'users',
  carts: 'carts',
  orders: 'orders',
  admin: 'admin'
} as const

// ═══════════════════════════════════════════════════════════════
// PAGINATION + SORT
// ═══════════════════════════════════════════════════════════════

export const DEFAULT_PAGINATION = {
  limit: 10,
  offset: 0
} as const

export const SORT_OPTIONS = [
  { value: 'asc', label: 'Preis: niedrig zu hoch' },
  { value: 'desc', label: 'Preis: hoch zu niedrig' }
] as const