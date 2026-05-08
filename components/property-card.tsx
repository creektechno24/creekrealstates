"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import {
  MapPin,
  Phone,
  Home,
  Building,
  LandPlot,
  Trash2,
  Pencil,
} from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"


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

export function PropertyCard({
  property,
  isAdmin = false,
}: {
  property: Property
  isAdmin?: boolean
}) {
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClient()

  const [openEdit, setOpenEdit] = useState(false)

  const TypeIcon = typeIcons[property.type]

  const imageSrc =
    property.images && property.images.length > 0
      ? property.images[0]
      : property.image_url

  const imageCount = property.images?.length || 0

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

      {/* ADMIN ACTIONS */}
      {isAdmin && (
        <div className="absolute right-3 top-3 z-20 flex gap-2">

          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              handleDelete(property.id)
            }}
            className="rounded-full bg-white shadow-md p-2 hover:scale-105 transition"
          >
            <Trash2 className="h-4 w-4 text-red-600" />
          </button>

          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setOpenEdit(true)
            }}
            className="rounded-full bg-white shadow-md p-2 hover:scale-105 transition"
          >
            <Pencil className="h-4 w-4 text-blue-600" />
          </button>

        </div>
      )}

      <Link    href={`/properties/${property.id}`}>
        <Card className="group h-full overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

          {/* IMAGE */}
          <div className="relative aspect-[4/3] overflow-hidden">

            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={property.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-gray-100">
                <Building className="h-16 w-16 text-gray-400" />
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

            <Badge className={`absolute left-3 top-3 gap-1 ${typeColors[property.type]}`}>
              <TypeIcon className="h-3 w-3" />
              {property.type}
            </Badge>

            {imageCount > 1 && (
              <span className="absolute bottom-3 right-3 rounded bg-black/70 px-2 py-1 text-xs text-white">
                +{imageCount}
              </span>
            )}
          </div>

          {/* CONTENT */}
          <CardContent className="p-4 space-y-2">

            <p className="text-2xl font-bold text-green-700">
              {formatPrice(property.price)}
            </p>

            <h3 className="line-clamp-1 text-lg font-semibold text-gray-900 group-hover:text-primary transition">
              {property.title}
            </h3>

            <div className="flex items-center gap-1 text-sm text-gray-500">
              <MapPin className="h-4 w-4" />
              {property.location}
            </div>

            <div className="flex items-center gap-1 text-sm text-gray-700">
              <Phone className="h-4 w-4 text-primary" />
              {property.phone}
            </div>

          </CardContent>

        </Card>
      </Link>

      {/* EDIT POPUP */}
      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 rounded-2xl shadow-2xl bg-white">
          <DialogHeader className="px-6 py-4 border-b">
            <DialogTitle className="text-lg font-semibold">
              Edit Property
            </DialogTitle>
          </DialogHeader>

          <PropertyForm
            property={property}
            isEdit
            onSuccess={() => {
              setOpenEdit(false)
              router.refresh()
            }}
          />
        </DialogContent>
      </Dialog>

    </div>
  )
}