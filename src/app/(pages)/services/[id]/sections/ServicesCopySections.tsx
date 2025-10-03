import React from "react";
import { LandingPageData, CtaButton } from "@/types/template";

interface Props {
  landingPageData: LandingPageData | null;
  title?: string;
  description?: string | null;
  features?: string[];
  price?: number | null;
  cta?: { href?: string; label?: string } | CtaButton | null;
}

export default function ServicesCopySections({ landingPageData, title, description, features, price, cta }: Props) {
  const brand = landingPageData?.businessName || "Titan Cargo and Courier";
  const hasFeatures = Array.isArray(features) && features.length > 0;
  const ctaObj: { href?: string; label?: string } | null = (() => {
    if (!cta) return null;
    const href = typeof (cta as { href?: unknown }).href === 'string' ? (cta as { href?: string }).href : undefined;
    const label = typeof (cta as { label?: unknown }).label === 'string' ? (cta as { label?: string }).label : undefined;
    return href || label ? { href, label } : null;
  })();

  return (
    <section id="services-copy" className="bg-white">
      <div className="mx-auto w-full md:max-w-[70vw] px-4 sm:px-6 py-12 md:py-16 space-y-12">
        {/* Overview */}
        <div id="overview">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            {title || `${brand} — Professional Service`}
          </h2>
          {description && (
            <p className="mt-3 text-gray-700 leading-relaxed">
              {description}
            </p>
          )}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            {typeof price === 'number' && (
              <span className="px-3 py-1 rounded-full text-sm font-semibold bg-gray-900 text-white">
                ${price.toFixed(2)}
              </span>
            )}
            {ctaObj?.href && (
              <a
                href={ctaObj.href}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-white bg-gray-900"
              >
                {ctaObj.label || 'Get started'}
              </a>
            )}
          </div>
        </div>

        {/* Features */}
        {hasFeatures && (
          <div id="features">
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900">What’s included</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {features!.map((f, i) => (
                <li key={i} className="px-3 py-1 rounded-full text-sm border border-gray-200 text-gray-700 bg-gray-50">
                  {f}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Why choose us */}
        <div id="why-choose-us">
          <h3 className="text-xl md:text-2xl font-semibold text-gray-900">Why choose {brand}</h3>
          <p className="mt-3 text-gray-700 leading-relaxed">
            {brand} blends experience with steady coordination. We keep communication open and plans transparent.
            We reduce downtime, protect property, and deliver reliable results tailored to your needs.
          </p>
        </div>
      </div>
    </section>
  );
}
