import { Suspense } from "react"

import { PropertyCard } from "@/components/property-card"
import { PropertyFilters } from "@/components/property-filters"
import { createClient } from "@/lib/supabase/server"
import type { Property } from "@/lib/types"
import { Spinner } from "@/components/ui/spinner"
import Link from "next/link"
import { Button } from "@/components/ui/button"

//export const dynamic = "force-dynamic"

interface SearchParams {
  search?: string
  type?: string
}

async function getProperties(
  searchParams: SearchParams
): Promise<Property[]> {

  const supabase =
    await createClient()

  let query =
    supabase
      .from("properties")
      .select(`
        id,
        title,
        price,
        location,
        city,
        area,
        landmark,
        description,
        type,
        amenities,
        image_url,
        images,
        phone,
        created_at
      `)

  // 🔍 SEARCH
  if (searchParams.search) {

    const search =
      searchParams.search
        .trim()
        .replace(/,/g, "")

    query = query.or(
      [
        `title.ilike.%${search}%`,
        `city.ilike.%${search}%`,
        `area.ilike.%${search}%`,
        `landmark.ilike.%${search}%`,
        `description.ilike.%${search}%`,
        `location.ilike.%${search}%`,
        `type.ilike.%${search}%`,
        `amenities.ilike.%${search}%`,
      ].join(",")
    )

  }

  // 🏷 TYPE FILTER
  if (
    searchParams.type &&
    searchParams.type !== "all"
  ) {

    query = query.eq(
      "type",
      searchParams.type
    )

  }

  // 📅 ORDER
  query = query.order(
    "created_at",
    { ascending: false }
  )

  const {
    data,
    error,
  } = await query

  if (error) {

    console.log(
      "SUPABASE ERROR =>",
      error
    )

    return []

  }

  return data as Property[]

}
// 🔥 CONTENT
async function PropertiesContent({
  searchParams,
  isAdmin,
}: {
  searchParams: SearchParams
  isAdmin: boolean
}) {

  const properties =
    await getProperties(searchParams)

  // ❌ EMPTY STATE
  if (properties.length === 0) {

    return (

      <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-100 p-12 text-center">

        <p className="text-lg font-medium text-gray-600">

          No properties found
          {searchParams.search
            ? ` for "${searchParams.search}"`
            : ""}

        </p>

        <p className="mt-2 text-sm text-gray-500">

          Try searching with title,
          city, area, amenities,
          or property type.

        </p>

      </div>

    )

  }

  // ✅ PROPERTIES GRID
  return (

    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">

      {properties.map((property) => (

        <PropertyCard
          key={property.id}
          property={property}
          isAdmin={isAdmin}
        />

      ))}

    </div>

  )

}

// 🔥 MAIN PAGE
export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {

  const params =
    await searchParams

  const supabase =
    await createClient()

  // 🔐 GET USER
  const {
    data: { user },
  } =
    await supabase.auth.getUser()

  // 👑 ADMIN CHECK
  const isAdmin =
    user?.email ===
    "creektechno24@gmail.com"

  return (

<div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100">
    <div className="w-full">
{/* HERO SECTION */}
<section className="relative flex min-h-[72vh] w-full items-center justify-center overflow-hidden">

  {/* BACKGROUND IMAGE */}
  <div
    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
 style={{
  backgroundImage:
    "url('https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=1600&auto=format&fit=crop')",
}}
  />

  {/* DARK OVERLAY */}
  <div className="absolute inset-0 bg-black/55" />

  {/* CONTENT */}
  <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 text-center text-white">

    <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-400">

      Creek Real Estates

    </p>

    <h5 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-7xl">

      Discover Premium
      
      Properties

    </h5>

    <p className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-white/90 sm:text-xl">

      Explore our curated collection
      of houses, flats, and land listings
      across prime locations.

    </p>

    {/* BUTTONS */}
    <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

      <Link href="/about">

        <Button
          size="lg"
          className="gap-2 px-8 shadow-xl"
        >

          About Us

        </Button>

      </Link>

      <Link href="/contact">

        <Button
          size="lg"
          variant="outline"
          className="gap-2 border-white bg-white/10 px-8 text-white backdrop-blur hover:bg-white hover:text-black"
        >

          Contact Us

        </Button>

      </Link>

    </div>

  </div>

</section>
        {/* FILTERS */}
        <div className="mb-10 rounded-[32px] border border-slate-200 bg-white/80 p-6 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.06)]">

          <PropertyFilters />

        </div>

        {/* CONTENT */}
        <Suspense
          fallback={

            <div className="flex items-center justify-center py-24">

              <Spinner className="h-8 w-8" />

            </div>

          }
        >

          <PropertiesContent
            searchParams={params}
            isAdmin={isAdmin}
          />

        </Suspense>

      </div>

    </div>

  )

}