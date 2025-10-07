import type { MetadataRoute } from "next";
import { getServices } from "@/lib/data";

const getBaseUrl = () => {
  const env = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  return env || "https://www.example.com";
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
        url: `${baseUrl}/services/moving`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
      },
      {
        url: `${baseUrl}/services/cargo`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
      },
    {
      url: `${baseUrl}/reviews`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // Dynamic service detail pages
 

  return staticRoutes;
}
