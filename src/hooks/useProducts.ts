import { useQuery } from '@tanstack/react-query'
import { getProducts, getProduct } from '@/api/product.service'
import { QUERY_KEYS } from '@/utils/constants'

// ═══════════════════════════════════════════════════════════════
// useProducts — قائمة المنتجات مع pagination
// ═══════════════════════════════════════════════════════════════

export const useProducts = (limit = 10, offset = 0) => {
  return useQuery({
    queryKey: QUERY_KEYS.products.list(limit, offset),
    queryFn: () => getProducts(limit, offset),
    staleTime: 5 * 60 * 1000, // 5 دقايق fresh
    gcTime: 10 * 60 * 1000 // 10 دقايق في الذاكرة
  })
}

// ═══════════════════════════════════════════════════════════════
// useProduct — منتج واحد
// ═══════════════════════════════════════════════════════════════

export const useProduct = (id: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.products.detail(id),
    queryFn: () => getProduct(id),
    enabled: !!id, // مش يعمل request لو id = 0/undefined
    staleTime: 5 * 60 * 1000
  })
}