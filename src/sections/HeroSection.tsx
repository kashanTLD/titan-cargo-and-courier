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
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation<HTMLHeadingElement>({ threshold: 0.3 });
  const { ref: subtitleRef, isVisible: subtitleVisible } = useScrollAnimation<HTMLHeadingElement>({ threshold: 0.3 });
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 });

  useEffect(() => {
    setIsLoaded(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30
      });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
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
      line-height: 0.9;
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

    .organic-button {
      display: inline-flex;
      align-items: center;
      gap: 1rem;
      padding: 1.25rem 3rem;
      font-size: 1rem;
      font-weight: 500;
      text-decoration: none;
      color: white;
      background: transparent;
      border: 2px solid;
      border-image: linear-gradient(135deg, var(--theme-primary-color), var(--theme-secondary-color)) 1;
      border-radius: 50px;
      position: relative;
      overflow: hidden;
      transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
      backdrop-filter: blur(10px);
    }

    .organic-button::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, var(--theme-primary-color), var(--theme-secondary-color));
      opacity: 0;
      transition: opacity 0.6s ease;
      border-radius: 50px;
    }

    .organic-button:hover::before {
      opacity: 1;
    }

    .organic-button:hover {
      transform: translateY(-3px);
      box-shadow: 0 15px 35px rgba(var(--theme-primary-rgb), 0.3);
      border-color: transparent;
    }

    .organic-button > * {
      position: relative;
      z-index: 1;
      transition: color 0.3s ease;
    }

    .organic-button:hover > * {
      color: white;
    }

    .organic-button .button-text {
      color: var(--theme-primary-color);
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
      <section className="relative overflow-hidden min-h-screen bg-white">
        
        {/* Royal Background with Parallax */}
        <div className="absolute inset-0 split-content">
          {/* Organic floating shapes */}
          <div 
            className="absolute top-20 right-1/4 w-96 h-96 organic-shape opacity-5"
            style={{
              background: `radial-gradient(circle, ${themeData?.primaryColor}20, transparent 70%)`,
              transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px) translateY(${scrollY * 0.1}px)`
            }}
          />
          
          <div 
            className="absolute bottom-32 left-1/3 w-64 h-64 organic-shape opacity-4"
            style={{
              background: `radial-gradient(ellipse, ${themeData?.secondaryColor}25, transparent 60%)`,
              transform: `translate(${-mousePosition.x * 0.2}px, ${-mousePosition.y * 0.2}px) translateY(${scrollY * 0.05}px)`,
              animationDelay: '2s'
            }}
          />

          {/* 3D Geometric Elements */}
          <div 
            className="absolute top-1/3 left-1/4 parallax-element"
            style={{ transform: `translateY(${scrollY * 0.2}px) translateX(${mousePosition.x * 0.1}px)` }}
          >
            <div className="geometric-3d opacity-8">
              <svg width="120" height="120" viewBox="0 0 120 120">
                <defs>
                  <linearGradient id="geometric1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: themeData?.primaryColor, stopOpacity: 0.3 }} />
                    <stop offset="100%" style={{ stopColor: themeData?.secondaryColor, stopOpacity: 0.1 }} />
                  </linearGradient>
                </defs>
                <polygon 
                  points="60,10 100,45 85,90 35,90 20,45" 
                  fill="url(#geometric1)" 
                  stroke={themeData?.primaryColor} 
                  strokeWidth="1" 
                  opacity="0.6"
                />
                <circle cx="60" cy="50" r="15" fill="none" stroke={themeData?.secondaryColor} strokeWidth="1" opacity="0.4" />
              </svg>
            </div>
          </div>

          <div 
            className="absolute bottom-1/4 right-1/3 parallax-element"
            style={{ transform: `translateY(${scrollY * -0.15}px) translateX(${-mousePosition.x * 0.15}px)` }}
          >
            <div className="depth-layer opacity-6">
              <svg width="80" height="80" viewBox="0 0 80 80">
                <rect 
                  x="20" y="20" width="40" height="40" 
                  fill="none" 
                  stroke={themeData?.primaryColor} 
                  strokeWidth="2" 
                  opacity="0.5"
                  transform="rotate(45 40 40)"
                />
                <circle cx="40" cy="40" r="25" fill="none" stroke={themeData?.secondaryColor} strokeWidth="1" opacity="0.3" />
              </svg>
            </div>
          </div>

          {/* Elegant floating accents */}
          <div 
            className="absolute top-1/2 left-12 w-3 h-20 royal-accent opacity-30 parallax-element"
            style={{ 
              transform: `translateY(${scrollY * 0.3}px) rotate(${mousePosition.x * 0.1}deg)`,
              borderRadius: '50px'
            }}
          />
          
          <div 
            className="absolute top-1/4 right-16 w-2 h-32 royal-accent opacity-25 parallax-element"
            style={{ 
              transform: `translateY(${scrollY * -0.2}px) rotate(${-mousePosition.y * 0.1}deg)`,
              borderRadius: '50px',
              animationDelay: '1s'
            }}
          />
        </div>

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
                        animationDelay: '0.2s',
                        transform: `translateY(${scrollY * 0.1}px)`
                      }}
                    >
                      {title}
                    </h1>
                  </div>
                  
                  {/* Elegant divider */}
                  <div 
                    className={`h-px transition-all duration-1000 delay-300 ${
                      titleVisible ? 'w-24 opacity-60' : 'w-0 opacity-0'
                    }`}
                    style={{
                      background: `linear-gradient(90deg, ${themeData?.primaryColor}, transparent)`
                    }}
                  />
                </div>

                {/* Subtitle */}
                {subtitle && (
                  <h2 
                    ref={subtitleRef}
                    className={`royal-subtitle transition-all duration-1000 delay-500 ${
                      subtitleVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                    }`}
                    style={{ transform: `translateY(${scrollY * 0.05}px)` }}
                  >
                    {subtitle}
                  </h2>
                )}

                {/* Description */}
                <p 
                  className={`text-gray-700 text-lg leading-relaxed transition-all duration-1000 delay-700 ${
                    subtitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                  }`}
                  style={{ transform: `translateY(${scrollY * 0.03}px)` }}
                >
                  {description}
                </p>

                {/* Organic CTA Button */}
                <div 
                  ref={ctaRef}
                  className={`transition-all duration-1000 delay-900 ${
                    ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                >
                  <a href={ctaButton.href} className="organic-button group">
                    <span className="button-text">{ctaButton.label}</span>
                    <svg 
                      className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-2" 
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
                className="absolute inset-0 w-full h-full parallax-element"
                style={{ transform: `translateY(${scrollY * 0.15}px)` }}
              >
                <div 
                  className={`w-full h-full image-morph transition-all duration-1000 ${
                    isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                  }`}
                >
                  {backgroundImage ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={backgroundImage}
                        alt="Hero primary image"
                        fill
                        className="object-cover"
                        priority
                        quality={95}
                        sizes="(max-width: 1024px) 100vw, 60vw"
                      />
                      <div className="shimmer-overlay" />
                    </div>
                  ) : (
                    <div 
                      className="w-full h-full flex items-center justify-center text-8xl"
                      style={{
                        background: `linear-gradient(135deg, ${themeData?.primaryColor}15, ${themeData?.secondaryColor}15)`
                      }}
                    >
                      ✨
                    </div>
                  )}
                </div>
              </div>

              {/* Secondary Image - Floating */}
              <div 
                className="absolute bottom-16 left-8 w-64 h-80 parallax-element"
                style={{ 
                  transform: `translateY(${scrollY * -0.1}px) translateX(${mousePosition.x * 0.05}px)` 
                }}
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
                          background: `linear-gradient(135deg, ${themeData?.primaryColor}20, transparent 60%)`
                        }}
                      />
                    </div>
                  ) : (
                    <div 
                      className="w-full h-full flex items-center justify-center text-4xl rounded-full"
                      style={{
                        background: `linear-gradient(135deg, ${themeData?.secondaryColor}20, ${themeData?.primaryColor}10)`
                      }}
                    >
                      💎
                    </div>
                  )}
                </div>
              </div>

              {/* Floating 3D accent */}
              <div 
                className="absolute top-20 right-12 w-20 h-20 opacity-30 parallax-element"
                style={{ 
                  transform: `translateY(${scrollY * 0.25}px) rotate(${mousePosition.x * 0.2}deg)` 
                }}
              >
                <div 
                  className="w-full h-full depth-layer rounded-full border-2"
                  style={{ 
                    borderColor: `${themeData?.primaryColor}40`,
                    background: `radial-gradient(circle, ${themeData?.secondaryColor}10, transparent 70%)`
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