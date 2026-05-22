//export const dynamic = "force-dynamic"

import Link from "next/link"
import Image from "next/image"  

import {
  ArrowRight,
  Search,
} from "lucide-react"

import { Button }
from "@/components/ui/button"

import { PropertyCard }
from "@/components/property-card"

import { createClient }
from "@/lib/supabase/server"

import type { Property }
from "@/lib/types"

async function getLatestProperties():
Promise<Property[]> {

  const supabase =
    await createClient()

  const {
    data,
    error,
  } =
    await supabase
      .from("properties")
.select(`
  id,
  title,
  price,
  location,
  type,
  description,
  image_url,
  images,
  phone,
  created_at,
  image_public_ids,
  video_public_ids
`)
      .order(
        "created_at",
        { ascending: false }
      )
      .limit(6)

  if (error) {

    console.log(
      "FULL ERROR =>",
      error
    )

    return []

  }

  return data as Property[]

}

export default async function HomePage() {

  const properties =
    await getLatestProperties()

  return (

    <>

      {/* HERO SECTION */}
      <section className="relative flex min-h-[60vh] w-full items-center justify-center overflow-hidden md:min-h-[78vh]">

        {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0">

  <Image
   src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop"
    alt="Luxury Property"
    fill
    priority
    className="object-cover"
    sizes="100vw"
  />

</div>

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/60" />

        {/* CONTENT */}
        <div className="relative z-10 flex w-full items-center justify-center px-4 py-16 text-center text-white md:py-24">

          <div>

            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-400">

              Creek Real Estates

            </p>

            <h1 className="mt-6 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">

              Find Your Dream Property

            </h1>
            

            <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-white/90 sm:text-xl sm:leading-9">

              Discover the perfect house,
              flat, or land for your needs.

            </p>

            {/* BUTTONS */}
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

              <Link href="/properties">

                <Button
                  size="lg"
                  className="w-full gap-2 px-8 shadow-xl sm:w-auto"
                >

                  <Search className="h-5 w-5" />

                  Browse Properties

                </Button>

              </Link>

              <Link href="/post-property">

                <Button
                  size="lg"
                  variant="outline"
                  className="w-full gap-2 border-white bg-white/10 px-8 text-white backdrop-blur hover:bg-white hover:text-black sm:w-auto"
                >

                  Post Property

                  <ArrowRight className="h-5 w-5" />

                </Button>

              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* LATEST PROPERTIES */}
      <section className="bg-gradient-to-b from-background to-muted/40 py-14 md:py-20">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* HEADING */}
          <div className="mb-12 flex flex-col items-center justify-between gap-4 sm:flex-row">

            {/* LEFT */}
            <div className="text-center sm:text-left">

              <h2 className="text-3xl font-bold sm:text-4xl">

                Latest Properties

              </h2>

              <div className="mt-2 h-1 w-16 rounded bg-primary" />

              <p className="mt-3 text-muted-foreground">

                Recently added premium listings

              </p>

            </div>

            {/* VIEW ALL */}
            <Link href="/properties">

              <Button
                variant="outline"
                className="gap-2 hover:shadow-md"
              >

                View All

                <ArrowRight className="h-4 w-4" />

              </Button>

            </Link>

          </div>

          {/* PROPERTIES GRID */}
          {properties.length > 0 ? (

            <div className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">

              {properties.map((property) => (

                <div
                  key={property.id}
                  className="transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                >

                  <PropertyCard
                    property={property}
                  />

                </div>

              ))}

            </div>

          ) : (

            <div className="rounded-lg border border-dashed border-border bg-muted/50 p-12 text-center">

              <p className="text-lg text-muted-foreground">

                No properties listed yet.

              </p>

              <Link
                href="/post-property"
                className="mt-4 inline-block"
              >

                <Button>

                  Be the first to post

                </Button>

              </Link>

            </div>

          )}

        </div>

      </section>

    </>

  )

}