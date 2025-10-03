"use client";
import React from "react";
import { useLandingPageData } from "@/components/LandingPageDataProvider";
import type { Testimonial } from "@/types/template";

// Reviews-specific testimonials section with a distinct, clean card grid design
// Different from the root `src/sections/TestimonialsSection.tsx` which uses a
// gradient hero + carousel. This version focuses on a simple, readable grid
// with star ratings and subtle accents.

export interface ReviewItem {
  id: string | number;
  author?: string | null;
  rating?: number | null; // 1-5
  comment?: string | null;
  created_at?: string | Date | null;
}

interface DisplayItem {
  id: string | number;
  name: string;
  initial: string;
  rating: number | null;
  text: string;
  date: string;
}

interface ReviewsTestimonialsSectionProps {
  title?: string;
  subtitle?: string;
  reviews: ReviewItem[];
}

function formatDate(value: string | Date | null | undefined) {
  if (!value) return "";
  try {
    const d = typeof value === "string" ? new Date(value) : value;
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

function StarRating({ value = 0 }: { value?: number | null }) {
  const v = Math.max(0, Math.min(5, Number(value || 0)));
  if (v <= 0) return null;
  return (
    <div className="flex items-center" aria-label={`Rating: ${v} out of 5`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${i < v ? "text-yellow-400" : "text-gray-300"}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.803 2.036a1 1 0 00-.364 1.118l1.07 3.292c.3.922-.755 1.688-1.54 1.118l-2.803-2.036a1 1 0 00-1.175 0L6.61 16.283c-.784.57-1.838-.196-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.974 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.95-.69l1.076-3.293z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsTestimonialsSection({
  title = "What customers are saying",
  subtitle = "Real feedback from people who shipped with us.",
  reviews,
}: ReviewsTestimonialsSectionProps) {
  const landing = useLandingPageData();
  const dbItems: DisplayItem[] = (reviews || []).filter((r) => r?.comment)?.map((r) => ({
    id: r.id,
    name: r.author || "Anonymous",
    initial: (r.author || "?").toString().charAt(0).toUpperCase(),
    rating: r.rating ?? null,
    text: r.comment || "",
    date: formatDate(r.created_at),
  }));

  const landingTestimonials: DisplayItem[] = (landing?.content?.testimonials?.testimonials || []).map((t: Testimonial, idx: number) => ({
    id: `landing-${idx}`,
    name: t?.name || "",
    initial: (t?.name || "?").toString().charAt(0).toUpperCase(),
    rating: null,
    text: t?.text || "",
    date: "",
  }));

  const items: DisplayItem[] = dbItems.length > 0 ? dbItems : landingTestimonials;

  return (
    <section id="reviews-testimonials" className="py-16 sm:py-20 bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">{title}</h2>
          <p className="mt-3 text-base sm:text-lg text-gray-700 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Grid of testimonial cards */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 border border-gray-200 rounded-xl p-4">
          {items.map((t: DisplayItem) => (
            <article
              key={t.id}
              className="relative h-full rounded-2xl border border-gray-100 bg-white p-6 shadow-sm ring-1 ring-gray-100/60 transition hover:shadow-md"
            >
              <div className="flex items-start gap-4">
                <div className="relative h-10 w-10 shrink-0 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700 flex items-center justify-center font-semibold">
                  {t.initial}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-gray-900">{t.name}</h3>
                    <StarRating value={t.rating} />
                  </div>
                  {t.date && (
                    <p className="mt-0.5 text-xs text-gray-500">{t.date}</p>
                  )}
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-gray-700">{t.text}</p>

              {/* Accent underline */}
              <div className="mt-5 h-[2px] w-16 rounded-full bg-gradient-to-r from-gray-900 to-gray-400/60" />
            </article>
          ))}

          {items.length === 0 && (
            <div className="col-span-full">
              <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-10 text-center">
                <p className="text-gray-700 font-medium">No reviews yet. Check back soon.</p>
                <p className="mt-2 text-xs text-gray-500">We loaded {reviews?.length ?? 0} entries from the database.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
