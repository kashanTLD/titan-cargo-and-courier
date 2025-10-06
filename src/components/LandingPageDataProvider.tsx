"use client";
import { createContext, useContext } from "react";
import type { LandingPageData } from "@/types/template";

const LandingPageDataContext = createContext<LandingPageData | null>(null);

export const useLandingPageData = () => {
  const context = useContext(LandingPageDataContext);
  if (!context) {
    throw new Error("useLandingPageData must be used within LandingPageDataProvider");
  }
  return context;
};
export function LandingPageDataProvider({
  value,
  children,
}: {
  value: LandingPageData | null;
  children: React.ReactNode;
}) {
  const fallback: LandingPageData = {
    id: "fallback",
    templateId: "fallback-template",
    businessName: "Business",
    githubUrl: undefined,
    status: "draft",
    content: {},
    seoData: {
      title: "Business Template",
      description: "Professional business website template",
      keywords: [],
      isIndex: false,
      canonicalUrl: "",
      focusedKeywords: [],
    },
    themeData: {
      primaryColor: "#0ea5e9",
      secondaryColor: "#0f172a",
      accentColor: "#22c55e",
    },
    businessData: {
      email: "",
      phone: "",
      address: { street: "", city: "", state: "", zipCode: "" },
      coordinates: { latitude: 0, longitude: 0 },
      socialLinks: [],
      serviceAreas: [],
      businessHours: [],
    },
    companyDetails: { heading: "", description: "", sections: [] },
    serviceHighlights: undefined,
    createdAt: new Date(0).toISOString(),
    updatedAt: new Date(0).toISOString(),
    publishedAt: undefined,
    images: [],
  };

  const safeValue = value ?? fallback;
  return (
    <LandingPageDataContext.Provider value={safeValue}>
      {children}
    </LandingPageDataContext.Provider>
  );
}
