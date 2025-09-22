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
  const [glowIntensity, setGlowIntensity] = useState(0);
  
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation<HTMLHeadingElement>({ threshold: 0.3 });
  const { ref: subtitleRef, isVisible: subtitleVisible } = useScrollAnimation<HTMLHeadingElement>({ threshold: 0.3 });
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 });

  useEffect(() => {
    setIsLoaded(true);
    const timer = setTimeout(() => setCurtainRevealed(true), 500);
    
    // Glow animation
    const glowTimer = setInterval(() => {
      setGlowIntensity(prev => (prev >= 1 ? 0 : prev + 0.01));
    }, 50);

    return () => {
      clearTimeout(timer);
      clearInterval(glowTimer);
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
    @keyframes float-gentle {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-10px) rotate(2deg); }
    }
    
    @keyframes sparkle {
      0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
      50% { opacity: 1; transform: scale(1) rotate(180deg); }
    }
    
    @keyframes ripple {
      0% { transform: scale(0); opacity: 1; }
      100% { transform: scale(4); opacity: 0; }
    }
    
    @keyframes text-glow {
      0%, 100% { text-shadow: 0 0 5px rgba(var(--theme-primary-rgb), 0.3); }
      50% { text-shadow: 0 0 20px rgba(var(--theme-primary-rgb), 0.6), 0 0 30px rgba(var(--theme-primary-rgb), 0.4); }
    }

    @keyframes gradient-shift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    .luxury-hero-title {
      font-size: clamp(3rem, 8vw, 6rem);
      font-weight: 700;
      line-height: 0.9;
      letter-spacing: -0.02em;
      background: linear-gradient(135deg, ${themeData?.primaryColor}, ${themeData?.secondaryColor}, ${themeData?.primaryColor});
      background-size: 400% 400%;
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: gradient-shift 4s ease-in-out infinite;
      position: relative;
    }

    .luxury-hero-subtitle {
      font-size: clamp(1.25rem, 3vw, 1.5rem);
      font-weight: 300;
      letter-spacing: 0.05em;
      animation: text-glow 3s ease-in-out infinite;
    }

    .luxury-cta-button {
      display: inline-flex;
      align-items: center;
      padding: 1rem 2.5rem;
      font-size: 1.125rem;
      font-weight: 500;
      text-decoration: none;
      color: white;
      border-radius: 50px;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .luxury-cta-button:hover {
      transform: translateY(-2px) scale(1.05);
      box-shadow: 0 20px 40px rgba(var(--theme-primary-rgb), 0.4);
    }

    .luxury-cta-button::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
      transition: left 0.5s;
    }

    .luxury-cta-button:hover::before {
      left: 100%;
    }

    .floating-element {
      animation: float-gentle 4s ease-in-out infinite;
    }

    .sparkle {
      animation: sparkle 2s ease-in-out infinite;
    }

    .ripple-effect {
      animation: ripple 3s ease-out infinite;
    }

    .glass-morphism {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 20px;
    }

    .text-reveal {
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
      animation: reveal 1.5s ease-out forwards;
    }

    @keyframes reveal {
      from { clip-path: polygon(0 0, 0 0, 0 100%, 0% 100%); }
      to { clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%); }
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <section className="relative overflow-hidden min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Dynamic Background Mesh */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(circle at 20% 80%, ${themeData?.primaryColor}40 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, ${themeData?.secondaryColor}40 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, ${themeData?.primaryColor}20 0%, transparent 50%)
            `
          }}
        />

        {/* Animated Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full sparkle"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                opacity: 0.6
              }}
            />
          ))}
        </div>

        {/* Luxury Geometric Patterns */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 1200 800">
            <defs>
              <pattern id="luxuryPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M50 0L100 50L50 100L0 50Z" fill={themeData?.primaryColor} opacity="0.1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#luxuryPattern)"/>
          </svg>
        </div>

        <div className="relative z-10 min-h-screen flex items-center">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              
              {/* Content Section */}
              <div className="relative">
                {/* Decorative Element */}
                <div 
                  className="absolute -top-16 -left-16 w-32 h-32 rounded-full blur-3xl opacity-20"
                  style={{ backgroundColor: themeData?.primaryColor }}
                />

                {/* Title Section */}
                <div className="mb-8">
                  <div 
                    className={`overflow-hidden transition-all duration-1200 ${
                      titleVisible ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <h1 
                      ref={titleRef}
                      className={`luxury-hero-title text-reveal transition-transform duration-1000 ${
                        titleVisible ? 'translate-y-0' : 'translate-y-20'
                      }`}
                    >
                      {title}
                    </h1>
                  </div>
                  
                  {/* Elegant Underline with Animation */}
                  <div className="relative mt-6">
                    <div 
                      className={`h-1 rounded-full transition-all duration-1500 delay-500 ${
                        titleVisible ? 'w-24' : 'w-0'
                      }`}
                      style={{
                        background: `linear-gradient(90deg, ${themeData?.primaryColor}, ${themeData?.secondaryColor})`
                      }}
                    />
                    <div 
                      className={`absolute top-0 left-0 h-1 w-2 rounded-full ripple-effect ${
                        titleVisible ? 'opacity-100' : 'opacity-0'
                      }`}
                      style={{ backgroundColor: themeData?.primaryColor }}
                    />
                  </div>
                </div>

                {/* Subtitle */}
                {subtitle && (
                  <div className="mb-8">
                    <h2 
                      ref={subtitleRef}
                      className={`luxury-hero-subtitle transition-all duration-1000 delay-700 ${
                        subtitleVisible 
                          ? 'opacity-100 translate-x-0' 
                          : 'opacity-0 -translate-x-10'
                      }`}
                      style={{ color: themeData?.primaryColor }}
                    >
                      {subtitle}
                    </h2>
                  </div>
                )}

                {/* Description */}
                <div className="mb-10">
                  <p 
                    className={`text-gray-300 text-lg leading-relaxed max-w-lg transition-all duration-1000 delay-900 ${
                      subtitleVisible 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-8'
                    }`}
                  >
                    {description}
                  </p>
                </div>

                {/* CTA Button */}
                {ctaButton && (
                  <div 
                    ref={ctaRef}
                    className={`transition-all duration-1000 delay-1100 ${
                      ctaVisible 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-10'
                    }`}
                  >
                    <a
                      href={ctaButton.href}
                      className="luxury-cta-button group"
                      style={{
                        background: `linear-gradient(135deg, ${themeData?.primaryColor}, ${themeData?.secondaryColor})`
                      }}
                    >
                      <span className="relative z-10 mr-2">{ctaButton.label}</span>
                      <svg 
                        className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  </div>
                )}

                {/* Floating Accent Elements */}
                <div className="absolute -right-8 top-1/2 floating-element">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ 
                      backgroundColor: themeData?.primaryColor,
                      opacity: 0.6 
                    }}
                  />
                </div>
                <div className="absolute -left-4 bottom-1/4 floating-element" style={{ animationDelay: '2s' }}>
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ 
                      backgroundColor: themeData?.secondaryColor,
                      opacity: 0.4 
                    }}
                  />
                </div>
              </div>

              {/* Image Section */}
              <div className="relative">
                {/* Main Image Container */}
                <div className="relative">
                  {/* Glassmorphism Frame */}
                  <div className="glass-morphism p-1">
                    <div className="relative h-[600px] rounded-2xl overflow-hidden">
                      {/* Curtain Reveal */}
                      <div 
                        className={`absolute inset-0 z-20 transition-all duration-2000 ease-out ${
                          curtainRevealed ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
                        }`}
                      >
                        <div 
                          className="w-full h-full flex items-center justify-center text-white text-xl font-light"
                          style={{
                            background: `linear-gradient(45deg, ${themeData?.primaryColor}, ${themeData?.secondaryColor})`
                          }}
                        >
                          ✨ Unveiling Excellence
                        </div>
                      </div>

                      {/* Background Image */}
                      {backgroundImage ? (
                        <Image
                          src={backgroundImage}
                          alt="Luxury salon experience"
                          fill
                          className="object-cover scale-105 hover:scale-110 transition-transform duration-700"
                          priority
                          quality={95}
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      ) : (
                        <div 
                          className="absolute inset-0"
                          style={{
                            background: `linear-gradient(135deg, ${themeData?.primaryColor}30, ${themeData?.secondaryColor}30)`
                          }}
                        />
                      )}

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />
                    </div>
                  </div>

                  {/* Floating Decorative Elements */}
                  <div 
                    className="absolute -top-8 -right-8 w-20 h-20 rounded-full border-2 flex items-center justify-center floating-element"
                    style={{ 
                      borderColor: `${themeData?.primaryColor}60`,
                      backgroundColor: `${themeData?.primaryColor}10`
                    }}
                  >
                    <div 
                      className="w-8 h-8 rounded-full animate-pulse"
                      style={{ backgroundColor: themeData?.primaryColor }}
                    />
                  </div>

                  <div 
                    className="absolute -bottom-6 -left-6 w-16 h-16 rounded-full border-2 flex items-center justify-center floating-element"
                    style={{ 
                      borderColor: `${themeData?.secondaryColor}60`,
                      backgroundColor: `${themeData?.secondaryColor}10`,
                      animationDelay: '1.5s'
                    }}
                  >
                    <div 
                      className="w-6 h-6 rounded-full animate-pulse"
                      style={{ 
                        backgroundColor: themeData?.secondaryColor,
                        animationDelay: '0.5s'
                      }}
                    />
                  </div>

                  {/* Orbital Rings */}
                  <div 
                    className="absolute -inset-8 border rounded-full animate-spin opacity-20"
                    style={{ 
                      borderColor: themeData?.primaryColor,
                      animationDuration: '20s'
                    }}
                  />
                  <div 
                    className="absolute -inset-12 border rounded-full animate-spin opacity-15"
                    style={{ 
                      borderColor: themeData?.secondaryColor,
                      animationDuration: '30s',
                      animationDirection: 'reverse'
                    }}
                  />
                </div>

                {/* Glow Effect */}
                <div 
                  className="absolute -inset-4 rounded-3xl blur-2xl opacity-20"
                  style={{
                    background: `linear-gradient(135deg, ${themeData?.primaryColor}, ${themeData?.secondaryColor})`,
                    transform: `scale(${1 + glowIntensity * 0.1})`
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg className="w-full h-24" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path 
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
              fill={themeData?.primaryColor}
              fillOpacity="0.15"
            />
            <path 
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
              fill={themeData?.secondaryColor}
              fillOpacity="0.1"
            />
          </svg>
        </div>
      </section>
    </>
  );
}