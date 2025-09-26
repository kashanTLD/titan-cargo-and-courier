import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import FooterSection from "@/sections/FooterSection";
import TestimonialsSection from "@/sections/TestimonialsSection";
import { getLandingPageData, getReviews } from "@/lib/data";

interface Review {
  id: string | number;
  author?: string | null;
  rating?: number | null; // 1-5
  comment?: string | null;
  created_at?: string | Date | null;
}

export const revalidate = 0;

// Removed local function - using cached version from lib/data

export default async function ReviewsPage() {
  const landingPageData = await getLandingPageData();
  const reviews = await getReviews();

  if (!landingPageData) {
    return <section className="py-16 md:max-w-[70vw] w-full mx-auto px-4 sm:px-6" />;
  }

  const testimonials = reviews.map((r) => ({
    name: r.author || "",
    role: "",
    text: r.comment || "",
    company: "",
  }));

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
        <TestimonialsSection />
        <FooterSection />
      </main>
    </Layout>
  );
}


