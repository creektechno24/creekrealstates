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

    if (!title.trim()) return setError("Title is required"), setIsSubmitting(false)
    if (!price || Number(price) <= 0) return setError("Enter valid price"), setIsSubmitting(false)
    if (!location.trim()) return setError("Location is required"), setIsSubmitting(false)
    if (!/^[6-9]\d{9}$/.test(phone)) return setError("Enter valid phone number"), setIsSubmitting(false)

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
    <Card className="rounded-2xl shadow-xl border bg-white">
      <CardContent className="p-8 space-y-8">

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* BASIC INFO */}
          <div className="space-y-5">
            <h2 className="text-lg font-semibold text-gray-900">
              Basic Information
            </h2>

            <div className="space-y-2">
              <Label>Property Title *</Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="h-11 rounded-lg border-gray-300 focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Price (in INR) *</Label>
              <Input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="h-11 rounded-lg border-gray-300 focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Location *</Label>
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="h-11 rounded-lg border-gray-300 focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>
          </div>

          {/* TYPE */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Property Type
            </h2>

            <div className="grid grid-cols-3 gap-4">
              {propertyTypes.map((type) => {
                const Icon = type.icon
                const isSelected = selectedType === type.value

                return (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setSelectedType(type.value)}
                    className={cn(
                      "flex flex-col items-center gap-2 p-5 border rounded-xl transition-all hover:shadow-md",
                      isSelected
                        ? "border-primary bg-primary/10"
                        : "border-gray-200 bg-white"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{type.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* DETAILS */}
          <div className="space-y-5">
            <h2 className="text-lg font-semibold text-gray-900">
              Additional Details
            </h2>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="rounded-lg border-gray-300 focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="space-y-2">
              <Label>Property Images</Label>
              <div className="border-2 border-dashed rounded-xl p-6 hover:border-primary transition">
                <ImageUpload
                  values={imageUrls}
                  onChange={setImageUrls}
                  maxImages={4}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Contact Phone Number *</Label>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-11 rounded-lg border-gray-300 focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <Button
            type="submit"
            className="w-full h-12 text-base font-semibold rounded-xl"
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