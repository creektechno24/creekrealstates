"use client"

import Image from "next/image"
import { useState } from "react"
import { X } from "lucide-react"

export function PropertyImagePreview({ images }: { images: string[] }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <div>
      {/* Main Image */}
      <div className="relative aspect-video overflow-hidden rounded-xl">
        <Image
          src={images[0]}
          alt="main"
          fill
          className="object-cover cursor-pointer"
          onClick={() => setSelectedImage(images[0])}
        />
      </div>

      {/* Thumbnails */}
      <div className="mt-4 flex gap-3 overflow-x-auto">
        {images.map((img, index) => (
          <Image
            key={index}
            src={img}
            alt="thumb"
            width={100}
            height={80}
            className="rounded-lg object-cover cursor-pointer hover:scale-105 transition"
            onClick={() => setSelectedImage(img)}
          />
        ))}
      </div>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-5 right-5 text-white"
            onClick={() => setSelectedImage(null)}
          >
            <X size={32} />
          </button>

          <Image
            src={selectedImage}
            alt="preview"
            width={1000}
            height={800}
            className="max-h-[90%] max-w-[90%] rounded-lg object-contain"
          />
        </div>
      )}
    </div>
  )
}