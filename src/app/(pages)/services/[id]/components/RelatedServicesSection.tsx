import React from "react";
import Link from "next/link";
import { useLandingPageData } from "@/components/LandingPageDataProvider";

type RelatedItem = { href: string; label: string };

export default function RelatedServicesSection({ related }: { related: RelatedItem[] }) {
  const landing = useLandingPageData();
  const services: unknown[] = Array.isArray(landing?.content?.services?.services)
    ? (landing!.content!.services!.services as unknown[])
    : [];
  const toSlug = (str: string) =>
    String(str || "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

  function findCardImage(label: string): string | undefined {
    // Find index of this service in the master services list
    const labelSlug = toSlug(label);
    const idx = services.findIndex((s: unknown, i: number) => {
      const obj = (s ?? {}) as Record<string, unknown>;
      const sid = String((obj.id as string | number | undefined) ?? "");
      const title = typeof obj.title === "string" ? obj.title : undefined;
      const name = typeof obj.name === "string" ? obj.name : undefined;
      const slug = toSlug(String(name ?? title ?? `service-${i + 1}`));
      return slug === labelSlug || sid === labelSlug;
    });
    if (idx < 0) return undefined;
    // Try banner-style mapping first
    const slot = `services-image-${idx + 1}`;
    const match = (landing?.images || []).find((im) => im.slotName === slot);
    return match?.imageUrl;
  }
  return (
    <section className="bg-gray-100">
      <div className="mx-auto w-full md:max-w-[70vw] px-4 sm:px-6 py-12 md:py-16">
        <h3 className="text-xl md:text-2xl font-semibold text-gray-900">Related services</h3>
        {related.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((r) => {
              const imgUrl = findCardImage(r.label);
              return (
                <Link
                  key={r.href}
                  href={r.href}
                  replace
                  className="group block rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md  hover:shadow-2xl transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-white/20"
                  style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}
                >
                  <div className="h-32 w-full rounded-t-xl overflow-hidden bg-white/30 border border-white/20">
                    {imgUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={imgUrl} alt={r.label} className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]" />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-white/40 to-white/10" />
                    )}
                  </div>
                  <div className="p-4">
                    <div className="font-medium text-gray-900 group-hover:text-gray-800 transition-colors">{r.label}</div>
                    <div className="mt-1 text-sm text-gray-600 flex items-center gap-2">
                      <span>Learn more</span>
                      <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 11-1.414-1.414L13.586 10H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                      </svg>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-xl border border-gray-200 bg-white p-4">
                <div className="h-28 w-full rounded-lg bg-gray-100 animate-pulse" />
                <div className="mt-3 h-4 w-2/3 bg-gray-100 rounded animate-pulse" />
                <div className="mt-2 h-3 w-1/3 bg-gray-100 rounded animate-pulse" />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

