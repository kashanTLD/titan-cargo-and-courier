"use client";

import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import Banner from "@/components/Banner";
import FooterSection from "@/sections/FooterSection";
import ReviewsTestimonialsSection from "./sections/ReviewsTestimonialsSection";
import { useLandingPageData } from "@/components/LandingPageDataProvider";

export default function ReviewsPage() {
  const landingPageData = useLandingPageData();

  return (
    <Layout
      title={landingPageData?.seoData?.title}
      description={landingPageData?.seoData?.description}
      theme={landingPageData?.themeData}
      seoData={landingPageData?.seoData}
      landingPageData={landingPageData || undefined}
    >
      <Navbar />
      <Banner title="Reviews" slotName="reviews-hero" />
      <main>
        {/* Pass empty reviews to avoid DB fetch; section will fall back to context testimonials */}
        <ReviewsTestimonialsSection reviews={[]} />
        <FooterSection />
      </main>
    </Layout>
  );
}
