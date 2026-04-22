"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Home, Building, LandPlot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { ImageUpload } from "@/components/image-upload"
import { createClient } from "@/lib/supabase/client"

const propertyTypes = [
  { value: "House", label: "House", icon: Home },
  { value: "Flat", label: "Flat", icon: Building },
  { value: "Land", label: "Land", icon: LandPlot },
] as const

type PropertyType = (typeof propertyTypes)[number]["value"]

export function PropertyForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedType, setSelectedType] = useState<PropertyType>("Flat")
  const [imageUrls, setImageUrls] = useState<string[]>([])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(e.currentTarget)

    

   const property = {
  title: formData.get("title") as string,
  price: Number(formData.get("price")),
  location: formData.get("location") as string,
  type: selectedType,
  description: formData.get("description") as string,
  image_url: imageUrls[0] || null,   // keep for fallback
  images: imageUrls.length > 0 ? imageUrls : null, // 🔥 ADD THIS
  phone: formData.get("phone") as string,
}
    try {
      const supabase = createClient()
      const { error: insertError } = await supabase.from("properties").insert(property)

      if (insertError) {
        throw new Error(insertError.message)
      }

      router.push("/properties")
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to post property")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Property Title *</Label>
            <Input
              id="title"
              name="title"
              placeholder="e.g., Modern 3BHK Apartment in Koramangala"
              required
            />
          </div>

          {/* Price */}
          <div className="space-y-2">
            <Label htmlFor="price">Price (in INR) *</Label>
            <Input
              id="price"
              name="price"
              type="number"
              placeholder="e.g., 8500000"
              min="0"
              required
            />
            <p className="text-xs text-muted-foreground">
              Enter the full amount in rupees (e.g., 85 lakhs = 8500000)
            </p>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">Location *</Label>
            <Input
              id="location"
              name="location"
              placeholder="e.g., Indiranagar, Bangalore"
              required
            />
          </div>

          {/* Property Type */}
          <div className="space-y-2">
            <Label>Property Type *</Label>
            <div className="grid grid-cols-3 gap-3">
              {propertyTypes.map((type) => {
                const Icon = type.icon
                const isSelected = selectedType === type.value
                return (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setSelectedType(type.value)}
                    className={cn(
                      "flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all",
                      isSelected
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <Icon className="h-6 w-6" />
                    <span className="text-sm font-medium">{type.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe your property (amenities, features, etc.)"
              rows={4}
            />
          </div>

          {/* Property Image */}
          <div className="space-y-2">
            <Label>Property Image</Label>
            <ImageUpload values={imageUrls} onChange={setImageUrls} maxImages={4} />
            <p className="text-xs text-muted-foreground">
              Upload up to 4 photos of your property (max 5MB each)
            </p>
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone">Contact Phone Number *</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="e.g., 9876543210"
              pattern="[0-9]{10}"
              required
            />
            
            <p className="text-xs text-muted-foreground">
              Enter a 10-digit phone number
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
            {isSubmitting ? "Posting..." : "Post Property"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}