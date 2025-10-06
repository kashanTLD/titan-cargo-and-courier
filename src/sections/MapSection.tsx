"use client";

import Map from "@/components/Map";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useLandingPageData } from "@/components/LandingPageDataProvider";

export default function MapSection() {
  const landingPageData = useLandingPageData();
  const { businessData } = landingPageData;
  const contact = landingPageData.content.contact;
  const { ref: mapRef, isVisible: mapVisible } =
    useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });

    console.log(businessData.coordinates.latitude)

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {contact?.showMap && businessData?.coordinates && (
          <div
            ref={mapRef}
            className={`bg-gray-100 rounded-2xl overflow-hidden h-64 transition-all duration-1000 hover:shadow-2xl ${
              mapVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Map
              latitude={businessData.coordinates.latitude}
              longitude={businessData.coordinates.longitude}
              businessName="Business Location"
              address={`${businessData.address.street}, ${businessData.address.city}, ${businessData.address.state} ${businessData.address.zipCode}`}
              className="h-full"
            />
          </div>
        )}
      </div>
    </section>
  );
}
