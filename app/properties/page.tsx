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

// 🔥 FETCH PROPERTIES
async function getProperties(searchParams: SearchParams): Promise<Property[]> {
  const supabase = await createClient()

  let query = supabase.from("properties").select("*")

  if (searchParams.search) {
    query = query.ilike("location", `%${searchParams.search}%`)
  }

  if (searchParams.type && searchParams.type !== "all") {
    query = query.eq("type", searchParams.type)
  }

  query = query.order("created_at", { ascending: false })

  const { data, error } = await query

  if (error) {
    console.error("Error fetching properties:", error)
    return []
  }

  return data as Property[]
}

// 🔥 CONTENT
async function PropertiesContent({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const properties = await getProperties(searchParams)

  if (properties.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-100 p-12 text-center">
        <p className="text-lg font-medium text-gray-600">
          No properties found
          {searchParams.search ? ` in "${searchParams.search}"` : ""}.
        </p>
        <p className="mt-2 text-sm text-gray-500">
          Try adjusting your search or filters.
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
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
  const params = await searchParams

  const supabase = await createClient()

  // 🔐 (still fetching user, no issue if unused)
  await supabase.auth.getUser()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
            All Properties
          </h1>

          <p className="mt-2 text-gray-500 max-w-xl">
            Explore our curated collection of houses, flats, and land listings across prime locations.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-10">
          <PropertyFilters />
        </div>

        {/* Content */}
        <Suspense
          fallback={
            <div className="flex items-center justify-center py-24">
              <Spinner className="h-8 w-8" />
            </div>
          }
        >
          <PropertiesContent
            searchParams={params}
          />
        </Suspense>

      </div>
    </div>
  )
}