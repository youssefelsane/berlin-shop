import { useQuery } from '@tanstack/react-query'
import { getUserOrders } from '@/services/firestore.service'
import { useAuthContext } from '@/context/AuthContext'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { formatPrice } from '@/utils/helpers'

export default function OrdersPage() {
  const { user } = useAuthContext()

  const { data: orders, isLoading } = useQuery({
    queryKey: ['orders', user?.uid],
    queryFn: () => getUserOrders(user!.uid),
    enabled: !!user
  })

  if (isLoading) return <LoadingSpinner />

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Meine Bestellungen</h1>

      {orders?.length === 0 ? (
        <p>Keine Bestellungen</p>
      ) : (
        orders?.map((order) => (
          <div key={order.id} className="border rounded p-4 mb-4 dark:border-gray-700">
            <div className="flex justify-between">
              <span>Bestellung #{order.id.slice(0, 8)}</span>
              <span className="font-bold">{formatPrice(order.total)}</span>
            </div>
            <p className="text-sm text-gray-500">Status: {order.status}</p>
          </div>
        ))
      )}
    </div>
  )
}