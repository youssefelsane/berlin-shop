

import { Outlet } from 'react-router-dom'
import Header from '@/components/layout/Header'
import  Footer from '@/components/layout/Footer'

export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet /> {/* الصفحة الحالية */}
      </main>
      <Footer />
    </div>
  )
}