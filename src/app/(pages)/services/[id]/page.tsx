"use client";

import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import FooterSection from "@/sections/FooterSection";
import CTASection from "@/sections/CTASection";
import { ServiceDetails, ServicesAreas } from "@/app/(pages)/services/[id]/sections";
import Banner from "@/components/Banner";
import ServicesFAQSection from "./sections/ServicesFAQSection";
import { useLandingPageData } from "@/components/LandingPageDataProvider";
import { useParams } from "next/navigation";
import Breadcrumbs from "@/app/(pages)/services/[id]/components/Breadcrumbs";
import RelatedServicesSection from "@/app/(pages)/services/[id]/components/RelatedServicesSection";
import HowItWorksSection from "@/app/(pages)/services/[id]/components/HowItWorksSection";
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

  const brandName = landingPageData.businessName || "Business";
  const bannerImg = matchIndex >= 0 ? (landingPageData.images || []).find((im) => im.slotName === `services-image-${matchIndex + 1}`) : undefined;

  const titleText: string = String(
    (typeof service?.title === "string" ? service?.title : undefined) ??
      (typeof service?.name === "string" ? service?.name : undefined) ??
      (matchIndex >= 0 ? `Service ${matchIndex + 1}` : "Service")
  );
  const descriptionVal = service?.description;
  const descriptionText: string | null = typeof descriptionVal === "string" ? descriptionVal : null;
  const rawPrice: unknown = service?.price;
  const parsedPrice: number | null =
    getNumber(rawPrice) ?? (typeof rawPrice === "string" && rawPrice.trim() !== "" && !Number.isNaN(Number(rawPrice)) ? Number(rawPrice) : null);

  const img = bannerImg;

  // Try to find a matching detailed content item from content.servicesDetails
  const detailsList: Array<{ title?: string; content?: { description?: string; sections?: Array<{ title?: string; text?: string }>; faqs?: string[] } }>
    = Array.isArray(landingPageData.content?.servicesDetails?.servicesDetails)
      ? (landingPageData.content.servicesDetails!.servicesDetails as Array<{ title?: string; content?: { description?: string; sections?: Array<{ title?: string; text?: string }>; faqs?: string[] } }>)
      : [];

  const currentSlug = toSlug(titleText || "");
  // Matching strategy: exact slug match -> keyword match -> index fallback
  const detailMatch = (() => {
    // 1) Exact slug match or substring overlap
    const exact = detailsList.find((d) => {
      const ds = toSlug(String(d?.title || ""));
      return ds === currentSlug || (ds && currentSlug && (ds.includes(currentSlug) || currentSlug.includes(ds)));
    });
    if (exact) return exact;

    // 2) Keyword match heuristics
    const slug = currentSlug;
    const isCargo = /(cargo|courier|same-day|medical|furniture|appliance)/i.test(slug);
    const isMoving = /(moving|mover|relocation|furniture)/i.test(slug);
    if (isCargo || isMoving) {
      const candidate = detailsList.find((d) => {
        const t = String(d?.title || "").toLowerCase();
        return isCargo ? t.includes("cargo") || t.includes("courier") : t.includes("moving");
      });
      if (candidate) return candidate;
    }

    // 3) Fallback by index alignment when available
    if (matchIndex >= 0 && matchIndex < detailsList.length) {
      return detailsList[matchIndex];
    }
    return undefined;
  })();
  const detailDescription: string | undefined = detailMatch?.content?.description || undefined;
  const detailSections: Array<{ title: string; text: string }> = Array.isArray(detailMatch?.content?.sections)
    ? (detailMatch!.content!.sections!.map((s) => ({ title: String(s?.title || ""), text: String(s?.text || "") })).filter((s) => s.title || s.text))
    : [];

  // Compute images for this service by prefix (moving-service-*, cargo-service-*)
  const isMovingService = /(moving|mover|relocation)/i.test(currentSlug);
  const isCargoService = /(cargo|courier|same-day|medical)/i.test(currentSlug);
  const imagePrefix = isMovingService ? 'moving-service' : isCargoService ? 'cargo-service' : null;
  const serviceImages = imagePrefix
    ? (landingPageData.images || []).filter((im) => typeof im.slotName === 'string' && im.slotName.startsWith(`${imagePrefix}-`))
    : [];

  // Build related services (exclude current)
  const related = services
    .map((s, idx) => {
      const obj = (s || {}) as Record<string, unknown>;
      const idVal = obj.id as string | number | undefined;
      const title = typeof obj.title === "string" ? obj.title : undefined;
      const name = typeof obj.name === "string" ? obj.name : undefined;
      const label = String(title ?? name ?? `Service ${idx + 1}`);
      const slug = toSlug(label);
      const href = `/services/${slug || String(idVal ?? idx + 1)}`;
      return { label, href, idx };
    })
    .filter((r) => r.idx !== matchIndex)
    .slice(0, 6);

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
        {/* Banner + Breadcrumbs */}
        <Banner
          title={titleText || `${brandName} Services`}
          image={img?.imageUrl}
          slotName={`services-image-${(matchIndex >= 0 ? matchIndex : 0) + 1}`}
          heightClassName="h-[45vh] md:h-[50vh]"
        />
        <Breadcrumbs theme={landingPageData.themeData} titleText={titleText} />
        {service ? (
          <ServiceDetails
            landingPageData={landingPageData}
            title={titleText}
            description={descriptionText}
            detailDescription={detailDescription}
            features={(() => {
              const v: unknown = (service as UnknownService)?.features;
              const arr = Array.isArray(v) ? v.filter((x): x is string => typeof x === "string").map((s) => s.trim()).filter(Boolean) : [];
              // Dedupe case-insensitively
              const seen = new Set<string>();
              const deduped = arr.filter((item) => {
                const key = item.toLowerCase();
                if (seen.has(key)) return false;
                seen.add(key);
                return true;
              });
              // Title Case simple
              const titled = deduped.map((s) => s.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()));
              return titled.slice(0, 12);
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
        ) : (
          // Skeleton/fallback when service is not found
          <section className="bg-white">
            <div className="mx-auto w-full md:max-w-[70vw] px-4 sm:px-6 py-12 md:py-16 space-y-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Service not found</h2>
                <p className="mt-2 text-gray-600">Explore our available services and get in touch for assistance.</p>
                <div className="mt-6 h-24 rounded-lg bg-gray-100 animate-pulse" />
              </div>
            </div>
          </section>
        )}
        {/* Related Services */}
        <RelatedServicesSection related={related} />
        <ServicesAreas landingPageData={landingPageData} />
        {/* How it works: build steps from detailSections */}
        <HowItWorksSection
          detailSections={detailSections}
          theme={landingPageData.themeData}
          image={serviceImages.length > 2
            ? { id: serviceImages[2].id, imageUrl: serviceImages[2].imageUrl, altText: serviceImages[2].altText, title: serviceImages[2].title }
            : undefined}
        />
        {/* Full-width CTA Section */}
        <CTASection />
        <ServicesFAQSection />
        <FooterSection />
      </main>
    </Layout>
  );
}
