import type { Metadata } from "next"

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
} from "lucide-react"

import { FaWhatsapp } from "react-icons/fa"

import { Card, CardContent } from "@/components/ui/card"

import { createClient } from "@/lib/supabase/server"
import type { Property } from "@/lib/types"

const typeIcons = {
  House: Home,
  Land: LandPlot,
  Flat: Building,
}

const amenityIcons: Record<string, string> = {
  Parking: "🚗",
  Lift: "🛗",
  Gym: "🏋️",
  Security: "🛡️",
  "Swimming Pool": "🏊",
  "Power Backup": "🔋",
  Garden: "🌳",
  "Club House": "🏡",
  "Children Play Area": "🛝",
  CCTV: "📹",
}

function formatPrice(price: number): string {

  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(2)} Cr`
  }

  if (price >= 100000) {
    return `₹${(price / 100000).toFixed(2)} L`
  }

  return `₹${price.toLocaleString("en-IN")}`

}

function formatDate(dateString: string): string {

  return new Date(dateString).toLocaleDateString(
    "en-IN",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  )

}

async function getProperty(
  id: string
): Promise<Property | null> {

  const supabase = await createClient()

  const { data } = await supabase
    .from("properties")
    .select("*")
    .eq("id", id)
    .single()

  return data as Property

}

/* =========================
   DYNAMIC SEO METADATA
========================= */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {

  const { id } = await params

  const property =
    await getProperty(id)

  if (!property) {

    return {
      title:
        "Property Not Found",
    }

  }

  const image =
    property.images?.[0] ||
    property.image_url ||
    "/og-image.jpg"

  return {

    title:
      property.title,

    description:
      property.description ||
      `${property.type} available in ${property.location}`,

    openGraph: {

      title:
        property.title,

      description:
        property.description ||
        `${property.type} available in ${property.location}`,

      images: [
        {
          url: image,
        },
      ],

    },

    twitter: {

      card:
        "summary_large_image",

      title:
        property.title,

      description:
        property.description ||
        `${property.type} available in ${property.location}`,

      images: [image],

    },

  }

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
    property.images &&
    property.images.length > 0
      ? property.images
      : property.image_url
      ? [property.image_url]
      : []

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="mx-auto max-w-7xl px-4 py-10">

        {/* BACK */}
        <Link
          href="/properties"
          className="mb-6 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-gray-900"
        >

          <ArrowLeft className="h-4 w-4" />

          Back to Properties

        </Link>

        <div className="grid gap-12 lg:grid-cols-3">

          {/* LEFT */}
          <div className="lg:col-span-2">

            {/* GALLERY */}
            {images.length > 0 ? (

              <div className="overflow-hidden rounded-2xl shadow-sm">

                <PropertyImagePreview
                  images={images}
                  videoUrls={property.video_urls || []}
                />

              </div>

            ) : (

              <div className="flex aspect-video items-center justify-center rounded-2xl bg-gray-100">

                <Building className="h-20 w-20 text-gray-400" />

              </div>

            )}

            {/* TITLE */}
            <div className="mt-6">

              <div className="mb-3 flex flex-wrap items-center gap-3">

                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">

                  <TypeIcon className="h-4 w-4" />

                  {property.type}

                </div>

                <div className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">

                  📅 {formatDate(property.created_at)}

                </div>

              </div>

              <h1 className="text-3xl font-bold text-gray-900">

                {property.title}

              </h1>

              <p className="mt-3 text-3xl font-bold text-green-700">

                {formatPrice(property.price)}

              </p>

              <div className="mt-3 flex items-center gap-2 text-gray-500">

                <MapPin className="h-4 w-4" />

                {property.location}

              </div>

            </div>

            {/* AMENITIES */}
            {property.amenities &&
              property.amenities.trim() !== "" && (

              <Card className="mt-8 overflow-hidden rounded-3xl border-0 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)]">

                <div className="border-b bg-gradient-to-r from-primary/5 via-white to-primary/5 px-6 py-5">

                  <div className="flex items-center justify-between">

                    <div>

                      <h2 className="text-xl font-bold text-gray-900">

                        Property Amenities

                      </h2>

                      <p className="mt-1 text-sm text-gray-500">

                        Premium facilities and lifestyle features

                      </p>

                    </div>

                  </div>

                </div>

                <CardContent className="p-6">

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                    {property.amenities
                      .split(",")
                      .filter(
                        (item: string) =>
                          item.trim() !== ""
                      )
                      .map(
                        (
                          item: string,
                          index: number
                        ) => (

                          <div
                            key={index}
                            className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-gray-50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl"
                          >

                            <div className="relative flex items-center gap-4">

                              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-2xl shadow-sm">

                                {amenityIcons[item.trim()] || "✨"}

                              </div>

                              <div>

                                <p className="text-base font-semibold text-gray-900">

                                  {item.trim()}

                                </p>

                              </div>

                            </div>

                          </div>

                        )
                      )}

                  </div>

                </CardContent>

              </Card>

            )}

            {/* DESCRIPTION */}
            <Card className="mt-8 rounded-2xl border bg-white shadow-md">

              <CardContent className="p-5">

                <h2 className="mb-3 text-lg font-semibold text-gray-900">

                  Description

                </h2>

                <p className="leading-relaxed text-gray-600">

                  {property.description ||
                    "No description provided."}

                </p>

              </CardContent>

            </Card>

          </div>

          {/* RIGHT */}
          <div>

            <Card className="sticky top-24 rounded-2xl border bg-white shadow-lg">

              <CardContent className="p-6">

                <h2 className="mb-4 text-lg font-semibold text-gray-900">

                  Contact Owner

                </h2>

                <p className="mb-6 text-sm text-gray-500">

                  Interested? Contact directly now.

                </p>

                <div className="grid gap-3">

                  {/* CALL */}
                  <a
                    href={`tel:+91${property.phone}`}
                    className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-lg font-semibold text-white shadow transition hover:bg-primary/90"
                  >

                    <Phone className="h-5 w-5" />

                    Call Now

                  </a>

                  {/* WHATSAPP */}
                  <a
                    href={`https://wa.me/91${property.phone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-4 text-lg font-semibold text-white shadow transition hover:bg-green-700"
                  >

                    <FaWhatsapp className="h-6 w-6" />

                    WhatsApp

                  </a>

                </div>

                {/* PROPERTY DETAILS */}
                <div className="mt-6 space-y-3 border-t pt-6 text-sm">

                  {/* TYPE */}
                  <div className="flex justify-between">

                    <span className="text-gray-500">
                      Type
                    </span>

                    <span className="font-medium text-gray-900">
                      {property.type}
                    </span>

                  </div>

                  {/* PRICE */}
                  <div className="flex justify-between">

                    <span className="text-gray-500">
                      Price
                    </span>

                    <span className="font-medium text-gray-900">
                      {formatPrice(property.price)}
                    </span>

                  </div>

                  {/* LOCATION */}
                  <div className="flex justify-between gap-4">

                    <span className="text-gray-500">
                      Location
                    </span>

                    <div className="text-right">

                      <p className="font-medium">

                        {[
                          property.area,
                          property.city,
                        ]
                          .filter(Boolean)
                          .join(", ")}

                      </p>

                      {property.landmark && (

                        <p className="mt-1 text-sm text-gray-500">

                          Near {property.landmark}

                        </p>

                      )}

                    </div>

                  </div>

                  {/* PHONE */}
                  <div className="flex justify-between">

                    <span className="text-gray-500">
                      Phone
                    </span>

                    <span className="font-medium text-gray-900">
                      +91 {property.phone}
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