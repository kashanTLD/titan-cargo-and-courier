import React from "react";
import { LandingPageData, ServiceArea } from "@/types/template";

interface Props {
  landingPageData: LandingPageData | null;
}

export default function ServicesAreas({ landingPageData }: Props) {
  const areas: ServiceArea[] | undefined = landingPageData?.businessData?.serviceAreas;

  const hasAreas = Array.isArray(areas) && areas.length > 0;

  // Only render this section if service areas are provided in context
  if (!hasAreas) return null;

  return (
    <section id="service-areas" className="bg-white">
      <div className="mx-auto w-full md:max-w-[70vw] px-4 sm:px-6 py-12 md:py-16">
        <h2 className="text-[clamp(2.5rem,6vw,4rem)] font-light leading-[1] tracking-[-0.03em] font-serif text-gray-900">
          Our Service Areas
        </h2>
        <p className="mt-3 text-gray-700 leading-relaxed">
          We serve clients across our operating regions and nearby communities. We arrive on time, protect entries, and follow property rules. 
          We plan routes, confirm access, and keep your day organized. For nearby locations, we coordinate parking and elevator windows to reduce delays.
        </p>
        <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {areas!.map((a, idx) => (
            <li key={idx} className="p-4 rounded-md border border-gray-200">
              <p className="font-semibold text-gray-900">{a.city}, {a.region}</p>
              <p className="text-gray-700 mt-1">{a.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
