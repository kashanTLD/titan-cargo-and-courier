import React from "react";

export type ImageItem = { id: string; imageUrl: string; altText?: string; title?: string };

export default function ImagesBlock({ images, title, brand }: { images: ImageItem[]; title?: string; brand: string }) {
  if (!images.length) return null;
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {images.map((im, idx) => (
        <div key={im.id} className={`overflow-hidden rounded-2xl border border-gray-200 bg-white ${idx === 0 ? 'md:col-span-2' : ''}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={im.imageUrl} alt={im.altText || im.title || String(title || brand)} className={`${idx === 0 ? 'h-96 md:h-[28rem]' : 'h-80'} w-full object-cover`} />
        </div>
      ))}
    </div>
  );
}
