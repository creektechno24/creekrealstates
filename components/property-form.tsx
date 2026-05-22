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
import { uploadFile } from "../lib/storage/upload"

const propertyTypes = [
  { value: "House", label: "House", icon: Home },

  { value: "Flat", label: "Flat", icon: Building },

  { value: "Land", label: "Land", icon: LandPlot },

  { value: "Plots", label: "Plots", icon: LandPlot },
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

 const [imageUrls, setImageUrls] = useState<any[]>(
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

  const amenitiesList = [
  "Parking",
  "Lift",
  "Gym",
  "Security",
  "Swimming Pool",
  "Power Backup",
  "Garden",
  "Club House",
  "Children Play Area",
  "CCTV",
]

const [selectedAmenities, setSelectedAmenities] =
  useState<string[]>(
    property?.amenities
      ? property.amenities.split(",")
      : []
  )

const [customAmenity, setCustomAmenity] =
  useState("")

  // VIDEO
const [videoFiles, setVideoFiles] =
  useState<File[]>([])  

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

    let uploadedVideoUrls: string[] =
  property?.video_urls || []

  let uploadedVideoPublicIds: string[] = []

if (videoFiles.length > 0) {

  uploadedVideoUrls = []

  for (const file of videoFiles) {

    try {

      const uploadedFile =
        await uploadFile(file)

      uploadedVideoUrls.push(
        uploadedFile.url
      )
      uploadedVideoPublicIds.push(
  uploadedFile.publicId
)

    } catch (error) {

      setError("Video upload failed")

      setIsSubmitting(false)

      return

    }

  }

}


   const propertyData = {
  title,
  price: Number(price),

  // LOCATION
  city,
  area,
  landmark,

  // DISPLAY LOCATION
  location: `${area}, ${city}`,

  // PROPERTY TYPE
  type: selectedType,

  // DESCRIPTION
  description,

  // AMENITIES
  amenities: selectedAmenities.join(","),

  // IMAGES
  image_url:
  imageUrls[0]?.url || null,

images:
  imageUrls.length > 0
    ? imageUrls.map(
        (item) => item.url
      )
    : null,

  // CONTACT
  phone,

  // VIDEO
 // VIDEOS
video_urls:
  uploadedVideoUrls.length > 0
    ? uploadedVideoUrls
    : null,

// FIRST VIDEO FALLBACK
video_url:
  uploadedVideoUrls[0] || null,


  image_public_ids:
  imageUrls.map(
    (item) => item.publicId
  ),

video_public_ids:
  uploadedVideoPublicIds,
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

      <CardContent className="space-y-6 p-5 sm:p-6">

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* BASIC INFO */}
          <div className="space-y-4">

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

            <div className="grid grid-cols-3 gap-3">

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
                      "flex flex-col items-center gap-2 rounded-xl border p-4 transition-all hover:shadow-md",
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
<div className="space-y-5">

  <Label className="text-base font-semibold text-gray-900">
    Amenities
  </Label>

  {/* CHECKBOX GRID */}
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

    {amenitiesList.map((amenity) => {

      const checked =
        selectedAmenities.includes(amenity)

      const amenityIcons: Record<string, string> = {
        Parking: "🚗",
        Lift: "🛗",
        Gym: "🏋️",
        Security: "🛡️",
        "Swimming Pool": "🏊",
        "Power Backup": "🔋",
        Garden: "🌳",
        "Club House": "🏡",
        "Children Play Area": "🛝",
        CCTV: "📹",
      }

      return (

        <label
          key={amenity}
          className={`group relative flex cursor-pointer items-center gap-4 overflow-hidden rounded-2xl border p-5 transition-all duration-300 ${
            checked
              ? "border-primary bg-primary/[0.08] shadow-lg"
              : "border-gray-200 bg-white hover:border-primary/30 hover:shadow-md"
          }`}
        >

          {/* GLOW */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.02] to-primary/[0.05] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* CHECKBOX */}
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => {

              if (e.target.checked) {

                setSelectedAmenities((prev) => [
                  ...prev,
                  amenity,
                ])

              } else {

                setSelectedAmenities((prev) =>
                  prev.filter(
                    (item) =>
                      item !== amenity
                  )
                )

              }

            }}
            className="relative z-10 h-5 w-5 rounded border-gray-300"
          />

          {/* ICON */}
          <div
            className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl text-2xl transition-all duration-300 ${
              checked
                ? "bg-primary/15"
                : "bg-gray-100 group-hover:bg-primary/10"
            }`}
          >

            {amenityIcons[amenity] || "✨"}

          </div>

          {/* TEXT */}
          <div className="relative z-10">

            <p
              className={`text-base font-semibold transition-colors ${
                checked
                  ? "text-primary"
                  : "text-gray-800"
              }`}
            >

              {amenity}

            </p>

        

          </div>

        </label>

      )
    })}

  </div>

  {/* CUSTOM */}
  <div className="space-y-3">

    <Label className="text-sm font-medium text-gray-700">

      Custom Amenity

    </Label>

    <div className="flex gap-3">

      <Input
        value={customAmenity}
        onChange={(e) =>
          setCustomAmenity(
            e.target.value
          )
        }
        placeholder="Example: Mini Theatre"
        className="h-12 rounded-xl border-gray-300"
      />

      <Button
        type="button"
        className="h-12 rounded-xl px-6"
        onClick={() => {

          const trimmed =
            customAmenity.trim()

          if (
            trimmed &&
            !selectedAmenities.includes(trimmed)
          ) {

            setSelectedAmenities((prev) => [
              ...prev,
              trimmed,
            ])

            setCustomAmenity("")

          }

        }}
      >

        Add

      </Button>

    </div>

  </div>

  {/* SELECTED */}
  {selectedAmenities.length > 0 && (

    <div className="rounded-2xl border border-primary/10 bg-primary/[0.04] p-4">

      <div className="mb-3 flex items-center justify-between">

        <p className="text-sm font-semibold text-primary">

          Selected Amenities

        </p>

        <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">

          {selectedAmenities.length} Selected

        </div>

      </div>

      <div className="flex flex-wrap gap-3">

        {selectedAmenities.map((item) => (

          <div
            key={item}
            className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-sm"
          >

            <span>

              {{
                Parking: "🚗",
                Lift: "🛗",
                Gym: "🏋️",
                Security: "🛡️",
                "Swimming Pool": "🏊",
                "Power Backup": "🔋",
                Garden: "🌳",
                "Club House": "🏡",
                "Children Play Area": "🛝",
                CCTV: "📹",
              }[item] || "✨"}

            </span>

            {item}

          </div>

        ))}

      </div>

    </div>

  )}

</div>
           {/* VIDEO UPLOAD */}
<div className="space-y-2">

  <Label>
    Property Video
  </Label>

  <div className="rounded-xl border-2 border-dashed border-gray-300 p-6 transition hover:border-primary">

    <label className="flex cursor-pointer flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 px-6 py-10 text-center transition hover:bg-primary/5">

      {/* ICON */}
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">

        <Upload className="h-8 w-8 text-primary" />

      </div>

      {/* TEXT */}
      <div>

        <p className="text-base font-semibold text-gray-900">

          Click to upload property video

        </p>

        <p className="mt-1 text-sm text-gray-500">

          MP4, MOV up to 50MB

        </p>

      </div>

      {/* HIDDEN INPUT */}
    <input
  type="file"
  accept="video/*"
  multiple
  capture="environment"
  className="hidden"
  onChange={(e) => {

    const files = Array.from(
      e.target.files || []
    )

    if (files.length > 0) {

      setVideoFiles((prev) => [
        ...prev,
        ...files,
      ])

    }

  }}
/>

    </label>

    {/* FILE PREVIEW */}
    {videoFiles.length > 0 && (

  <div className="mt-4 space-y-3">

    {videoFiles.map((file, index) => (

      <div
        key={index}
        className="rounded-xl border bg-green-50 p-4"
      >

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-xl">

              🎥

            </div>

            <div>

              <p className="max-w-[220px] truncate text-sm font-semibold text-gray-900">

                {file.name}

              </p>

              <p className="text-xs text-gray-500">

                Video selected successfully

              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => {

              setVideoFiles((prev) =>
                prev.filter(
                  (_, i) => i !== index
                )
              )

            }}
            className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
          >

            Remove

          </button>

        </div>

      </div>

    ))}

  </div>

)}

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