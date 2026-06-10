import api from './axiosInstance'
import type { Product, Category } from '@/types'
import { API_ENDPOINTS } from '@/utils/constants'
import { sanitizeImageUrl } from '@/utils/helpers'

// ═══════════════════════════════════════════════════════════════
// GET ALL PRODUCTS — مع pagination
// Platzi: ?offset=0&limit=10
// ═══════════════════════════════════════════════════════════════

export const getProducts = async ( limit = 10,offset = 0): Promise<Product[]> => {
  const { data } = await api.get<Product[]>
  (API_ENDPOINTS.products,{ params: { offset, limit } }
  )

  // نضّف صور كل منتج — Platzi بترجع formats غريبة
  return data.map((product) => ({
    ...product,
    image: sanitizeImageUrl(product.image, product.id)
  }))
}

// ═══════════════════════════════════════════════════════════════
// GET SINGLE PRODUCT
// ═══════════════════════════════════════════════════════════════

export const getProduct = async (id: number): Promise<Product> => {
  const { data } = await api.get<Product>(
    API_ENDPOINTS.product(id)
  )
  return { ...data, image: sanitizeImageUrl(data.image, data.id) }
}

// ═══════════════════════════════════════════════════════════════
// GET CATEGORIES
// ═══════════════════════════════════════════════════════════════

export const getCategories = async (): Promise<Category[]> => {
  const { data } = await api.get<Category[]>(
    API_ENDPOINTS.categories
  )
  return data.map((cat) => ({
    ...cat,
    image: sanitizeImageUrl(cat.image, cat.id)
  }))
}