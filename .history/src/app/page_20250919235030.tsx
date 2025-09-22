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
import { LandingPageData } from "@/types/template";
import CompanyDetails from "@/sections/CompanyDetails";
import { fetchLandingPageForSSG } from "@/lib/database";
import { notFound } from "next/navigation";
import { Metadata } from "next";

// Enable ISR with 60-second revalidation
export const revalidate = 60;

// Generate static params for all published landing pages
export async function generateStaticParams() {
  // For now, we'll use the environment variables to generate the single page
  // In the future, this could be expanded to generate multiple pages
  const templateId = process.env.NEXT_PUBLIC_TEMPLATE_ID;
  const id = process.env.NEXT_PUBLIC_ID;
  
  if (!templateId || !id) {
    console.warn('Missing NEXT_PUBLIC_TEMPLATE_ID or NEXT_PUBLIC_ID environment variables');
    return [];
  }

  return [{ templateId, id }];
}

// Server-side data fetching for SSG
async function getLandingPageData(): Promise<LandingPageData> {
  const templateId = process.env.NEXT_PUBLIC_TEMPLATE_ID;
  const id = process.env.NEXT_PUBLIC_ID;

  if (!templateId || !id) {
    console.error('Missing required environment variables: NEXT_PUBLIC_TEMPLATE_ID, NEXT_PUBLIC_ID');
    notFound();
  }

  const landingPageData = await fetchLandingPageForSSG(templateId, id);

  if (!landingPageData) {
    console.error(`Landing page not found: templateId=${templateId}, id=${id}`);
    notFound();
  }

  return landingPageData;
}

// Generate metadata for Next.js App Router
export async function generateMetadata(): Promise<Metadata> {
  const landingPageData = await getLandingPageData();
  const { seoData, businessName, images } = landingPageData;
  
  // Get images for Open Graph
  const logoImage = images?.find((img) => img.slotName === 'logo-image')?.imageUrl;
  const heroImage = images?.find((img) => img.slotName === 'hero-image-1' || img.category === 'hero')?.imageUrl;
  const ogImage = logoImage || heroImage;
  
  return {
    title: seoData.title,
    description: seoData.description,
    keywords: seoData.keywords?.join(', '),
    authors: [{ name: businessName }],
    creator: businessName,
    publisher: businessName,
    robots: seoData.isIndex ? 'index,follow' : 'noindex,nofollow',
    
    // Open Graph
    openGraph: {
      title: seoData.title,
      description: seoData.description,
      url: seoData.canonicalUrl,
      siteName: businessName,
      images: ogImage ? [{
        url: ogImage,
        alt: `${businessName} - ${seoData.title}`,
      }] : [],
      locale: 'en_US',
      type: 'website',
    },
    
    // Twitter
    twitter: {
      card: 'summary_large_image',
      title: seoData.title,
      description: seoData.description,
      images: ogImage ? [ogImage] : [],
    },
    
    // Additional metadata
    alternates: {
      canonical: seoData.canonicalUrl,
    },
    
    // Verification and other meta tags
    other: {
      'theme-color': landingPageData.themeData?.primaryColor,
      'focused-keywords': seoData.focusedKeywords?.join(', ') || '',
    },
  };
}

export default async function Home() {
  const landingPageData = await getLandingPageData();

  return (
    <Layout
      title={landingPageData.seoData.title}
      description={landingPageData.seoData.description}
      theme={landingPageData.themeData}
      seoData={landingPageData.seoData}
      landingPageData={landingPageData}
    >
      <div className="animate-fade-in-up">
        <Navbar
          businessName={landingPageData.businessName}
          logoImage={
            landingPageData.images?.find((img) => img.slotName === "logo-image")
              ?.imageUrl
          }
          themeData={landingPageData.themeData}
          phoneNumber={landingPageData.businessData?.phone}
        />
        <main>
          {landingPageData.content.hero && (
            <HeroSection
              title={landingPageData.content.hero.title}
              subtitle={landingPageData.content.hero.subtitle}
              description={landingPageData.content.hero.description}
              ctaButton={
                landingPageData.content.hero.ctaButton || {
                  label: "Learn More",
                  href: "#",
                }
              }
              backgroundImage={
                landingPageData.images?.find(
                  (img) =>
                    img.slotName === "hero-image-1" || img.category === "hero"
                )?.imageUrl
              }
              themeData={landingPageData.themeData}
            />
          )}

          {landingPageData.content.serviceHighlights && (
            <ServiceHighlightsSection
              data={landingPageData.content.serviceHighlights}
              theme={landingPageData.themeData}
            />
          )}

          {landingPageData.content.about && (
            <AboutSection
              title={landingPageData.content.about.title}
              description={landingPageData.content.about.description}
              features={landingPageData.content.about.features}
              ctaButton={
                landingPageData.content.about.ctaButton || {
                  label: "Contact Us",
                  href: "#contact",
                }
              }
              image={
                landingPageData.images?.find(
                  (img) => img.slotName === "about" || img.category === "about"
                )?.imageUrl
              }
              theme={landingPageData.themeData}
            />
          )}

          {landingPageData.content.companyDetails && (
            <CompanyDetails
              data={landingPageData.content.companyDetails}
              images={landingPageData.images}
              theme={landingPageData.themeData}
            />
          )}

          {landingPageData.content.services && (
            <ServicesSection
              title={landingPageData.content.services.title}
              description={landingPageData.content.services.description}
              services={landingPageData.content.services.services}
              theme={landingPageData.themeData}
              images={
                landingPageData.images?.filter((img) =>
                  img.slotName.includes("services")
                ) || []
              }
            />
          )}

          {landingPageData.content.testimonials && (
            <TestimonialsSection
              title={landingPageData.content.testimonials.title}
              description={landingPageData.content.testimonials.description}
              testimonials={landingPageData.content.testimonials.testimonials}
              theme={landingPageData.themeData}
            />
          )}

          {landingPageData.content.ctaSection && (
            <CTASection
              data={landingPageData.content.ctaSection}
              theme={landingPageData.themeData}
              images={landingPageData.images}
            />
          )}

          {landingPageData.content.gallery && (
            <GallerySection
              title={landingPageData.content.gallery.title}
              description={landingPageData.content.gallery.description}
              images={landingPageData.images?.filter(
                (img) =>
                  img.category === "gallery" || img.slotName === "gallery"
              )}
            />
          )}

          {landingPageData.content.businessOverview && (
            <BusinessOverviewSection
              content={landingPageData.content.businessOverview.content}
              contact={
                landingPageData.content.contact || {
                  title: "Contact Us",
                  description: "Get in touch with us today",
                  showMap: true,
                }
              }
              businessData={landingPageData.businessData}
              theme={landingPageData.themeData}
            />
          )}

          {landingPageData.content.faq && (
            <FAQSection
              title={landingPageData.content.faq.title}
              description={landingPageData.content.faq.description}
              questions={landingPageData.content.faq.questions}
            />
          )}

          {landingPageData.businessData.serviceAreas &&
            landingPageData.businessData.serviceAreas.length > 0 && (
              <ServiceAreasSection
                serviceAreas={landingPageData.businessData.serviceAreas}
                themeData={landingPageData.themeData}
              />
            )}

          <FooterSection
            businessName={landingPageData.businessName}
            businessDescription={
              landingPageData.content?.about?.description ||
              "Professional services you can trust. We're here to help with all your business needs."
            }
            logoImage={
              landingPageData.images?.find(
                (img) => img.slotName === "logo-image"
              )?.imageUrl
            }
            businessData={landingPageData.businessData}
            themeData={landingPageData.themeData}
            copyright={landingPageData.content.footer?.copyright}
          />
        </main>
      </div>
    </Layout>
  );
}
