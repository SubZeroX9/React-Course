export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  thumbnail: string
  images: string[]
  rating: number
  brand?: string
  stock?: number
  discountPercentage?: number
}