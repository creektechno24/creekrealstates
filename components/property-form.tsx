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

        alert("Updated successfully ✅")
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
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Title */}
          <div className="space-y-2">
            <Label>Property Title *</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Price */}
          <div className="space-y-2">
            <Label>Price (in INR) *</Label>
            <Input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label>Location *</Label>
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
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
                      "flex flex-col items-center gap-2 rounded-lg border-2 p-4",
                      isSelected
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border"
                    )}
                  >
                    <Icon className="h-6 w-6" />
                    <span>{type.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>

          {/* Images */}
          <div className="space-y-2">
            <Label>Property Images</Label>
            <ImageUpload
              values={imageUrls}
              onChange={setImageUrls}
              maxImages={4}
            />
            <p className="text-xs text-muted-foreground">
              Upload up to 4 images
            </p>
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label>Contact Phone Number *</Label>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          {/* Submit */}
          <Button type="submit" className="w-full">
            {isSubmitting
              ? isEdit ? "Updating..." : "Posting..."
              : isEdit ? "Update Property" : "Post Property"}
          </Button>

        </form>
      </CardContent>
    </Card>
  )
}