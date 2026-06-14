import { memo } from 'react'
import { Link } from 'react-router-dom'
import type { Product } from '@/types'
import { formatPrice, truncateText } from '@/utils/helpers'

interface Props {
  product: Product
  onAddToCart: (product: Product) => void
}

function ProductCard({ product, onAddToCart }: Props) {
  return (
    <div className="border dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition">
      <Link to={`/products/${product.id}`}>
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="w-full h-48 object-cover"
        />
      </Link>

      <div className="p-4">
        <h3 className="font-semibold">{truncateText(product.title, 50)}</h3>
        <p className="text-primary-500 font-bold mt-2">
          {formatPrice(product.price)}
        </p>
        <button
          onClick={() => onAddToCart(product)}
          className="mt-3 w-full bg-primary-500 text-white py-2 rounded hover:bg-primary-600"
        >
          In den Warenkorb
        </button>
      </div>
    </div>
  )
}

// memo — يمنع re-render إلا لو الـ props اتغيّرت
export default memo(ProductCard)