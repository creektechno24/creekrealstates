export interface Property {

  id: string

  title: string

  price: number

  location: string

  city?: string

  area?: string

  landmark?: string

  amenities?: string

  type: "House" | "Land" | "Flat"

  description: string | null

  image_url: string | null

  phone: string

  created_at: string

  images: string[] | null

video_urls?: string[] | null
}