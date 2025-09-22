'use client';

import React, { useEffect, useState } from 'react';
import Image from "next/image";
import { CompanyDetailsContent, Image as ImageType } from '@/types/template';

interface CompanyDetailsProps {
  data: CompanyDetailsContent;
  images?: ImageType[];
  theme?: {
    primaryColor: string;
    secondaryColor: string;
  };
}

const CompanyDetails: React.FC<CompanyDetailsProps> = ({ data, images, theme }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [glowIntensity, setGlowIntensity] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    
    // Continuous glow animation
    const glowTimer = setInterval(() => {
      setGlowIntensity(prev => (prev >= 1 ? 0 : prev + 0.005));
    }, 50);

    return () => {
      clearTimeout(timer);
      clearInterval(glowTimer);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('[data-section-index]');
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.6 && rect.bottom >= window.innerHeight * 0.4) {
          setActiveSection(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    @keyframes float-gentle {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-12px) rotate(2deg); }
    }
    
    @keyframes sparkle-orbit {
      0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
      50% { opacity: 1; transform: scale(1) rotate(180deg); }
    }
    
    @keyframes gradient-shift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    @keyframes text-glow-pulse {
      0%, 100% { text-shadow: 0 0 5px rgba(${hexToRgb(theme?.primaryColor || '#000000')}, 0.3); }
      50% { text-shadow: 0 0 20px rgba(${hexToRgb(theme?.primaryColor || '#000000')}, 0.6), 0 0 30px rgba(${hexToRgb(theme?.primaryColor || '#000000')}, 0.4); }
    }

    @keyframes morphing-border {
      0% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
      25% { border-radius: 60% 40% 50% 70% / 30% 60% 40% 70%; }
      50% { border-radius: 30% 70% 40% 60% / 50% 40% 70% 30%; }
      75% { border-radius: 70% 30% 60% 40% / 60% 50% 30% 60%; }
      100% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
    }

    @keyframes image-parallax {
      0% { transform: translateY(0px) scale(1); }
      100% { transform: translateY(-20px) scale(1.05); }
    }

    @keyframes content-reveal {
      from { 
        opacity: 0; 
        transform: translateX(30px) translateY(20px); 
        filter: blur(8px);
      }
      to { 
        opacity: 1; 
        transform: translateX(0) translateY(0); 
        filter: blur(0px);
      }
    }

    @keyframes ripple-effect {
      0% { transform: scale(0); opacity: 1; }
      100% { transform: scale(4); opacity: 0; }
    }

    .floating-element {
      animation: float-gentle 6s ease-in-out infinite;
    }

    .sparkle-particle {
      animation: sparkle-orbit 4s ease-in-out infinite;
    }

    .gradient-text {
      background: linear-gradient(135deg, ${theme?.primaryColor}, ${theme?.secondaryColor}, ${theme?.primaryColor});
      background-size: 300% 300%;
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: gradient-shift 4s ease-in-out infinite;
    }

    .glow-text {
      animation: text-glow-pulse 3s ease-in-out infinite;
    }

    .morphing-shape {
      animation: morphing-border 8s ease-in-out infinite;
    }

    .glass-morphism {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.2));
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.18);
    }

    .luxury-gradient-bg {
      background: linear-gradient(135deg, 
        rgba(${hexToRgb(theme?.primaryColor || '#000000')}, 0.02) 0%,
        rgba(${hexToRgb(theme?.secondaryColor || '#000000')}, 0.04) 25%,
        rgba(255, 255, 255, 1) 50%,
        rgba(${hexToRgb(theme?.secondaryColor || '#000000')}, 0.04) 75%,
        rgba(${hexToRgb(theme?.primaryColor || '#000000')}, 0.02) 100%);
    }

    .content-reveal {
      animation: content-reveal 1s ease-out forwards;
    }

    .image-container {
      transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .image-container:hover {
      transform: translateY(-8px) scale(1.02);
    }

    .section-active .image-container {
      animation: image-parallax 0.8s ease-out forwards;
    }

    .ripple {
      animation: ripple-effect 3s ease-out infinite;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      
      <section className="relative overflow-hidden py-32 luxury-gradient-bg">
        {/* Luxury Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 1200 800">
            <defs>
              <pattern id="companyPattern" x="0" y="0" width="150" height="150" patternUnits="userSpaceOnUse">
                <path d="M75 0L150 75L75 150L0 75Z" fill={theme?.primaryColor} opacity="0.1"/>
                <circle cx="75" cy="75" r="3" fill={theme?.secondaryColor} opacity="0.2"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#companyPattern)"/>
          </svg>
        </div>

        {/* Floating Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute sparkle-particle"
              style={{
                left: `${15 + (i % 4) * 25}%`,
                top: `${20 + Math.floor(i / 4) * 30}%`,
                animationDelay: `${i * 0.5}s`,
              }}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  background: `linear-gradient(45deg, ${theme?.primaryColor}40, ${theme?.secondaryColor}60)`,
                  boxShadow: `0 0 15px ${theme?.primaryColor}30`
                }}
              />
            </div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header Section */}
          <div className="text-center mb-24">
            {/* Floating Icon */}
            <div className="relative inline-block mb-12">
              <div 
                className="w-24 h-24 rounded-3xl flex items-center justify-center shadow-2xl floating-element glass-morphism"
                style={{
                  background: `linear-gradient(135deg, ${theme?.primaryColor}, ${theme?.secondaryColor})`,
                  boxShadow: `0 25px 50px ${theme?.primaryColor}25`
                }}
              >
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>

              {/* Ripple Effect */}
              <div className="absolute inset-0 -m-6">
                <div 
                  className="w-full h-full rounded-full border-2 ripple"
                  style={{ borderColor: `${theme?.primaryColor}20` }}
                />
              </div>
            </div>

            {/* Main Heading */}
            <h2 
              className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-8 transition-all duration-2000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
              }`}
            >
              <span className="gradient-text glow-text">{data.heading}</span>
            </h2>
            
            {/* Elegant Underline */}
            <div className="flex items-center justify-center mb-12">
              <div 
                className={`h-1 rounded-full transition-all duration-1500 delay-500 ${
                  isVisible ? 'w-32' : 'w-0'
                }`}
                style={{
                  background: `linear-gradient(90deg, ${theme?.primaryColor}, ${theme?.secondaryColor})`,
                  boxShadow: `0 4px 20px ${theme?.primaryColor}40`
                }}
              />
              <div 
                className={`mx-6 transition-all duration-1500 delay-700 ${
                  isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                }`}
              >
                <div 
                  className="w-4 h-4 morphing-shape floating-element"
                  style={{ 
                    background: `linear-gradient(45deg, ${theme?.primaryColor}, ${theme?.secondaryColor})`,
                    animationDelay: '1s'
                  }}
                />
              </div>
              <div 
                className={`h-1 rounded-full transition-all duration-1500 delay-500 ${
                  isVisible ? 'w-32' : 'w-0'
                }`}
                style={{
                  background: `linear-gradient(90deg, ${theme?.secondaryColor}, ${theme?.primaryColor})`,
                  boxShadow: `0 4px 20px ${theme?.secondaryColor}40`
                }}
              />
            </div>
            
            {/* Description */}
            <p 
              className={`text-xl sm:text-2xl md:text-3xl text-gray-600 max-w-5xl mx-auto leading-relaxed transition-all duration-1500 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            >
              {data.description}
            </p>
          </div>
          
          {/* Sections */}
          <div className="space-y-32">
            {data.sections.map((section, index) => {
              const sectionImage = getImageBySlot(`companyDetails-image-${index + 1}`);
              const isEven = index % 2 === 0;
              const isActive = activeSection === index;
              
              return (
                <div 
                  key={index}
                  data-section-index={index}
                  className={`section-item ${isActive ? 'section-active' : ''} grid md:grid-cols-2 gap-16 items-center transition-all duration-1000`}
                >
                  {/* Image Section */}
                  {sectionImage && (
                    <div className={`${isEven ? 'md:order-2' : 'md:order-1'} relative`}>
                      <div className="image-container relative group">
                        {/* Background Shape */}
                        <div
                          className="absolute -inset-6 morphing-shape opacity-20 transition-all duration-700 group-hover:opacity-30"
                          style={{
                            background: `linear-gradient(135deg, ${theme?.primaryColor}40, ${theme?.secondaryColor}40)`,
                            filter: 'blur(20px)'
                          }}
                        />

                        {/* Decorative Frame */}
                        <div 
                          className="absolute -inset-2 rounded-3xl transition-all duration-500 group-hover:scale-105"
                          style={{
                            background: `linear-gradient(135deg, ${theme?.primaryColor}20, ${theme?.secondaryColor}20)`,
                            filter: 'blur(1px)'
                          }}
                        />

                        {/* Main Image */}
                        <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                          <Image 
                            src={sectionImage.imageUrl} 
                            alt={sectionImage.altText || section.heading}
                            width={600}
                            height={400}
                            className="w-full h-96 object-cover transition-all duration-700 group-hover:scale-110"
                            loading="lazy"
                          />
                          
                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                          
                          {/* Shimmer Effect */}
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div 
                              className="absolute inset-0"
                              style={{
                                background: `linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)`,
                                animation: 'gradient-shift 2s ease-in-out infinite'
                              }}
                            />
                          </div>
                        </div>

                        {/* Floating Accent Elements */}
                        <div 
                          className="absolute -top-4 -right-4 w-8 h-8 rounded-full floating-element opacity-80"
                          style={{
                            background: `linear-gradient(135deg, ${theme?.primaryColor}, ${theme?.secondaryColor})`,
                            animationDelay: `${index * 0.3}s`,
                            boxShadow: `0 8px 20px ${theme?.primaryColor}40`
                          }}
                        />
                        <div 
                          className="absolute -bottom-4 -left-4 w-6 h-6 rounded-full floating-element opacity-60"
                          style={{
                            background: `linear-gradient(135deg, ${theme?.secondaryColor}, ${theme?.primaryColor})`,
                            animationDelay: `${index * 0.5}s`,
                            boxShadow: `0 6px 15px ${theme?.secondaryColor}40`
                          }}
                        />
                      </div>
                    </div>
                  )}
                  
                  {/* Content Section */}
                  <div className={`${isEven ? 'md:order-1' : 'md:order-2'} relative`}>
                    <div 
                      className={`glass-morphism p-12 rounded-3xl transition-all duration-1000 ${
                        isActive ? 'content-reveal' : ''
                      }`}
                      style={{
                        boxShadow: `0 25px 50px ${theme?.primaryColor}15`
                      }}
                    >
                      {/* Top Accent Line */}
                      <div 
                        className="w-16 h-1 rounded-full mb-8 transition-all duration-700"
                        style={{
                          background: `linear-gradient(90deg, ${theme?.primaryColor}, ${theme?.secondaryColor})`
                        }}
                      />

                      {/* Section Heading */}
                      <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
                        <span 
                          className="gradient-text"
                          style={{
                            background: `linear-gradient(135deg, ${theme?.primaryColor}, ${theme?.secondaryColor})`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                          }}
                        >
                          {section.heading}
                        </span>
                      </h3>
                      
                      {/* Section Description */}
                      <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8">
                        {section.description}
                      </p>

                      {/* Bottom Decorative Elements */}
                      <div className="flex items-center space-x-4">
                        <div 
                          className="w-3 h-3 rounded-full floating-element"
                          style={{ 
                            background: theme?.primaryColor,
                            animationDelay: `${index}s`
                          }}
                        />
                        <div 
                          className="flex-1 h-px"
                          style={{ background: `linear-gradient(90deg, ${theme?.primaryColor}60, transparent)` }}
                        />
                        <div 
                          className="w-2 h-2 rounded-full floating-element"
                          style={{ 
                            background: theme?.secondaryColor,
                            animationDelay: `${index + 0.5}s`
                          }}
                        />
                      </div>
                    </div>

                    {/* Side Floating Element */}
                    <div 
                      className="absolute -right-6 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full floating-element opacity-30"
                      style={{
                        background: `linear-gradient(135deg, ${theme?.primaryColor}40, ${theme?.secondaryColor}40)`,
                        animationDelay: `${index * 0.7}s`,
                        filter: 'blur(2px)'
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Decorative Section */}
          <div className="text-center mt-32">
            <div className="glass-morphism inline-flex items-center space-x-8 p-8 rounded-2xl">
              <div 
                className="w-20 h-px floating-element"
                style={{
                  background: `linear-gradient(90deg, transparent, ${theme?.primaryColor}, transparent)`,
                  animationDelay: '0s'
                }}
              />
              <div className="flex items-center space-x-4">
                <div 
                  className="w-4 h-4 morphing-shape floating-element"
                  style={{ 
                    background: theme?.primaryColor,
                    animationDelay: '1s'
                  }}
                />
                <span 
                  className="text-2xl font-bold gradient-text"
                  style={{ color: theme?.primaryColor }}
                >
                  Our Story Continues
                </span>
                <div 
                  className="w-4 h-4 morphing-shape floating-element"
                  style={{ 
                    background: theme?.secondaryColor,
                    animationDelay: '2s'
                  }}
                />
              </div>
              <div 
                className="w-20 h-px floating-element"
                style={{
                  background: `linear-gradient(90deg, transparent, ${theme?.secondaryColor}, transparent)`,
                  animationDelay: '0.5s'
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CompanyDetails;