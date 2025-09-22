'use client';

import React from 'react';
import Image from "next/image";
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface ServiceItem {
  heading: string;
  description: string;
  imageSlot: string;
  icon?: string; // Optional SVG or emoji icon for added flair
}

interface OurServicesProps {
  heading: string;
  subheading: string;
  services: ServiceItem[];
  images?: {
    slotName: string;
    url: string;
  }[];
  themeData?: {
    primaryColor: string;
    secondaryColor: string;
  };
}

export default function OurServices({ heading, subheading, services = [], images, themeData }: OurServicesProps) {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 });
  const serviceRefs = services?.map(() => useScrollAnimation<HTMLDivElement>({ threshold: 0.3 })) || [];

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ?
      `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` :
      '0, 0, 0';
  };

  const styles = `
    @keyframes fade-in-up {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes scale-in {
      from { transform: scale(0.8); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }

    @keyframes shine {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }

    .fade-in-up-animation {
      animation: fade-in-up 0.8s ease-out forwards;
    }

    .scale-in-animation {
      animation: scale-in 0.6s ease-out forwards;
    }

    .card-hover-effect {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
      box-shadow: 0 10px 20px rgba(var(--theme-primary-rgb, 0, 0, 0), 0.1);
    }

    .card-hover-effect:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 30px rgba(var(--theme-primary-rgb, 0, 0, 0), 0.2);
    }

    .card-hover-effect::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        135deg,
        rgba(var(--theme-primary-rgb, 0, 0, 0), 0.1) 0%,
        rgba(var(--theme-secondary-rgb, 0, 0, 0), 0) 50%,
        rgba(var(--theme-primary-rgb, 0, 0, 0), 0.1) 100%
      );
      opacity: 0;
      transition: opacity 0.3s;
    }

    .card-hover-effect:hover::after {
      opacity: 1;
    }

    .shine-on-hover {
      background: linear-gradient(
        to right,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.4) 50%,
        rgba(255, 255, 255, 0) 100%
      );
      background-size: 200% 100%;
      animation: shine 2s linear infinite;
    }

    .glow-on-hover {
      transition: box-shadow 0.3s ease-in-out;
    }
    .glow-on-hover:hover {
      box-shadow: 0 0 20px rgba(var(--theme-primary-rgb, 0, 0, 0), 0.5);
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <section className="relative overflow-hidden py-24 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          {/* Header Section */}
          <div ref={headerRef} className="text-center mb-16">
            <h2
              className={`text-4xl sm:text-5xl md:text-6xl font-black mb-6 text-gray-900 transition-all duration-1000 ${
                headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            >
              {heading}
            </h2>
            <p
              className={`text-lg text-gray-600 max-w-2xl mx-auto transition-all duration-1000 delay-300 ${
                headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            >
              {subheading}
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {services?.map((service, index) => {
              const { ref: serviceRef, isVisible: serviceVisible } = serviceRefs[index] || { ref: null, isVisible: false };
              const serviceImage = images?.find(img => img?.slotName === service?.imageSlot);

              return (
                <div
                  key={index}
                  ref={serviceRef}
                  className={`card-hover-effect overflow-hidden rounded-2xl bg-white p-8 transition-all duration-700 ${
                    serviceVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}
                  style={{ transitionDelay: `${index * 0.15}s` }}
                >
                  <div className="relative w-full h-48 mb-6 rounded-xl overflow-hidden glow-on-hover">
                    {serviceImage ? (
                      <Image
                        src={serviceImage.url}
                        alt={service.heading}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl bg-gray-100">
                        {service.icon || '✨'}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-bold">{service.heading}</h3>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-4">{service.description}</p>
                  <a href="#" className="inline-flex items-center text-sm font-semibold text-gray-800 transition-colors duration-300 hover:text-gray-950">
                    Learn More
                    <svg className="ml-1 w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}