"use client";

import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import HeroSection from "@/sections/HeroSection";
import AboutSection from "@/sections/AboutSection";
import ServicesSection from "@/sections/ServicesSection";
import TestimonialsSection from "@/sections/TestimonialsSection";
import GallerySection from "@/sections/GallerySection";
import BusinessOverviewSection from "@/sections/BusinessOverviewSection";
import FAQSection from "@/sections/FAQSection";
import ServiceAreasSection from "@/sections/ServiceAreasSection";
import ServiceHighlightsSection from "@/sections/ServiceHighlightsSection";
import FooterSection from "@/sections/FooterSection";
import CTASection from "@/sections/CTASection";
import CompanyDetails from "@/sections/CompanyDetails";
import { useLandingPageData } from "@/components/LandingPageDataProvider";

export default function HomeClient() {
  const landingPageData = useLandingPageData();

  return (
    <Layout
      title={landingPageData.seoData.title}
      description={landingPageData.seoData.description}
      theme={landingPageData.themeData}
      seoData={landingPageData.seoData}
      landingPageData={landingPageData}
    >
      <div className="animate-fade-in-up">
        <Navbar />
        <main>
          {landingPageData.content.hero && <HeroSection />}
          {landingPageData.content.serviceHighlights && <ServiceHighlightsSection />}
          {landingPageData.content.about && <AboutSection />}
          {landingPageData.content.companyDetails && <CompanyDetails />}
          {landingPageData.content.ctaSection && <CTASection />}
          {landingPageData.content.services && <ServicesSection />}
          {landingPageData.content.testimonials && <TestimonialsSection />}
          {landingPageData.content.gallery && <GallerySection />}
          {landingPageData.content.businessOverview && <BusinessOverviewSection />}
          {landingPageData.content.faq && <FAQSection />}
          {landingPageData.businessData.serviceAreas &&
            landingPageData.businessData.serviceAreas.length > 0 && (
              <ServiceAreasSection />
            )}
          <FooterSection />
        </main>
      </div>
    </Layout>
  );
}
