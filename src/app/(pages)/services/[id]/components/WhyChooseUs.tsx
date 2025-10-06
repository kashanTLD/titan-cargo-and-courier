import React from "react";
import type { ImageItem } from "./ImagesBlock";

export default function WhyChooseUs({ brand, image }: { brand: string; image?: ImageItem }) {
  return (
    <div id="why-choose-us" className="border-t border-gray-100 pt-8">
      <h3 className="text-xl md:text-2xl font-semibold text-gray-900">Why choose {brand}</h3>
      <p className="mt-3 text-gray-700 leading-relaxed">
        {brand} blends experience with steady coordination. We keep communication open and plans transparent.
        We reduce downtime, protect property, and deliver reliable results tailored to your needs.
      </p>
      {image && (
        <div className="mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image.imageUrl} alt={image.altText || image.title || brand} className="h-80 md:h-96 w-full object-cover" />
        </div>
      )}
    </div>
  );
}
