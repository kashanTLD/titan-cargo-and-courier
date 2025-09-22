'use client';

import Image from 'next/image';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useEffect, useState, useRef } from 'react';

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

export default function HeroSection({ 
  title, 
  subtitle, 
  description, 
  ctaButton, 
  backgroundImage, 
  themeData 
}: HeroSectionProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation<HTMLHeadingElement>({ threshold: 0.3 });
  const { ref: subtitleRef, isVisible: subtitleVisible } = useScrollAnimation<HTMLHeadingElement>({ threshold: 0.3 });
  const { ref: descRef, isVisible: descVisible } = useScrollAnimation<HTMLParagraphElement>({ threshold: 0.3 });
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 });
  const { ref: imageRef, isVisible: imageVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 });

  // Get hero-image-2 from the same data structure
  const secondaryImage = backgroundImage?.replace('hero-image-1', 'hero-image-2');

  useEffect(() => {
    setIsLoaded(true);
    
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrollPercentage = 1 - (rect.top / window.innerHeight);
        if (scrollPercentage >= 0 && scrollPercentage <= 1.5) {
          setScrollY(scrollPercentage);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

  return (
    <>
      <style jsx global>{`
        @keyframes floatY {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        
        @keyframes floatX {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-8px); }
        }
        
        @keyframes rotateSlowly {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        @keyframes borderPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(var(--theme-primary-rgb), 0.4); }
          50% { box-shadow: 0 0 0 8px rgba(var(--theme-primary-rgb), 0); }
        }
        
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        .royal-title {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.02em;
          background: linear-gradient(135deg, var(--theme-primary-color), var(--theme-secondary-color));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
        }
        
        .royal-subtitle {
          font-family: 'Montserrat', sans-serif;
          font-weight: 300;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }
        
        .royal-description {
          font-family: 'Montserrat', sans-serif;
          line-height: 1.8;
        }
        
        .royal-cta {
          font-family: 'Montserrat', sans-serif;
          font-weight: 500;
          letter-spacing: 0.05em;
          position: relative;
          overflow: hidden;
        }
        
        .royal-cta::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background: var(--theme-primary-color);
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
        }
        
        .royal-cta:hover::before {
          transform: scaleX(1);
          transform-origin: left;
        }
        
        .image-frame {
          position: relative;
          overflow: hidden;
          transition: transform 0.7s cubic-bezier(0.19, 1, 0.22, 1);
        }
        
        .image-frame::after {
          content: '';
          position: absolute;
          inset: 0;
          border: 1px solid rgba(var(--theme-primary-rgb), 0.1);
          z-index: 2;
        }
        
        .image-frame:hover {
          transform: scale(1.02);
        }
        
        .shimmer-line {
          position: relative;
          height: 1px;
          background: linear-gradient(90deg, 
            transparent, 
            rgba(var(--theme-primary-rgb), 0.5), 
            transparent
          );
          background-size: 200% 100%;
          animation: shimmer 3s infinite linear;
        }
        
        .floating-element {
          will-change: transform;
          transition: transform 0.8s cubic-bezier(0.19, 1, 0.22, 1);
        }
        
        .abstract-shape {
          position: absolute;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--theme-primary-color), var(--theme-secondary-color));
          opacity: 0.1;
          filter: blur(40px);
        }
        
        .abstract-circle {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(var(--theme-primary-rgb), 0.15);
        }
        
        .abstract-arc {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(var(--theme-primary-rgb), 0.15);
          border-bottom: none;
          border-left: none;
        }
        
        .animated-fade {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeIn 0.8s forwards;
        }
      `}</style>

      <section ref={sectionRef} className="relative overflow-hidden min-h-screen bg-[#FCFAF7]">
        {/* Abstract background elements */}
        <div className="absolute inset-0 pointer-events-none opacity-70">
          {/* Large gradient blob */}
          <div 
            className="abstract-shape" 
            style={{
              width: '30vw',
              height: '30vw',
              top: '15%',
              right: '-5%',
              transform: `translate(${scrollY * 20}px, ${scrollY * -20}px)`
            }}
          />
          
          {/* Small gradient blob */}
          <div 
            className="abstract-shape" 
            style={{
              width: '20vw',
              height: '20vw',
              bottom: '10%',
              left: '-5%',
              transform: `translate(${scrollY * -15}px, ${scrollY * 15}px)`
            }}
          />
          
          {/* Geometric elements */}
          <div 
            className="abstract-circle" 
            style={{
              width: '40vh',
              height: '40vh',
              top: '30%',
              left: '50%',
              transform: `translate(-50%, -50%) rotate(${scrollY * 30}deg)`
            }}
          />
          
          <div 
            className="abstract-arc" 
            style={{
              width: '60vh',
              height: '60vh',
              bottom: '0%',
              right: '30%',
              transform: `rotate(${45 + scrollY * 10}deg)`
            }}
          />
          
          {/* Accent lines */}
          <div 
            className="absolute w-[1px] h-[30vh] bg-[rgba(var(--theme-primary-rgb),0.07)]"
            style={{
              top: '15%',
              left: '15%',
              transform: `translateY(${scrollY * 30}px) rotate(15deg)`
            }}
          />
          
          <div 
            className="absolute w-[1px] h-[20vh] bg-[rgba(var(--theme-secondary-rgb),0.05)]"
            style={{
              top: '40%',
              right: '20%',
              transform: `translateY(${scrollY * 40}px) rotate(-10deg)`
            }}
          />
        </div>

        <div className="relative z-10 container mx-auto px-6 lg:px-8 h-screen flex items-center">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Content Section */}
            <div className="relative order-2 lg:order-1">
              {/* Royal embellishment */}
              <div 
                className="absolute -top-8 -left-8 w-16 h-16 opacity-20"
                style={{ 
                  transform: `translate(${scrollY * 20}px, ${scrollY * -20}px)`,
                }}
              >
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="45" stroke={themeData?.primaryColor} strokeWidth="1" />
                  <path d="M50 5 L50 95" stroke={themeData?.primaryColor} strokeWidth="0.5" opacity="0.6" />
                  <path d="M5 50 L95 50" stroke={themeData?.primaryColor} strokeWidth="0.5" opacity="0.6" />
                  <circle cx="50" cy="50" r="10" stroke={themeData?.secondaryColor} strokeWidth="0.5" fill="none" />
                </svg>
              </div>
              
              {/* Title */}
              <div className="mb-6">
                <h1 
                  ref={titleRef}
                  className={`royal-title text-4xl sm:text-5xl lg:text-6xl transition-all duration-1000 ease-out ${
                    titleVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-8'
                  }`}
                >
                  {title}
                </h1>
                
                <div 
                  className={`shimmer-line w-24 mt-6 transition-all duration-1000 ease-out delay-300 ${
                    titleVisible ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </div>
              
              {/* Subtitle */}
              <div className="mb-8">
                <h2 
                  ref={subtitleRef}
                  className={`royal-subtitle text-sm sm:text-base text-[rgba(var(--theme-secondary-rgb),0.9)] transition-all duration-700 ease-out delay-300 ${
                    subtitleVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-6'
                  }`}
                >
                  {subtitle}
                </h2>
              </div>
              
              {/* Description */}
              <div className="mb-10">
                <p 
                  ref={descRef}
                  className={`royal-description text-gray-600 transition-all duration-700 ease-out delay-500 ${
                    descVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'
                  }`}
                >
                  {description}
                </p>
              </div>
              
              {/* CTA Button */}
              <div 
                ref={ctaRef}
                className={`transition-all duration-700 ease-out delay-700 ${
                  ctaVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'
                }`}
              >
                <a 
                  href={ctaButton.href} 
                  className="royal-cta inline-flex items-center group py-3 px-1 text-[var(--theme-primary-color)]"
                >
                  <span className="mr-2">{ctaButton.label}</span>
                  <svg 
                    className="w-5 h-5 transition-transform duration-300 ease-out group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
              
              {/* Abstract beauty elements */}
              <div 
                className="absolute -bottom-12 -right-8 w-24 h-24 opacity-15"
                style={{ 
                  transform: `translate(${scrollY * -15}px, ${scrollY * 15}px)`,
                }}
              >
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path 
                    d="M20,50 Q50,20 80,50 Q50,80 20,50" 
                    stroke={themeData?.secondaryColor} 
                    strokeWidth="0.5" 
                    fill="none" 
                  />
                  <path 
                    d="M30,50 Q50,30 70,50 Q50,70 30,50" 
                    stroke={themeData?.primaryColor} 
                    strokeWidth="0.5" 
                    fill="none" 
                  />
                  <circle cx="50" cy="50" r="5" fill={themeData?.primaryColor} opacity="0.2" />
                </svg>
              </div>
            </div>
            
            {/* Images Section */}
            <div 
              ref={imageRef}
              className={`relative order-1 lg:order-2 min-h-[60vh] transition-all duration-1000 ease-out ${
                imageVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-8'
              }`}
            >
              {/* Main Image */}
              <div 
                className="image-frame rounded-2xl overflow-hidden aspect-[3/4] shadow-[0_20px_80px_-20px_rgba(var(--theme-primary-rgb),0.25)]"
                style={{ 
                  transform: `translateY(${scrollY * -30}px)`
                }}
              >
                {backgroundImage ? (
                  <Image
                    src={backgroundImage}
                    alt={title}
                    fill
                    className="object-cover object-center"
                    priority
                    quality={95}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-[rgba(var(--theme-primary-rgb),0.05)] flex items-center justify-center">
                    <span className="text-[rgba(var(--theme-primary-rgb),0.2)] text-6xl">✨</span>
                  </div>
                )}
                
                {/* Gold accent frame */}
                <div className="absolute inset-0 border border-[rgba(var(--theme-primary-rgb),0.15)]" />
              </div>
              
              {/* Secondary Image */}
              <div 
                className="image-frame absolute top-[15%] -right-[15%] rounded-2xl overflow-hidden aspect-square w-[60%] shadow-[0_20px_50px_-10px_rgba(var(--theme-secondary-rgb),0.25)]"
                style={{ 
                  transform: `translateY(${scrollY * -50}px) rotate(${5 + scrollY * 2}deg)`,
                  zIndex: -1
                }}
              >
                {secondaryImage ? (
                  <Image
                    src={secondaryImage}
                    alt={`${title} detail`}
                    fill
                    className="object-cover object-center"
                    quality={90}
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-[rgba(var(--theme-secondary-rgb),0.07)] flex items-center justify-center">
                    <span className="text-[rgba(var(--theme-secondary-rgb),0.2)] text-4xl">✨</span>
                  </div>
                )}
                
                {/* Gold accent frame */}
                <div className="absolute inset-0 border border-[rgba(var(--theme-secondary-rgb),0.15)]" />
              </div>
              
              {/* Circular accent element */}
              <div 
                className="absolute -bottom-[5%] -left-[10%] w-[40%] aspect-square rounded-full border border-[rgba(var(--theme-primary-rgb),0.15)] flex items-center justify-center"
                style={{ 
                  transform: `translateY(${scrollY * -20}px)`,
                  zIndex: -1
                }}
              >
                <div className="w-[85%] h-[85%] rounded-full border border-[rgba(var(--theme-primary-rgb),0.1)] flex items-center justify-center">
                  <div 
                    className="w-[70%] h-[70%] rounded-full" 
                    style={{
                      background: `radial-gradient(circle, rgba(var(--theme-primary-rgb),0.03) 0%, rgba(var(--theme-secondary-rgb),0.07) 100%)`
                    }}
                  />
                </div>
              </div>
              
              {/* Abstract beauty tool element */}
              <div 
                className="absolute top-[60%] -left-[15%] w-12 h-36"
                style={{ 
                  transform: `translateY(${scrollY * -15}px) rotate(${35 + scrollY * -2}deg)`,
                }}
              >
                <div className="w-[1px] h-full mx-auto bg-[rgba(var(--theme-primary-rgb),0.2)]" />
                <div 
                  className="w-6 h-6 rounded-full mx-auto mt-2" 
                  style={{
                    background: `radial-gradient(circle, rgba(var(--theme-primary-rgb),0.1) 0%, rgba(var(--theme-secondary-rgb),0.05) 100%)`
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Vertical line decorations */}
        <div className="absolute h-[40%] w-[1px] bottom-0 left-[15%] bg-gradient-to-t from-[rgba(var(--theme-primary-rgb),0.07)] to-transparent" />
        <div className="absolute h-[30%] w-[1px] top-[10%] right-[10%] bg-gradient-to-b from-[rgba(var(--theme-secondary-rgb),0.05)] to-transparent" />
      </section>
    </>
  );
}