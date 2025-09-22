"use client";

import Image from "next/image";
import {
  useScrollAnimation,
  useStaggeredAnimation,
} from "@/hooks/useScrollAnimation";
import { useState, useEffect } from "react";

interface AboutSectionProps {
  title: string;
  description: string;
  features: string[];
  ctaButton: {
    href: string;
    label: string;
  };
  image?: string;
  images?: Array<{
    slotName: string;
    imageUrl: string;
    category?: string;
  }>;
  theme?: {
    primaryColor: string;
    secondaryColor: string;
    accentColor?: string;
  };
}

export default function AboutSection({
  title,
  description,
  features,
  ctaButton,
  image,
  images = [],
  theme,
}: AboutSectionProps) {
  const { ref: titleRef, isVisible: titleVisible } =
    useScrollAnimation<HTMLHeadingElement>({ threshold: 0.2 });
  const { ref: descRef, isVisible: descVisible } =
    useScrollAnimation<HTMLParagraphElement>({ threshold: 0.2 });
  const { ref: featuresRef, visibleItems } = useStaggeredAnimation(
    features.length,
    100
  );
  const { ref: imageRef, isVisible: imageVisible } =
    useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });

  // Theme colors with fallbacks
  const primaryColor = theme?.primaryColor || '#000000';
  const secondaryColor = theme?.secondaryColor || '#666666';
  const accentColor = theme?.accentColor || primaryColor;

  // Floating elements animation state
  const [isClient, setIsClient] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    setIsClient(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Get about images from the images array
  const aboutImages = images.filter(img => 
    img.slotName.includes('about') || img.category === 'about'
  );
  return (
    <section
      id="about"
      className="relative min-h-screen overflow-hidden"
      style={{
        background: `linear-gradient(135deg, 
          ${primaryColor}08 0%, 
          ${secondaryColor}12 25%, 
          ${primaryColor}15 50%, 
          ${secondaryColor}10 75%, 
          ${primaryColor}08 100%)`,
        backgroundSize: '400% 400%',
        animation: 'gradient-shift 12s ease infinite'
      }}
    >
      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large floating circles */}
        <div 
          className="absolute w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full blur-2xl animate-float-slow"
          style={{
            left: `${20 + (isClient ? mousePosition.x * 0.01 : 0)}%`,
            top: `${15 + (isClient ? mousePosition.y * 0.005 : 0)}%`,
            background: `radial-gradient(circle, ${primaryColor}25 0%, ${primaryColor}15 30%, transparent 70%)`,
            filter: 'blur(40px)',
            boxShadow: `0 0 60px ${primaryColor}20`
          }}
        ></div>
        <div 
          className="absolute w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full blur-2xl animate-float-reverse"
          style={{
            right: `${15 + (isClient ? mousePosition.x * 0.01 : 0)}%`,
            bottom: `${20 + (isClient ? mousePosition.y * 0.01 : 0)}%`,
            background: `radial-gradient(circle, ${secondaryColor}20 0%, ${secondaryColor}12 30%, transparent 70%)`,
            filter: 'blur(50px)',
            boxShadow: `0 0 50px ${secondaryColor}15`
          }}
        ></div>
        
        {/* Additional gradient overlay circles */}
        <div 
          className="absolute w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full blur-xl animate-float-slow"
          style={{
            left: `${60 + (isClient ? mousePosition.x * 0.005 : 0)}%`,
            top: `${70 + (isClient ? mousePosition.y * 0.008 : 0)}%`,
            background: `radial-gradient(circle, ${accentColor}18 0%, transparent 60%)`,
            filter: 'blur(30px)',
            animationDelay: '2s'
          }}
        ></div>
        
        {/* Small floating dots */}
        {[...Array(12)].map((_, i) => {
          const positions = [
            { left: 10, top: 20 },
            { left: 90, top: 15 },
            { left: 15, top: 80 },
            { left: 85, top: 75 },
            { left: 50, top: 10 },
            { left: 30, top: 90 },
            { left: 70, top: 25 },
            { left: 25, top: 50 },
            { left: 75, top: 45 },
            { left: 40, top: 65 },
            { left: 60, top: 85 },
            { left: 5, top: 60 },
          ];
          const pos = positions[i] || { left: 50, top: 50 };
          
          return (
            <div
              key={i}
              className="absolute w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full animate-pulse"
              style={{
                left: `${pos.left}%`,
                top: `${pos.top}%`,
                animationDelay: `${i * 0.4}s`,
                animationDuration: `${2.5 + (i * 0.2)}s`,
                background: i % 3 === 0 ? `${primaryColor}60` : i % 3 === 1 ? `${secondaryColor}50` : `${accentColor}45`,
                filter: 'blur(0.5px)',
                boxShadow: `0 0 8px ${i % 3 === 0 ? primaryColor : i % 3 === 1 ? secondaryColor : accentColor}30`
              }}
            ></div>
          );
        })}
        
        {/* Gradient mesh overlay */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(ellipse at top left, ${primaryColor}10 0%, transparent 50%), 
                        radial-gradient(ellipse at bottom right, ${secondaryColor}08 0%, transparent 50%)`,
            mixBlendMode: 'multiply'
          }}
        ></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center">
        <div className="container mx-auto p-5 sm:p-10 lg:p-20 xl:px-40">
          {/* Header Section */}
          <div className="text-center mb-16 lg:mb-20">
            <h2
              ref={titleRef}
              className={`text-display-lg sm:text-display-xl md:text-display-xl lg:text-display-xl mb-6 transition-all duration-1000 ${
                titleVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ 
                color: primaryColor,
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
              }}
            >
              {title}
            </h2>
            
            <p
              ref={descRef}
              className={`text-description-lg sm:text-description-xl md:text-description-xl max-w-4xl mx-auto leading-relaxed transition-all duration-1000 delay-200 ${
                descVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ 
                color: secondaryColor,
                textShadow: '0 1px 5px rgba(0, 0, 0, 0.1)'
              }}
            >
              {description}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content Section */}
            <div>
              {features && features.length > 0 && (
                <div ref={featuresRef} className="grid grid-cols-1 gap-6 mb-12">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className={`group relative transition-all duration-1000 ${
                        visibleItems.includes(index)
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 -translate-x-12"
                      }`}
                      style={{ animationDelay: `${index * 0.2}s` }}
                    >
                      {/* Glass morphism card */}
                      <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105">
                        <div className="flex items-start space-x-4">
                          {/* Icon */}
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300"
                            style={{
                              background: `linear-gradient(135deg, ${primaryColor} 0%, ${accentColor} 100%)`,
                              boxShadow: `0 8px 25px ${primaryColor}30`
                            }}
                          >
                            <svg
                              className="w-6 h-6 text-white group-hover:animate-pulse"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          
                          {/* Feature text */}
                          <div className="flex-1">
                            <p 
                              className="text-body-lg font-medium leading-relaxed transition-colors duration-300"
                              style={{ 
                                color: primaryColor,
                                textShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                              }}
                            >
                              {feature}
                            </p>
                          </div>
                        </div>
                        
                        {/* Floating particles effect */}
                        <div 
                          className="absolute -top-1 -right-1 w-3 h-3 rounded-full opacity-60 animate-bounce"
                          style={{
                            background: primaryColor,
                            animationDelay: `${index * 0.5}s`
                          }}
                        />
                        <div 
                          className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full opacity-40 animate-bounce"
                          style={{
                            background: secondaryColor,
                            animationDelay: `${index * 0.7}s`
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {ctaButton && (
                <div className="transition-all duration-1000 delay-600">
                  <a
                    href={ctaButton.href}
                    className="inline-block px-8 py-4 text-label-lg rounded-full transition-all duration-300 hover:scale-105 group relative overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${primaryColor} 0%, ${accentColor} 100%)`,
                      color: '#ffffff',
                      boxShadow: `0 8px 30px ${primaryColor}40`
                    }}
                  >
                    <span className="relative z-10">{ctaButton.label}</span>
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                      style={{ background: 'rgba(255, 255, 255, 0.2)' }}
                    ></div>
                  </a>
                </div>
              )}
            </div>

            {/* Multi-Image Gallery Section */}
            <div
              ref={imageRef}
              className={`relative transition-all duration-1000 delay-500 ${
                imageVisible
                  ? "opacity-100 translate-x-0 scale-100"
                  : "opacity-0 translate-x-8 scale-95"
              }`}
            >
              <div className="relative w-full h-full">
                {/* Dynamic Multi-Image Layout */}
                {aboutImages.length > 0 ? (
                  <div className="relative h-[600px] sm:h-[700px] lg:h-[800px]">
                    {/* Main featured image - large and prominent */}
                    <div className="absolute top-0 left-0 w-2/3 h-2/3 z-10">
                      <div className="relative w-full h-full overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-700 hover:scale-105 group">
                        <Image
                          src={aboutImages[0].imageUrl}
                          alt={`Featured: ${aboutImages[0].slotName}`}
                          width={800}
                          height={600}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                        
                        {/* Floating badge */}
                        <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold"
                             style={{ color: primaryColor }}>
                          Featured
                        </div>
                        
                        {/* Hover overlay with icon */}
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Secondary image - top right */}
                    {aboutImages[1] && (
                      <div className="absolute top-0 right-0 w-1/3 h-1/2 z-20">
                        <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
                          <Image
                            src={aboutImages[1].imageUrl}
                            alt={`Secondary: ${aboutImages[1].slotName}`}
                            width={400}
                            height={300}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent"></div>
                          
                          {/* Small accent dot */}
                          <div className="absolute top-2 right-2 w-3 h-3 rounded-full animate-pulse"
                               style={{ background: secondaryColor }}></div>
                        </div>
                      </div>
                    )}

                    {/* Third image - bottom right */}
                    {aboutImages[2] && (
                      <div className="absolute bottom-0 right-0 w-1/2 h-1/3 z-20">
                        <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
                          <Image
                            src={aboutImages[2].imageUrl}
                            alt={`Third: ${aboutImages[2].slotName}`}
                            width={500}
                            height={300}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-tl from-black/20 to-transparent"></div>
                          
                          {/* Corner accent */}
                          <div className="absolute bottom-2 left-2 w-4 h-4 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full" style={{ background: accentColor }}></div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Fourth image - bottom left */}
                    {aboutImages[3] && (
                      <div className="absolute bottom-0 left-1/3 w-1/3 h-1/2 z-20">
                        <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
                          <Image
                            src={aboutImages[3].imageUrl}
                            alt={`Fourth: ${aboutImages[3].slotName}`}
                            width={400}
                            height={500}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent"></div>
                          
                          {/* Floating icon */}
                          <div className="absolute top-2 left-2 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Additional images as small floating elements */}
                    {aboutImages.slice(4, 6).map((img, index) => (
                      <div key={index + 4} className={`absolute w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-30 ${
                        index === 0 ? 'top-1/4 right-1/4' : 'bottom-1/4 left-1/4'
                      }`}>
                        <Image
                          src={img.imageUrl}
                          alt={`Gallery ${index + 5}`}
                          width={100}
                          height={100}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20"></div>
                        
                        {/* Small pulse dot */}
                        <div className="absolute top-1 right-1 w-2 h-2 rounded-full animate-pulse"
                             style={{ background: index === 0 ? primaryColor : secondaryColor }}></div>
                      </div>
                    ))}

                    {/* Decorative floating elements */}
                    <div className="absolute top-1/2 left-1/4 w-3 h-3 rounded-full animate-bounce"
                         style={{ background: primaryColor, animationDelay: '0.5s' }}></div>
                    <div className="absolute bottom-1/3 right-1/3 w-2 h-2 rounded-full animate-bounce"
                         style={{ background: secondaryColor, animationDelay: '1s' }}></div>
                    <div className="absolute top-1/3 right-1/2 w-2 h-2 rounded-full animate-bounce"
                         style={{ background: accentColor, animationDelay: '1.5s' }}></div>
                  </div>
                ) : image ? (
                  <div className="relative h-[600px] sm:h-[700px] lg:h-[800px]">
                    {/* Single image with enhanced styling */}
                    <div className="absolute inset-0 overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 group">
                    <Image
                      src={image}
                      alt="About us"
                        width={800}
                      height={600}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                    />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                      
                      {/* Enhanced overlay elements */}
                      <div className="absolute top-4 left-4 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold"
                           style={{ color: primaryColor }}>
                        Our Story
                      </div>
                      
                      <div className="absolute bottom-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative h-[600px] sm:h-[700px] lg:h-[800px]">
                    {/* Enhanced placeholder with multiple visual elements */}
                    <div className="absolute inset-0 rounded-3xl overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
                         }}>
                      
                      {/* Multiple floating cards */}
                      <div className="absolute top-8 left-8 w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center animate-bounce"
                           style={{ animationDuration: "3s", animationDelay: "0s" }}>
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>

                      <div className="absolute top-8 right-8 w-16 h-16 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center animate-pulse"
                           style={{ animationDuration: "2s" }}>
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>

                      <div className="absolute bottom-8 left-8 w-14 h-14 bg-white/25 backdrop-blur-sm rounded-lg flex items-center justify-center animate-bounce"
                           style={{ animationDuration: "2.5s", animationDelay: "0.5s" }}>
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>

                      <div className="absolute bottom-8 right-8 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center animate-pulse"
                           style={{ animationDuration: "1.8s", animationDelay: "1s" }}>
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>

                      {/* Central content */}
                      <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                          <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 hover:scale-110 transition-transform duration-300">
                            <svg className="w-12 h-12 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                          <h3 className="text-xl font-semibold mb-2">Modern Solutions</h3>
                          <p className="text-white/80 text-sm max-w-xs">Innovative approaches to every challenge</p>
                        </div>
                      </div>

                      {/* Floating decorative dots */}
                      <div className="absolute top-1/4 left-1/4 w-3 h-3 rounded-full bg-white/30 animate-bounce"
                           style={{ animationDelay: '0.3s' }}></div>
                      <div className="absolute top-3/4 right-1/4 w-2 h-2 rounded-full bg-white/40 animate-bounce"
                           style={{ animationDelay: '0.8s' }}></div>
                      <div className="absolute bottom-1/4 left-1/3 w-2 h-2 rounded-full bg-white/35 animate-bounce"
                           style={{ animationDelay: '1.2s' }}></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
