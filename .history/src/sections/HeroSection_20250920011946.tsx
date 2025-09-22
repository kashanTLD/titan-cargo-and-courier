'use client';

import Image from 'next/image';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useEffect, useState } from 'react';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  description: string;
  ctaButton: {
    href: string;
    label: string;
  };
  backgroundImage?: string;
  themeData?: {
    primaryColor: string;
    secondaryColor: string;
  };
}

export default function HeroSection({ title, subtitle, description, ctaButton, backgroundImage, themeData }: HeroSectionProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [morphingComplete, setMorphingComplete] = useState(false);
  const [particlesRevealed, setParticlesRevealed] = useState(false);
  
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation<HTMLHeadingElement>({ threshold: 0.3 });
  const { ref: subtitleRef, isVisible: subtitleVisible } = useScrollAnimation<HTMLHeadingElement>({ threshold: 0.3 });
  const { ref: descriptionRef, isVisible: descriptionVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 });

  useEffect(() => {
    setIsLoaded(true);
    const timer1 = setTimeout(() => setMorphingComplete(true), 1200);
    const timer2 = setTimeout(() => setParticlesRevealed(true), 1800);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  useEffect(() => {
    if (themeData) {
      const root = document.documentElement;
      root.style.setProperty('--theme-primary-color', themeData.primaryColor);
      root.style.setProperty('--theme-secondary-color', themeData.secondaryColor);
      root.style.setProperty('--theme-primary-color-border', `${themeData.primaryColor}40`);
      root.style.setProperty('--theme-primary-color-shadow', `${themeData.primaryColor}30`);
      root.style.setProperty('--theme-primary-color-shadow-hover', `${themeData.primaryColor}50`);
      root.style.setProperty('--theme-primary-color-shimmer', `${themeData.primaryColor}20`);
    }
  }, [themeData]);

  return (
    <>
      <style jsx>{`
        @keyframes morphingGlow {
          0% { 
            transform: scale(1) rotate(0deg);
            opacity: 0.6;
          }
          33% { 
            transform: scale(1.1) rotate(120deg);
            opacity: 0.8;
          }
          66% { 
            transform: scale(0.9) rotate(240deg);
            opacity: 0.4;
          }
          100% { 
            transform: scale(1) rotate(360deg);
            opacity: 0.6;
          }
        }
        
        @keyframes textShimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        
        @keyframes magneticFloat {
          0%, 100% { transform: translateY(0px) scale(1); }
          25% { transform: translateY(-20px) scale(1.05); }
          50% { transform: translateY(-10px) scale(0.95); }
          75% { transform: translateY(-25px) scale(1.02); }
        }
        
        @keyframes particleDance {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 0.3; }
          25% { transform: translate(10px, -15px) rotate(90deg); opacity: 0.7; }
          50% { transform: translate(-5px, -25px) rotate(180deg); opacity: 0.5; }
          75% { transform: translate(-15px, -10px) rotate(270deg); opacity: 0.8; }
          100% { transform: translate(0, 0) rotate(360deg); opacity: 0.3; }
        }
        
        @keyframes liquidMotion {
          0% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
          25% { border-radius: 58% 42% 75% 25% / 76% 24% 76% 24%; }
          50% { border-radius: 50% 50% 33% 67% / 55% 27% 73% 45%; }
          75% { border-radius: 33% 67% 58% 42% / 63% 68% 32% 37%; }
          100% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
        }
        
        .hero-gradient-bg {
          background: conic-gradient(from 180deg at 50% 50%, 
            ${themeData?.primaryColor}15 0deg, 
            ${themeData?.secondaryColor}25 72deg, 
            ${themeData?.primaryColor}35 144deg, 
            ${themeData?.secondaryColor}15 216deg, 
            ${themeData?.primaryColor}25 288deg, 
            ${themeData?.secondaryColor}15 360deg);
        }
        
        .morphing-element {
          animation: morphingGlow 8s ease-in-out infinite;
        }
        
        .shimmer-text {
          background: linear-gradient(90deg, 
            transparent 25%, 
            ${themeData?.primaryColor}80 50%, 
            transparent 75%);
          background-size: 200% 100%;
          animation: textShimmer 3s ease-in-out infinite;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .magnetic-float {
          animation: magneticFloat 6s ease-in-out infinite;
        }
        
        .particle-dance {
          animation: particleDance 4s ease-in-out infinite;
        }
        
        .liquid-shape {
          animation: liquidMotion 10s ease-in-out infinite;
        }
      `}</style>
      
      <section className="relative overflow-hidden min-h-screen hero-gradient-bg">
        
        {/* Dynamic Morphing Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Large Morphing Orbs */}
          <div 
            className={`absolute top-20 left-20 w-96 h-96 morphing-element transition-opacity duration-2000 ${
              morphingComplete ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              background: `radial-gradient(circle, ${themeData?.primaryColor}10, transparent 70%)`,
              filter: 'blur(1px)',
            }}
          />
          <div 
            className={`absolute bottom-32 right-32 w-80 h-80 morphing-element transition-opacity duration-2000 ${
              morphingComplete ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              background: `radial-gradient(circle, ${themeData?.secondaryColor}15, transparent 70%)`,
              filter: 'blur(2px)',
              animationDelay: '2s'
            }}
          />
          
          {/* Floating Particles System */}
          {particlesRevealed && (
            <div className="absolute inset-0">
              {Array.from({ length: 15 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute particle-dance"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${i * 0.3}s`,
                    animationDuration: `${4 + Math.random() * 3}s`
                  }}
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{
                      background: `linear-gradient(45deg, ${themeData?.primaryColor}60, ${themeData?.secondaryColor}60)`,
                      boxShadow: `0 0 10px ${themeData?.primaryColor}40`
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Main Content Container */}
        <div className="relative z-10 min-h-screen flex items-center">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              
              {/* Enhanced Content Area */}
              <div className="relative">
                <div className="max-w-2xl">
                  
                  {/* Magnetic Title with Advanced Animation */}
                  <div className="relative mb-12">
                    <h1 
                      ref={titleRef}
                      className={`text-6xl lg:text-7xl xl:text-8xl font-bold leading-none mb-4 transition-all duration-2000 magnetic-float ${
                        titleVisible 
                          ? 'opacity-100 translate-y-0' 
                          : 'opacity-0 translate-y-20'
                      }`}
                      style={{
                        background: `linear-gradient(135deg, ${themeData?.primaryColor} 0%, ${themeData?.secondaryColor} 50%, ${themeData?.primaryColor} 100%)`,
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
                      }}
                    >
                      <span className="shimmer-text">{title}</span>
                    </h1>
                    
                    {/* Dynamic Underline with Liquid Motion */}
                    <div 
                      className={`absolute -bottom-4 left-0 h-2 liquid-shape transition-all duration-1500 delay-700 ${
                        titleVisible ? 'w-3/4 opacity-100' : 'w-0 opacity-0'
                      }`}
                      style={{
                        background: `linear-gradient(90deg, ${themeData?.primaryColor}80, ${themeData?.secondaryColor}80, ${themeData?.primaryColor}80)`,
                        boxShadow: `0 2px 15px ${themeData?.primaryColor}40`
                      }}
                    />
                  </div>

                  {/* Enhanced Subtitle */}
                  {subtitle && (
                    <h2 
                      ref={subtitleRef}
                      className={`text-2xl lg:text-3xl font-light mb-8 transition-all duration-1500 delay-500 ${
                        subtitleVisible 
                          ? 'opacity-100 translate-x-0' 
                          : 'opacity-0 -translate-x-12'
                      }`}
                      style={{ 
                        color: themeData?.primaryColor,
                        textShadow: `0 2px 10px ${themeData?.primaryColor}30`
                      }}
                    >
                      {subtitle}
                    </h2>
                  )}

                 

                  {/* Revolutionary CTA Button */}
                  {ctaButton && (
                    <div className={`transition-all duration-1000 delay-1000 ${
                      descriptionVisible 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-8'
                    }`}>
                      <a
                        href={ctaButton.href}
                        className="group relative inline-flex items-center px-8 py-4 text-lg font-medium text-white rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                        style={{
                          background: `linear-gradient(135deg, ${themeData?.primaryColor} 0%, ${themeData?.secondaryColor} 100%)`,
                          boxShadow: `0 10px 30px ${themeData?.primaryColor}40`
                        }}
                      >
                        {/* Animated Background */}
                        <div 
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{
                            background: `linear-gradient(135deg, ${themeData?.secondaryColor} 0%, ${themeData?.primaryColor} 100%)`
                          }}
                        />
                        
                        {/* Button Content */}
                        <span className="relative z-10 mr-3">{ctaButton.label}</span>
                        <svg 
                          className="relative z-10 w-6 h-6 transition-transform duration-300 group-hover:translate-x-2" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                        
                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100">
                          <div 
                            className="absolute inset-0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                            style={{
                              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)'
                            }}
                          />
                        </div>
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Revolutionary Image Area */}
              <div className="relative">
                <div className="relative h-96 lg:h-[700px]">
                  
                  {/* Liquid Container */}
                  <div 
                    className={`relative w-full h-full liquid-shape overflow-hidden transition-all duration-2000 ${
                      isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                    }`}
                    style={{
                      background: `linear-gradient(135deg, ${themeData?.primaryColor}20, ${themeData?.secondaryColor}20)`,
                      boxShadow: `0 20px 60px ${themeData?.primaryColor}30`,
                      border: `2px solid ${themeData?.primaryColor}40`
                    }}
                  >
                    
                    {/* Background Image with Parallax Effect */}
                    {backgroundImage ? (
                      <div className="absolute inset-0">
                        <Image
                          src={backgroundImage}
                          alt="Luxury experience"
                          fill
                          className="object-cover transition-all duration-3000 hover:scale-110"
                          priority
                          quality={95}
                          sizes="50vw"
                        />
                      </div>
                    ) : (
                      <div 
                        className="absolute inset-0"
                        style={{
                          background: `radial-gradient(circle at center, ${themeData?.primaryColor}30 0%, ${themeData?.secondaryColor}20 50%, ${themeData?.primaryColor}10 100%)`
                        }}
                      />
                    )}

                    {/* Overlay with Breathing Effect */}
                    <div 
                      className="absolute inset-0 transition-all duration-4000"
                      style={{
                        background: `linear-gradient(45deg, ${themeData?.primaryColor}20 25%, transparent 25%, transparent 75%, ${themeData?.secondaryColor}20 75%)`
                      }}
                    />
                    
                    {/* Floating Interactive Elements */}
                    <div className="absolute inset-0 pointer-events-none">
                      <div 
                        className="absolute top-8 right-8 w-20 h-20 rounded-full border-2 flex items-center justify-center magnetic-float"
                        style={{ 
                          borderColor: `${themeData?.primaryColor}60`,
                          boxShadow: `0 0 20px ${themeData?.primaryColor}40`
                        }}
                      >
                        <div 
                          className="w-8 h-8 rounded-full pulse"
                          style={{ 
                            backgroundColor: `${themeData?.primaryColor}60`,
                            animation: 'pulse 2s infinite'
                          }}
                        />
                      </div>
                      
                      <div 
                        className="absolute bottom-8 left-8 w-16 h-16 rounded-full border-2 flex items-center justify-center magnetic-float"
                        style={{ 
                          borderColor: `${themeData?.secondaryColor}60`,
                          boxShadow: `0 0 20px ${themeData?.secondaryColor}40`,
                          animationDelay: '1s'
                        }}
                      >
                        <div 
                          className="w-6 h-6 rounded-full pulse"
                          style={{ 
                            backgroundColor: `${themeData?.secondaryColor}60`,
                            animation: 'pulse 2s infinite',
                            animationDelay: '1s'
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Orbital Rings */}
                  <div 
                    className="absolute inset-0 rounded-full border opacity-30 animate-spin"
                    style={{ 
                      borderColor: `${themeData?.primaryColor}30`,
                      animationDuration: '30s',
                      transform: 'scale(1.2)'
                    }}
                  />
                  <div 
                    className="absolute inset-0 rounded-full border opacity-20 animate-spin"
                    style={{ 
                      borderColor: `${themeData?.secondaryColor}30`,
                      animationDuration: '45s',
                      animationDirection: 'reverse',
                      transform: 'scale(1.4)'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Bottom Wave */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg 
            className="relative block w-full h-24" 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={themeData?.primaryColor} stopOpacity="0.6"/>
                <stop offset="50%" stopColor={themeData?.secondaryColor} stopOpacity="0.8"/>
                <stop offset="100%" stopColor={themeData?.primaryColor} stopOpacity="0.6"/>
              </linearGradient>
            </defs>
            <path 
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
              fill="url(#waveGradient)"
            />
          </svg>
        </div>
      </section>
    </>
  );
}