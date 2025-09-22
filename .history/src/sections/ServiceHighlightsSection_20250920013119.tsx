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
  const [particlesActive, setParticlesActive] = useState(false);
  const [glowIntensity, setGlowIntensity] = useState(0);
  
  const { ref: titleRef, isVisible: titleVisible } =
    useScrollAnimation<HTMLHeadingElement>({ threshold: 0.2 });
  const { ref: descRef, isVisible: descVisible } =
    useScrollAnimation<HTMLParagraphElement>({ threshold: 0.2 });
  const { ref: servicesRef, visibleItems } = useStaggeredAnimation(
    data.services.length,
    150
  );

  useEffect(() => {
    const timer1 = setTimeout(() => setParticlesActive(true), 300);
    
    // Continuous glow animation
    const glowTimer = setInterval(() => {
      setGlowIntensity(prev => (prev >= 1 ? 0 : prev + 0.005));
    }, 50);

    return () => {
      clearTimeout(timer1);
      clearInterval(glowTimer);
    };
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
    @keyframes float-gentle {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-15px) rotate(3deg); }
    }
    
    @keyframes sparkle-dance {
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

    @keyframes card-hover-glow {
      0% { box-shadow: 0 10px 40px rgba(${hexToRgb(theme?.primaryColor || '#000000')}, 0.1); }
      100% { box-shadow: 0 20px 60px rgba(${hexToRgb(theme?.primaryColor || '#000000')}, 0.3); }
    }

    @keyframes orbital-spin {
      from { transform: rotate(0deg) translateX(40px) rotate(0deg); }
      to { transform: rotate(360deg) translateX(40px) rotate(-360deg); }
    }

    @keyframes pulse-ring {
      0% { transform: scale(0.8); opacity: 1; }
      100% { transform: scale(1.4); opacity: 0; }
    }

    @keyframes counter-animate {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    .floating-element {
      animation: float-gentle 6s ease-in-out infinite;
    }

    .sparkle-particle {
      animation: sparkle-dance 3s ease-in-out infinite;
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

    .card-container {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .card-container:hover {
      transform: translateY(-10px) scale(1.02);
      background: rgba(255, 255, 255, 0.15);
      animation: card-hover-glow 0.4s ease-out forwards;
    }

    .orbital-element {
      animation: orbital-spin 20s linear infinite;
    }

    .pulse-ring {
      animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }

    .counter-number {
      animation: counter-animate 1s ease-out forwards;
    }

    .glass-morphism {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.2));
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.18);
    }

    .luxury-gradient-bg {
      background: linear-gradient(135deg, 
        rgba(${hexToRgb(theme?.primaryColor || '#000000')}, 0.03) 0%,
        rgba(${hexToRgb(theme?.secondaryColor || '#000000')}, 0.06) 25%,
        rgba(${hexToRgb(theme?.primaryColor || '#000000')}, 0.02) 50%,
        rgba(${hexToRgb(theme?.secondaryColor || '#000000')}, 0.05) 75%,
        rgba(${hexToRgb(theme?.primaryColor || '#000000')}, 0.03) 100%);
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      
      <section
        id="service-highlights"
        className="relative overflow-hidden py-32 bg-gradient-to-br from-slate-50 via-white to-slate-50"
      >
        {/* Luxury Background Pattern */}
        <div className="absolute inset-0 luxury-gradient-bg" />
        
        {/* Geometric Pattern Overlay */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 1200 800">
            <defs>
              <pattern id="servicePattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
                <circle cx="60" cy="60" r="2" fill={theme?.primaryColor} opacity="0.3"/>
                <circle cx="20" cy="20" r="1" fill={theme?.secondaryColor} opacity="0.4"/>
                <circle cx="100" cy="100" r="1.5" fill={theme?.primaryColor} opacity="0.2"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#servicePattern)"/>
          </svg>
        </div>

        {/* Floating Particles */}
        {particlesActive && (
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 15 }).map((_, i) => (
              <div
                key={i}
                className="absolute sparkle-particle"
                style={{
                  left: `${10 + (i % 5) * 20}%`,
                  top: `${15 + Math.floor(i / 5) * 25}%`,
                  animationDelay: `${i * 0.4}s`,
                }}
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: `linear-gradient(45deg, ${theme?.primaryColor}60, ${theme?.secondaryColor}60)`,
                    boxShadow: `0 0 10px ${theme?.primaryColor}40`
                  }}
                />
              </div>
            ))}
          </div>
        )}

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header Section */}
          <div className="text-center mb-24">
            
            {/* Floating Icon with Orbital Elements */}
            <div className="relative inline-block mb-12">
              <div 
                className="w-24 h-24 rounded-3xl flex items-center justify-center shadow-2xl floating-element glass-morphism"
                style={{
                  background: `linear-gradient(135deg, ${theme?.primaryColor}, ${theme?.secondaryColor})`,
                  boxShadow: `0 25px 50px ${theme?.primaryColor}25`
                }}
              >
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              
              {/* Orbital Rings */}
              <div className="absolute inset-0 -m-4">
                <div className="orbital-element">
                  <div 
                    className="w-3 h-3 rounded-full absolute top-0 left-1/2 transform -translate-x-1/2"
                    style={{ background: theme?.primaryColor, opacity: 0.6 }}
                  />
                </div>
              </div>
              <div className="absolute inset-0 -m-6">
                <div className="orbital-element" style={{ animationDirection: 'reverse', animationDuration: '15s' }}>
                  <div 
                    className="w-2 h-2 rounded-full absolute top-0 left-1/2 transform -translate-x-1/2"
                    style={{ background: theme?.secondaryColor, opacity: 0.8 }}
                  />
                </div>
              </div>

              {/* Pulse Rings */}
              <div className="absolute inset-0 -m-8">
                <div 
                  className="w-full h-full rounded-full border-2 pulse-ring"
                  style={{ borderColor: `${theme?.primaryColor}30` }}
                />
              </div>
            </div>
            
            {/* Main Title */}
            <h2
              ref={titleRef}
              className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-8 transition-all duration-2000 ${
                titleVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-16"
              }`}
            >
              <span className="gradient-text glow-text">{data.title}</span>
            </h2>
            
            {/* Elegant Underline */}
            <div className="flex items-center justify-center mb-12">
              <div 
                className={`h-1 rounded-full transition-all duration-1500 delay-500 ${
                  titleVisible ? 'w-32' : 'w-0'
                }`}
                style={{
                  background: `linear-gradient(90deg, ${theme?.primaryColor}, ${theme?.secondaryColor})`,
                  boxShadow: `0 4px 20px ${theme?.primaryColor}40`
                }}
              />
              <div 
                className={`mx-6 transition-all duration-1500 delay-700 ${
                  titleVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                }`}
              >
                <div 
                  className="w-3 h-3 rounded-full floating-element"
                  style={{ 
                    background: `linear-gradient(45deg, ${theme?.primaryColor}, ${theme?.secondaryColor})`,
                    animationDelay: '1s'
                  }}
                />
              </div>
              <div 
                className={`h-1 rounded-full transition-all duration-1500 delay-500 ${
                  titleVisible ? 'w-32' : 'w-0'
                }`}
                style={{
                  background: `linear-gradient(90deg, ${theme?.secondaryColor}, ${theme?.primaryColor})`,
                  boxShadow: `0 4px 20px ${theme?.secondaryColor}40`
                }}
              />
            </div>
            
            {/* Description */}
            <p
              ref={descRef}
              className={`text-xl sm:text-2xl md:text-3xl max-w-5xl mx-auto leading-relaxed text-gray-600 transition-all duration-1500 delay-300 ${
                descVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
            >
              {data.description}
            </p>
          </div>

          {/* Service Cards Grid */}
          <div
            ref={servicesRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10"
          >
            {data.services && data.services.length > 0 ? data.services.map((service, index) => {
              const { value, suffix } = formatDisplayValue(service.description);
              
              return (
                <div
                  key={`service-${index}`}
                  className={`group relative transition-all duration-1000 ${
                    visibleItems.includes(index)
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-20"
                  }`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {/* Card Container */}
                  <div className="card-container rounded-3xl p-8 lg:p-10 relative overflow-hidden">
                    
                    {/* Background Glow Effect */}
                    <div 
                      className="absolute -inset-2 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(135deg, ${theme?.primaryColor}40, ${theme?.secondaryColor}40)`
                      }}
                    />

                    {/* Top Accent Line */}
                    <div 
                      className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-1 rounded-full transition-all duration-500 group-hover:w-24"
                      style={{
                        background: `linear-gradient(90deg, ${theme?.primaryColor}, ${theme?.secondaryColor})`
                      }}
                    />

                    {/* Number Display */}
                    <div className="text-center mb-8 relative">
                      {/* Main Counter Container */}
                      <div className="relative inline-block">
                        <div
                          className="w-32 h-32 mx-auto rounded-full flex flex-col items-center justify-center text-white mb-6 shadow-2xl floating-element relative overflow-hidden"
                          style={{
                            background: `linear-gradient(135deg, ${theme?.primaryColor}, ${theme?.secondaryColor})`,
                            boxShadow: `0 20px 40px ${theme?.primaryColor}30`
                          }}
                        >
                          {/* Inner Glow Ring */}
                          <div 
                            className="absolute inset-3 rounded-full border-2 opacity-40"
                            style={{ borderColor: 'rgba(255, 255, 255, 0.3)' }}
                          />
                          
                          <span className="text-4xl font-black leading-none counter-number z-10">
                            {value}
                          </span>
                          {suffix && (
                            <span className="text-xl font-bold opacity-90 z-10">
                              {suffix}
                            </span>
                          )}

                          {/* Shimmer Effect */}
                          <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div 
                              className="absolute inset-0 rounded-full"
                              style={{
                                background: `linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)`,
                                animation: 'gradient-shift 2s ease-in-out infinite'
                              }}
                            />
                          </div>
                        </div>
                        
                        {/* Floating Accent Dots */}
                        <div 
                          className="absolute -top-2 -right-2 w-5 h-5 rounded-full floating-element"
                          style={{
                            background: theme?.primaryColor,
                            animationDelay: `${index * 0.3}s`,
                            opacity: 0.8
                          }}
                        />
                        <div 
                          className="absolute -bottom-2 -left-2 w-4 h-4 rounded-full floating-element"
                          style={{
                            background: theme?.secondaryColor,
                            animationDelay: `${index * 0.5}s`,
                            opacity: 0.6
                          }}
                        />
                      </div>
                    </div>

                    {/* Service Name */}
                    <h3 className="text-xl lg:text-2xl font-bold text-center leading-tight mb-6">
                      <span 
                        className="gradient-text"
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
                    
                    {/* Bottom Accent Elements */}
                    <div className="flex items-center justify-center space-x-2">
                      <div 
                        className="w-2 h-2 rounded-full transition-all duration-500 group-hover:scale-150"
                        style={{ background: theme?.primaryColor, opacity: 0.6 }}
                      />
                      <div 
                        className="w-8 h-px transition-all duration-500 group-hover:w-12"
                        style={{ background: `linear-gradient(90deg, ${theme?.primaryColor}, ${theme?.secondaryColor})` }}
                      />
                      <div 
                        className="w-2 h-2 rounded-full transition-all duration-500 group-hover:scale-150"
                        style={{ background: theme?.secondaryColor, opacity: 0.6 }}
                      />
                    </div>
                  </div>
                </div>
              );
            }) : (
              <div className="col-span-full text-center text-gray-500 text-xl">
                <div className="glass-morphism p-12 rounded-3xl">
                  <div 
                    className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6"
                    style={{ background: `linear-gradient(135deg, ${theme?.primaryColor}20, ${theme?.secondaryColor}20)` }}
                  >
                    <svg className="w-8 h-8" style={{ color: theme?.primaryColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                  </div>
                  No service highlights available
                </div>
              </div>
            )}
          </div>

          {/* Bottom Decorative Section */}
          <div className="text-center mt-24">
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
                  className="w-3 h-3 rounded-full floating-element"
                  style={{ 
                    background: theme?.primaryColor,
                    animationDelay: '1s'
                  }}
                />
                <span 
                  className="text-2xl font-bold gradient-text"
                  style={{ color: theme?.primaryColor }}
                >
                  Excellence in Every Detail
                </span>
                <div 
                  className="w-3 h-3 rounded-full floating-element"
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
}