import React from "react";
import { LandingPageData, CtaButton } from "@/types/template";
import Overview from "@/app/(pages)/services/[id]/components/Overview";
import FeaturesChips from "@/app/(pages)/services/[id]/components/FeaturesChips";
import SidebarMap from "@/app/(pages)/services/[id]/components/SidebarMap";
import SidebarContact from "@/app/(pages)/services/[id]/components/SidebarContact";
import WhyChooseUs from "@/app/(pages)/services/[id]/components/WhyChooseUs";
import type { ImageItem } from "@/app/(pages)/services/[id]/components/ImagesBlock";

interface Props {
  landingPageData: LandingPageData | null;
  title?: string;
  description?: string | null;
  features?: string[];
  price?: number | null;
  cta?: { href?: string; label?: string } | CtaButton | null;
  detailDescription?: string;
}

// local small components removed in favor of extracted components

export default function ServiceDetails({ landingPageData, title, description, features, price, cta, detailDescription }: Props) {
  const brand = landingPageData?.businessName || "Titan Cargo and Courier";
  const hasFeatures = Array.isArray(features) && features.length > 0;
  const ctaObj: { href?: string; label?: string } | null = (() => {
    if (!cta) return null;
    const href = typeof (cta as { href?: unknown }).href === 'string' ? (cta as { href?: string }).href : undefined;
    const label = typeof (cta as { label?: unknown }).label === 'string' ? (cta as { label?: string }).label : undefined;
    return href || label ? { href, label } : null;
  })();

  const toSlug = (s: string) => String(s || '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  const slug = toSlug(String(title || ''));
  const isMoving = /(moving|mover|relocation)/i.test(slug);
  const isCargo = /(cargo|courier|same-day|medical)/i.test(slug);
  const prefix = isMoving ? 'moving-service' : isCargo ? 'cargo-service' : null;
  const images = prefix
    ? (landingPageData?.images || []).filter(im => typeof im.slotName === 'string' && im.slotName.startsWith(`${prefix}-`))
    : [];

  return (
    <section id="services-copy" className="bg-white">
      <div className="mx-auto w-full md:max-w-[70vw] px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main column */}
          <div className="space-y-14 lg:col-span-2">
            <Overview title={title} brand={brand} detailDescription={detailDescription} description={description} price={price} ctaObj={ctaObj} />

            {/* Single lead image */}
            {images.length > 0 && (
              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={images[0].imageUrl}
                  alt={images[0].altText || images[0].title || String(title || brand)}
                  className="h-96 md:h-[28rem] w-full object-cover"
                />
              </div>
            )}

            {/* Features */}
            {hasFeatures && <FeaturesChips features={features!} />}

            {/* Additional images removed per distribution plan (second image shown in WhyChooseUs, third in HowItWorksSection) */}

            {/* Removed Service details to avoid duplication with "How it works" on the page */}

            <WhyChooseUs brand={brand} image={images.length > 1 ? (images[1] as ImageItem) : undefined} />
          </div>

          {/* Sticky sidebar with business contact info */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24">
              {landingPageData && <SidebarMap landingPageData={landingPageData} />}
              {landingPageData && <SidebarContact landingPageData={landingPageData} />}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

