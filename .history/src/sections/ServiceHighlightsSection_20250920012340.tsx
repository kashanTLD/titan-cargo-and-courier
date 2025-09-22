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
  const [morphingActive, setMorphingActive] = useState(false);
  
  const { ref: titleRef, isVisible: titleVisible } =
    useScrollAnimation<HTMLHeadingElement>({ threshold: 0.2 });
  const { ref: descRef, isVisible: descVisible } =
    useScrollAnimation<HTMLParagraphElement>({ threshold: 0.2 });
  const { ref: servicesRef, visibleItems } = useStaggeredAnimation(
    data.services.length,
    200
  );

  useEffect(() => {
    const timer1 = setTimeout(() => setParticlesActive(true), 500);
    const timer2 = setTimeout(() => setMorphingActive(true), 1000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
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

  return (
    <>
      <style jsx>{`
        @keyframes liquidFlow {
          0% { border-radius: 40% 60% 60% 40% / 60% 30% 70% 40%; }
          25% { border-radius: 60% 40% 30% 70% / 50% 60% 40% 50%; }
          50% { border-radius: 30% 70% 40% 60% / 40% 50% 50% 60%; }
          75% { border-radius: 70% 30% 60% 40% / 30% 40% 60% 70%; }
          100% { border-radius: 40% 60% 60% 40% / 60% 30% 70% 40%; }
        }
        
        @keyframes orbitalSpin {
          from { transform: rotate(0deg) translateX(50px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(50px) rotate(-360deg); }
        }
        
        @keyframes magneticLevitation {
          0%, 100% { transform: translateY(0px) rotateX(0deg); }
          25% { transform: translateY(-15px) rotateX(5deg); }
          50% { transform: translateY(-8px) rotateX(-3deg); }
          75% { transform: translateY(-20px) rotateX(2deg); }
        }
        
        @keyframes dataStream {
          0% { transform: translateY(100%) scaleY(0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(-100%) scaleY(1); opacity: 0; }
        }
        
        @keyframes holographicShimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        
        @keyframes quantumPulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.2); opacity: 1; }
        }
        
        .liquid-morph {
          animation: liquidFlow 12s ease-in-out infinite;
        }
        
        .orbital-element {
          animation: orbitalSpin 15s linear infinite;
        }
        
        .magnetic-levitation {
          animation: magneticLevitation 8s ease-in-out infinite;
        }
        
        .data-stream {
          animation: dataStream 3s ease-in-out infinite;
        }
        
        .holographic-text {
          background: linear-gradient(90deg, 
            transparent 25%, 
            ${theme?.primaryColor}80 50%, 
            transparent 75%);
          background-size: 200% 100%;
          animation: holographicShimmer 3s ease-in-out infinite;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .quantum-pulse {
          animation: quantumPulse 2s ease-in-out infinite;
        }
        
        .neural-network-bg {
          background: conic-gradient(from 45deg at 30% 70%, 
            ${theme?.primaryColor}08 0deg, 
            ${theme?.secondaryColor}12 90deg, 
            ${theme?.primaryColor}15 180deg, 
            ${theme?.secondaryColor}08 270deg, 
            ${theme?.primaryColor}10 360deg);
        }
      `}</style>

      <section
        id="service-highlights"
        className="relative overflow-hidden py-20 sm:py-24 md:py-28 lg:py-36 neural-network-bg"
      >
        {/* Dynamic Morphing Background */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Large Organic Shapes */}
          {morphingActive && (
            <>
              <div 
                className="absolute top-10 left-10 w-96 h-96 liquid-morph opacity-30"
                style={{
                  background: `radial-gradient(ellipse, ${theme?.primaryColor}15, transparent 70%)`,
                  filter: 'blur(2px)',
                }}
              />
              <div 
                className="absolute bottom-20 right-20 w-80 h-80 liquid-morph opacity-25"
                style={{
                  background: `radial-gradient(ellipse, ${theme?.secondaryColor}20, transparent 70%)`,
                  filter: 'blur(3px)',
                  animationDelay: '3s'
                }}
              />
              <div 
                className="absolute top-1/2 left-1/2 w-60 h-60 liquid-morph opacity-20 -translate-x-1/2 -translate-y-1/2"
                style={{
                  background: `radial-gradient(circle, ${theme?.primaryColor}12, transparent 80%)`,
                  filter: 'blur(4px)',
                  animationDelay: '6s'
                }}
              />
            </>
          )}
          
          {/* Floating Particle Network */}
          {particlesActive && (
            <div className="absolute inset-0">
              {Array.from({ length: 25 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute magnetic-levitation"
                  style={{
                    left: `${15 + (i % 5) * 18}%`,
                    top: `${20 + Math.floor(i / 5) * 15}%`,
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: `${6 + (i % 3)}s`
                  }}
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full quantum-pulse"
                    style={{
                      background: `linear-gradient(45deg, ${theme?.primaryColor}60, ${theme?.secondaryColor}60)`,
                      boxShadow: `0 0 8px ${theme?.primaryColor}40`
                    }}
                  />
                  
                  {/* Connection Lines */}
                  {i % 7 === 0 && (
                    <div
                      className="absolute top-1/2 left-1/2 w-20 h-px opacity-20"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${theme?.primaryColor}60, transparent)`,
                        transform: `translate(-50%, -50%) rotate(${i * 25}deg)`
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Revolutionary Header */}
          <div className="text-center mb-20 lg:mb-28">
            
            {/* Floating Icon Container */}
            <div className="relative inline-block mb-8">
              <div 
                className="w-20 h-20 liquid-morph flex items-center justify-center shadow-2xl magnetic-levitation"
                style={{
                  background: `linear-gradient(135deg, ${theme?.primaryColor}, ${theme?.secondaryColor})`,
                  boxShadow: `0 20px 40px ${theme?.primaryColor}30`
                }}
              >
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              
              {/* Orbital Elements */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="orbital-element">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{
                      background: theme?.primaryColor,
                      opacity: 0.6,
                      animationDelay: '0s'
                    }}
                  />
                </div>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="orbital-element" style={{ animationDirection: 'reverse' }}>
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{
                      background: theme?.secondaryColor,
                      opacity: 0.8,
                      animationDelay: '2s'
                    }}
                  />
                </div>
              </div>
            </div>
            
            {/* Holographic Title */}
            <h2
              ref={titleRef}
              className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-8 transition-all duration-2000 magnetic-levitation ${
                titleVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              style={{
                background: `linear-gradient(135deg, ${theme?.primaryColor} 0%, ${theme?.secondaryColor} 50%, ${theme?.primaryColor} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.1))'
              }}
            >
              <span className="holographic-text">{data.title}</span>
            </h2>
            
            {/* Dynamic Underline */}
            <div 
              className={`w-32 h-2 mx-auto mb-8 liquid-morph transition-all duration-1500 delay-500 ${
                titleVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
              }`}
              style={{
                background: `linear-gradient(90deg, ${theme?.primaryColor}, ${theme?.secondaryColor}, ${theme?.primaryColor})`,
                boxShadow: `0 4px 20px ${theme?.primaryColor}40`
              }}
            />
            
            {/* Enhanced Description */}
            <p
              ref={descRef}
              className={`text-lg sm:text-xl md:text-2xl max-w-5xl mx-auto leading-relaxed transition-all duration-1500 delay-300 ${
                descVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{
                color: '#374151',
                textShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}
            >
              {data.description}
            </p>
          </div>

          {/* Revolutionary Service Cards Grid */}
          <div
            ref={servicesRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
          >
            {data.services && data.services.length > 0 ? data.services.map((service, index) => {
              const { value, suffix } = formatDisplayValue(service.description);
              
              return (
                <div
                  key={`service-${index}`}
                  className={`group relative transition-all duration-1000 magnetic-levitation ${
                    visibleItems.includes(index)
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-16"
                  }`}
                  style={{
                    animationDelay: `${index * 0.3}s`
                  }}
                >
                  {/* Card Container with Liquid Morphing */}
                  <div
                    className="relative liquid-morph p-8 lg:p-10 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-110 hover:rotate-2"
                    style={{
                      background: `linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.98) 100%)`,
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      border: `2px solid ${theme?.primaryColor}20`,
                      boxShadow: `0 25px 50px -12px ${theme?.primaryColor}20`
                    }}
                  >
                    {/* Animated Border */}
                    <div 
                      className="absolute inset-0 liquid-morph opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                      style={{
                        background: `linear-gradient(135deg, ${theme?.primaryColor}30, ${theme?.secondaryColor}30)`,
                        filter: 'blur(8px)',
                        transform: 'scale(1.05)'
                      }}
                    />

                    {/* Data Streams */}
                    <div className="absolute top-0 left-4 w-px h-full opacity-20">
                      <div 
                        className="w-full h-8 data-stream"
                        style={{
                          background: `linear-gradient(180deg, transparent, ${theme?.primaryColor}, transparent)`,
                          animationDelay: `${index * 0.5}s`
                        }}
                      />
                    </div>
                    <div className="absolute top-0 right-4 w-px h-full opacity-15">
                      <div 
                        className="w-full h-6 data-stream"
                        style={{
                          background: `linear-gradient(180deg, transparent, ${theme?.secondaryColor}, transparent)`,
                          animationDelay: `${index * 0.7}s`
                        }}
                      />
                    </div>

                    {/* Enhanced Number Display */}
                    <div className="text-center mb-8 relative">
                      <div className="relative inline-block">
                        {/* Main Number Container */}
                        <div
                          className="w-28 h-28 mx-auto liquid-morph flex flex-col items-center justify-center text-white mb-6 shadow-2xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500"
                          style={{
                            background: `linear-gradient(135deg, ${theme?.primaryColor}, ${theme?.secondaryColor})`,
                            boxShadow: `0 15px 35px -5px ${theme?.primaryColor}50`
                          }}
                        >
                          <span className="text-3xl font-black leading-none holographic-text text-white">
                            {value}
                          </span>
                          {suffix && (
                            <span className="text-xl font-bold opacity-90">
                              {suffix}
                            </span>
                          )}
                          
                          {/* Inner Glow */}
                          <div 
                            className="absolute inset-2 liquid-morph opacity-30"
                            style={{
                              background: `radial-gradient(circle, rgba(255,255,255,0.3), transparent 70%)`
                            }}
                          />
                        </div>
                        
                        {/* Quantum Particles */}
                        <div 
                          className="absolute -top-1 -right-1 w-4 h-4 rounded-full quantum-pulse"
                          style={{
                            background: theme?.primaryColor,
                            animationDelay: `${index * 0.3}s`
                          }}
                        />
                        <div 
                          className="absolute -bottom-1 -left-1 w-3 h-3 rounded-full quantum-pulse"
                          style={{
                            background: theme?.secondaryColor,
                            animationDelay: `${index * 0.5}s`
                          }}
                        />
                        <div 
                          className="absolute top-1/2 -left-2 w-2 h-2 rounded-full quantum-pulse"
                          style={{
                            background: `linear-gradient(45deg, ${theme?.primaryColor}, ${theme?.secondaryColor})`,
                            animationDelay: `${index * 0.7}s`
                          }}
                        />
                      </div>
                    </div>

                    {/* Service Name with Holographic Effect */}
                    <h3 
                      className="text-xl lg:text-2xl font-bold text-center leading-tight mb-4 transition-all duration-300 group-hover:scale-105"
                      style={{
                        background: `linear-gradient(135deg, ${theme?.primaryColor}, ${theme?.secondaryColor})`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}
                    >
                      {service.name}
                    </h3>
                    
                    {/* Morphing Accent Line */}
                    <div 
                      className="w-16 h-1 mx-auto liquid-morph opacity-0 group-hover:opacity-100 transition-all duration-500"
                      style={{
                        background: `linear-gradient(90deg, ${theme?.primaryColor}, ${theme?.secondaryColor})`
                      }}
                    />
                  </div>
                </div>
              );
            }) : (
              <div className="col-span-full text-center text-gray-500 text-xl">
                <div className="inline-block p-8 rounded-2xl bg-white/50 backdrop-blur-sm">
                  No service highlights available
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Bottom Section */}
          <div className="text-center mt-20 lg:mt-28">
            <div className="inline-flex items-center space-x-6 p-6 rounded-2xl backdrop-blur-sm"
              style={{
                background: `linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.2))`,
                border: `1px solid ${theme?.primaryColor}20`
              }}
            >
              <div 
                className="w-16 h-px liquid-morph"
                style={{
                  background: `linear-gradient(90deg, transparent, ${theme?.primaryColor}, transparent)`
                }}
              />
              <span 
                className="text-lg font-bold holographic-text"
                style={{ color: theme?.primaryColor }}
              >
                Excellence in Numbers
              </span>
              <div 
                className="w-16 h-px liquid-morph"
                style={{
                  background: `linear-gradient(90deg, transparent, ${theme?.secondaryColor}, transparent)`
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}