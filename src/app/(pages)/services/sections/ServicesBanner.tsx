import React from "react";
import { LandingPageData } from "@/types/template";

interface Props {
  landingPageData: LandingPageData | null;
}

export default function ServicesBanner({ landingPageData }: Props) {
  const brand = landingPageData?.businessName || "Titan Cargo and Courier";

  const heading = `Certified & Professional Moving Services Contractor — ${brand}`;

  // 150-word intro (approx). Uses secondary keywords and active voice.
  const intro =
    `Choose ${brand} for fast, careful, and professional moving services. We handle residential and commercial material with precision and care. ` +
    `Our team protects floors, doorways, and fragile items. We load and unload with safe techniques. ` +
    `As a Residential or Commercial Material Moving Services Contractor, we plan routes, manage timing, and keep you informed. ` +
    `Our Home Appliance Moving Services Company moves refrigerators, washers, dryers, and ovens with proper equipment. ` +
    `We label, pad, and secure items for travel. ` +
    `Moreover, we communicate clearly before arrival and during the move. ` +
    `You get competitive pricing, transparent steps, and reliable outcomes. ` +
    `From apartments to warehouses, we adapt. ` +
    `Therefore, you avoid last‑minute surprises and delays. ` +
    `Book your move with a team that respects your schedule and your property.`;

  return (
    <section id="services-banner" className="bg-white pt-10">
      <div className="mx-auto w-full md:max-w-[70vw] px-4 sm:px-6 py-12 md:py-16">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
          {heading}
        </h1>
        <p className="mt-4 text-gray-700 leading-relaxed">
          {intro}
        </p>
      </div>
    </section>
  );
}
