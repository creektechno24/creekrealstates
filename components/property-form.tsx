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

export function PropertyForm({
  property,
  isEdit = false,
  onSuccess,
}: {
  property?: any
  isEdit?: boolean
  onSuccess?: () => void
}) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [selectedType, setSelectedType] = useState<PropertyType>(
    property?.type || "Flat"
  )

  const [imageUrls, setImageUrls] = useState<string[]>(
    property?.images || []
  )

  const [title, setTitle] = useState(property?.title || "")
  const [price, setPrice] = useState(property?.price || "")
  const [location, setLocation] = useState(property?.location || "")
  const [description, setDescription] = useState(property?.description || "")
  const [phone, setPhone] = useState(property?.phone || "")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const supabase = createClient()

    const propertyData = {
      title,
      price: Number(price),
      location,
      type: selectedType,
      description,
      image_url: imageUrls[0] || null,
      images: imageUrls.length > 0 ? imageUrls : null,
      phone,
    }

    try {
      if (isEdit) {
        const { error } = await supabase
          .from("properties")
          .update(propertyData)
          .eq("id", property.id)

        if (error) throw error

        onSuccess?.()
      } else {
        const { error } = await supabase
          .from("properties")
          .insert(propertyData)

        if (error) throw error

        router.push("/properties")
        router.refresh()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="border-0 shadow-none">
      <CardContent className="p-6 space-y-6">

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Title */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Property Title *</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-11 rounded-lg border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20"
              required
            />
          </div>

          {/* Price */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Price (in INR) *</Label>
            <Input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="h-11 rounded-lg border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20"
              required
            />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Location *</Label>
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="h-11 rounded-lg border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20"
              required
            />
          </div>

          {/* Property Type */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Property Type *</Label>

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
                      "flex flex-col items-center justify-center gap-2 p-4 border rounded-xl transition-all duration-200 hover:shadow-md hover:border-primary",
                      isSelected
                        ? "border-primary bg-primary/10 shadow-sm"
                        : "border-gray-200 bg-white"
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-5 w-5",
                        isSelected ? "text-primary" : "text-gray-500"
                      )}
                    />
                    <span className="text-sm font-medium">{type.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Description</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="rounded-lg border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Images */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Property Images</Label>

            <div className="border-2 border-dashed rounded-xl p-4 hover:border-primary transition">
              <ImageUpload
                values={imageUrls}
                onChange={setImageUrls}
                maxImages={4}
              />
            </div>

            <p className="text-xs text-muted-foreground">
              Upload up to 4 images
            </p>
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">
              Contact Phone Number *
            </Label>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="h-11 rounded-lg border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20"
              required
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          {/* Submit */}
          <Button
            type="submit"
            className="w-full h-11 text-base font-medium rounded-lg"
          >
            {isSubmitting
              ? isEdit ? "Updating..." : "Posting..."
              : isEdit ? "Update Property" : "Post Property"}
          </Button>

        </form>
      </CardContent>
    </Card>
  )
}