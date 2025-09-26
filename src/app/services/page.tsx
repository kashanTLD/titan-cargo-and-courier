import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import FooterSection from "@/sections/FooterSection";
import ServicesListingSection from "@/sections/ServicesListingSection";
import { getLandingPageData } from "@/lib/data";

export const revalidate = 0;

export default async function ServicesPage() {
  const landingPageData = await getLandingPageData();

  if (!landingPageData) {
    return (
      <div className="min-h-screen bg-white">
        <main>
          <section className="py-16 md:max-w-[70vw] w-full mx-auto px-4 sm:px-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">No Services Available</h1>
              <p className="text-gray-600">Please check back later or contact us for more information.</p>
            </div>
          </section>
        </main>
      </div>
    );
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
      <main>
         <ServicesListingSection />
        <FooterSection />
      </main>
    </Layout>
  );
}


