import { useState, useMemo } from 'react'
import { useProducts } from '@/hooks/useProducts'
import { useCart } from '@/hooks/useCart'
import { useAuthContext } from '@/context/AuthContext'
import ProductCard from '@/components/ui/ProductCard'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { SORT_OPTIONS } from '@/utils/constants'

type SortOrder = 'asc' | 'desc' | ''

export default function ProductsPage() {
  const { data: products, isLoading } = useProducts(50)
  const { user } = useAuthContext()
  const { addItem } = useCart(user?.uid ?? null)

  const [search, setSearch] = useState('')
  const [sortOrder, setSortOrder] = useState<SortOrder>('')

  // ═══ useMemo: filter + sort فقط لو الـ deps اتغيّرت ═══
  const visibleProducts = useMemo(() => {
    if (!products) return []

    // 1) filter بالـ search
    let result = products.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    )

    // 2) sort بالسعر
    if (sortOrder === 'asc') {
      result = [...result].sort((a, b) => a.price - b.price)
    } else if (sortOrder === 'desc') {
      result = [...result].sort((a, b) => b.price - a.price)
    }

    return result
  }, [products, search, sortOrder]) // ← الـ dependencies

  if (isLoading) return <LoadingSpinner />

  return (
    <section>
      <h1 className="text-2xl font-bold mb-6">Alle Produkte</h1>

      {/* Controls */}
      <div className="flex gap-4 mb-6 flex-wrap">
        <input
          placeholder="Suchen..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded p-2 flex-1 dark:bg-gray-800"
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as SortOrder)}
          className="border rounded p-2 dark:bg-gray-800"
        >
          <option value="">Sortierung</option>
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {/* Results */}
      {visibleProducts.length === 0 ? (
        <p>Keine Produkte gefunden</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={addItem} />
          ))}
        </div>
      )}
    </section>
  )
}