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

  const styles = `
    @keyframes fade-in-up {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes scale-in {
      from { transform: scale(0.8); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
    .fade-in-up-animation { animation: fade-in-up 0.8s ease-out forwards; }
    .scale-in-animation { animation: scale-in 0.6s ease-out forwards; }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <section className="relative overflow-hidden py-24 bg-white">

        {/* Background Blobs (like Hero but softer) */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl opacity-15" 
            style={{ background: `linear-gradient(135deg, ${theme?.primaryColor}, ${theme?.secondaryColor})` }} />
          <div className="absolute bottom-20 right-16 w-80 h-80 rounded-full blur-3xl opacity-10" 
            style={{ background: `linear-gradient(135deg, ${theme?.secondaryColor}, ${theme?.primaryColor})` }} />
        </div>

        <div className="container mx-auto px-6 lg:px-8 relative z-10">

          {/* Section Header */}
          <div ref={headerRef} className="text-center mb-20">
            <h2 
              className={`text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 transition-all duration-1000 ${
                headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            >
              {data.heading}
            </h2>
            <div className="mt-4 flex justify-center">
              <span 
                className={`block h-1 w-16 rounded-full transition-all duration-700 ${
                  headerVisible ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
                }`} 
                style={{ background: `linear-gradient(90deg, ${theme?.primaryColor}, ${theme?.secondaryColor})` }}
              />
            </div>
            <p 
              className={`mt-6 text-lg text-gray-600 max-w-2xl mx-auto transition-all duration-1000 delay-200 ${
                headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {data.subheading}
            </p>
          </div>

          {/* Sections Loop */}
          {data.sections.map((section, index) => {
            const visible = (index === 0 && section1Visible) || (index === 1 && section2Visible) || (index === 2 && section3Visible);

            return (
              <div 
                key={index}
                ref={index === 0 ? section1Ref : index === 1 ? section2Ref : section3Ref}
                className={`mb-20 lg:mb-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center transition-all duration-1000 ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-24'
                } ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                style={{ transitionDelay: `${index * 0.2}s` }}
              >
                {/* Text Side */}
                <div className="flex flex-col justify-center">
                  <h3 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">{section.heading}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">{section.description}</p>
                  {section.listItems && (
                    <ul className="space-y-3">
                      {section.listItems.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <svg className="w-5 h-5 mr-2 mt-1 flex-shrink-0" 
                            style={{ color: theme?.primaryColor }} 
                            fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.7-9.3a1 1 0 00-1.4-1.4L9 10.6 7.7 9.3a1 1 0 00-1.4 1.4l2 2a1 1 0 001.4 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Image Side */}
                <div className={`relative group ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'} transition-all duration-1000`}>
                  <div className="relative rounded-2xl overflow-hidden shadow-xl border-2"
                    style={{ borderColor: `${theme?.primaryColor}30` }}>
                    {section.imageSlot && getImageBySlot(section.imageSlot) ? (
                      <Image
                        src={getImageBySlot(section.imageSlot)?.url || ''}
                        alt={section.heading}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-[300px] lg:h-[400px] flex items-center justify-center bg-gray-100 text-5xl text-gray-400">
                        🖼️
                      </div>
                    )}
                  </div>
                  {/* Floating accent circle */}
                  <div 
                    className="absolute -top-6 -left-6 w-10 h-10 rounded-full opacity-25"
                    style={{ background: `linear-gradient(135deg, ${theme?.primaryColor}, ${theme?.secondaryColor})` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}