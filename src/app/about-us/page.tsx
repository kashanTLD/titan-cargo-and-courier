import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import FooterSection from "@/sections/FooterSection";
import AboutSection from "@/sections/AboutSection";
import ServiceHighlightsSection from "@/sections/ServiceHighlightsSection";
import FAQSection from "@/sections/FAQSection";
import { getLandingPageData } from "@/lib/data";

export const revalidate = 0;

export default async function AboutUsPage() {
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
      <main>
        <AboutSection />
        <ServiceHighlightsSection />
        <FAQSection />
        <FooterSection />
      </main>
    </Layout>
  );
}


