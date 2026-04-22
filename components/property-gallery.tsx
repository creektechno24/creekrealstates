"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function PropertyGallery({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0)

  function prev() {
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  function next() {
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="relative w-full">

      {/* Main Image */}
      <div className="relative aspect-video w-full overflow-hidden rounded-xl">
        <Image
          src={images[index]}
          alt="Property Image"
          fill
          className="object-cover transition-all duration-500"
        />

        {/* Left Arrow */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black"
        >
          <ChevronLeft />
        </button>

        {/* Right Arrow */}
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black"
        >
          <ChevronRight />
        </button>

        {/* Image count */}
        <div className="absolute bottom-3 right-3 rounded bg-black/70 px-3 py-1 text-sm text-white">
          {index + 1} / {images.length}
        </div>
      </div>

      {/* Dots */}
      <div className="mt-3 flex justify-center gap-2">
        {images.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 w-2 cursor-pointer rounded-full ${
              i === index ? "bg-primary" : "bg-gray-300"
            }`}
          />
        ))}
      </div>

    </div>
  )
}