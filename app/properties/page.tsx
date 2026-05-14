import { Suspense } from "react"

import { PropertyCard } from "@/components/property-card"
import { PropertyFilters } from "@/components/property-filters"
import { createClient } from "@/lib/supabase/server"
import type { Property } from "@/lib/types"
import { Spinner } from "@/components/ui/spinner"

export const dynamic = "force-dynamic"

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
      .select("*")

  // 🔍 SEARCH
  if (searchParams.search) {

    const search =
      searchParams.search.trim()

    const filters = [
      `title.ilike.%${search}%`,
      `city.ilike.%${search}%`,
      `area.ilike.%${search}%`,
      `landmark.ilike.%${search}%`,
      `description.ilike.%${search}%`,
      `location.ilike.%${search}%`,
      `type.ilike.%${search}%`,
      `amenities.ilike.%${search}%`,
    ].join(",")

    query = query.or(filters)

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

    console.error(
      "Error fetching properties:",
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

    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

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

    <div className="min-h-screen bg-gray-50">

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        {/* HEADING */}
        <div className="mb-8">

          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">

            All Properties

          </h1>

          <p className="mt-2 max-w-xl text-gray-500">

            Explore our curated collection
            of houses, flats, and land
            listings across prime locations.

          </p>

        </div>

        {/* FILTERS */}
        <div className="mb-10">

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