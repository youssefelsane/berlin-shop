import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'light' | 'dark'

interface UIState {
  theme: Theme
  sidebarOpen: boolean
  toggleTheme: () => void
  toggleSidebar: () => void
  setSidebar: (open: boolean) => void
}

export const useUIStore = create<UIState>()(
  // persist = يحفظ الـ theme في localStorage تلقائياً
  persist(
    (set) => ({
      theme: 'dark',
      sidebarOpen: false,

      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'dark' ? 'light' : 'dark'
        })),

      toggleSidebar: () =>
        set((state) => ({ sidebarOpen: !state.sidebarOpen })),

      setSidebar: (open) => set({ sidebarOpen: open })
    }),
    { name: 'berlin-shop-ui' } // مفتاح localStorage
  )
)