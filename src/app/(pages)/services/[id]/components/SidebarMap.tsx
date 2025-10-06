import React from "react";
import Map from "@/components/Map";
import { LandingPageData } from "@/types/template";

export default function SidebarMap({ landingPageData }: { landingPageData: LandingPageData }) {
  const show = landingPageData?.content?.contact?.showMap && landingPageData?.businessData?.coordinates;
  if (!show) return null;
  return (
    <div className="mb-6 bg-gray-100 rounded-2xl overflow-hidden h-64">
      <Map
        latitude={landingPageData.businessData!.coordinates!.latitude}
        longitude={landingPageData.businessData!.coordinates!.longitude}
        businessName={landingPageData.businessName || "Business Location"}
        address={`${landingPageData.businessData!.address.street}, ${landingPageData.businessData!.address.city}, ${landingPageData.businessData!.address.state} ${landingPageData.businessData!.address.zipCode}`}
        className="h-full"
      />
    </div>
  );
}
