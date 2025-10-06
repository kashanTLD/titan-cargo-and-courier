import React from "react";
import type { ImageItem } from "./ImagesBlock";

export default function HeroImageBlock({ image, title, brand }: { image: ImageItem; title?: string; brand: string }) {
  if (!image) return null;
  return (
    <div className="mt-2 overflow-hidden rounded-2xl border border-gray-200 bg-white">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image.imageUrl} alt={image.altText || image.title || String(title || brand)} className="h-[22rem] md:h-[28rem] w-full object-cover" />
    </div>
  );
}
