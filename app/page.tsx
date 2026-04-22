import Link from "next/link"
import { ArrowRight, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

import { PropertyCard } from "@/components/property-card"
import { createClient } from "@/lib/supabase/server"
import type { Property } from "@/lib/types"

async function getLatestProperties(): Promise<Property[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(6)

  if (error) {
    console.error("Error fetching properties:", error)
    return []
  }

  return data as Property[]
}

export default async function HomePage() {
  const properties = await getLatestProperties()

  return (
    <>
      {/* Hero Section */}
      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 text-center text-white">
          <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl">
            Find Your Dream Property
          </h1>

          <p className="mt-6 text-lg text-white/90 sm:text-xl">
            Discover the perfect house, flat, or land for your needs.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row justify-center">
            <Link href="/properties">
              <Button size="lg" className="gap-2 px-8 shadow-lg">
                <Search className="h-5 w-5" />
                Browse Properties
              </Button>
            </Link>

            <Link href="/post-property">
              <Button
                size="lg"
                variant="outline"
                className="gap-2 border-white bg-white/10 px-8 text-white backdrop-blur hover:bg-white hover:text-black"
              >
                Post Property
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

     {/* 🔥 UPDATED Latest Properties Section */}
<section className="py-20 bg-gradient-to-b from-background to-muted/40">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    
    {/* Heading + View All */}
    <div className="mb-12 flex flex-col items-center justify-between gap-4 sm:flex-row">
      
      {/* Left */}
      <div className="text-center sm:text-left">
        <h2 className="text-3xl font-bold sm:text-4xl">
          Latest Properties
        </h2>

        <div className="mt-2 h-1 w-16 rounded bg-primary" />

        <p className="mt-3 text-muted-foreground">
          Recently added premium listings
        </p>
      </div>

      {/* Right - View All */}
      <Link href="/properties">
        <Button variant="outline" className="gap-2 hover:shadow-md">
          View All
          <ArrowRight className="h-4 w-4" />
        </Button>
      </Link>
    </div>

    {/* Cards */}
    {properties.length > 0 ? (
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <div
            key={property.id}
            className="transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
          >
            <PropertyCard property={property} />
          </div>
        ))}
      </div>
    ) : (
      <div className="rounded-lg border border-dashed border-border bg-muted/50 p-12 text-center">
        <p className="text-lg text-muted-foreground">
          No properties listed yet.
        </p>
        <Link href="/post-property" className="mt-4 inline-block">
          <Button>Be the first to post</Button>
        </Link>
      </div>
    )}
  </div>
</section>
    </>
  )
}