import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  MapPin,
  Phone,
  Home,
  Building,
  LandPlot,
  Calendar,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { PropertyGallery } from "@/components/property-gallery"

import { createClient } from "@/lib/supabase/server"
import type { Property } from "@/lib/types"

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

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

async function getProperty(id: string): Promise<Property | null> {
  const supabase = await createClient()

  const { data } = await supabase
    .from("properties")
    .select("*")
    .eq("id", id)
    .single()

  return data as Property
}

export default async function PropertyDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const property = await getProperty(id)

  if (!property) notFound()

  const TypeIcon = typeIcons[property.type]

  // ✅ fallback logic (important)
  const images =
    property.images && property.images.length > 0
      ? property.images
      : property.image_url
      ? [property.image_url]
      : []

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">

      {/* Back */}
      <Link
        href="/properties"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Properties
      </Link>

      <div className="grid gap-10 lg:grid-cols-3">

        {/* LEFT SIDE */}
        <div className="lg:col-span-2">

          {/* 🔥 IMAGE / GALLERY */}
          {images.length > 0 ? (
            <PropertyGallery images={images} />
          ) : (
            <div className="flex aspect-video items-center justify-center rounded-xl bg-muted">
              <Building className="h-20 w-20 text-muted-foreground/50" />
            </div>
          )}

          {/* Title */}
          <div className="mt-6 mb-4">
            <h1 className="text-2xl font-bold sm:text-3xl">
              {property.title}
            </h1>

            <div className="mt-2 flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {property.location}
            </div>
          </div>

          {/* Description */}
          <Card className="rounded-2xl shadow-sm">
            <CardContent className="p-6">
              <h2 className="mb-3 text-lg font-semibold">
                Description
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                {property.description || "No description provided."}
              </p>
            </CardContent>
          </Card>

          {/* Date */}
          <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            Listed on {formatDate(property.created_at)}
          </div>
        </div>

        {/* RIGHT SIDE (CONTACT CARD) */}
        <div>
          <Card className="sticky top-24 rounded-2xl shadow-xl border">
            <CardContent className="p-6">
              
              <h2 className="mb-4 text-lg font-semibold">
                Contact Owner
              </h2>

              <p className="mb-6 text-sm text-muted-foreground">
                Interested? Call directly now.
              </p>

              {/* Call button */}
              <a
                href={`tel:${property.phone}`}
                className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-lg font-semibold text-white shadow hover:bg-primary/90 transition"
              >
                <Phone className="h-5 w-5" />
                {property.phone}
              </a>

              {/* Details */}
              <div className="mt-6 border-t pt-6 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type</span>
                  <span>{property.type}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Price</span>
                  <span>{formatPrice(property.price)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location</span>
                  <span>{property.location}</span>
                </div>
              </div>

            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  )
}