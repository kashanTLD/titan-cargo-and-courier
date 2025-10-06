"use client";

import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import FooterSection from "@/sections/FooterSection";
import { ServicesCopySections, ServicesAreas } from "@/app/(pages)/services/[id]/sections";
import Banner from "@/components/Banner";
import FAQSection from "@/sections/FAQSection";
import { useLandingPageData } from "@/components/LandingPageDataProvider";
import { useParams } from "next/navigation";
import Link from "next/link";

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

  // Helper: brand and image
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
        <Banner title={titleText || `${brandName} Services`} image={img?.imageUrl} slotName={`services-image-${(matchIndex >= 0 ? matchIndex : 0) + 1}`} heightClassName="h-[45vh] md:h-[50vh]" />

        {service ? (
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
        <section className="bg-gray-50">
          <div className="mx-auto w-full md:max-w-[70vw] px-4 sm:px-6 py-12 md:py-16">
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900">Related services</h3>
            {related.length > 0 ? (
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {related.map((r) => (
                  <Link key={r.href} href={r.href} replace className="block rounded-xl border border-gray-200 bg-white p-4 hover:shadow-md transition">
                    <div className="h-28 w-full rounded-lg bg-gray-100" />
                    <div className="mt-3 font-medium text-gray-900">{r.label}</div>
                    <div className="text-sm text-gray-600">Learn more</div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="rounded-xl border border-gray-200 bg-white p-4">
                    <div className="h-28 w-full rounded-lg bg-gray-100 animate-pulse" />
                    <div className="mt-3 h-4 w-2/3 bg-gray-100 rounded animate-pulse" />
                    <div className="mt-2 h-3 w-1/3 bg-gray-100 rounded animate-pulse" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <ServicesAreas landingPageData={landingPageData} />

        {/* Contact CTA */}
        <section className="bg-white">
          <div className="mx-auto w-full md:max-w-[70vw] px-4 sm:px-6 py-12 md:py-16">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 rounded-2xl border border-gray-200 bg-gray-50">
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900">Have questions about this service?</h3>
                <p className="mt-1 text-gray-700">We're happy to help you choose the right option for your needs.</p>
              </div>
              <div>
                <a
                  href={landingPageData.businessData?.phone ? `tel:${landingPageData.businessData.phone}` : "#"}
                  className="inline-flex items-center px-5 py-3 rounded-lg text-white font-medium"
                  style={{ background: `linear-gradient(135deg, ${landingPageData.themeData?.primaryColor} 0%, ${landingPageData.themeData?.secondaryColor} 100%)` }}
                >
                  Call {brandName}
                </a>
              </div>
            </div>
          </div>
        </section>

        <FAQSection />
        <FooterSection />
      </main>
    </Layout>
  );
}



