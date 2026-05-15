import type { MetadataRoute } from "next"

import { createClient }
from "@supabase/supabase-js"

export default async function sitemap():
Promise<MetadataRoute.Sitemap> {

  const baseUrl =
    "https://creekrealestates.com"

  // DIRECT SUPABASE CLIENT
  const supabase =
    createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

  const {
    data: properties,
  } =
    await supabase
      .from("properties")
      .select("id, created_at")

  const propertyUrls =
    (properties || []).map(
      (property:any) => ({

        url:
          `${baseUrl}/properties/${property.id}`,

        lastModified:
          new Date(property.created_at),

        changeFrequency:
          "weekly" as const,

        priority: 0.8,

      })
    )

  return [

    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },

    {
      url: `${baseUrl}/properties`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },

    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },

    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },

    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },

    {
      url: `${baseUrl}/terms-and-conditions`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },

    {
      url: `${baseUrl}/website-usage-policy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },

    {
      url: `${baseUrl}/disclaimer`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },

    ...propertyUrls,

  ]

}