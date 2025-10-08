"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useLandingPageData } from "@/components/LandingPageDataProvider";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";



export default function TestimonialsSection() {
  const landing = useLandingPageData();
  const resolvedTitle = landing?.content?.testimonials?.title || "TESTIMONIALS";
  const resolvedDescription = landing?.content?.testimonials?.description || "";
  const resolvedTestimonials = landing?.content?.testimonials?.testimonials || [];
  const resolvedTheme = landing?.themeData;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: resolvedTestimonials.length > 2 });

  const primaryColor = resolvedTheme?.primaryColor || 'var(--color-primary-dark)';
  const secondaryColor = resolvedTheme?.secondaryColor || 'var(--color-secondary)';
  const backgroundGradient = `linear-gradient(210deg, ${primaryColor}, ${secondaryColor})`;
  const textColor = `color-mix(in srgb, ${primaryColor} 25%, var(--color-black))`;

  const next = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);
  const prev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    setSelectedIndex(emblaApi.selectedScrollSnap());
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  // Embla renders all slides; current selection tracked via selectedIndex
  const landingPageData = useLandingPageData();

  const theme = landingPageData?.themeData;

  return (
    <section id="testimonials" className="relative py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 flex flex-col items-center justify-center overflow-hidden" style={{ background: backgroundGradient }}>
      {/* Use same animated background as Hero */}
      <div className="bg-animated-hero"></div>
      <div className="absolute inset-0 hero-overlay"></div>

      {/* Subtle glow orbs (green/blue accents) - responsive sizing */}
      <div className="pointer-events-none absolute -top-12 sm:-top-16 md:-top-24 left-4 sm:left-6 md:left-10 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full blur-2xl sm:blur-3xl opacity-20 sm:opacity-25"
        style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--hero-accent-emerald) 60%, transparent), transparent)' }} />
      <div className="pointer-events-none absolute -bottom-12 sm:-bottom-16 md:-bottom-24 right-4 sm:right-6 md:right-10 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full blur-2xl sm:blur-3xl opacity-15 sm:opacity-20"
        style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--color-secondary) 60%, transparent), transparent)' }} />

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10 w-full">
        {/* Heading */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-14">
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-light leading-[1.1] tracking-[-0.03em] text-[#1a1a1a] font-serif font-pirata uppercase animate-text-glow px-4"
            style={{ color: 'var(--color-white)' }}
          >
            {resolvedTitle}
          </h2>
          <div className="mx-auto mt-2 sm:mt-3 h-[2px] sm:h-[3px] w-20 sm:w-28 rounded-full"
            style={{ background: 'linear-gradient(90deg, var(--hero-accent-emerald), color-mix(in srgb, var(--color-secondary) 85%, var(--hero-accent-emerald)))' }}
          />
          <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl lg:max-w-3xl mx-auto px-4 leading-relaxed"
            style={{ color: 'color-mix(in srgb, var(--color-white) 80%, transparent)' }}
          >
            {resolvedDescription}
          </p>
        </div>

        {/* Embla Carousel: responsive layout */}
        <div className="relative flex items-center justify-center select-none">
          {/* Left arrow */}
          <button
            onClick={prev}
            className="absolute left-0 sm:left-2 md:left-4 lg:left-8 top-1/2 -translate-y-1/2 h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded-full shadow-md hover:scale-105 transition z-20 text-sm sm:text-base md:text-lg"
            style={{
              background: primaryColor,
              border: '1px solid color-mix(in srgb, var(--color-white) 16%, transparent)',
              color: 'var(--color-white)'
            }}
            aria-label="Previous"
          >
            ‹
          </button>

          {/* Embla Viewport */}
          <div className="w-full max-w-[calc(100%-4rem)] sm:max-w-[calc(100%-5rem)] md:max-w-[calc(100%-6rem)] lg:max-w-[980px] overflow-hidden" ref={emblaRef}>
            <div className="flex -mx-2 sm:-mx-3">
              {resolvedTestimonials.map((item, i) => (
                <div key={i} className="px-2 sm:px-3 flex-[0_0_100%] md:flex-[0_0_100%] lg:flex-[0_0_50%]">
                  <div className="relative min-h-[320px] sm:min-h-[350px] md:min-h-[380px] lg:h-[400px] flex flex-col items-center justify-center rounded-2xl sm:rounded-3xl overflow-hidden"
                    style={{
                      background: 'var(--color-white)',
                      border: '1px solid color-mix(in srgb, var(--color-black) 10%, transparent)',
                      boxShadow: '0 8px 25px color-mix(in srgb, var(--color-black) 15%, transparent)'
                    }}
                  >
                    {/* Quote icon */}
                    <div className="absolute top-3 sm:top-4 md:top-5 left-3 sm:left-4 md:left-5 h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded-lg sm:rounded-xl flex items-center justify-center"
                      style={{ background: 'color-mix(in srgb, var(--hero-accent-emerald) 15%, transparent)' }}
                    >
                      <svg width="16" height="16" className="sm:w-[18px] sm:h-[18px] md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" style={{ color: 'var(--hero-accent-emerald)' }}>
                        <path d="M7 7h4v10H5V9a2 2 0 012-2zm10 0h4v10h-6V9a2 2 0 012-2z" fill="currentColor" />
                      </svg>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-10 pt-12 sm:pt-13 md:pt-14 pb-6 sm:pb-8 md:pb-10 text-center">
                      <p className="text-sm sm:text-base md:text-lg leading-relaxed sm:leading-relaxed md:leading-relaxed" style={{ color: textColor }}>
                        {item.text}
                      </p>

                      {/* Profile */}
                      <div className="mt-6 sm:mt-7 md:mt-8 flex flex-col items-center">
                        <div className="relative h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-full overflow-hidden"
                          style={{ boxShadow: '0 0 0 2px color-mix(in srgb, var(--hero-accent-emerald) 35%, transparent), 0 0 12px color-mix(in srgb, var(--hero-accent-emerald) 15%, transparent)' }}
                        >
                          {/* No profile image in data; use gradient placeholder with initial */}
                          <div className="absolute inset-0 rounded-full flex items-center justify-center"
                            style={{ background: 'linear-gradient(135deg, var(--hero-accent-emerald), color-mix(in srgb, var(--color-secondary) 70%, var(--hero-accent-emerald)))', color: 'var(--color-white)' }}
                          >
                            <span className="font-semibold text-sm sm:text-base md:text-lg">{item.name?.charAt(0) || 'A'}</span>
                          </div>
                        </div>
                        <div className="mt-2 sm:mt-3 tracking-wide text-xs sm:text-xs md:text-xs font-semibold uppercase" style={{ color: textColor }}>
                          {item.name}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
              
          {/* Right arrow */}
          <button
            onClick={next}
            className="absolute right-0 sm:right-2 md:right-4 lg:right-8 top-1/2 -translate-y-1/2 h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded-full shadow-md hover:scale-105 transition z-20 text-sm sm:text-base md:text-lg"
            style={{
              background: primaryColor,
              border: '1px solid color-mix(in srgb, var(--color-white) 16%, transparent)',
              color: 'var(--color-white)'
            }}
            aria-label="Next"
          >
            ›
          </button>
        </div>

        {/* Dots */}
        <div className="mt-4 sm:mt-5 md:mt-6 flex items-center justify-center gap-1.5 sm:gap-2">
          {scrollSnaps.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full transition-all duration-300"
              aria-current={i === selectedIndex}
              style={{
                background: i === selectedIndex
                  ? 'linear-gradient(135deg, var(--hero-accent-emerald), color-mix(in srgb, var(--color-secondary) 75%, var(--hero-accent-emerald)))'
                  : 'color-mix(in srgb, var(--color-white) 25%, transparent)'
              }}
            />
          ))}
        </div>
      </div>

      <Link href={'/reviews'} className="mt-8 sm:mt-10 md:mt-12 mb-4 sm:mb-6 md:mb-8 relative z-50 inline-flex items-center justify-center px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 md:py-3.5 rounded-full text-white font-medium text-sm sm:text-base shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 focus:outline-none" style={{
                  backgroundImage: `linear-gradient(90deg, ${theme?.primaryColor || '#7c4a35'}, ${theme?.secondaryColor || '#b07b62'})`,
                }}>See All Reviews</Link>
      </section>
    );
  }
