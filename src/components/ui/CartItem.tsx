import { Trash2 } from 'lucide-react'
import type { CartItem as CartItemType } from '@/types'
import { formatPrice } from '@/utils/helpers'

interface Props {
  item: CartItemType
  onRemove: (productId: number) => void
}

export default function CartItem({ item, onRemove }: Props) {
  const lineTotal = item.product.price * item.quantity

  return (
    <div className="flex items-center gap-4 py-4 border-b dark:border-gray-700">
      <img src={item.product.image} alt={item.product.title}
        className="w-16 h-16 object-cover rounded" />

      <div className="flex-1">
        <h4 className="font-medium">{item.product.title}</h4>
        <p className="text-sm text-gray-500">
          {item.quantity} &times; {formatPrice(item.product.price)}
        </p>
      </div>

      <p className="font-bold">{formatPrice(lineTotal)}</p>

      <button onClick={() => onRemove(item.productId)}
        aria-label="Entfernen" className="text-red-500">
        <Trash2 size={18} />
      </button>
    </div>
  )
}