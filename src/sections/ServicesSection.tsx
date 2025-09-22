"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Image as ImageType } from "@/types/template";
import Image from "next/image";

interface Service {
  name: string;
  description: string;
  price: string;
  features: string[];
  cta?: { href: string; label: string };
}

interface ServicesSectionProps {
  title: string;
  description: string;
  services: Service[];
  theme?: {
    primaryColor: string;
    secondaryColor: string;
  };
  images: ImageType[] ;
}

export default function ServicesSection({
  title,
  description,
  services,
  theme,
  images,
}: ServicesSectionProps) {
  const { ref: titleRef, isVisible: titleVisible } =
    useScrollAnimation<HTMLHeadingElement>({ threshold: 0.2 });
  const { ref: descRef, isVisible: descVisible } =
    useScrollAnimation<HTMLParagraphElement>({ threshold: 0.2 });

  return (
    <section id="services" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Sticky Left Header */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-24 space-y-6">
              <div className="flex items-center gap-4 text-gray-700/80">
                <span className="text-sm tracking-wide uppercase">What We Offer</span>
                <span className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${theme?.primaryColor || '#7c4a35'} , transparent)` }} />
              </div>
              <h2
                ref={titleRef}
                className={`text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 transition-all duration-700 ${
                  titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                {title}
              </h2>
              <p
                ref={descRef}
                className={`text-base sm:text-lg text-gray-600 transition-all duration-700 delay-150 ${
                  descVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                }`}
              >
                {description}
              </p>
            </div>
          </aside>

          {/* Cards Grid */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {services.map((service, index) => {
                const img = images.find(img => img.slotName === `services-image-${index + 1}`);
                const altText = img?.altText || `${service.name} image`;
                return (
                  <article
                    key={index}
                    className="group relative flex flex-col rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 focus-within:shadow-md"
                    aria-labelledby={`service-title-${index}`}
                  >
                    {/* Image Top */}
                    <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-50">
                      {img?.imageUrl ? (
                        <Image
                          src={img.imageUrl}
                          alt={altText}
                          fill
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 25vw, 20vw"
                        />
                      ) : (
                        <div
                          className="w-full h-full flex items-center justify-center text-3xl text-gray-300"
                          aria-hidden="true"
                        >
                          🖼️
                        </div>
                      )}
                    </div>

                    {/* Body */}
                    <div className="flex-1 p-5 md:p-6 flex flex-col gap-3">
                      <h3
                        id={`service-title-${index}`}
                        className="text-xl font-semibold text-gray-900"
                      >
                        {service.name}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {service.description}
                      </p>
                      <div className="mt-auto pt-2">
                        <a
                          href={service.cta?.href || "#"}
                          className="inline-flex items-center justify-center w-full sm:w-auto px-5 py-2 rounded-md text-xs tracking-[0.2em] font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 uppercase"
                          style={{
                            color: theme?.primaryColor || '#7c4a35',
                            border: `1px solid ${theme?.primaryColor || '#7c4a35'}`,
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLAnchorElement).style.color = '#ffffff';
                            (e.currentTarget as HTMLAnchorElement).style.background = theme ? `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})` : '#111111';
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
                            (e.currentTarget as HTMLAnchorElement).style.color = theme?.primaryColor || '#7c4a35';
                          }}
                          aria-label={`${service.cta?.label || "Learn More"} about ${service.name}`}
                        >
                          {service.cta?.label || "Learn More"}
                        </a>
                      </div>
                    </div>

                    {/* Decorative subtle corner icon */}
                    <div className="pointer-events-none absolute top-3 right-3 opacity-20">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.2" />
                        <path d="M12 7v10M7 12h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                      </svg>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
