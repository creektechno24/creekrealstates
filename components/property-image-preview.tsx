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

    ...images
      .filter(
        (img) =>
          img &&
          img.trim() !== ""
      )
      .map((img) => ({
        type: "image" as const,
        url: img,
      })),

    ...videoUrls
      .filter(
        (video) =>
          video &&
          video.trim() !== ""
      )
      .map((video) => ({
        type: "video" as const,
        url: video,
      })),

  ]

  const [selectedIndex, setSelectedIndex] =
    useState(0)

  const [fullscreen, setFullscreen] =
    useState(false)

  if (galleryItems.length === 0) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-2xl bg-gray-100">
        No images available
      </div>
    )
  }

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

      <div className="relative aspect-video overflow-hidden rounded-2xl bg-black">

        <div
          className="relative h-full w-full cursor-pointer"
          onClick={() => setFullscreen(true)}
        >

          {selectedItem.type === "image" && selectedItem.url ? (

            <Image
              src={selectedItem.url}
              alt="Property"
              fill
              sizes="100vw"
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

        {galleryItems.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white"
            >
              <ChevronLeft size={22}/>
            </button>

            <button
              onClick={next}
              className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white"
            >
              <ChevronRight size={22}/>
            </button>
          </>
        )}

      </div>

      <div className="mt-4 flex gap-3 overflow-x-auto pb-2">

        {galleryItems.map((item,index)=>(

          <div
            key={index}
            onClick={()=>setSelectedIndex(index)}
            className={`relative h-24 w-32 flex-shrink-0 overflow-hidden rounded-xl border-2 ${
              selectedIndex===index
              ? "border-primary"
              : "border-transparent"
            }`}
          >

            {item.type==="image" && item.url ? (

              <Image
                src={item.url}
                alt="thumb"
                fill
                sizes="120px"
                className="object-cover"
              />

            ) : null}

          </div>

        ))}

      </div>

    </div>
  )
}