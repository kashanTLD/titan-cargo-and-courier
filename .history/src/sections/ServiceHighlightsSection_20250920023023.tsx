"use client";

import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/useScrollAnimation";
import { ServiceHighlightsContent } from "@/types/template";
import { useEffect, useState } from "react";

interface ServiceHighlightsSectionProps {
  data: ServiceHighlightsContent;
  theme?: {
    primaryColor: string;
    secondaryColor: string;
  };
}

export default function ServiceHighlightsSection({
  data,
  theme,
}: ServiceHighlightsSectionProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const { ref: titleRef, isVisible: titleVisible } =
    useScrollAnimation<HTMLHeadingElement>({ threshold: 0.2 });
  const { ref: descRef, isVisible: descVisible } =
    useScrollAnimation<HTMLParagraphElement>({ threshold: 0.2 });
  const { ref: servicesRef, visibleItems } = useStaggeredAnimation(
    data.services.length,
    200
  );

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 15,
        y: (e.clientY / window.innerHeight - 0.5) * 15
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Helper function to format the display value
  const formatDisplayValue = (description: string) => {
    if (description.includes("+")) {
      return { value: description.replace("+", ""), suffix: "+" };
    }
    if (description.includes("%")) {
      return { value: description.replace("%", ""), suffix: "%" };
    }
    if (description.includes("/")) {
      return { value: description, suffix: "" };
    }
    return { value: description, suffix: "" };
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? 
      `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : 
      '0, 0, 0';
  };

  const styles = `
    @keyframes gentle-float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-6px); }
    }
    
    @keyframes fade-in-up {
      from { 
        opacity: 0; 
        transform: translateY(20px); 
      }
      to { 
        opacity: 1; 
        transform: translateY(0); 
      }
    }
    
    @keyframes subtle-pulse {
      0%, 100% { opacity: 0.4; }
      50% { opacity: 0.8; }
    }

    @keyframes scale-in {
      from { 
        transform: scale(0.9); 
        opacity: 0; 
      }
      to { 
        transform: scale(1); 
        opacity: 1; 
      }
    }

    @keyframes counter-animate {
      from { 
        transform: translateY(10px); 
        opacity: 0; 
      }
      to { 
        transform: translateY(0); 
        opacity: 1; 
      }
    }

    @keyframes sparkle-twinkle {
      0%, 100% { 
        opacity: 0.3; 
        transform: scale(1) rotate(0deg); 
      }
      50% { 
        opacity: 1; 
        transform: scale(1.1) rotate(90deg); 
      }
    }

    @keyframes gentle-rotate {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .section-title {
      font-size: clamp(2rem, 5vw, 3.5rem);
      font-weight: 800;
      line-height: 1.2;
      letter-spacing: -0.02em;
      color: #1f2937;
    }

    .section-description {
      font-size: clamp(1rem, 2vw, 1.25rem);
      font-weight: 400;
      color: #6b7280;
    }

    .floating-element {
      animation: gentle-float 5s ease-in-out infinite;
    }

    .fade-in-animation {
      animation: fade-in-up 0.6s ease-out forwards;
    }

    .scale-in-animation {
      animation: scale-in 0.5s ease-out forwards;
    }

    .counter-number {
      animation: counter-animate 0.8s ease-out forwards;
    }

    .sparkle-element {
      border-radius: 50%;
      animation: sparkle-twinkle 4s ease-in-out infinite;
    }

    .gentle-rotate {
      animation: gentle-rotate 25s linear infinite;
    }

    .service-card {
      background: white;
      border: 1px solid rgba(0, 0, 0, 0.05);
      border-radius: 20px;
      padding: 2rem;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
    }

    .service-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 40px rgba(var(--theme-primary-rgb), 0.12);
      border-color: rgba(var(--theme-primary-rgb), 0.1);
    }

    .service-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, var(--theme-primary-color), var(--theme-secondary-color));
      opacity: 0;
      transition: opacity 0.3s;
    }

    .service-card:hover::before {
      opacity: 1;
    }

    .number-display {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--theme-primary-color), var(--theme-secondary-color));
      color: white;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1.5rem;
      position: relative;
      box-shadow: 0 8px 25px rgba(var(--theme-primary-rgb), 0.25);
    }

    .number-display::before {
      content: '';
      position: absolute;
      inset: 3px;
      border-radius: 50%;
      border: 2px solid rgba(255, 255, 255, 0.3);
    }

    .icon-container {
      width: 80px;
      height: 80px;
      border-radius: 20px;
      background: linear-gradient(135deg, var(--theme-primary-color), var(--theme-secondary-color));
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 2rem;
      box-shadow: 0 8px 25px rgba(var(--theme-primary-rgb), 0.2);
    }

    .decorative-dots {
      position: absolute;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: var(--theme-primary-color);
      opacity: 0.6;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      
      <section
        id="service-highlights"
        className="relative overflow-hidden py-20 bg-white"
        style={{
          '--theme-primary-color': theme?.primaryColor,
          '--theme-secondary-color': theme?.secondaryColor,
          '--theme-primary-rgb': hexToRgb(theme?.primaryColor || '#000000'),
          '--theme-secondary-rgb': hexToRgb(theme?.secondaryColor || '#000000'),
        } as React.CSSProperties}
      >
        
        {/* Subtle Background Elements */}
        <div className="absolute inset-0">
          {/* Gradient orbs */}
          <div 
            className="absolute top-40 right-32 w-80 h-80 rounded-full opacity-3 blur-3xl"
            style={{
              background: `linear-gradient(135deg, ${theme?.primaryColor}, ${theme?.secondaryColor})`,
              transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
            }}
          />
          <div 
            className="absolute bottom-20 left-20 w-96 h-96 rounded-full opacity-2 blur-3xl"
            style={{
              background: `linear-gradient(135deg, ${theme?.secondaryColor}, ${theme?.primaryColor})`,
              transform: `translate(${-mousePosition.x * 0.5}px, ${-mousePosition.y * 0.5}px)`
            }}
          />
        </div>

        {/* Salon-themed decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Floating salon elements */}
          <div 
            className="absolute top-32 left-20 floating-element opacity-6"
            style={{ animationDelay: '0s' }}
          >
            <div 
              className="w-6 h-6 rounded-full"
              style={{ backgroundColor: `${theme?.primaryColor}40` }}
            />
          </div>
          
          <div 
            className="absolute top-1/2 right-24 floating-element opacity-5"
            style={{ animationDelay: '2s' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill={`${theme?.secondaryColor}60`}>
              <path d="M12 2L14.09 8.26L20 10L14.09 11.74L12 18L9.91 11.74L4 10L9.91 8.26L12 2Z" opacity="0.6"/>
            </svg>
          </div>

          <div 
            className="absolute bottom-40 left-1/3 floating-element opacity-4"
            style={{ animationDelay: '4s' }}
          >
            <div 
              className="w-8 h-8 rounded-full border-2"
              style={{ borderColor: `${theme?.primaryColor}30` }}
            />
          </div>

          {/* Scattered sparkles */}
          <div 
            className="absolute top-1/4 left-1/2 w-2 h-2 sparkle-element"
            style={{ backgroundColor: `${theme?.primaryColor}60` }}
          />
          <div 
            className="absolute bottom-1/3 right-1/3 w-1.5 h-1.5 sparkle-element"
            style={{ 
              backgroundColor: `${theme?.secondaryColor}60`,
              animationDelay: '1.5s'
            }}
          />
          <div 
            className="absolute top-2/3 left-1/4 w-2.5 h-2.5 sparkle-element"
            style={{ 
              backgroundColor: `${theme?.primaryColor}50`,
              animationDelay: '3s'
            }}
          />
        </div>

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          {/* Header Section */}
          <div className="text-center mb-16">
            
            {/* Icon Container */}
            <div 
              className={`icon-container floating-element scale-in-animation mb-8 ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ animationDelay: '0.2s' }}
            >
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            
            {/* Main Title */}
            <h2
              ref={titleRef}
              className={`section-title fade-in-animation mb-6 transition-all duration-1000 ${
                titleVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ animationDelay: '0.3s' }}
            >
              {data.title}
            </h2>
            
            {/* Elegant accent line */}
            <div className="flex items-center justify-center mb-8">
              <div 
                className={`h-1 rounded-full transition-all duration-1000 delay-500 ${
                  titleVisible ? 'w-20' : 'w-0'
                }`}
                style={{
                  background: `linear-gradient(90deg, ${theme?.primaryColor}, ${theme?.secondaryColor})`
                }}
              />
            </div>
            
            {/* Description */}
            <p
              ref={descRef}
              className={`section-description fade-in-animation max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-300 ${
                descVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ animationDelay: '0.5s' }}
            >
              {data.description}
            </p>
          </div>

          {/* Service Cards Grid */}
          <div
            ref={servicesRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {data.services && data.services.length > 0 ? data.services.map((service, index) => {
              const { value, suffix } = formatDisplayValue(service.description);
              
              return (
                <div
                  key={`service-${index}`}
                  className={`scale-in-animation transition-all duration-800 ${
                    visibleItems.includes(index)
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ animationDelay: `${0.7 + index * 0.1}s` }}
                >
                  <div className="service-card text-center">
                    
                    {/* Number Display */}
                    <div className="number-display floating-element">
                      <span className="text-2xl font-bold counter-number">
                        {value}
                      </span>
                      {suffix && (
                        <span className="text-lg font-semibold opacity-90">
                          {suffix}
                        </span>
                      )}
                    </div>

                    {/* Service Name */}
                    <h3 className="text-xl font-bold mb-4 leading-tight">
                      <span 
                        style={{
                          background: `linear-gradient(135deg, ${theme?.primaryColor}, ${theme?.secondaryColor})`,
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text'
                        }}
                      >
                        {service.name}
                      </span>
                    </h3>
                    
                    {/* Bottom accent dots */}
                    <div className="flex items-center justify-center space-x-2">
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: `${theme?.primaryColor}60` }}
                      />
                      <div 
                        className="w-8 h-px"
                        style={{ background: `linear-gradient(90deg, ${theme?.primaryColor}, ${theme?.secondaryColor})` }}
                      />
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: `${theme?.secondaryColor}60` }}
                      />
                    </div>

                    {/* Floating decorative dots */}
                    <div 
                      className="decorative-dots floating-element"
                      style={{ 
                        top: '20px', 
                        right: '20px',
                        animationDelay: `${index * 0.5}s`
                      }}
                    />
                  </div>
                </div>
              );
            }) : (
              <div className="col-span-full text-center text-gray-500">
                <div className="service-card max-w-md mx-auto">
                  <div 
                    className="icon-container"
                    style={{ backgroundColor: `${theme?.primaryColor}20` }}
                  >
                    <svg className="w-8 h-8" style={{ color: theme?.primaryColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                  </div>
                  <p className="text-lg">No service highlights available</p>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Decorative Element */}
          <div className="text-center mt-20">
            <div className="inline-flex items-center space-x-6 p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
              <div 
                className="w-16 h-px floating-element"
                style={{
                  background: `linear-gradient(90deg, transparent, ${theme?.primaryColor}, transparent)`,
                  animationDelay: '0s'
                }}
              />
              <div className="flex items-center space-x-3">
                <div 
                  className="w-2 h-2 rounded-full floating-element"
                  style={{ 
                    backgroundColor: theme?.primaryColor,
                    animationDelay: '1s'
                  }}
                />
                <span 
                  className="text-lg font-semibold"
                  style={{ 
                    background: `linear-gradient(135deg, ${theme?.primaryColor}, ${theme?.secondaryColor})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  Excellence in Every Detail
                </span>
                <div 
                  className="w-2 h-2 rounded-full floating-element"
                  style={{ 
                    backgroundColor: theme?.secondaryColor,
                    animationDelay: '2s'
                  }}
                />
              </div>
              <div 
                className="w-16 h-px floating-element"
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
}