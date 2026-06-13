import { Outlet, NavLink } from 'react-router-dom'

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6">
        <h2 className="text-xl font-bold mb-8">Admin-Bereich</h2>
        <nav className="flex flex-col gap-2">
          <NavLink to="/admin" end className={navClass}>Dashboard</NavLink>
          <NavLink to="/admin/orders" className={navClass}>Bestellungen</NavLink>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  )
}

// NavLink بتدي isActive — نلوّن الـ active link
const navClass = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? 'px-4 py-2 rounded bg-primary-500 text-white'
    : 'px-4 py-2 rounded hover:bg-gray-700'