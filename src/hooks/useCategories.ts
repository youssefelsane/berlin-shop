import { useQuery } from '@tanstack/react-query'
import { getCategories } from '@/api/product.service'
import { QUERY_KEYS } from '@/utils/constants'

export const useCategories = () => {
  return useQuery({
    queryKey: QUERY_KEYS.categories.all,
    queryFn: getCategories,
    // الـ Categories نادراً ما تتغيّر → staleTime طويل
    staleTime: 30 * 60 * 1000 // 30 دقيقة
  })
}