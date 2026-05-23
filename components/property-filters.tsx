"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState, useTransition } from "react"
import { Search, Home, Building, LandPlot, Trees, LayoutGrid } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const propertyTypes = [
  { value: "all", label: "All Types", icon: LayoutGrid },

  { value: "House", label: "House", icon: Home },

  { value: "Flat", label: "Flat", icon: Building },

  { value: "Land", label: "Land", icon: Trees },

  { value: "Plots", label: "Plots", icon: LandPlot },
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
    <div className="mb-8 space-y-5">

      {/* 🔍 Search Bar */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search by location..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="pl-10 h-11 bg-white border-gray-300 focus:ring-2 focus:ring-primary/20 rounded-lg"
          />
        </div>

        <Button
          type="submit"
          disabled={isPending}
          className="h-11 px-6 bg-primary hover:bg-primary/90 text-white rounded-lg"
        >
          {isPending ? "Searching..." : "Search"}
        </Button>
      </form>

      {/* 🏷 Type Filters */}
      <div className="flex flex-wrap gap-3">
        {propertyTypes.map((type) => {
          const Icon = type.icon
          const isActive = currentType === type.value

          return (
            <button
              key={type.value}
              onClick={() => handleTypeChange(type.value)}
              disabled={isPending}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full text-sm border transition-all duration-200",
                isActive
                  ? "bg-primary text-white border-primary shadow-sm"
                  : "bg-white text-gray-700 border-gray-300 hover:border-primary hover:text-primary"
              )}
            >
              <Icon className="h-4 w-4" />
              {type.label}
            </button>
          )
        })}
      </div>

    </div>
  )
}