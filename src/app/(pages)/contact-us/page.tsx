"use client";

import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import Banner from "@/components/Banner";
import FooterSection from "@/sections/FooterSection";
import dynamic from "next/dynamic";
const MapAltSection = dynamic(() => import("./sections/MapAltSection"), { ssr: false });
import ContactInfoAltSection from "./sections/ContactInfoAltSection";
import BusinessHoursAltSection from "./sections/BusinessHoursAltSection";
import ContactForm from "./ContactForm";
import { useLandingPageData } from "@/components/LandingPageDataProvider";

export default function ContactUsPage() {
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
      <Banner title="Contact Us" slotName="contact-hero" />
      <main className="bg-gray-50">
        {/* Hero Section with Contact Form */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 max-w-screen overflow-x-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="max-w-3xl mx-auto">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        {/* Contact Information Section */}
        <ContactInfoAltSection />

        {/* Business Hours Section */}
        <BusinessHoursAltSection />

        {/* Map Section */}
        <MapAltSection />

        <FooterSection />
      </main>
    </Layout>
  );
}


