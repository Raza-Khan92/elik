export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  images: string[]
  category: string
  tags: string[]
  inStock: boolean
  featured?: boolean
  newArrival?: boolean
  originalPrice?: number
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Category {
  id: string
  name: string
  slug: string
  image: string
  description: string
}

export type PaymentMethod =
  | 'cash-on-delivery'
  | 'bank-transfer'
  | 'easypaisa'
  | 'jazzcash'

export interface OrderDetails {
  name: string
  email: string
  phone: string
  address: string
  landmark: string
  city: string
  postalCode: string
  paymentMethod: PaymentMethod
}
