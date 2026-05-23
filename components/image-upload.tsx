"use client"

import { useState, useCallback, useRef } from "react"
import { Upload, X, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { uploadFile } from "../lib/storage/upload"

interface UploadedImage {
  url: string
  publicId: string
}

interface MultiImageUploadProps {
  values: UploadedImage[]
  onChange: (urls: UploadedImage[]) => void
}

export function ImageUpload({
  values,
  onChange,
}: MultiImageUploadProps) {

  const [isDragging, setIsDragging] =
    useState(false)

  const [isUploading, setIsUploading] =
    useState(false)

  const fileInputRef =
    useRef<HTMLInputElement>(null)

  const handleFile = useCallback(
    async (file: File) => {

      if (!file.type.startsWith("image/")) {

        alert("Please upload an image file")

        return

      }

      if (file.size > 5 * 1024 * 1024) {

        alert("Image size should be less than 5MB")

        return

      }

      setIsUploading(true)

      try {

        const uploadedFile =
          await uploadFile(file)

        onChange([
          ...values,
          {
            url: uploadedFile.url,
            publicId:
              uploadedFile.publicId,
          },
        ])

      } catch (error) {

        console.error(error)

        alert("Image upload failed")

      } finally {

        setIsUploading(false)

      }

    },
    [onChange, values]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {

      e.preventDefault()

      setIsDragging(false)

      const file =
        e.dataTransfer.files[0]

      if (file) {

        handleFile(file)

      }

    },
    [handleFile]
  )

  const handleDragOver = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {

      e.preventDefault()

      setIsDragging(true)

    },
    []
  )

  const handleDragLeave = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {

      e.preventDefault()

      setIsDragging(false)

    },
    []
  )

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {

      const file =
        e.target.files?.[0]

      if (file) {

        handleFile(file)

      }

      if (fileInputRef.current) {

        fileInputRef.current.value = ""

      }

    },
    [handleFile]
  )

  const handleRemove = useCallback(
    (index: number) => {

      const newValues =
        values.filter((_, i) => i !== index)

      onChange(newValues)

    },
    [onChange, values]
  )

  const handleClick = useCallback(() => {

    fileInputRef.current?.click()

  }, [])

  if (values.length === 0) {

    return (

      <div
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`relative flex h-32 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed transition-colors ${
          isDragging
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25 bg-muted/50 hover:border-primary/50 hover:bg-muted"
        }`}
      >

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleInputChange}
          className="hidden"
        />

        {isUploading ? (

          <div className="flex flex-col items-center gap-2">

            <div className="h-8 w-8 animate-spin rounded-full border-3 border-primary border-t-transparent" />

            <p className="text-xs text-muted-foreground">

              Uploading...

            </p>

          </div>

        ) : (

          <>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">

              <Upload className="h-5 w-5 text-primary" />

            </div>

            <div className="text-center">

              <p className="text-sm font-medium text-foreground">

                Click to upload or drag and drop

              </p>

              <p className="text-xs text-muted-foreground">

                PNG, JPG, WEBP up to 5MB each

              </p>

            </div>

          </>

        )}

      </div>

    )

  }

  return (

    <div className="space-y-3">

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleInputChange}
        className="hidden"
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">

        {values.map((image, index) => (

          <div
            key={index}
            className="group relative aspect-square overflow-hidden rounded-lg border border-border bg-muted"
          >

           {image?.url ? (
  <Image
    src={image.url}
    alt={`Property image ${index + 1}`}
    fill
    className="object-cover"
  />
) : (
  <div className="flex h-full items-center justify-center text-sm text-gray-500">
    No image
  </div>
)}
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute right-1 top-1 h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
              onClick={() => handleRemove(index)}
            >

              <X className="h-3 w-3" />

              <span className="sr-only">

                Remove image

              </span>

            </Button>

          </div>

        ))}

        <div
          onClick={handleClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`flex aspect-square cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed transition-colors ${
            isDragging
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 bg-muted/50 hover:border-primary/50 hover:bg-muted"
          }`}
        >

          {isUploading ? (

            <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />

          ) : (

            <>

              <Plus className="h-6 w-6 text-muted-foreground" />

              <span className="text-xs text-muted-foreground">

                Add Image

              </span>

            </>

          )}

        </div>

      </div>

      <p className="text-xs text-muted-foreground">

        {values.length} images uploaded

      </p>

    </div>

  )

}