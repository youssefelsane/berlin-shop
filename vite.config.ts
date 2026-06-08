import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // 👈 ضروري عشان الـ Alias يشتغل

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // تفتح المتصفح تلقائياً أول ما تشغل السيرفر
  server: {
    port: 5173,
    open: true 
  },

  // 👈 ده السحر اللي هيخلي الـ Path Alias يشتغل مع الـ TypeScript بدون مشاكل
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})