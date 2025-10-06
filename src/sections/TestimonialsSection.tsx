"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useLandingPageData } from "@/components/LandingPageDataProvider";
import useEmblaCarousel from "embla-carousel-react";

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

  return (
    <section id="testimonials" className="relative py-20 sm:py-24 md:py-28 overflow-hidden" style={{ background: backgroundGradient }}>
      {/* Use same animated background as Hero */}
      <div className="bg-animated-hero"></div>
      <div className="absolute inset-0 hero-overlay"></div>

      {/* Subtle glow orbs (green/blue accents) */}
      <div className="pointer-events-none absolute -top-24 left-10 w-80 h-80 rounded-full blur-3xl opacity-25"
        style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--hero-accent-emerald) 60%, transparent), transparent)' }} />
      <div className="pointer-events-none absolute -bottom-24 right-10 w-80 h-80 rounded-full blur-3xl opacity-20"
        style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--color-secondary) 60%, transparent), transparent)' }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-[clamp(2.5rem,6vw,4rem)] font-light leading-[1] tracking-[-0.03em] text-[#1a1a1a] font-serif font-pirata uppercase animate-text-glow"
            style={{ color: 'var(--color-white)' }}
          >
            {resolvedTitle}
          </h2>
          <div className="mx-auto mt-3 h-[3px] w-28 rounded-full"
            style={{ background: 'linear-gradient(90deg, var(--hero-accent-emerald), color-mix(in srgb, var(--color-secondary) 85%, var(--hero-accent-emerald)))' }}
          />
          <p className="mt-5 text-base sm:text-lg md:text-xl max-w-3xl mx-auto"
            style={{ color: 'color-mix(in srgb, var(--color-white) 80%, transparent)' }}
          >
            {resolvedDescription}
          </p>
        </div>

        {/* Embla Carousel: 1 slide on small, 2 on large */}
        <div className="relative flex items-center justify-center select-none">
          {/* Left arrow */}
          <button
            onClick={prev}
            className="absolute left-0 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full shadow-md hover:scale-105 transition z-20"
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
          <div className="w-full sm:w-[560px] md:w-[680px] lg:w-[980px] overflow-hidden" ref={emblaRef}>
            <div className="flex -mx-3">
              {resolvedTestimonials.map((item, i) => (
                <div key={i} className="px-3 flex-[0_0_100%] lg:flex-[0_0_50%]">
                  <div className="relative h-full md:h-[400px] flex flex-col items-center justify-center rounded-3xl overflow-hidden"
                    style={{
                      background: 'var(--color-white)',
                      border: '1px solid color-mix(in srgb, var(--color-black) 10%, transparent)',
                      boxShadow: '0 10px 30px color-mix(in srgb, var(--color-black) 20%, transparent)'
                    }}
                  >
                    {/* Quote icon */}
                    <div className="absolute top-5 left-5 h-10 w-10 rounded-xl flex items-center justify-center"
                      style={{ background: 'color-mix(in srgb, var(--hero-accent-emerald) 15%, transparent)' }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ color: 'var(--hero-accent-emerald)' }}>
                        <path d="M7 7h4v10H5V9a2 2 0 012-2zm10 0h4v10h-6V9a2 2 0 012-2z" fill="currentColor" />
                      </svg>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 px-6 sm:px-10 pt-14 pb-10 text-center">
                      <p className="text-base sm:text-lg leading-relaxed" style={{ color: textColor }}>
                        {item.text}
                      </p>

                      {/* Profile */}
                      <div className="mt-8 flex flex-col items-center">
                        <div className="relative h-16 w-16 rounded-full overflow-hidden"
                          style={{ boxShadow: '0 0 0 3px color-mix(in srgb, var(--hero-accent-emerald) 35%, transparent), 0 0 18px color-mix(in srgb, var(--hero-accent-emerald) 20%, transparent)' }}
                        >
                          {/* No profile image in data; use gradient placeholder with initial */}
                          <div className="absolute inset-0 rounded-full flex items-center justify-center"
                            style={{ background: 'linear-gradient(135deg, var(--hero-accent-emerald), color-mix(in srgb, var(--color-secondary) 70%, var(--hero-accent-emerald)))', color: 'var(--color-white)' }}
                          >
                            <span className="font-semibold text-lg">{item.name?.charAt(0) || 'A'}</span>
                          </div>
                        </div>
                        <div className="mt-3 tracking-wide text-xs font-semibold uppercase" style={{ color: textColor }}>
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
            className="absolute right-0 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full shadow-md hover:scale-105 transition z-20"
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
        <div className="mt-6 flex items-center justify-center gap-2">
          {scrollSnaps.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              className="h-2 w-2 rounded-full"
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
      </section>
    );
  }
