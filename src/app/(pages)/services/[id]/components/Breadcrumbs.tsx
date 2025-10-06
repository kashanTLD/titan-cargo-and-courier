import React from "react";
import Link from "next/link";

export default function Breadcrumbs({ theme, titleText }: { theme?: { primaryColor?: string; secondaryColor?: string } | null; titleText: string }) {
  return (
    <section className="bg-white">
      <div className="mx-auto w-full md:max-w-[70vw] px-4 sm:px-6 pt-4">
        <nav aria-label="Breadcrumb" className="text-sm text-gray-600">
          <ol className="flex items-center gap-2 flex-wrap">
            <li>
              <Link href="/" className="hover:text-gray-900">Home</Link>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <Link href="/services" className="hover:text-gray-900">Services</Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900 font-medium truncate max-w-[60vw] md:max-w-none">{titleText}</li>
          </ol>
        </nav>
        <div className="mt-3 h-1 w-24 rounded" style={{ background: `linear-gradient(90deg, ${theme?.primaryColor}, ${theme?.secondaryColor})` }} />
      </div>
    </section>
  );
}
