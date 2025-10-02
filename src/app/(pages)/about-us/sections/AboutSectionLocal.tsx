"use client";

import Image from "next/image";
import { useLandingPageData } from "@/components/LandingPageDataProvider";
import { useMemo } from "react";
import type { Image as TemplateImage } from "@/types/template";

export default function AboutSectionLocal() {
  const landing = useLandingPageData();
  const theme = landing?.themeData;
  const about = (landing?.content?.about as {
    title?: string;
    description?: string;
    features?: string[];
    ctaButton?: { href: string; label: string };
  }) || {};
  const images = useMemo(
    () => (landing?.images || []).filter((img: TemplateImage) => img.slotName.includes("about") || img.category === "about"),
    [landing]
  );

  const primary = theme?.primaryColor || "#0f172a";

  const title = about.title ?? "";
  const description = about.description ?? "";
  const features: string[] = about.features ?? [];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-block rounded-full px-3 py-1 text-xs font-medium" style={{ backgroundColor: `${primary}1A`, color: primary }}>
              About Us
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              {title}
            </h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
              {description}
            </p>

            {features.length ? (
              <ul className="mt-6 space-y-3">
                {features.map((f: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full text-white text-xs" style={{ background: primary }}>
                      ✓
                    </span>
                    <span className="text-slate-700">{f}</span>
                  </li>
                ))}
              </ul>
            ) : null}

            
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 overflow-hidden rounded-xl border border-slate-200">
                {images[0]?.imageUrl ? (
                  <Image src={images[0].imageUrl} alt={images[0].slotName} width={1000} height={700} className="h-72 w-full object-cover" />
                ) : (
                  <div className="h-72 w-full bg-slate-100" />
                )}
              </div>
              <div className="overflow-hidden rounded-xl border border-slate-200">
                {images[1]?.imageUrl ? (
                  <Image src={images[1].imageUrl} alt={images[1].slotName} width={500} height={400} className="h-40 w-full object-cover" />
                ) : (
                  <div className="h-40 w-full bg-slate-100" />
                )}
              </div>
              <div className="overflow-hidden rounded-xl border border-slate-200">
                {images[2]?.imageUrl ? (
                  <Image src={images[2].imageUrl} alt={images[2].slotName} width={500} height={400} className="h-40 w-full object-cover" />
                ) : (
                  <div className="h-40 w-full bg-slate-100" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
