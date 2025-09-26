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
  return (
    <LandingPageDataContext.Provider value={value}>
      {children}
    </LandingPageDataContext.Provider>
  );
}
