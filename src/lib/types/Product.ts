export interface ProductSummary {
  id: number
  title: string
  price: number
  thumbnail: string
  rating: number
  discountPercentage?: number
  availabilityStatus?: string
}

export interface Product extends ProductSummary {
  description: string
  category: string
  images: string[]
  brand?: string
  stock?: number
}