export interface Property {
  id: string
  title: string
  price: number
  location: string
  type: "House" | "Land" | "Flat"
  description: string | null
  image_url: string | null
  phone: string
  created_at: string
  images: string[] | null
}
