import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import FooterSection from "@/sections/FooterSection";
import ReviewsTestimonialsSection from "./sections/ReviewsTestimonialsSection";
import { getLandingPageData, getReviews } from "@/lib/data";

export const revalidate = 0;

// Removed local function - using cached version from lib/data

export default async function ReviewsPage() {
  const landingPageData = await getLandingPageData();
  const reviews = await getReviews();
  const safeReviews = reviews.map((r) => {
    const v = r?.created_at;
    let createdIso: string | null = null;
    if (v instanceof Date) {
      createdIso = v.toISOString();
    } else if (typeof v === "string") {
      const d = new Date(v);
      createdIso = isNaN(d.getTime()) ? null : d.toISOString();
    } else {
      createdIso = null;
    }
    return { ...r, created_at: createdIso };
  });

  return (
    <Layout
      title={landingPageData?.seoData?.title}
      description={landingPageData?.seoData?.description}
      theme={landingPageData?.themeData}
      seoData={landingPageData?.seoData}
      landingPageData={landingPageData || undefined}
    >
      <Navbar />
      <main>
        <ReviewsTestimonialsSection reviews={safeReviews} />
        <FooterSection />
      </main>
    </Layout>
  );
}


