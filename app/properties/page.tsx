import { Suspense } from "react"

import Link from "next/link"

import { Button }
from "@/components/ui/button"

import { PropertyCard }
from "@/components/property-card"

import { PropertyFilters }
from "@/components/property-filters"

import { Spinner }
from "@/components/ui/spinner"

import { createClient }
from "@/lib/supabase/server"

import type { Property }
from "@/lib/types"

//export const dynamic = "force-dynamic"

interface SearchParams {
  search?: string
  type?: string
  page?: string
}

const ITEMS_PER_PAGE = 9

// 🔥 FETCH PROPERTIES
async function getProperties(
  searchParams: SearchParams
): Promise<{
  properties: Property[]
  totalCount: number
}> {

  const supabase =
    await createClient()

  const currentPage =
    Number(searchParams.page || "1")

  const from =
    (currentPage - 1) *
    ITEMS_PER_PAGE

  const to =
    from + ITEMS_PER_PAGE - 1

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
  created_at,
  image_public_ids,
  video_public_ids
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

  // 📅 ORDER + PAGINATION
  query = query
    .order(
      "created_at",
      { ascending: false }
    )
    .range(from, to)

  const {
    data,
    error,
  } = await query

  // 🔢 TOTAL COUNT
  const {
    count,
  } = await supabase
    .from("properties")
    .select("*", {
      count: "exact",
      head: true,
    })

  if (error) {

    console.log(
      "SUPABASE ERROR =>",
      error
    )

    return {
      properties: [],
      totalCount: 0,
    }

  }

  return {
    properties:
      data as Property[],
    totalCount:
      count || 0,
  }

}

// 🔥 CONTENT
async function PropertiesContent({
  searchParams,
  isAdmin,
}: {
  searchParams: SearchParams
  isAdmin: boolean
}) {

  const {
    properties,
    totalCount,
  } =
    await getProperties(searchParams)

  const currentPage =
    Number(searchParams.page || "1")

  const totalPages =
    Math.ceil(
      totalCount / ITEMS_PER_PAGE
    )

  // ❌ EMPTY STATE
  if (properties.length === 0) {

    return (

      <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-100 p-8 text-center sm:p-12">

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

    <>

      <div className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">

        {properties.map((property) => (

          <PropertyCard
            key={property.id}
            property={property}
            isAdmin={isAdmin}
          />

        ))}

      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (

        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">

          {Array.from(
            {
              length:
                totalPages,
            },
            (_, i) => i + 1
          ).map((page) => (

            <Link
              key={page}
              href={`/properties?page=${page}`}
              className={`flex h-11 w-11 items-center justify-center rounded-xl text-sm font-semibold transition ${
                currentPage === page
                  ? "bg-emerald-500 text-white"
                  : "bg-white text-slate-700 hover:bg-slate-100"
              }`}
            >

              {page}

            </Link>

          ))}

        </div>

      )}

    </>

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
        <section className="relative flex min-h-[55vh] w-full items-center justify-center overflow-hidden md:min-h-[72vh]">

          {/* BACKGROUND IMAGE */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
"url('https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=1600&auto=format&fit=crop')"            }}
          />

          {/* DARK OVERLAY */}
          <div className="absolute inset-0 bg-black/55" />

          {/* CONTENT */}
          <div className="relative z-10 flex w-full items-center justify-center px-4 py-16 text-center text-white md:py-24">

            <div>

              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-400">

                Creek Real Estates

              </p>

              <h1 className="mt-6 text-3xl font-bold leading-tight sm:text-5xl lg:text-7xl">

                Discover Premium
                <br />
                Properties

              </h1>

              <p className="mx-auto mt-8 max-w-3xl text-base leading-8 text-white/90 sm:text-xl sm:leading-9">

              Explore our curated collection
of houses, flats, land, and plots
across prime locations.
              </p>

              {/* BUTTONS */}
              <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

                <Link href="/about">

                  <Button
                    size="lg"
                    className="w-full gap-2 px-8 shadow-xl sm:w-auto"
                  >

                    About Us

                  </Button>

                </Link>

                <Link href="/contact">

                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full gap-2 border-white bg-white/10 px-8 text-white backdrop-blur hover:bg-white hover:text-black sm:w-auto"
                  >

                    Contact Us

                  </Button>

                </Link>

              </div>

            </div>

          </div>

        </section>

        {/* FILTERS */}
        <div className="mb-10 border-b border-slate-100 bg-white/80 p-4 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.04)] sm:p-6">

          <div className="mx-auto max-w-7xl">

            <PropertyFilters />

          </div>

        </div>

        {/* CONTENT */}
        <div className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 md:pb-20 lg:px-8">

          <Suspense
            fallback={

              <div className="flex items-center justify-center py-16 md:py-24">

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

    </div>

  )

}