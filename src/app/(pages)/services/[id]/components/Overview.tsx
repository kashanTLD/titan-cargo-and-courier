import React from "react";

export default function Overview({ title, brand, detailDescription, description, price, ctaObj }: { title?: string; brand: string; detailDescription?: string; description?: string | null; price?: number | null; ctaObj: { href?: string; label?: string } | null }) {
  return (
    <div id="overview">
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
        <span aria-hidden className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gray-900 text-white">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.035a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.035a1 1 0 00-1.176 0l-2.802 2.035c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.719c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </span>
        <span>{title || `${brand} — Professional Service`}</span>
      </h2>
      {(detailDescription || description) && (
        <p className="mt-3 text-gray-700 leading-relaxed max-w-3xl">{detailDescription || description}</p>
      )}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        {typeof price === 'number' && (
          <span className="px-3 py-1 rounded-full text-sm font-semibold bg-gray-900 text-white">${price.toFixed(2)}</span>
        )}
        {ctaObj?.href && (
          <a href={ctaObj.href} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-white bg-gray-900">
            {ctaObj.label || 'Get started'}
          </a>
        )}
      </div>
    </div>
  );
}
