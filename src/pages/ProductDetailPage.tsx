import { useParams } from 'react-router-dom'
import { useProduct } from '@/hooks/useProducts'
import { useCart } from '@/hooks/useCart'
import { useAuthContext } from '@/context/AuthContext'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { formatPrice } from '@/utils/helpers'

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { data: product, isLoading } = useProduct(Number(id))
  const { user } = useAuthContext()
  const { addItem } = useCart(user?.uid ?? null)

  if (isLoading) return <LoadingSpinner />
  if (!product) return <p>Produkt nicht gefunden</p>

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <img src={product.image} alt={product.title}
        className="w-full rounded-lg" />

      <div>
        <h1 className="text-2xl font-bold">{product.title}</h1>
        <p className="text-primary-500 text-2xl font-bold my-4">
          {formatPrice(product.price)}
        </p>
        <p className="text-gray-600 dark:text-gray-300">{product.description}</p>

        <button onClick={() => addItem(product)}
          className="mt-6 bg-primary-500 text-white px-8 py-3 rounded">
          In den Warenkorb
        </button>
      </div>
    </div>
  )
}