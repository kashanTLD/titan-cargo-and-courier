"use client";

import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import FooterSection from "@/sections/FooterSection";
import { ServicesCopySections, ServicesAreas } from "@/app/(pages)/services/[id]/sections";
import Banner from "@/components/Banner";
import FAQSection from "@/sections/FAQSection";
import { useLandingPageData } from "@/components/LandingPageDataProvider";
import { useParams } from "next/navigation";

type UnknownService = {
  id?: unknown;
  title?: unknown;
  name?: unknown;
  description?: unknown;
  price?: unknown;
  features?: unknown;
  cta?: unknown;
};

const getString = (v: unknown): string | undefined => (typeof v === "string" ? v : undefined);
const getNumber = (v: unknown): number | undefined => (typeof v === "number" ? v : undefined);

export default function ServiceDetailPage() {
  const landingPageData = useLandingPageData();
  const { id } = useParams<{ id: string }>();

  const services: unknown[] = Array.isArray(landingPageData.content?.services?.services)
    ? (landingPageData.content.services.services as unknown[])
    : [];
  const toSlug = (str: string) =>
    String(str || "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

  const matchIndex = services.findIndex((s: unknown, idx: number) => {
    const obj = (s || {}) as UnknownService;
    const sid = String((obj.id as string | number | undefined) ?? "");
    const title = getString(obj.title);
    const name = getString(obj.name);
    const slug = toSlug(String(name ?? title ?? `service-${idx + 1}`));
    return sid === id || slug === id;
  });

  const service: UnknownService | undefined = matchIndex >= 0 ? (services[matchIndex] as UnknownService) : undefined;

  if (!service) {
    return (
      <section className="py-24 max-w-3xl mx-auto px-6 text-center">
        <h1 className="text-2xl font-semibold text-gray-900">Service not found</h1>
        <p className="mt-2 text-gray-600">Please go back to the services page.</p>
      </section>
    );
  }

  const titleText: string = String(
    (typeof service.title === "string" ? service.title : undefined) ??
      (typeof service.name === "string" ? service.name : undefined) ??
      "Service"
  );
  const descriptionVal = service?.description;
  const descriptionText: string | null = typeof descriptionVal === "string" ? descriptionVal : null;
  const rawPrice: unknown = service?.price;
  const parsedPrice: number | null =
    getNumber(rawPrice) ?? (typeof rawPrice === "string" && rawPrice.trim() !== "" && !Number.isNaN(Number(rawPrice)) ? Number(rawPrice) : null);

  const img = matchIndex >= 0 ? (landingPageData.images || []).find((im) => im.slotName === `services-image-${matchIndex + 1}`) : undefined;

  return (
    <Layout
      title={landingPageData.seoData.title}
      description={landingPageData.seoData.description}
      theme={landingPageData.themeData}
      seoData={landingPageData.seoData}
      landingPageData={landingPageData}
    >
      <Navbar
        businessName={landingPageData.businessName}
        themeData={landingPageData.themeData}
        phoneNumber={landingPageData.businessData?.phone}
      />
      <main>
        <Banner title={titleText} image={img?.imageUrl} slotName={`services-image-${matchIndex + 1}`} heightClassName="h-[45vh] md:h-[50vh]" />

        <ServicesCopySections
          landingPageData={landingPageData}
          title={titleText}
          description={descriptionText}
          features={(() => {
            const v: unknown = (service as UnknownService)?.features;
            return Array.isArray(v)
              ? (v.filter((x): x is string => typeof x === "string"))
              : [];
          })()}
          price={parsedPrice}
          cta={((): { href?: string; label?: string } | null => {
            const v: unknown = (service as UnknownService)?.cta;
            if (v && typeof v === "object") {
              const obj = v as Record<string, unknown>;
              const href = typeof obj.href === "string" ? obj.href : undefined;
              const label = typeof obj.label === "string" ? obj.label : undefined;
              if (href || label) return { href, label };
            }
            return null;
          })()}
        />
        <ServicesAreas landingPageData={landingPageData} />
        <FAQSection />
        <FooterSection />
      </main>
    </Layout>
  );
}


