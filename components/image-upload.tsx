"use client"

import { useState, useCallback, useRef } from "react"
import { Upload, X, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface MultiImageUploadProps {
  values: string[]
  onChange: (urls: string[]) => void
}

export function ImageUpload({
  values,
  onChange,
}: MultiImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = useCallback(async (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file")
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB")
      return
    }

    

    setIsUploading(true)

    // Simulate upload delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Convert to data URL for preview and storage
    const reader = new FileReader()
    reader.onloadend = () => {
      const dataUrl = reader.result as string
      onChange([...values, dataUrl])
      setIsUploading(false)
    }
    reader.readAsDataURL(file)
  }, [onChange, values])

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setIsDragging(false)

      const file = e.dataTransfer.files[0]
      if (file) {
        handleFile(file)
      }
    },
    [handleFile]
  )

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        handleFile(file)
      }
      // Reset input so the same file can be selected again
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    },
    [handleFile]
  )

  const handleRemove = useCallback((index: number) => {
    const newValues = values.filter((_, i) => i !== index)
    onChange(newValues)
  }, [onChange, values])

  const handleClick = useCallback(() => {
    fileInputRef.current?.click()
  }, [])


  // No images yet - show compact upload box
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
            <p className="text-xs text-muted-foreground">Uploading...</p>
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
                Upload unlimited property images
Upload unlimited property images
PNG, JPG, WEBP up to 5MB each
              </p>
            </div>
          </>
        )}
      </div>
    )
  }

  // Has images - show grid with previews and add button
  return (
    <div className="space-y-3">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleInputChange}
        className="hidden"
      />

      {/* Image grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {values.map((url, index) => (
          <div
            key={index}
            className="group relative aspect-square overflow-hidden rounded-lg border border-border bg-muted"
          >
            <Image
              src={url}
              alt={`Property image ${index + 1}`}
              fill
              className="object-cover"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute right-1 top-1 h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
              onClick={() => handleRemove(index)}
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Remove image</span>
            </Button>
          </div>
        ))}

        {/* Add more button (inline with images) */}
        {(
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
                <span className="text-xs text-muted-foreground">Add Image</span>
              </>
            )}
          </div>
        )}
      </div>

      {/* Image count */}
      <p className="text-xs text-muted-foreground">
        {values.length} images uploaded
      </p>
    </div>
  )
}
