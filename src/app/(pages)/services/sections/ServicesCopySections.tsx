import React from "react";
import { LandingPageData } from "@/types/template";

interface Props {
  landingPageData: LandingPageData | null;
}

export default function ServicesCopySections({ landingPageData }: Props) {
  const brand = landingPageData?.businessName || "Titan Cargo and Courier";

  return (
    <section id="services-copy" className="bg-white">
      <div className="mx-auto w-full md:max-w-[70vw] px-4 sm:px-6 py-12 md:py-16 space-y-12">
        {/* Section: Expert & Skilled (H2) */}
        <div id="expert-skilled">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Expert & Skilled Residential or Commercial Material Moving Services Contractor or Company
          </h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            {brand} delivers trained movers, steady communication, and thoughtful planning. We protect fragile items and heavy gear. 
            We optimize routes and timing for reliable arrivals. As the Best Top Rated Households Moving Contractor, we reduce stress and save hours. 
            Choose a Local or Affordable Moving Services Agency that prioritizes clarity, safety, and punctuality. Our Office Material Moving Services Contractor team secures furniture, electronics, and files.
            We prepare building access, elevators, and load zones to keep your day on track.
          </p>
        </div>

        {/* Section: Appliance & Furniture (H2) */}
        <div id="appliance-furniture">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Residential and Commercial Appliance or Furniture Moving Services Contractor or Company — {brand}
          </h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            We move refrigerators, stoves, washers, sofas, beds, and office workstations with proper tools. 
            Our Professional and affordable Furniture or Appliance Moving Contractor approach includes padding, wrapping, and secure tie‑downs. 
            We stage items by rooms to speed setup. We label clearly, avoid scuffs, and keep pathways clean. 
            Furthermore, we coordinate entry permissions and limit disruption. You receive consistent updates and a tidy finish.
          </p>
        </div>

        {/* Section: Looking for Certified Contractor (H2) */}
        <div id="looking-certified">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Looking for a Certified & Professional Local Home or Office Furniture Moving Contractor
          </h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            Call {brand} when you need careful packing, efficient loading, and smooth delivery. We tailor the plan to your space and timeline. 
            Our team protects doorways, railings, and floors. We secure drawers, remove legs when needed, and wrap glass. 
            We coordinate parking and elevator windows to avoid delays. With clear guidance, you know costs, schedule, and the next step. 
            This approach shortens move time and reduces risk.
          </p>
        </div>

        {/* Section: Hire Now (H2) */}
        <div id="hire-now">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Hire Now a Trusted Moving Contractor or Company
          </h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            Reserve your date today. We confirm details, access, and item lists. Then we assign the right crew and tools. 
            You receive reminders before arrival. During the move, a lead communicates progress and adjustments. 
            We handle last‑minute changes with calm, practical steps. When finished, we place items where you want them. 
            Next, we remove debris and confirm satisfaction. Simple, direct, and reliable.
          </p>
        </div>

        {/* Section: Why Choose Us (H2) */}
        <div id="why-choose-us">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Why Choose {brand} for Residential & Commercial Appliance or All over Material Moving Services
          </h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            {brand} blends experience with steady coordination. We keep communication open and plans transparent. 
            As a Residential or commercial Moving Contractor or company, we reduce downtime and protect property. 
            We train crews on lifting, stacking, and hazard awareness. Additionally, we prepare backups for supplies and vehicles. 
            You get fair pricing, clear documentation, and an accountable team. From first call to final placement, we move with care.
          </p>
        </div>
      </div>
    </section>
  );
}
