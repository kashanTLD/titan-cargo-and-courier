'use client';

import React from 'react';
import Image from "next/image";
import { CompanyDetailsContent, Image as ImageType } from '@/types/template';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface CompanyDetailsProps {
  data: CompanyDetailsContent;
  images?: ImageType[];
  theme?: {
    primaryColor: string;
    secondaryColor: string;
  };
}

export default function CompanyDetails({ data, images, theme }: CompanyDetailsProps) {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 });
  const { ref: section1Ref, isVisible: section1Visible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 });
  const { ref: section2Ref, isVisible: section2Visible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 });
  const { ref: section3Ref, isVisible: section3Visible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 });

  if (!data || !data.sections || data.sections.length === 0) {
    return null;
  }

  const getImageBySlot = (slotName: string) => {
    return images?.find(img => img.slotName === slotName);
  };

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

    @keyframes gradient-pulse {
      0%, 100% { 
        background-position: 0% 50%;
        box-shadow: 0 0 15px rgba(var(--theme-primary-rgb), 0.3);
      }
      50% { 
        background-position: 100% 50%;
        box-shadow: 0 0 25px rgba(var(--theme-primary-rgb), 0.6);
      }
    }

    .fade-in-up-animation {
      animation: fade-in-up 0.8s ease-out forwards;
    }

    .scale-in-animation {
      animation: scale-in 0.6s ease-out forwards;
    }

    .gradient-bg-pulse {
      background: linear-gradient(90deg, var(--theme-primary-color), var(--theme-secondary-color));
      background-size: 200% 200%;
      animation: gradient-pulse 4s ease-in-out infinite;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <section className="relative overflow-hidden py-24 bg-white">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20" style={{ backgroundColor: theme?.primaryColor }} />
          <div className="absolute bottom-1/3 right-1/2 w-80 h-80 rounded-full blur-3xl opacity-15" style={{ backgroundColor: theme?.secondaryColor }} />
        </div>

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          {/* Header Section */}
          <div ref={headerRef} className="text-center mb-16 lg:mb-24">
            <h2 
              className={`text-4xl sm:text-5xl md:text-6xl font-black mb-6 text-gray-900 transition-all duration-1000 ${
                headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            >
              {data.heading}
            </h2>
            <p 
              className={`text-lg text-gray-600 max-w-2xl mx-auto transition-all duration-1000 delay-300 ${
                headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            >
              {data.subheading}
            </p>
          </div>

          {/* Sections */}
          {data.sections.map((section, index) => (
            <div 
              key={index} 
              data-section-index={index}
              className={`mb-20 lg:mb-32 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center transition-all duration-1000 ${
                (index === 0 && section1Visible) || (index === 1 && section2Visible) || (index === 2 && section3Visible) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-24'
              } ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              ref={index === 0 ? section1Ref : index === 1 ? section2Ref : section3Ref}
              style={{ transitionDelay: `${index * 0.2}s` }}
            >
              {/* Content Column */}
              <div 
                className={`flex flex-col justify-center transition-all duration-1000 delay-500 ${
                  (index === 0 && section1Visible) || (index === 1 && section2Visible) || (index === 2 && section3Visible) 
                    ? 'opacity-100 lg:translate-x-0' 
                    : 'opacity-0 lg:translate-x-16'
                }`}
              >
                <h3 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 leading-tight">
                  {section.heading}
                </h3>
                <p className="text-gray-600 text-base lg:text-lg leading-relaxed mb-6">
                  {section.description}
                </p>
                {section.listItems && (
                  <ul className="space-y-3 text-gray-700">
                    {section.listItems.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <svg className="w-5 h-5 mr-2 mt-1 flex-shrink-0" style={{ color: theme?.primaryColor }} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Image Column */}
              <div 
                className={`relative image-container group transition-all duration-1000 delay-700 ${
                  (index === 0 && section1Visible) || (index === 1 && section2Visible) || (index === 2 && section3Visible) 
                    ? 'opacity-100 scale-100' 
                    : 'opacity-0 scale-90'
                }`}
              >
                {/* Image border with a subtle gradient effect */}
                <div 
                  className="relative w-full h-[300px] lg:h-[400px] rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 group-hover:shadow-3xl"
                  style={{
                    boxShadow: `0 10px 30px rgba(var(--theme-primary-rgb), 0.2)`
                  }}
                >
                  <div className="absolute inset-0 p-1 rounded-2xl" style={{ background: `linear-gradient(135deg, ${theme?.primaryColor}, ${theme?.secondaryColor})` }}/>
                  <div className="absolute inset-0 rounded-2xl overflow-hidden">
                    {section.imageSlot && getImageBySlot(section.imageSlot) ? (
                      <Image
                        src={getImageBySlot(section.imageSlot)?.url || ''}
                        alt={section.heading}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-6xl">
                        🖼️
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}