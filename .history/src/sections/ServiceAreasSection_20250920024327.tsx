"use client";

import { useEffect, useState, useRef } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface ServiceArea {
  city: string;
  region: string;
  description: string;
}

interface ThemeData {
  primaryColor: string;
  secondaryColor: string;
}

interface ServiceAreasSectionProps {
  serviceAreas?: ServiceArea[];
  themeData?: ThemeData;
}

export default function ServiceAreasSection({
  serviceAreas,
  themeData,
}: ServiceAreasSectionProps) {
  if (!serviceAreas || serviceAreas.length === 0) {
    return null;
  }

  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation<HTMLHeadingElement>({ threshold: 0.3 });
  const { ref: subtitleRef, isVisible: subtitleVisible } = useScrollAnimation<HTMLHeadingElement>({ threshold: 0.3 });
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 });
  
  // Create refs for each service area card
  const areaRefs = serviceAreas.map(() => {
    return useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
  });

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? 
      `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : 
      '0, 0, 0';
  };

  const styles = `
    @keyframes fade-in-up {
      from { 
        opacity: 0; 
        transform: translateY(30px); 
      }
      to { 
        opacity: 1; 
        transform: translateY(0); 
      }
    }
    
    @keyframes scale-in {
      from { 
        transform: scale(0.8); 
        opacity: 0; 
      }
      to { 
        transform: scale(1); 
        opacity: 1; 
      }
    }

    @keyframes gentle-float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-8px); }
    }

    @keyframes sparkle-twinkle {
      0%, 100% { 
        opacity: 0.3; 
        transform: scale(1) rotate(0deg); 
      }
      50% { 
        opacity: 1; 
        transform: scale(1.2) rotate(90deg); 
      }
    }

    @keyframes glow-pulse {
      0%, 100% { 
        opacity: 0.4; 
        transform: scale(1);
        box-shadow: 0 0 5px currentColor;
      }
      50% { 
        opacity: 0.8; 
        transform: scale(1.1);
        box-shadow: 0 0 15px currentColor;
      }
    }

    .fade-in-animation {
      animation: fade-in-up 0.8s ease-out forwards;
    }

    .scale-in-animation {
      animation: scale-in 0.6s ease-out forwards;
    }

    .floating-element {
      animation: gentle-float 6s ease-in-out infinite;
    }

    .sparkle-twinkle {
      border-radius: 50%;
      animation: sparkle-twinkle 3s ease-in-out infinite;
    }

    .glow-pulse {
      animation: glow-pulse 3s ease-in-out infinite;
    }

    .area-card {
      position: relative;
      background: white;
      border-radius: 1rem;
      padding: 2rem;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      overflow: hidden;
    }

    .area-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
    }

    .area-card::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(var(--theme-primary-rgb), 0.05), rgba(var(--theme-secondary-rgb), 0.05));
      opacity: 0;
      transition: opacity 0.5s ease;
    }

    .area-card:hover::before {
      opacity: 1;
    }

    .area-card::after {
      content: '';
      position: absolute;
      inset: 0;
      border: 2px solid transparent;
      border-radius: 1rem;
      background: linear-gradient(135deg, var(--theme-primary-color), var(--theme-secondary-color)) border-box;
      -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      opacity: 0;
      transition: opacity 0.5s ease;
    }

    .area-card:hover::after {
      opacity: 1;
    }

    .icon-container {
      position: relative;
      width: 4rem;
      height: 4rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1.5rem;
      transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      overflow: hidden;
    }

    .area-card:hover .icon-container {
      transform: scale(1.1) rotate(5deg);
    }

    .icon-container::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(var(--theme-primary-rgb), 0.15), rgba(var(--theme-secondary-rgb), 0.15));
      border-radius: 50%;
      z-index: 0;
    }

    .icon-container svg {
      position: relative;
      z-index: 1;
    }

    .cta-button {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.875rem 2rem;
      font-size: 1rem;
      font-weight: 600;
      text-decoration: none;
      color: white;
      border-radius: 12px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
      box-shadow: 0 4px 14px rgba(var(--theme-primary-rgb), 0.25);
    }

    .cta-button:hover {
      transform: translateY(-1px);
      box-shadow: 0 8px 25px rgba(var(--theme-primary-rgb), 0.35);
    }

    .cta-button::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, var(--theme-primary-color), var(--theme-secondary-color));
      transition: opacity 0.3s;
    }

    .cta-button::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, var(--theme-secondary-color), var(--theme-primary-color));
      opacity: 0;
      transition: opacity 0.3s;
    }

    .cta-button:hover::after {
      opacity: 1;
    }

    .cta-button > * {
      position: relative;
      z-index: 1;
    }
  `;

  useEffect(() => {
    if (themeData) {
      const root = document.documentElement;
      root.style.setProperty('--theme-primary-color', themeData.primaryColor);
      root.style.setProperty('--theme-secondary-color', themeData.secondaryColor);
      root.style.setProperty('--theme-primary-rgb', hexToRgb(themeData.primaryColor));
      root.style.setProperty('--theme-secondary-rgb', hexToRgb(themeData.secondaryColor));
    }
  }, [themeData]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <section className="py-16 sm:py-20 md:py-24 lg:py-32 relative overflow-hidden bg-gray-50">
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0">
          {/* Main gradient orbs */}
          <div 
            className="absolute top-20 right-20 w-64 h-64 rounded-full opacity-5 blur-3xl"
            style={{
              background: `linear-gradient(135deg, ${themeData?.primaryColor}, ${themeData?.secondaryColor})`,
              transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
            }}
          />
          <div 
            className="absolute bottom-40 left-10 w-80 h-80 rounded-full opacity-3 blur-3xl"
            style={{
              background: `linear-gradient(135deg, ${themeData?.secondaryColor}, ${themeData?.primaryColor})`,
              transform: `translate(${-mousePosition.x * 0.5}px, ${-mousePosition.y * 0.5}px)`
            }}
          />

          {/* Decorative elements */}
          <div className="absolute top-1/4 left-1/4 opacity-4">
            <svg width="200" height="200" className="animate-spin-slow">
              <defs>
                <linearGradient id="areaGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: themeData?.primaryColor, stopOpacity: 0.3 }} />
                  <stop offset="100%" style={{ stopColor: themeData?.secondaryColor, stopOpacity: 0.1 }} />
                </linearGradient>
              </defs>
              <circle cx="100" cy="100" r="80" fill="none" stroke="url(#areaGradient1)" strokeWidth="1" strokeDasharray="5,5" />
              <circle cx="100" cy="100" r="60" fill="none" stroke="url(#areaGradient1)" strokeWidth="1" opacity="0.6" />
              <circle cx="100" cy="100" r="40" fill="none" stroke="url(#areaGradient1)" strokeWidth="1" opacity="0.4" />
            </svg>
          </div>

          {/* Scattered elements */}
          <div className="absolute top-1/3 right-1/3 floating-element opacity-8" style={{ animationDelay: '1s' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill={themeData?.primaryColor}>
              <path d="M12 2L14.09 8.26L20 10L14.09 11.74L12 18L9.91 11.74L4 10L9.91 8.26L12 2Z" opacity="0.6"/>
            </svg>
          </div>
          
          <div className="absolute bottom-1/3 left-1/2 floating-element opacity-8" style={{ animationDelay: '2.5s' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill={themeData?.secondaryColor}>
              <path d="M12 2L14.09 8.26L20 10L14.09 11.74L12 18L9.91 11.74L4 10L9.91 8.26L12 2Z" opacity="0.5"/>
            </svg>
          </div>

          {/* Glowing accents */}
          <div 
            className="absolute top-40 left-1/3 w-2 h-2 sparkle-twinkle"
            style={{ backgroundColor: `${themeData?.primaryColor}70` }}
          />
          <div 
            className="absolute top-60 right-1/3 w-1.5 h-1.5 sparkle-twinkle"
            style={{ 
              backgroundColor: `${themeData?.secondaryColor}70`,
              animationDelay: '1s'
            }}
          />
          <div 
            className="absolute bottom-48 left-1/4 w-2.5 h-2.5 sparkle-twinkle"
            style={{ 
              backgroundColor: `${themeData?.primaryColor}60`,
              animationDelay: '2.5s'
            }}
          />
        </div>

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <div 
              className={`transition-all duration-1000 ${
                titleVisible ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <h2 
                ref={titleRef}
                className={`text-3xl sm:text-4xl md:text-5xl font-bold fade-in-animation transition-transform duration-1000 ${
                  titleVisible ? 'translate-y-0' : 'translate-y-8'
                }`}
                style={{ 
                  animationDelay: '0.2s',
                  background: themeData
                    ? `linear-gradient(135deg, ${themeData.primaryColor}, ${themeData.secondaryColor})`
                    : "linear-gradient(135deg, #1f2937, #374151)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Service Areas
              </h2>
            </div>
            
            {/* Minimal accent line */}
            <div className="relative mt-6 flex justify-center">
              <div 
                className={`h-1 rounded-full transition-all duration-1000 delay-500 ${
                  titleVisible ? 'w-16' : 'w-0'
                }`}
                style={{
                  background: `linear-gradient(90deg, ${themeData?.primaryColor}, ${themeData?.secondaryColor})`
                }}
              />
            </div>

            {/* Subtitle */}
            <div className="mt-6">
              <p 
                ref={subtitleRef}
                className={`text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto fade-in-animation transition-all duration-1000 delay-700 ${
                  subtitleVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-4'
                }`}
                style={{ animationDelay: '0.4s' }}
              >
                We proudly serve communities across the region, bringing
                professional services directly to your neighborhood.
              </p>
            </div>
          </div>

          {/* Service Areas Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {serviceAreas.map((area, index) => {
              const { ref, isVisible } = areaRefs[index];
              return (
                <div
                  key={index}
                  ref={ref}
                  className={`area-card scale-in-animation ${
                    isVisible ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ 
                    animationDelay: `${0.2 + index * 0.1}s`,
                    transitionDelay: `${0.1 + index * 0.1}s`
                  }}
                >
                  {/* Location Icon */}
                  <div className="icon-container">
                    <svg
                      className="w-8 h-8"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      style={{ color: themeData?.primaryColor || "#3b82f6" }}
                    >
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-2xl font-bold mb-2 text-gray-900">
                      {area.city}
                    </h3>
                    <p
                      className="text-lg font-semibold mb-4"
                      style={{ color: themeData?.primaryColor || "#3b82f6" }}
                    >
                      {area.region}
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      {area.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Call to Action */}
          <div 
            ref={ctaRef}
            className={`bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto scale-in-animation transition-all duration-1000 ${
              ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ animationDelay: '0.6s' }}
          >
            <h3 className="text-2xl font-bold mb-4 text-gray-900">
              Don&apos;t See Your Area?
            </h3>
            <p className="text-gray-600 mb-6">
              We&apos;re always expanding our service areas. Contact us to discuss
              availability in your location.
            </p>
            <a
              href="#contact"
              className="cta-button group"
            >
              <span>Contact Us</span>
              <svg 
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
