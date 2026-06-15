import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '@/hooks/useCart'
import { useAuthContext } from '@/context/AuthContext'
import { createOrder } from '@/services/firestore.service'
import CartItem from '@/components/ui/CartItem'
import { formatPrice } from '@/utils/helpers'

export default function CartPage() {
  const { user } = useAuthContext()
  const { items, total, removeItem } = useCart(user?.uid ?? null)
  const [address, setAddress] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()

  const handleCheckout = async () => {
    if (!user || items.length === 0) return
    setSubmitting(true)
    try {
      const orderId = await createOrder({
        userId: user.uid,
        items,
        total,
        status: 'pending',
        shippingAddress: address
      })
      navigate(`/orders`)
    } finally {
      setSubmitting(false)
    }
  }

  if (items.length === 0) {
    return <p className="text-center mt-12">Ihr Warenkorb ist leer</p>
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Warenkorb</h1>

      {items.map((item) => (
        <CartItem key={item.productId} item={item} onRemove={removeItem} />
      ))}

      <div className="mt-6 flex justify-between text-xl font-bold">
        <span>Gesamt:</span>
        <span>{formatPrice(total)}</span>
      </div>

      <input placeholder="Lieferadresse" value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="w-full border rounded p-2 mt-6 dark:bg-gray-800" />

      <button onClick={handleCheckout} disabled={submitting || !address}
        className="w-full bg-primary-500 text-white py-3 rounded mt-4 disabled:opacity-50">
        {submitting ? 'Wird bestellt...' : 'Jetzt bestellen'}
      </button>
    </div>
  )
}