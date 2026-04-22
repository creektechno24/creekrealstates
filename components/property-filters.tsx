"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState, useTransition } from "react"
import { Search, Home, Building, LandPlot, LayoutGrid } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const propertyTypes = [
  { value: "all", label: "All Types", icon: LayoutGrid },
  { value: "House", label: "House", icon: Home },
  { value: "Flat", label: "Flat", icon: Building },
  { value: "Land", label: "Land", icon: LandPlot },
]

export function PropertyFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const currentSearch = searchParams.get("search") || ""
  const currentType = searchParams.get("type") || "all"

  const [searchValue, setSearchValue] = useState(currentSearch)

  function updateFilters(newSearch?: string, newType?: string) {
    const params = new URLSearchParams(searchParams.toString())

    if (newSearch !== undefined) {
      if (newSearch) {
        params.set("search", newSearch)
      } else {
        params.delete("search")
      }
    }

    if (newType !== undefined) {
      if (newType && newType !== "all") {
        params.set("type", newType)
      } else {
        params.delete("type")
      }
    }

    startTransition(() => {
      router.push(`/properties?${params.toString()}`)
    })
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    updateFilters(searchValue)
  }

  function handleTypeChange(type: string) {
    updateFilters(undefined, type)
  }

  return (
    <div className="mb-8 space-y-4">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by location..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Searching..." : "Search"}
        </Button>
      </form>

      {/* Type Filters */}
      <div className="flex flex-wrap gap-2">
        {propertyTypes.map((type) => {
          const Icon = type.icon
          const isActive = currentType === type.value
          return (
            <Button
              key={type.value}
              variant={isActive ? "default" : "outline"}
              size="sm"
              onClick={() => handleTypeChange(type.value)}
              disabled={isPending}
              className={cn(
                "gap-2",
                isActive && "bg-primary text-primary-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {type.label}
            </Button>
          )
        })}
      </div>
    </div>
  )
}
