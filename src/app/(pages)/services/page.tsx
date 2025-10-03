"use client";

import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import Banner from "@/components/Banner";
import FooterSection from "@/sections/FooterSection";
import ServicesListingSection from "@/sections/ServicesListingSection";
import FAQSection from "@/sections/FAQSection";
import { useLandingPageData } from "@/components/LandingPageDataProvider";

export default function ServicesPage() {
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
      <Banner title="Services" category="services" />
      <main>
        <ServicesListingSection />
        <FAQSection />
        <FooterSection />
      </main>
    </Layout>
  );
}


