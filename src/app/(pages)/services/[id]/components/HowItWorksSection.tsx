import React from "react";
import type { ImageItem } from "./ImagesBlock";

export default function HowItWorksSection({ detailSections, theme, image }: { detailSections: Array<{ title: string; text: string }>; theme?: { primaryColor?: string; secondaryColor?: string } | null; image?: ImageItem }) {
  if (!Array.isArray(detailSections) || detailSections.length === 0) return null;
  return (
    <section className="bg-white">
      <div className="mx-auto w-full md:max-w-[70vw] px-4 sm:px-6 py-12 md:py-16">
        <h3 className="text-xl md:text-2xl font-semibold text-gray-900">How it works</h3>
        <div className="mt-6 grid grid-cols-1  gap-6">
          {detailSections.slice(0, 6).map((sec, i) => (
            <div key={i} className="relative rounded-2xl border border-gray-200 bg-gray-50 p-6">
              <div
                className="absolute -top-3 -left-3 h-10 w-10 rounded-xl text-white flex items-center justify-center font-semibold"
                style={{ background: `linear-gradient(135deg, ${theme?.primaryColor}, ${theme?.secondaryColor})` }}
              >
                {i + 1}
              </div>
              <h4 className="mt-4 text-lg font-semibold text-gray-900">{sec.title}</h4>
              <p className="mt-2 text-gray-700 leading-relaxed">{sec.text}</p>
            </div>
          ))}
        </div>
        {image && (
          <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image.imageUrl} alt={image.altText || image.title || 'How it works'} className="h-80 md:h-96 w-full object-cover" />
          </div>
        )}
      </div>
    </section>
  );
}
