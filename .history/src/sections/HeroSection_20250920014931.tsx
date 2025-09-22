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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation<HTMLHeadingElement>({ threshold: 0.3 });
  const { ref: subtitleRef, isVisible: subtitleVisible } = useScrollAnimation<HTMLHeadingElement>({ threshold: 0.3 });
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 });

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

  useEffect(() => {
    if (themeData) {
      const root = document.documentElement;
      root.style.setProperty('--theme-primary-color', themeData.primaryColor);
      root.style.setProperty('--theme-secondary-color', themeData.secondaryColor);
      root.style.setProperty('--theme-primary-rgb', hexToRgb(themeData.primaryColor));
      root.style.setProperty('--theme-secondary-rgb', hexToRgb(themeData.secondaryColor));
    }
  }, [themeData]);

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? 
      `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : 
      '0, 0, 0';
  };

  const styles = `
    @keyframes gentle-float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-8px); }
    }
    
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
    
    @keyframes subtle-pulse {
      0%, 100% { opacity: 0.6; }
      50% { opacity: 1; }
    }
    
    @keyframes gradient-rotate {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
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

    @keyframes mirror-glow {
      0%, 100% { 
        box-shadow: 0 0 10px rgba(var(--theme-primary-rgb), 0.2); 
      }
      50% { 
        box-shadow: 0 0 20px rgba(var(--theme-primary-rgb), 0.4); 
      }
    }

    @keyframes hair-wave {
      0%, 100% { transform: translateX(0); }
      50% { transform: translateX(10px); }
    }

    @keyframes swirl-rotate {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
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

    @keyframes brush-stroke {
      0%, 100% { transform: rotate(45deg) scale(1); }
      50% { transform: rotate(50deg) scale(1.1); }
    }

    @keyframes nail-drop {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-5px) rotate(5deg); }
    }

    @keyframes animate-spin-slow {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .hero-title {
      font-size: clamp(2.5rem, 6vw, 4.5rem);
      font-weight: 800;
      line-height: 1.1;
      letter-spacing: -0.025em;
      color: #1f2937;
    }

    .hero-subtitle {
      font-size: clamp(1.125rem, 2.5vw, 1.375rem);
      font-weight: 400;
      letter-spacing: 0.01em;
      color: #6b7280;
    }

    .minimal-cta-button {
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

    .minimal-cta-button:hover {
      transform: translateY(-1px);
      box-shadow: 0 8px 25px rgba(var(--theme-primary-rgb), 0.35);
    }

    .minimal-cta-button::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, var(--theme-primary-color), var(--theme-secondary-color));
      transition: opacity 0.3s;
    }

    .minimal-cta-button::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, var(--theme-secondary-color), var(--theme-primary-color));
      opacity: 0;
      transition: opacity 0.3s;
    }

    .minimal-cta-button:hover::after {
      opacity: 1;
    }

    .minimal-cta-button > * {
      position: relative;
      z-index: 1;
    }

    .floating-element {
      animation: gentle-float 6s ease-in-out infinite;
    }

    .fade-in-animation {
      animation: fade-in-up 0.8s ease-out forwards;
    }

    .pulse-animation {
      animation: subtle-pulse 4s ease-in-out infinite;
    }

    .scale-in-animation {
      animation: scale-in 0.6s ease-out forwards;
    }

    .sparkle-twinkle {
      border-radius: 50%;
      animation: sparkle-twinkle 3s ease-in-out infinite;
    }

    .mirror-glow {
      animation: mirror-glow 4s ease-in-out infinite;
    }

    .hair-wave {
      animation: hair-wave 6s ease-in-out infinite;
    }

    .swirl-animation {
      animation: swirl-rotate 20s linear infinite;
    }

    .glow-pulse {
      animation: glow-pulse 3s ease-in-out infinite;
    }

    .brush-stroke {
      animation: brush-stroke 5s ease-in-out infinite;
    }

    .nail-drop {
      animation: nail-drop 4s ease-in-out infinite;
    }

    .animate-spin-slow {
      animation: animate-spin-slow 30s linear infinite;
    }

    .image-container {
      position: relative;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
    }

    .image-container::before {
      content: '';
      position: absolute;
      inset: -2px;
      background: linear-gradient(135deg, var(--theme-primary-color), var(--theme-secondary-color));
      border-radius: 22px;
      z-index: -1;
      opacity: 0.8;
    }

    .decorative-circle {
      border-radius: 50%;
      background: linear-gradient(135deg, var(--theme-primary-color), var(--theme-secondary-color));
    }

    .gradient-border {
      position: relative;
    }

    .gradient-border::before {
      content: '';
      position: absolute;
      inset: 0;
      padding: 2px;
      background: linear-gradient(135deg, var(--theme-primary-color), var(--theme-secondary-color));
      border-radius: inherit;
      mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      mask-composite: xor;
      -webkit-mask-composite: xor;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <section className="relative overflow-hidden min-h-screen bg-white">
        
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

          {/* Salon-themed geometric patterns */}
          <div className="absolute top-1/4 left-1/4 opacity-4">
            <svg width="200" height="200" className="animate-spin-slow">
              <defs>
                <linearGradient id="salonGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: themeData?.primaryColor, stopOpacity: 0.3 }} />
                  <stop offset="100%" style={{ stopColor: themeData?.secondaryColor, stopOpacity: 0.1 }} />
                </linearGradient>
              </defs>
              <circle cx="100" cy="100" r="80" fill="none" stroke="url(#salonGradient1)" strokeWidth="1" strokeDasharray="5,5" />
              <circle cx="100" cy="100" r="60" fill="none" stroke="url(#salonGradient1)" strokeWidth="1" opacity="0.6" />
              <circle cx="100" cy="100" r="40" fill="none" stroke="url(#salonGradient1)" strokeWidth="1" opacity="0.4" />
            </svg>
          </div>

          {/* Mirror reflection effect */}
          <div className="absolute top-32 right-40 w-32 h-48 opacity-6 transform rotate-12">
            <div 
              className="w-full h-full rounded-full border-2 mirror-shine"
              style={{ borderColor: `${themeData?.primaryColor}30` }}
            />
          </div>

          {/* Scattered beauty elements */}
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

          {/* Flowing hair-like curves */}
          <div className="absolute top-20 left-20 opacity-4">
            <svg width="300" height="200" className="hair-wave">
              <path 
                d="M0,100 Q75,50 150,100 T300,100" 
                fill="none" 
                stroke={themeData?.primaryColor} 
                strokeWidth="2" 
                opacity="0.3"
              />
              <path 
                d="M0,120 Q75,70 150,120 T300,120" 
                fill="none" 
                stroke={themeData?.secondaryColor} 
                strokeWidth="1.5" 
                opacity="0.2"
              />
            </svg>
          </div>

          {/* Elegant swirls */}
          <div className="absolute bottom-20 right-20 opacity-5 swirl-animation">
            <svg width="150" height="150" viewBox="0 0 150 150">
              <path 
                d="M75,25 Q125,75 75,125 Q25,75 75,25" 
                fill="none" 
                stroke={themeData?.primaryColor} 
                strokeWidth="2" 
                opacity="0.4"
              />
              <circle cx="75" cy="75" r="3" fill={themeData?.secondaryColor} opacity="0.6" />
            </svg>
          </div>
        </div>

        {/* Enhanced Floating Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Salon mirror elements */}
          <div 
            className="absolute top-24 right-24 w-20 h-20 rounded-full border-2 opacity-8 floating-element mirror-glow"
            style={{ 
              borderColor: `${themeData?.primaryColor}40`,
              animationDelay: '0s' 
            }}
          >
            <div className="absolute inset-2 rounded-full border border-white opacity-60"></div>
          </div>
          
          {/* Hair styling tools inspired shapes */}
          <div 
            className="absolute top-1/2 left-16 floating-element opacity-6"
            style={{ animationDelay: '1.5s' }}
          >
            <div 
              className="w-1 h-16 rounded-full"
              style={{ backgroundColor: `${themeData?.secondaryColor}60` }}
            />
            <div 
              className="w-6 h-6 rounded-full mt-1 mx-auto"
              style={{ backgroundColor: `${themeData?.primaryColor}40` }}
            />
          </div>

          {/* Elegant makeup brush stroke */}
          <div 
            className="absolute bottom-32 left-32 floating-element opacity-5 brush-stroke"
            style={{ animationDelay: '2s' }}
          >
            <div 
              className="w-24 h-2 rounded-full transform rotate-45"
              style={{ 
                background: `linear-gradient(90deg, ${themeData?.primaryColor}60, transparent)`
              }}
            />
          </div>

          {/* Scattered sparkles for glamour */}
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

          {/* Beauty product inspired cylinders */}
          <div 
            className="absolute bottom-40 right-32 floating-element opacity-6"
            style={{ animationDelay: '3s' }}
          >
            <div 
              className="w-4 h-12 rounded-full"
              style={{ backgroundColor: `${themeData?.secondaryColor}50` }}
            />
            <div 
              className="w-6 h-6 rounded-full -mt-1 mx-auto"
              style={{ backgroundColor: `${themeData?.primaryColor}60` }}
            />
          </div>

          {/* Lipstick inspired accent */}
          <div 
            className="absolute top-1/3 right-20 floating-element opacity-7"
            style={{ animationDelay: '4s' }}
          >
            <div 
              className="w-3 h-8 rounded-full"
              style={{ backgroundColor: `${themeData?.primaryColor}70` }}
            />
            <div 
              className="w-5 h-3 rounded-full -mt-1 mx-auto"
              style={{ backgroundColor: `${themeData?.secondaryColor}50` }}
            />
          </div>

          {/* Nail polish drop shapes */}
          <div 
            className="absolute top-1/4 left-1/2 nail-drop opacity-6"
            style={{ animationDelay: '2.5s' }}
          >
            <div 
              className="w-3 h-4 rounded-full"
              style={{ 
                backgroundColor: `${themeData?.primaryColor}60`,
                borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%'
              }}
            />
          </div>

          {/* Center accent dots with glow */}
          <div 
            className="absolute top-1/2 left-1/4 w-3 h-3 rounded-full glow-pulse"
            style={{ backgroundColor: `${themeData?.secondaryColor}60` }}
          />
          <div 
            className="absolute top-1/3 right-1/4 w-2 h-2 rounded-full glow-pulse"
            style={{ 
              backgroundColor: `${themeData?.primaryColor}60`,
              animationDelay: '2s' 
            }}
          />
        </div>

        <div className="relative z-10 min-h-screen flex items-center">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              
              {/* Content Section */}
              <div className="relative lg:pr-8">
                
                {/* Title Section */}
                <div className="mb-6">
                  <div 
                    className={`transition-all duration-1000 ${
                      titleVisible ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <h1 
                      ref={titleRef}
                      className={`hero-title fade-in-animation transition-transform duration-1000 ${
                        titleVisible ? 'translate-y-0' : 'translate-y-8'
                      }`}
                      style={{ animationDelay: '0.2s' }}
                    >
                      {title}
                    </h1>
                  </div>
                  
                  {/* Minimal accent line */}
                  <div className="relative mt-6">
                    <div 
                      className={`h-1 rounded-full transition-all duration-1000 delay-500 ${
                        titleVisible ? 'w-16' : 'w-0'
                      }`}
                      style={{
                        background: `linear-gradient(90deg, ${themeData?.primaryColor}, ${themeData?.secondaryColor})`
                      }}
                    />
                  </div>
                </div>

                {/* Subtitle */}
                {subtitle && (
                  <div className="mb-8">
                    <h2 
                      ref={subtitleRef}
                      className={`hero-subtitle fade-in-animation transition-all duration-1000 delay-700 ${
                        subtitleVisible 
                          ? 'opacity-100 translate-x-0' 
                          : 'opacity-0 -translate-x-4'
                      }`}
                      style={{ animationDelay: '0.4s' }}
                    >
                      {subtitle}
                    </h2>
                  </div>
                )}

                {/* Description */}
                <div className="mb-10">
                  <p 
                    className={`text-gray-600 text-lg leading-relaxed max-w-lg fade-in-animation transition-all duration-1000 delay-900 ${
                      subtitleVisible 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-4'
                    }`}
                    style={{ animationDelay: '0.6s' }}
                  >
                    {description}
                  </p>
                </div>

                {/* CTA Button */}
                {ctaButton && (
                  <div 
                    ref={ctaRef}
                    className={`scale-in-animation transition-all duration-1000 delay-1100 ${
                      ctaVisible 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-4'
                    }`}
                    style={{ animationDelay: '0.8s' }}
                  >
                    <a href={ctaButton.href} className="minimal-cta-button group">
                      <span>{ctaButton.label}</span>
                      <svg 
                        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" 
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

              {/* Image Section */}
              <div className="relative">
                <div 
                  className={`scale-in-animation ${
                    isLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ animationDelay: '1s' }}
                >
                  <div className="image-container">
                    <div className="relative h-[500px] bg-gray-50">
                      {backgroundImage ? (
                        <Image
                          src={backgroundImage}
                          alt="Hero image"
                          fill
                          className="object-cover transition-transform duration-700 hover:scale-105"
                          priority
                          quality={95}
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      ) : (
                        <div 
                          className="absolute inset-0 flex items-center justify-center text-gray-400 text-6xl"
                          style={{
                            background: `linear-gradient(135deg, ${themeData?.primaryColor}10, ${themeData?.secondaryColor}10)`
                          }}
                        >
                          ✨
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Floating accent elements around image */}
                <div 
                  className="absolute -top-6 -right-6 w-12 h-12 decorative-circle opacity-20 floating-element"
                  style={{ animationDelay: '1s' }}
                />
                <div 
                  className="absolute -bottom-4 -left-4 w-8 h-8 decorative-circle opacity-25 floating-element"
                  style={{ animationDelay: '3s' }}
                />
                
                {/* Subtle shadow elements */}
                <div 
                  className="absolute -inset-6 rounded-3xl opacity-5 blur-xl"
                  style={{
                    background: `linear-gradient(135deg, ${themeData?.primaryColor}, ${themeData?.secondaryColor})`
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}