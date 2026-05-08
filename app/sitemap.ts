import { MetadataRoute } from "next";

export default function sitemap():
  MetadataRoute.Sitemap {

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

  ];
}