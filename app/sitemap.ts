import type { MetadataRoute } from "next";

import { createClient }
  from "@/lib/supabase/server";

export default async function sitemap():
  Promise<MetadataRoute.Sitemap> {

  const supabase =
    await createClient();

  const { data: properties } =
    await supabase
      .from("properties")
      .select("id, updated_at");

  const propertyUrls =
    (properties || []).map(
      (property) => ({

        url:
          `https://creekrealestates.com/properties/${property.id}`,

        lastModified:
          property.updated_at
            || new Date(),

        changeFrequency:
          "daily" as const,

        priority:
          0.8,

      })
    );

  return [

    {
      url:
        "https://creekrealestates.com",

      lastModified:
        new Date(),

      changeFrequency:
        "daily",

      priority:
        1,
    },

    {
      url:
        "https://creekrealestates.com/properties",

      lastModified:
        new Date(),

      changeFrequency:
        "daily",

      priority:
        0.9,
    },

    ...propertyUrls,

  ];
}