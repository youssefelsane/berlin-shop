// ═══════════════════════════════════════════════════════════════
// PRODUCT — المنتج من Platzi API
// ═══════════════════════════════════════════════════════════════

export interface Rating {
  rate: number  // متوسط التقييم (1-5)
  count: number // عدد المراجعات
}

export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string // من قائمة معينة
  image: string // قد يكون مصفوفة nested JSON من Platzi!
  rating: Rating
}

// ═══════════════════════════════════════════════════════════════
// CATEGORY
// ═══════════════════════════════════════════════════════════════

export interface Category {
  id: number
  name: string
  image: string
}

// ═══════════════════════════════════════════════════════════════
// FIREBASE USER
// ═══════════════════════════════════════════════════════════════

export interface AppUser {
  uid: string
  email: string
  displayName: string | null
  photoURL: string | null
  phoneNumber: string | null
  createdAt: Date
  role: 'user' | 'admin' // من Firestore document
}

// ═══════════════════════════════════════════════════════════════
// CART
// ═══════════════════════════════════════════════════════════════

export interface CartItem {
  productId: number
  product: Product // الـ product كامل (للعرض في الـ Cart page)
  quantity: number
  addedAt: Date
}

export interface Cart {
  items: CartItem[]
  total: number // المجموع (محسوب من الـ client)
  updatedAt: Date
}

// ═══════════════════════════════════════════════════════════════
// ORDER
// ═══════════════════════════════════════════════════════════════

export interface Order {
  id: string // من Firestore
  userId: string
  items: CartItem[]
  total: number
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled'
  shippingAddress: string
  createdAt: Date
  updatedAt: Date
}

// ═══════════════════════════════════════════════════════════════
// AUTH
// ═══════════════════════════════════════════════════════════════

export interface SignUpRequest {
  email: string
  password: string
  displayName: string
}

export interface LoginRequest {
  email: string
  password: string
}