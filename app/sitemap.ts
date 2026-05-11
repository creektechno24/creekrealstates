import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {

  return [

    {
      url: "https://creekrealestates.com",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },

    {
      url: "https://creekrealestates.com/properties",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },

    {
      url: "https://creekrealestates.com/privacy-policy",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },

    {
      url: "https://creekrealestates.com/terms-and-conditions",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },

    {
      url: "https://creekrealestates.com/website-usage-policy",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },

    {
      url: "https://creekrealestates.com/disclaimer",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },

  ]

}