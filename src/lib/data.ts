import { cache } from "react";
import { query } from "@/lib/db";
import { fetchLandingPageForSSG } from "@/lib/database";

const getEnv = () => {
  const templateId = process.env.NEXT_PUBLIC_TEMPLATE_ID;
  const id = process.env.NEXT_PUBLIC_ID;
  if (!templateId || !id) {
    throw new Error("Missing NEXT_PUBLIC_TEMPLATE_ID or NEXT_PUBLIC_ID");
  }
  return { templateId, id };
};

export const getLandingPageData = cache(async () => {
  const { templateId, id } = getEnv();
  return await fetchLandingPageForSSG(templateId, id);
});

export const getServices = cache(async () => {
  try {
    return await query<{
      id: string | number;
      title?: string;
      description?: string | null;
      price?: number | null;
    }>(
      'SELECT id, "title", description, price FROM "Service" ORDER BY id DESC'
    );
  } catch {
    return await query<{
      id: string | number;
      title?: string;
      description?: string | null;
      price?: number | null;
    }>(
      'SELECT id, "name" as title, description, price FROM "Service" ORDER BY id DESC'
    );
  }
});

export const getServiceById = cache(async (serviceId: string) => {
  try {
    return await query<{
      id: string | number;
      title?: string;
      description?: string | null;
      price?: number | null;
    }>(
      'SELECT id, "title", description, price FROM "Service" WHERE id = $1 LIMIT 1',
      [serviceId]
    ).then(rows => rows[0] ?? null);
  } catch {
    return await query<{
      id: string | number;
      title?: string;
      description?: string | null;
      price?: number | null;
    }>(
      'SELECT id, "name" as title, description, price FROM "Service" WHERE id = $1 LIMIT 1',
      [serviceId]
    ).then(rows => rows[0] ?? null);
  }
});

export const getAboutContent = cache(async () => {
  try {
    return await query<{
      title?: string | null;
      subtitle?: string | null;
      body?: string | null;
      mission?: string | null;
      vision?: string | null;
    }>(
      'SELECT title, subtitle, body, mission, vision FROM about_content LIMIT 1'
    ).then(rows => rows[0] ?? null);
  } catch {
    return await query<{
      title?: string | null;
      subtitle?: string | null;
      body?: string | null;
      mission?: string | null;
      vision?: string | null;
    }>(
      'SELECT title, subtitle, body, mission, vision FROM about LIMIT 1'
    ).then(rows => rows[0] ?? null);
  }
});

export const getReviews = cache(async () => {
  try {
    return await query<{
      id: string | number;
      author?: string | null;
      rating?: number | null;
      comment?: string | null;
      created_at?: string | Date | null;
    }>(
      'SELECT id, author, rating, comment, created_at FROM reviews ORDER BY created_at DESC'
    );
  } catch {
    try {
      return await query<{
        id: string | number;
        author?: string | null;
        rating?: number | null;
        comment?: string | null;
        created_at?: string | Date | null;
      }>(
        'SELECT id, author, rating, comment, createdAt as created_at FROM reviews ORDER BY createdAt DESC'
      );
    } catch {
      return [];
    }
  }
});
