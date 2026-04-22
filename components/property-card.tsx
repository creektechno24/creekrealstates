import Image from "next/image"
import Link from "next/link"
import { MapPin, Phone, Home, Building, LandPlot, Heart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export interface Property {
  id: string
  title: string
  price: number
  location: string
  type: "House" | "Land" | "Flat"
  description: string | null
  image_url: string | null
  images?: string[] | null   // 👈 important
  phone: string
  created_at: string
}

const typeIcons = {
  House: Home,
  Land: LandPlot,
  Flat: Building,
}

const typeColors = {
  House: "bg-accent text-accent-foreground",
  Land: "bg-primary/10 text-primary",
  Flat: "bg-secondary text-secondary-foreground",
}

function formatPrice(price: number): string {
  if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`
  if (price >= 100000) return `₹${(price / 100000).toFixed(2)} L`
  return `₹${price.toLocaleString("en-IN")}`
}

export function PropertyCard({ property }: { property: Property }) {
  const TypeIcon = typeIcons[property.type]

  // ✅ MAIN FIX
  const imageSrc =
    property.images && property.images.length > 0
      ? property.images[0]
      : property.image_url

  const imageCount = property.images?.length || 0

  return (
    <Link href={`/properties/${property.id}`}>
      <Card className="group h-full overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
        
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">

          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={property.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-muted">
              <Building className="h-16 w-16 text-muted-foreground/50" />
            </div>
          )}

          {/* Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

          {/* Type badge */}
          <Badge className={`absolute left-3 top-3 gap-1 ${typeColors[property.type]}`}>
            <TypeIcon className="h-3 w-3" />
            {property.type}
          </Badge>

          {/* ❤️ Favorite */}
          <div className="absolute right-3 top-3 rounded-full bg-white/80 p-2 backdrop-blur">
            <Heart className="h-4 w-4 text-gray-700" />
          </div>

          {/* 📸 Image count */}
          {imageCount > 1 && (
            <span className="absolute bottom-3 right-3 rounded bg-black/70 px-2 py-1 text-xs text-white">
              +{imageCount}
            </span>
          )}
        </div>

        {/* Content */}
        <CardContent className="p-4">
          <p className="text-2xl font-bold text-primary">
            {formatPrice(property.price)}
          </p>

          <h3 className="mt-1 line-clamp-1 text-lg font-semibold group-hover:text-primary">
            {property.title}
          </h3>

          <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            {property.location}
          </div>

          <div className="mt-3 flex items-center gap-1 text-sm">
            <Phone className="h-4 w-4 text-primary" />
            {property.phone}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}