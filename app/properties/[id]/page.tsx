import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { PropertyImagePreview } from "@/components/property-image-preview"

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

import { createClient } from "@/lib/supabase/server"
import type { Property } from "@/lib/types"

const typeIcons = {
  House: Home,
  Land: LandPlot,
  Flat: Building,
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

  const images =
    property.images && property.images.length > 0
      ? property.images
      : property.image_url
      ? [property.image_url]
      : []

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-10">

        {/* Back */}
        <Link
          href="/properties"
          className="mb-6 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Properties
        </Link>

        <div className="grid gap-12 lg:grid-cols-3">

          {/* LEFT */}
          <div className="lg:col-span-2">

            {/* Images */}
            {images.length > 0 ? (
              <div className="rounded-2xl overflow-hidden shadow-sm">
                <PropertyImagePreview images={images} />
              </div>
            ) : (
              <div className="flex aspect-video items-center justify-center rounded-xl bg-gray-100">
                <Building className="h-20 w-20 text-gray-400" />
              </div>
            )}

            {/* Title + Price */}
            <div className="mt-6 mb-4">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {property.title}
              </h1>

              <p className="mt-2 text-2xl font-bold text-green-700">
                {formatPrice(property.price)}
              </p>

              <div className="mt-2 flex items-center gap-2 text-gray-500">
                <MapPin className="h-4 w-4" />
                {property.location}
              </div>
            </div>

            {/* Description */}
            <Card className="rounded-2xl shadow-md border bg-white">
              <CardContent className="p-6">
                <h2 className="mb-3 text-lg font-semibold text-gray-900">
                  Description
                </h2>
                <p className="leading-relaxed text-gray-600">
                  {property.description || "No description provided."}
                </p>
              </CardContent>
            </Card>

            {/* Date */}
            <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />
              Listed on {formatDate(property.created_at)}
            </div>
          </div>

          {/* RIGHT */}
          <div>
            <Card className="sticky top-24 rounded-2xl shadow-lg border bg-white">
              <CardContent className="p-6">

                <h2 className="mb-4 text-lg font-semibold text-gray-900">
                  Contact Owner
                </h2>

                <p className="mb-6 text-sm text-gray-500">
                  Interested? Call directly now.
                </p>

                <a
                  href={`tel:${property.phone}`}
                  className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-lg font-semibold text-white shadow hover:bg-primary/90 transition"
                >
                  <Phone className="h-5 w-5" />
                  {property.phone}
                </a>

                <div className="mt-6 border-t pt-6 space-y-3 text-sm">

                  <div className="flex justify-between">
                    <span className="text-gray-500">Type</span>
                    <span className="font-medium text-gray-900">
                      {property.type}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Price</span>
                    <span className="font-medium text-gray-900">
                      {formatPrice(property.price)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Location</span>
                    <span className="font-medium text-gray-900">
                      {property.location}
                    </span>
                  </div>

                </div>

              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}