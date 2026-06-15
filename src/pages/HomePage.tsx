import { useProducts } from '@/hooks/useProducts'
import { useCart } from '@/hooks/useCart'
import { useAuthContext } from '@/context/AuthContext'
import ProductCard from '@/components/ui/ProductCard'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

export default function HomePage() {
  const { data: products, isLoading, isError } = useProducts(8)
  const { user } = useAuthContext()
  const { addItem } = useCart(user?.uid ?? null)

  if (isLoading) return <LoadingSpinner />
  if (isError) return <p className="text-red-500">Fehler beim Laden der Produkte</p>

  return (
    <section>
      <h1 className="text-3xl font-bold mb-6">Willkommen bei Berlin Shop</h1>
      <h2 className="text-xl font-semibold mb-4">Empfohlene Produkte</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products?.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={addItem}
          />
        ))}
      </div>
    </section>
  )
}