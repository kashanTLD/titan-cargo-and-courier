import { notFound } from "next/navigation";
import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import FooterSection from "@/sections/FooterSection";
import { getLandingPageData } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

interface Service {
  id: string | number;
  title?: string;
  name?: string;
  description?: string | null;
  price?: number | null;
}

export const revalidate = 0;

// Removed local function - using cached version from lib/data

export default async function ServiceDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const landingPageData = await getLandingPageData();

  if (!landingPageData) {
    return (
      <section className="py-16 md:max-w-[70vw] w-full mx-auto px-4 sm:px-6" />
    );
  }

  // Resolve service from landing page content instead of DB
  // Normalize services to an unknown[] and narrow as we read
  const services: unknown[] = Array.isArray(landingPageData.content?.services?.services)
    ? (landingPageData.content.services.services as unknown[])
    : [];
  const toSlug = (str: string) =>
    String(str || "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

  // Helper type guards for fields we care about
  type UnknownService = {
    id?: unknown;
    title?: unknown;
    name?: unknown;
    description?: unknown;
    price?: unknown;
    features?: unknown;
    cta?: unknown;
  };

  const getString = (v: unknown): string | undefined => (typeof v === 'string' ? v : undefined);
  const getNumber = (v: unknown): number | undefined => (typeof v === 'number' ? v : undefined);
  const getStringArray = (v: unknown): string[] | undefined => (Array.isArray(v) && v.every(i => typeof i === 'string') ? (v as string[]) : undefined);
  const getCTA = (v: unknown): { href?: string; label?: string } | undefined => {
    if (v && typeof v === 'object') {
      const obj = v as Record<string, unknown>;
      const href = getString(obj.href);
      const label = getString(obj.label);
      return { href, label };
    }
    return undefined;
  };

  const matchIndex = services.findIndex((s: unknown, idx: number) => {
    const obj = (s || {}) as UnknownService;
    const sid = String((obj.id as string | number | undefined) ?? "");
    const title = getString(obj.title);
    const name = getString(obj.name);
    const slug = toSlug(String(name ?? title ?? `service-${idx + 1}`));
    return sid === params.id || slug === params.id;
  });
  const service: UnknownService | undefined = matchIndex >= 0 ? (services[matchIndex] as UnknownService) : undefined;

  if (!service) return notFound();
  // Derive display-safe fields
  const titleText: string = String(getString(service?.title) ?? getString(service?.name) ?? 'Service');
  const descriptionVal = service?.description;
  const descriptionText: string | null = typeof descriptionVal === 'string' ? descriptionVal : null;
  const rawPrice: unknown = service?.price;
  const parsedPrice: number | null = getNumber(rawPrice) ?? (typeof rawPrice === 'string' && rawPrice.trim() !== '' && !Number.isNaN(Number(rawPrice)) ? Number(rawPrice) : null);
  const features: string[] = getStringArray(service?.features) ?? [];
  const cta = getCTA(service?.cta);

  // Related image by slot naming convention from listing
  const images = landingPageData.images || [];
  const img = matchIndex >= 0 ? images.find((img) => img.slotName === `services-image-${matchIndex + 1}`) : undefined;
  const theme = landingPageData.themeData;

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
        {/* Split-screen full-height layout */}
        <section className="min-h-screen grid lg:grid-cols-12">
          {/* Left: Content */}
          <div className="lg:col-span-6 flex items-center bg-white">
            <div className="w-full mx-auto px-6 md:px-10 py-12">
              <div className="mb-6 text-sm text-gray-500">
                <Link href="/services" className="hover:underline">Services</Link>
                <span className="mx-2">/</span>
                <span className="text-gray-700">{titleText}</span>
              </div>
              <div className="flex items-center gap-3 flex-wrap mb-6">
                <h1 className="text-3xl md:text-5xl font-bold text-gray-900">{titleText}</h1>
                {typeof parsedPrice === 'number' && (
                  <span className="px-3 py-1 rounded-full text-sm font-semibold bg-gray-900 text-white">
                    ${parsedPrice.toFixed(2)}
                  </span>
                )}
              </div>

              {descriptionText && (
                <p className="text-base md:text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {descriptionText}
                </p>
              )}

              {features.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">What’s included</h2>
                  <ul className="flex flex-wrap gap-2">
                    {features.map((f, i) => (
                      <li key={i} className="px-3 py-1 rounded-full text-sm border border-gray-200 text-gray-700 bg-gray-50">
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {cta?.href && (
                <div className="mt-10">
                  <a
                    href={cta.href}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white shadow transition-transform duration-200 hover:-translate-y-0.5"
                    style={{
                      background: `linear-gradient(135deg, ${theme?.primaryColor || '#111827'}, ${theme?.secondaryColor || '#6b7280'})`,
                    }}
                  >
                    {cta.label || 'Get started'}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Right: Visual panel */}
          <div className="lg:col-span-6 relative overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${theme?.primaryColor || '#111827'}, ${theme?.secondaryColor || '#6b7280'})`,
              }}
            />
            {img?.imageUrl && (
              <Image src={img.imageUrl} alt={img.altText || titleText} fill className="object-cover mix-blend-overlay opacity-70" />
            )}
            <div className="relative z-10 h-full flex items-end">
              <div className="w-full px-6 md:px-10 py-10">
                <div className="bg-white/90 backdrop-blur rounded-2xl p-6 shadow border border-white/60">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Quick facts</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
                    <div className="col-span-2 flex items-center justify-between">
                      <span>Service</span>
                      <span className="font-medium text-gray-900">{titleText}</span>
                    </div>
                    {typeof parsedPrice === 'number' && (
                      <div className="col-span-2 flex items-center justify-between">
                        <span>Price</span>
                        <span className="font-semibold">${parsedPrice.toFixed(2)}</span>
                      </div>
                    )}
                    {features.slice(0, 6).map((f, i) => (
                      <div key={i} className="px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 truncate">
                        {f}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <FooterSection />
      </main>
    </Layout>
  );
}


