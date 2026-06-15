import { useQuery } from '@tanstack/react-query'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/api/firebase'
import type  { Order } from '@/types'
import { formatPrice } from '@/utils/helpers'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

export default function AdminDashboard() {
  const { data: orders, isLoading } = useQuery({
    queryKey: ['admin', 'orders'],
    queryFn: async () => {
      const snap = await getDocs(collection(db, 'orders'))
      return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Order)
    }
  })

  if (isLoading) return <LoadingSpinner />

  const totalRevenue = orders?.reduce((sum, o) => sum + o.total, 0) ?? 0
  const pendingCount = orders?.filter((o) => o.status === 'pending').length ?? 0

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <StatCard label="Gesamtumsatz" value={formatPrice(totalRevenue)} color="green" />
        <StatCard label="Bestellungen" value={orders?.length ?? 0} color="blue" />
        <StatCard label="Offen" value={pendingCount} color="orange" />
      </div>
    </div>
  )
}

// StatCard — بطاقة إحصائية بسيطة
function StatCard({
  label, value, color
}: {
  label: string
  value: string | number
  color: 'green' | 'blue' | 'orange'
}) {
  const colors = {
    green: 'bg-green-50 dark:bg-green-900/20 border-green-200',
    blue: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200',
    orange: 'bg-orange-50 dark:bg-orange-900/20 border-orange-200'
  }
  return (
    <div className={`border rounded-lg p-5 ${colors[color]}`}>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-3xl font-bold mt-1">{value}</p>
    </div>
  )
}