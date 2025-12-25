export interface ProductSummary {
  id: number
  title: string
  price: number
  thumbnail: string
  rating: number
  category: string
  discountPercentage?: number
  availabilityStatus?: string
}

export interface Product extends ProductSummary {
  description: string
  images: string[]
  brand?: string
  stock?: number
}