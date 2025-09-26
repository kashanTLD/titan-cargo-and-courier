'use client';

import Image from 'next/image';
import { useLandingPageData } from "@/components/LandingPageDataProvider";
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useEffect, useState } from 'react';

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  ctaButton?: {
    href: string;
    label: string;
  };
  backgroundImage?: string;
  secondaryImage?: string;
  themeData?: {
    primaryColor: string;
    secondaryColor: string;
  };
}

export default function HeroSection({ 
  title, 
  subtitle, 
  description, 
  ctaButton, 
  backgroundImage, 
  secondaryImage,
  themeData 
}: HeroSectionProps) {
  const landing = useLandingPageData();
  const resolvedTheme = themeData || landing?.themeData;
  const resolvedTitle = title || landing?.content?.hero?.title || "";
  const resolvedSubtitle = subtitle || landing?.content?.hero?.subtitle || "";
  const resolvedDescription = description || landing?.content?.hero?.description || "";
  const resolvedCta = ctaButton || landing?.content?.hero?.ctaButton || { href: '#services', label: 'Explore Services' };
  const resolvedBackgroundImage = backgroundImage || landing?.images?.find((img)=> img.slotName === 'hero-image-1' || img.category === 'hero')?.imageUrl;
  const [isLoaded, setIsLoaded] = useState(false);

  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation<HTMLHeadingElement>({ threshold: 0.3 });
  const { ref: subtitleRef, isVisible: subtitleVisible } = useScrollAnimation<HTMLHeadingElement>({ threshold: 0.3 });
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (resolvedTheme) {
      const root = document.documentElement;
      root.style.setProperty('--theme-primary-color', resolvedTheme.primaryColor);
      root.style.setProperty('--theme-secondary-color', resolvedTheme.secondaryColor);
      root.style.setProperty('--theme-primary-rgb', hexToRgb(resolvedTheme.primaryColor));
      root.style.setProperty('--theme-secondary-rgb', hexToRgb(resolvedTheme.secondaryColor));
    }
  }, [resolvedTheme]);

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? 
      `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : 
      '0, 0, 0';
  };

  const styles = `
    @keyframes royal-float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      33% { transform: translateY(-8px) rotate(1deg); }
      66% { transform: translateY(-4px) rotate(-1deg); }
    }

    @keyframes fade-slide-up {
      from { 
        opacity: 0; 
        transform: translateY(40px); 
      }
      to { 
        opacity: 1; 
        transform: translateY(0); 
      }
    }

    @keyframes geometric-spin {
      0% { transform: rotateX(0deg) rotateY(0deg); }
      100% { transform: rotateX(360deg) rotateY(360deg); }
    }

    @keyframes organic-pulse {
      0%, 100% { 
        transform: scale(1) rotate(0deg);
        opacity: 0.4;
      }
      50% { 
        transform: scale(1.2) rotate(180deg);
        opacity: 0.8;
      }
    }

    @keyframes shimmer-flow {
      0% { transform: translateX(-100%) rotate(-45deg); }
      100% { transform: translateX(300%) rotate(-45deg); }
    }

    @keyframes depth-float {
      0%, 100% { 
        transform: translateZ(0px) rotateX(0deg) rotateY(0deg);
        filter: blur(0px);
      }
      50% { 
        transform: translateZ(20px) rotateX(5deg) rotateY(10deg);
        filter: blur(0.5px);
      }
    }

    .royal-title {
      font-size: clamp(3rem, 8vw, 6rem);
      font-weight: 300;
      letter-spacing: -0.04em;
      color: #1a1a1a;
      font-family: 'serif', Georgia, 'Times New Roman', serif;
    }

    .royal-subtitle {
      font-size: clamp(1rem, 2vw, 1.25rem);
      font-weight: 400;
      letter-spacing: 0.05em;
      color: #666;
      text-transform: uppercase;
    }

    .geometric-3d {
      transform-style: preserve-3d;
      animation: geometric-spin 25s linear infinite;
    }

    .organic-shape {
      border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
      animation: organic-pulse 8s ease-in-out infinite;
    }

    .shimmer-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        45deg,
        transparent 30%,
        rgba(255, 255, 255, 0.3) 50%,
        transparent 70%
      );
      transform: translateX(-100%) rotate(-45deg);
      animation: shimmer-flow 3s ease-in-out infinite;
      animation-delay: 2s;
    }

    .depth-layer {
      animation: depth-float 6s ease-in-out infinite;
    }

    .split-content {
      background: linear-gradient(135deg, 
        rgba(var(--theme-primary-rgb), 0.02) 0%, 
        rgba(var(--theme-secondary-rgb), 0.02) 100%);
      backdrop-filter: blur(20px);
    }

    .image-morph {
      clip-path: polygon(0 0, 85% 0, 100% 100%, 0 85%);
      transition: clip-path 0.8s cubic-bezier(0.23, 1, 0.32, 1);
    }

    .image-morph:hover {
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    }

    .secondary-image-shape {
      clip-path: circle(70% at 70% 30%);
      transition: clip-path 0.8s cubic-bezier(0.23, 1, 0.32, 1);
    }

    .secondary-image-shape:hover {
      clip-path: circle(75% at 50% 50%);
    }

    .parallax-element {
      will-change: transform;
    }

    .royal-accent {
      background: linear-gradient(45deg, var(--theme-primary-color), var(--theme-secondary-color));
      background-size: 200% 200%;
      animation: shimmer-flow 4s ease-in-out infinite;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <section className="relative md:overflow-hidden min-h-screen bg-white">

        {/* Split Screen Layout */}
        <div className="relative z-10 min-h-screen">
          <div className="grid lg:grid-cols-12 h-screen">
            
            {/* Content Side - Left */}
            <div className="lg:col-span-5 flex items-center justify-center px-8 lg:px-16 relative">
              <div className="max-w-xl space-y-8">
                
                {/* Royal Title */}
                <div className="space-y-4">
                  <div 
                    className={`transition-all duration-1200 ease-out ${
                      titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                    }`}
                  >
                    <h1 
                      ref={titleRef}
                      className="royal-title"
                      style={{ 
                        animationDelay: '0.2s'
                      }}
                    >
                      {resolvedTitle}
                    </h1>
                  </div>
                  
                  {/* Elegant divider */}
                  <div 
                    className={`h-px transition-all duration-1000 delay-300 ${
                      titleVisible ? 'w-24 opacity-60' : 'w-0 opacity-0'
                    }`}
                    style={{
                      background: `linear-gradient(90deg, ${resolvedTheme?.primaryColor}, transparent)`
                    }}
                  />
                </div>

                {/* Subtitle */}
                {resolvedSubtitle && (
                  <h2 
                    ref={subtitleRef}
                    className={`royal-subtitle transition-all duration-1000 delay-500 ${
                      subtitleVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                    }`}
                  >
                    {resolvedSubtitle}
                  </h2>
                )}

                {/* Description */}
                <p 
                  className={`text-gray-700 text-lg leading-relaxed transition-all duration-1000 delay-700 ${
                    subtitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                  }`}
                >
                  {resolvedDescription}
                </p>

                {/* CTA Button (Tailwind) */}
                <div 
                  ref={ctaRef}
                  className={`transition-all duration-1000 delay-900 ${
                    ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                >
                  <a
                    href={resolvedCta.href}
                    className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full border-2 overflow-hidden backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 shadow-md hover:shadow-xl"

                    style={{borderColor: resolvedTheme?.primaryColor, color: resolvedTheme?.primaryColor}}
                  >
                    {/* Hover gradient overlay */}
                    <div
                      className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{
                        background: `linear-gradient(135deg, ${resolvedTheme?.primaryColor}, ${resolvedTheme?.secondaryColor})`,
                      }}
                    />
                    <span className="relative z-10  group-hover:text-white">
                      {resolvedCta.label}
                    </span>
                    <svg
                      className="relative z-10 w-5 h-5 transition-transform duration-500 group-hover:translate-x-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Images Side - Right */}
            <div className="lg:col-span-7 relative overflow-hidden">
              
              {/* Primary Image */}
              <div 
                className="absolute inset-0 w-full h-full"
              >
                <div 
                  className={`w-full h-full image-morph transition-all duration-1000 ${
                    isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                  }`}
                >
                  {resolvedBackgroundImage ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={resolvedBackgroundImage}
                        alt="Hero primary image"
                        fill
                        className="object-cover"
                        priority
                        quality={95}
                        sizes="(max-width: 1024px) 100vw, 60vw"
                      />
                    </div>
                  ) : (
                    <div 
                      className="w-full h-full flex items-center justify-center text-8xl"
                      style={{
                        background: `linear-gradient(135deg, ${resolvedTheme?.primaryColor}15, ${resolvedTheme?.secondaryColor}15)`
                      }}
                    >
                      
                    </div>
                  )}
                </div>
              </div>

              {/* Secondary Image - Floating */}
              <div 
                className="absolute bottom-16 left-8 w-64 h-80"
              >
                <div 
                  className={`w-full h-full secondary-image-shape transition-all duration-1200 delay-500 ${
                    isLoaded ? 'opacity-90 scale-100' : 'opacity-0 scale-95'
                  }`}
                >
                  {secondaryImage ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={secondaryImage}
                        alt="Hero secondary image"
                        fill
                        className="object-cover"
                        quality={90}
                        sizes="(max-width: 1024px) 50vw, 30vw"
                      />
                      <div 
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: `linear-gradient(135deg, ${resolvedTheme?.primaryColor}20, transparent 60%)`
                        }}
                      />
                    </div>
                  ) : (
                    <div 
                      className="w-full h-full flex items-center justify-center text-4xl rounded-full"
                      style={{
                        background: `linear-gradient(135deg, ${resolvedTheme?.secondaryColor}20, ${resolvedTheme?.primaryColor}10)`
                      }}
                    >
                      
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}