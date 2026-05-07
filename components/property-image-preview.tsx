"use client"

import Image from "next/image"
import { useState } from "react"

import {
  Play,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

interface PropertyImagePreviewProps {
  images: string[]
  videoUrls?: string[]
}

type GalleryItem =
  | {
      type: "image"
      url: string
    }
  | {
      type: "video"
      url: string
    }

export function PropertyImagePreview({
  images,
  videoUrls = [],
}: PropertyImagePreviewProps) {

  const galleryItems: GalleryItem[] = [

    ...images.map((img) => ({
      type: "image" as const,
      url: img,
    })),

    ...videoUrls.map((video) => ({
      type: "video" as const,
      url: video,
    })),

  ]

  const [selectedIndex, setSelectedIndex] =
    useState(0)

  const [fullscreen, setFullscreen] =
    useState(false)

  const selectedItem =
    galleryItems[selectedIndex]

  function prev() {

    setSelectedIndex((prev) =>
      prev === 0
        ? galleryItems.length - 1
        : prev - 1
    )

  }

  function next() {

    setSelectedIndex((prev) =>
      prev === galleryItems.length - 1
        ? 0
        : prev + 1
    )

  }

  return (
    <div>

      {/* MAIN */}
      <div className="relative aspect-video overflow-hidden rounded-2xl bg-black">

        <div
          className="relative h-full w-full cursor-pointer"
          onClick={() => setFullscreen(true)}
        >

          {selectedItem.type === "image" ? (

            <Image
              src={selectedItem.url}
              alt="Property"
              fill
              className="object-cover"
            />

          ) : (

            <video
              controls
              className="h-full w-full object-contain"
            >

              <source
                src={selectedItem.url}
                type="video/mp4"
              />

            </video>

          )}

        </div>

        {/* LEFT */}
        {galleryItems.length > 1 && (

          <button
            onClick={prev}
            className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white backdrop-blur hover:bg-black"
          >

            <ChevronLeft size={22} />

          </button>

        )}

        {/* RIGHT */}
        {galleryItems.length > 1 && (

          <button
            onClick={next}
            className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white backdrop-blur hover:bg-black"
          >

            <ChevronRight size={22} />

          </button>

        )}

        {/* COUNT */}
        <div className="absolute bottom-3 right-3 rounded bg-black/70 px-3 py-1 text-sm text-white">

          {selectedIndex + 1} / {galleryItems.length}

        </div>

      </div>

      {/* THUMBNAILS */}
      <div className="mt-4 flex gap-3 overflow-x-auto pb-2">

        {galleryItems.map((item, index) => (

          <div
            key={index}
            onClick={() =>
              setSelectedIndex(index)
            }
            className={`relative h-24 w-32 flex-shrink-0 cursor-pointer overflow-hidden rounded-xl border-2 transition-all ${
              selectedIndex === index
                ? "border-primary"
                : "border-transparent"
            }`}
          >

            {item.type === "image" ? (

              <Image
                src={item.url}
                alt="thumb"
                fill
                className="object-cover"
              />

            ) : (

              <div className="relative h-full w-full bg-black">

                <video className="h-full w-full object-cover opacity-80">

                  <source
                    src={item.url}
                    type="video/mp4"
                  />

                </video>

                <div className="absolute inset-0 flex items-center justify-center">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90">

                    <Play
                      className="ml-1 h-5 w-5 text-black"
                      fill="black"
                    />

                  </div>

                </div>

              </div>

            )}

          </div>

        ))}

      </div>

      {/* FULLSCREEN */}
      {fullscreen && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4">

          {/* CLOSE */}
          <button
            className="absolute right-5 top-5 z-50 text-white"
            onClick={() =>
              setFullscreen(false)
            }
          >

            <X size={36} />

          </button>

          {/* LEFT */}
          {galleryItems.length > 1 && (

            <button
              onClick={prev}
              className="absolute left-5 z-50 rounded-full bg-black/60 p-3 text-white"
            >

              <ChevronLeft size={30} />

            </button>

          )}

          {/* RIGHT */}
          {galleryItems.length > 1 && (

            <button
              onClick={next}
              className="absolute right-5 z-50 rounded-full bg-black/60 p-3 text-white"
            >

              <ChevronRight size={30} />

            </button>

          )}

          {/* CONTENT */}
          {selectedItem.type === "image" ? (

            <Image
              src={selectedItem.url}
              alt="preview"
              width={1600}
              height={1200}
              className="max-h-[90vh] max-w-[95vw] object-contain"
            />

          ) : (

            <video
              controls
              autoPlay
              className="max-h-[90vh] max-w-[95vw]"
            >

              <source
                src={selectedItem.url}
                type="video/mp4"
              />

            </video>

          )}

        </div>

      )}

    </div>
  )
}