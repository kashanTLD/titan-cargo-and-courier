import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import FooterSection from "@/sections/FooterSection";
import MapSection from "@/sections/MapSection";
import ContactInfoSection from "@/sections/ContactInfoSection";
import BusinessHoursSection from "@/sections/BusinessHoursSection";
import { getLandingPageData } from "@/lib/data";
import ContactForm from "./ContactForm";

export const revalidate = 0;


export default async function ContactUsPage() {
  const landingPageData = await getLandingPageData();

  if (!landingPageData) {
    return <section className="py-16 md:max-w-[70vw] w-full mx-auto px-4 sm:px-6" />;
  }

  return (
    <Layout
      title={landingPageData.seoData.title}
      description={landingPageData.seoData.description}
      theme={landingPageData.themeData}
      seoData={landingPageData.seoData}
      landingPageData={landingPageData}
    >
      <Navbar />
      <main className="bg-gray-50">
        {/* Hero Section with Contact Form */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Contact Us
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  We&#39;d love to hear from you. Send us a message and we&#39;ll respond shortly.
                </p>
              </div>
              <div className="max-w-3xl mx-auto">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        {/* Contact Information Section */}
        <ContactInfoSection />

        {/* Business Hours Section */}
        <BusinessHoursSection />

        {/* Map Section */}
        <MapSection />

        <FooterSection />
      </main>
    </Layout>
  );
}


