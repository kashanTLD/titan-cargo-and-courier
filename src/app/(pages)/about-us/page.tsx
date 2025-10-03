"use client";

import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import Banner from "@/components/Banner";
import AboutSectionLocal from "./sections/AboutSectionLocal";
import ServiceHighlightsLocal from "./sections/ServiceHighlightsLocal";
import FooterSection from "@/sections/FooterSection";
import FAQSection from "@/sections/FAQSection";
import { useLandingPageData } from "@/components/LandingPageDataProvider";

export default function AboutUsPage() {
  const landingPageData = useLandingPageData();

  return (
    <Layout
      title={landingPageData.seoData.title}
      description={landingPageData.seoData.description}
      theme={landingPageData.themeData}
      seoData={landingPageData.seoData}
      landingPageData={landingPageData}
    >
      <Navbar />
      <Banner title="About Us" slotName="about-hero" />
      <main>
        <AboutSectionLocal />
        <ServiceHighlightsLocal />
        <FAQSection/>
        <FooterSection />
      </main>
    </Layout>
  );
}
