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
  const [curtainRevealed, setCurtainRevealed] = useState(false);
  
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation<HTMLHeadingElement>({ threshold: 0.3 });
  const { ref: subtitleRef, isVisible: subtitleVisible } = useScrollAnimation<HTMLHeadingElement>({ threshold: 0.3 });

  useEffect(() => {
    setIsLoaded(true);
    // Trigger curtain reveal after component mounts
    const timer = setTimeout(() => setCurtainRevealed(true), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (themeData) {
      const root = document.documentElement;
      root.style.setProperty('--theme-primary-color', themeData.primaryColor);
      root.style.setProperty('--theme-secondary-color', themeData.secondaryColor);
      root.style.setProperty('--theme-primary-color-border', `${themeData.primaryColor}40`);
      root.style.setProperty('--theme-primary-color-shadow', `${themeData.primaryColor}30`);
      root.style.setProperty('--theme-primary-color-shadow-hover', `${themeData.primaryColor}40`);
      root.style.setProperty('--theme-primary-color-shimmer', `${themeData.primaryColor}20`);
    }
  }, [themeData]);

  return (
    <section 
      className="relative overflow-hidden min-h-screen"
      style={{
        background: `linear-gradient(135deg, ${themeData?.primaryColor}15 0%, ${themeData?.secondaryColor}15 25%, ${themeData?.primaryColor}10 50%, ${themeData?.secondaryColor}10 75%, ${themeData?.primaryColor}15 100%)`
      }}
    >
      {/* Luxury Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: `radial-gradient(circle at 25% 25%, ${themeData?.primaryColor} 0%, transparent 50%)`
          }}
        ></div>
        <div 
          className="absolute top-0 right-0 w-full h-full"
          style={{
            background: `radial-gradient(circle at 75% 25%, ${themeData?.secondaryColor} 0%, transparent 50%)`
          }}
        ></div>
        <div 
          className="absolute bottom-0 left-0 w-full h-full"
          style={{
            background: `radial-gradient(circle at 25% 75%, ${themeData?.primaryColor} 0%, transparent 50%)`
          }}
        ></div>
      </div>

      {/* Floating Luxury Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-20 left-20 w-2 h-2 rounded-full animate-float opacity-60" 
          style={{ 
            backgroundColor: themeData?.primaryColor,
            animationDelay: '0s' 
          }}
        ></div>
        <div 
          className="absolute top-40 right-32 w-1 h-1 rounded-full animate-float opacity-40" 
          style={{ 
            backgroundColor: themeData?.secondaryColor,
            animationDelay: '1s' 
          }}
        ></div>
        <div 
          className="absolute bottom-32 left-40 w-3 h-3 rounded-full animate-float opacity-50" 
          style={{ 
            backgroundColor: themeData?.primaryColor,
            animationDelay: '2s' 
          }}
        ></div>
        <div 
          className="absolute top-60 left-1/2 w-1.5 h-1.5 rounded-full animate-float opacity-30" 
          style={{ 
            backgroundColor: themeData?.secondaryColor,
            animationDelay: '3s' 
          }}
        ></div>
        </div>

      <div className="relative z-10 min-h-screen flex items-center">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Asymmetrical Content Area - Takes up 7/12 columns */}
            <div className="lg:col-span-7 relative">
              <div className="max-w-2xl">
                {/* Luxury Title with Gradient Shimmer */}
                <div className="relative mb-8">
            <h1 
              ref={titleRef}
                    className={`luxury-hero-title transition-all duration-1500 ${
                titleVisible 
                  ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-12'
              }`}
            >
                    <span className="luxury-title-shimmer">{title}</span>
            </h1>
                  {/* Elegant underline */}
                  <div 
                    className={`absolute -bottom-2 left-0 h-1 transition-all duration-1000 delay-500 ${
                      titleVisible ? 'w-full' : 'w-0'
                    }`}
                    style={{
                      background: `linear-gradient(90deg, ${themeData?.primaryColor}, ${themeData?.secondaryColor})`
                    }}
                  ></div>
                </div>
            
                {/* Subtitle with sophisticated animation */}
            {subtitle && (
              <h2 
                ref={subtitleRef}
                    className={`luxury-hero-subtitle mb-6 transition-all duration-1200 delay-300 ${
                  subtitleVisible 
                        ? 'opacity-100 translate-x-0' 
                        : 'opacity-0 -translate-x-8'
                }`}
                    style={{ color: themeData?.primaryColor }}
              >
                {subtitle}
              </h2>
            )}
            

                {/* Luxury CTA Button with Gradient Shimmer */}
                {ctaButton && (
                  <div className={`transition-all duration-1000 delay-600 ${
                    subtitleVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                  }`}>
                    <a
                      href={ctaButton.href}
                      className="luxury-cta-button group relative overflow-hidden"
                      style={{
                        background: `linear-gradient(135deg, ${themeData?.primaryColor} 0%, ${themeData?.secondaryColor} 100%)`
                      }}
                    >
                      <span className="relative z-10">{ctaButton.label}</span>
                      <div className="luxury-button-shimmer"></div>
                      {/* Elegant arrow */}
                      <svg 
                        className="w-5 h-5 ml-3 transition-transform duration-300 group-hover:translate-x-1" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Asymmetrical Image Area - Takes up 5/12 columns */}
            <div className="lg:col-span-5 relative">
              <div className="relative h-96 lg:h-[600px] rounded-3xl overflow-hidden">
                {/* Curtain Reveal Animation */}
                <div className={`absolute inset-0 z-20 transition-transform duration-2000 ease-out ${
                  curtainRevealed ? '-translate-x-full' : 'translate-x-0'
                }`}>
                  <div 
                    className="w-full h-full flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${themeData?.primaryColor} 0%, ${themeData?.secondaryColor} 50%, ${themeData?.primaryColor} 100%)`
                    }}
                  >
                    <div className="text-white text-2xl font-light opacity-80">Revealing Beauty</div>
                  </div>
                </div>

                {/* Background Image */}
                {backgroundImage ? (
                  <Image
                    src={backgroundImage}
                    alt="Luxury salon experience"
                    fill
                    className="object-cover transition-all duration-2000"
                    priority
                    quality={90}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                ) : (
                  <div 
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, ${themeData?.primaryColor}20 0%, ${themeData?.secondaryColor}20 50%, ${themeData?.primaryColor}20 100%)`
                    }}
                  ></div>
                )}

                {/* Luxury Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

                {/* Floating Decorative Elements */}
                <div 
                  className="absolute top-6 right-6 w-16 h-16 border rounded-full flex items-center justify-center"
                  style={{ borderColor: `${themeData?.primaryColor}40` }}
                >
                  <div 
                    className="w-8 h-8 rounded-full animate-pulse"
                    style={{ backgroundColor: `${themeData?.primaryColor}20` }}
                  ></div>
                </div>
                <div 
                  className="absolute bottom-6 left-6 w-12 h-12 border rounded-full flex items-center justify-center"
                  style={{ borderColor: `${themeData?.secondaryColor}40` }}
                >
                  <div 
                    className="w-6 h-6 rounded-full animate-pulse"
                    style={{ 
                      backgroundColor: `${themeData?.secondaryColor}20`,
                      animationDelay: '1s' 
                    }}
                  ></div>
                </div>
              </div>

              {/* Luxury Accent Elements */}
              <div 
                className="absolute -top-4 -right-4 w-24 h-24 border rounded-full animate-spin" 
                style={{ 
                  borderColor: `${themeData?.primaryColor}30`,
                  animationDuration: '20s' 
                }}
              ></div>
              <div 
                className="absolute -bottom-4 -left-4 w-16 h-16 border rounded-full animate-spin" 
                style={{ 
                  borderColor: `${themeData?.secondaryColor}30`,
                  animationDuration: '15s', 
                  animationDirection: 'reverse' 
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Luxury Bottom Wave */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg 
          className="w-full h-20" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path 
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
            fill={themeData?.primaryColor}
            className="opacity-30"
          ></path>
        </svg>
      </div>
    </section>
  );
}
