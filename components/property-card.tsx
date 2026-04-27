"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import {
  MapPin,
  Phone,
  Home,
  Building,
  LandPlot,
  Heart,
  Trash2,
  Pencil,
} from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"

// 🔥 ADD
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { PropertyForm } from "@/components/property-form"

export interface Property {
  id: string
  title: string
  price: number
  location: string
  type: "House" | "Land" | "Flat"
  description: string | null
  image_url: string | null
  images?: string[] | null
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
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClient()

  const [isAdmin, setIsAdmin] = useState(false)
  const [openEdit, setOpenEdit] = useState(false) // 🔥 NEW

  // 🔥 ADMIN CHECK
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const user = data.user

      if (user?.email === "creektechno24@gmail.com") {
        setIsAdmin(true)
      } else {
        setIsAdmin(false)
      }
    })
  }, [])

  const TypeIcon = typeIcons[property.type]

  const imageSrc =
    property.images && property.images.length > 0
      ? property.images[0]
      : property.image_url

  const imageCount = property.images?.length || 0

  // ✅ WORKING DELETE
  async function handleDelete(id: string) {
    const ok = confirm("Delete this property?")
    if (!ok) return

    const { error } = await supabase
      .from("properties")
      .delete()
      .eq("id", id)

    if (error) {
      toast({
        title: "Error ❌",
        description: "Failed to delete property",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Deleted successfully ✅",
      description: "Property removed",
    })

    router.refresh()
  }

  return (
    <div className="relative">

      {/* 🔥 DELETE */}
      {isAdmin && (
        <div className="absolute right-3 top-3 z-20 flex gap-2">

          {/* DELETE */}
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              handleDelete(property.id)
            }}
            className="rounded-full bg-white/80 p-2 backdrop-blur hover:bg-white"
          >
            <Trash2 className="h-4 w-4 text-red-600" />
          </button>

          {/* EDIT */}
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setOpenEdit(true)
            }}
            className="rounded-full bg-white/80 p-2 backdrop-blur hover:bg-white"
          >
            <Pencil className="h-4 w-4 text-blue-600" />
          </button>

        </div>
      )}

      <Link href={`/properties/${property.id}`}>
        <Card className="group h-full overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

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

            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

            <Badge className={`absolute left-3 top-3 gap-1 ${typeColors[property.type]}`}>
              <TypeIcon className="h-3 w-3" />
              {property.type}
            </Badge>

            <div className="absolute right-3 top-12 rounded-full bg-white/80 p-2 backdrop-blur">
              <Heart className="h-4 w-4 text-gray-700" />
            </div>

            {imageCount > 1 && (
              <span className="absolute bottom-3 right-3 rounded bg-black/70 px-2 py-1 text-xs text-white">
                +{imageCount}
              </span>
            )}
          </div>

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

      {/* 🔥 EDIT POPUP */}
      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0">
          <DialogHeader>
            <DialogTitle>Edit Property</DialogTitle>
          </DialogHeader>

          <PropertyForm
  property={property}
  isEdit
  onSuccess={() => {
    setOpenEdit(false)   // 🔥 popup close
    router.refresh()     // 🔥 updated data reload
  }}
/>
        </DialogContent>
      </Dialog>

    </div>
  )
}