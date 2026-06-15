import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore'
import { db } from '@/api/firebase'
import type { Order } from '@/types'
import { formatPrice } from '@/utils/helpers'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

type OrderStatus = Order['status']

export default function AdminOrdersPage() {
  const qc = useQueryClient()

  const { data: orders, isLoading } = useQuery({
    queryKey: ['admin', 'orders'],
    queryFn: async () => {
      const snap = await getDocs(collection(db, 'orders'))
      return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Order)
    }
  })

  // useMutation: تغيير الـ status + invalidate Cache
  const { mutate: updateStatus } = useMutation({
    mutationFn: ({ id, status }: { id: string; status: OrderStatus }) =>
      updateDoc(doc(db, 'orders', id), { status }),
    onSuccess: () => {
      // بعد الـ update → حدّث الـ cache عشان الـ UI يتجدّد
      qc.invalidateQueries({ queryKey: ['admin', 'orders'] })
    }
  })

  if (isLoading) return <LoadingSpinner />

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Bestellungen verwalten</h1>

      <table className="w-full">
        <thead>
          <tr className="text-left border-b dark:border-gray-700">
            <th className="py-2">ID</th>
            <th>Gesamtbetrag</th>
            <th>Status</th>
            <th>Aktion</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order) => (
            <tr key={order.id} className="border-b dark:border-gray-700">
              <td className="py-3">{order.id.slice(0, 8)}</td>
              <td>{formatPrice(order.total)}</td>
              <td><StatusBadge status={order.status} /></td>
              <td>
                <select
                  value={order.status}
                  onChange={(e) =>
                    updateStatus({ id: order.id, status: e.target.value as OrderStatus })
                  }
                  className="border rounded p-1 text-sm dark:bg-gray-800"
                >
                  <option value="pending">Offen</option>
                  <option value="shipped">Versendet</option>
                  <option value="delivered">Geliefert</option>
                  <option value="cancelled">Storniert</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function StatusBadge({ status }: { status: OrderStatus }) {
  const colors: Record<OrderStatus, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    shipped: 'bg-blue-100 text-blue-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800'
  }
  return <span className={`px-2 py-0.5 rounded text-xs font-medium ${colors[status]}`}>{status}</span>
}