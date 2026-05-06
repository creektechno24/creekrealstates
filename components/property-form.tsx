"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Home,
  Building,
  LandPlot,
  Upload,
} from "lucide-react"

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

  // BASIC
  const [title, setTitle] = useState(property?.title || "")
  const [price, setPrice] = useState(property?.price || "")

  // LOCATION
  const [city, setCity] = useState(property?.city || "")
  const [area, setArea] = useState(property?.area || "")
  const [landmark, setLandmark] = useState(
    property?.landmark || ""
  )

  // DETAILS
  const [description, setDescription] = useState(
    property?.description || ""
  )

  const [amenities, setAmenities] = useState(
    property?.amenities || ""
  )

  // VIDEO
  const [videoFile, setVideoFile] = useState<File | null>(null)

  const [videoUrl, setVideoUrl] = useState(
    property?.video_url || ""
  )

  // CONTACT
  const [phone, setPhone] = useState(property?.phone || "")

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault()

    setIsSubmitting(true)
    setError(null)

    // VALIDATIONS
    if (!title.trim()) {
      setError("Title is required")
      setIsSubmitting(false)
      return
    }

    if (!price || Number(price) <= 0) {
      setError("Enter valid price")
      setIsSubmitting(false)
      return
    }

    if (!city.trim()) {
      setError("City is required")
      setIsSubmitting(false)
      return
    }

    if (!area.trim()) {
      setError("Area / Locality is required")
      setIsSubmitting(false)
      return
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
      setError("Enter valid phone number")
      setIsSubmitting(false)
      return
    }

    const supabase = createClient()

    let uploadedVideoUrl = videoUrl

    // VIDEO UPLOAD
    if (videoFile) {

      const fileExt = videoFile.name
        .split(".")
        .pop()

      const fileName = `${Date.now()}.${fileExt}`

      const filePath = `videos/${fileName}`

      const { error: uploadError } =
        await supabase.storage
          .from("property-videos")
          .upload(filePath, videoFile)

      if (uploadError) {
        setError("Video upload failed")
        setIsSubmitting(false)
        return
      }

      const {
        data: { publicUrl },
      } = supabase.storage
        .from("property-videos")
        .getPublicUrl(filePath)

      uploadedVideoUrl = publicUrl
    }

    const propertyData = {
      title,
      price: Number(price),

      // TEMP LOCATION
      location: `${area}, ${city}`,

      type: selectedType,
      description,

      image_url: imageUrls[0] || null,

      images:
        imageUrls.length > 0
          ? imageUrls
          : null,

      phone,

      video_url:
        uploadedVideoUrl || null,
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

      setError(
        err instanceof Error
          ? err.message
          : "Failed"
      )

    } finally {

      setIsSubmitting(false)
    }
  }

  return (
    <Card className="rounded-2xl border bg-white shadow-xl">

      <CardContent className="space-y-8 p-8">

        <form
          onSubmit={handleSubmit}
          className="space-y-8"
        >

          {/* BASIC INFO */}
          <div className="space-y-5">

            <h2 className="text-lg font-semibold text-gray-900">
              Basic Information
            </h2>

            {/* TITLE */}
            <div className="space-y-2">

              <Label>
                Property Title *
              </Label>

              <Input
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                className="h-11 rounded-lg border-gray-300 focus:ring-2 focus:ring-primary/20"
                required
              />

            </div>

            {/* PRICE */}
            <div className="space-y-2">

              <Label>
                Price (in INR) *
              </Label>

              <Input
                type="number"
                value={price}
                onChange={(e) =>
                  setPrice(e.target.value)
                }
                className="h-11 rounded-lg border-gray-300 focus:ring-2 focus:ring-primary/20"
                required
              />

            </div>

            {/* LOCATION */}
            <div className="grid gap-5 md:grid-cols-2">

              {/* CITY */}
              <div className="space-y-2">

                <Label>City *</Label>

                <Input
                  value={city}
                  onChange={(e) =>
                    setCity(e.target.value)
                  }
                  placeholder="Enter city"
                  className="h-11 rounded-lg border-gray-300 focus:ring-2 focus:ring-primary/20"
                  required
                />

              </div>

              {/* AREA */}
              <div className="space-y-2">

                <Label>
                  Area / Locality *
                </Label>

                <Input
                  value={area}
                  onChange={(e) =>
                    setArea(e.target.value)
                  }
                  placeholder="Enter area or locality"
                  className="h-11 rounded-lg border-gray-300 focus:ring-2 focus:ring-primary/20"
                  required
                />

              </div>

            </div>

            {/* LANDMARK */}
            <div className="space-y-2">

              <Label>Landmark</Label>

              <Input
                value={landmark}
                onChange={(e) =>
                  setLandmark(e.target.value)
                }
                placeholder="Nearby landmark"
                className="h-11 rounded-lg border-gray-300 focus:ring-2 focus:ring-primary/20"
              />

            </div>

          </div>

          {/* PROPERTY TYPE */}
          <div className="space-y-4">

            <h2 className="text-lg font-semibold text-gray-900">
              Property Type
            </h2>

            <div className="grid grid-cols-3 gap-4">

              {propertyTypes.map((type) => {

                const Icon = type.icon

                const isSelected =
                  selectedType === type.value

                return (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() =>
                      setSelectedType(type.value)
                    }
                    className={cn(
                      "flex flex-col items-center gap-2 rounded-xl border p-5 transition-all hover:shadow-md",
                      isSelected
                        ? "border-primary bg-primary/10"
                        : "border-gray-200 bg-white"
                    )}
                  >

                    <Icon className="h-5 w-5" />

                    <span>
                      {type.label}
                    </span>

                  </button>
                )
              })}

            </div>

          </div>

          {/* ADDITIONAL DETAILS */}
          <div className="space-y-5">

            <h2 className="text-lg font-semibold text-gray-900">
              Additional Details
            </h2>

            {/* DESCRIPTION */}
            <div className="space-y-2">

              <Label>Description</Label>

              <Textarea
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                className="rounded-lg border-gray-300 focus:ring-2 focus:ring-primary/20"
              />

            </div>

            {/* AMENITIES */}
            <div className="space-y-2">

              <Label>Amenities</Label>

              <Textarea
                value={amenities}
                onChange={(e) =>
                  setAmenities(e.target.value)
                }
                placeholder="Swimming Pool, Gym, Lift, Parking..."
                className="rounded-lg border-gray-300 focus:ring-2 focus:ring-primary/20"
              />

            </div>

            {/* VIDEO UPLOAD */}
            <div className="space-y-2">

              <Label>
                Property Video
              </Label>

              <div className="rounded-xl border-2 border-dashed p-6 transition hover:border-primary">

                <div className="flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/30 p-8 text-center">

                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">

                    <Upload className="h-6 w-6 text-primary" />

                  </div>

                  <div>

                    <p className="text-sm font-medium text-foreground">
                      Click to upload property video
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      MP4, MOV up to 50MB
                    </p>

                  </div>

                  <Input
                    type="file"
                    accept="video/*"
                    capture="environment"
                    className="max-w-xs cursor-pointer"
                    onChange={(e) => {

                      const file =
                        e.target.files?.[0]

                      if (file) {
                        setVideoFile(file)
                      }

                    }}
                  />

                  {videoFile && (
                    <p className="text-xs text-green-600">
                      Selected:
                      {" "}
                      {videoFile.name}
                    </p>
                  )}

                </div>

              </div>

            </div>

            {/* IMAGES */}
            <div className="space-y-2">

              <Label>
                Property Images
              </Label>

              <div className="rounded-xl border-2 border-dashed p-6 transition hover:border-primary">

                <ImageUpload
                  values={imageUrls}
                  onChange={setImageUrls}
                  maxImages={4}
                />

              </div>

            </div>

            {/* PHONE */}
            <div className="space-y-2">

              <Label>
                Contact Phone Number *
              </Label>

              <Input
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value)
                }
                className="h-11 rounded-lg border-gray-300 focus:ring-2 focus:ring-primary/20"
                required
              />

            </div>

          </div>

          {/* ERROR */}
          {error && (
            <p className="text-sm text-red-500">
              {error}
            </p>
          )}

          {/* SUBMIT */}
          <Button
            type="submit"
            className="h-12 w-full rounded-xl text-base font-semibold"
          >

            {isSubmitting
              ? isEdit
                ? "Updating..."
                : "Posting..."
              : isEdit
                ? "Update Property"
                : "Post Property"}

          </Button>

        </form>

      </CardContent>

    </Card>
  )
}