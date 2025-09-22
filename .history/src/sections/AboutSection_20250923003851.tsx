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
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  const { ref: titleRef, isVisible: titleVisible } =
    useScrollAnimation<HTMLHeadingElement>({ threshold: 0.2 });
  const { ref: descRef, isVisible: descVisible } =
    useScrollAnimation<HTMLParagraphElement>({ threshold: 0.2 });
  const { ref: featuresRef, visibleItems } = useStaggeredAnimation(
    features.length,
    150
  );
  const { ref: imageRef, isVisible: imageVisible } =
    useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });

  useEffect(() => {
    setIsLoaded(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 25,
        y: (e.clientY / window.innerHeight - 0.5) * 25,
      });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Theme colors with fallbacks
  const primaryColor = theme?.primaryColor || "#000000";
  const secondaryColor = theme?.secondaryColor || "#666666";
  const accentColor = theme?.accentColor || primaryColor;

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(
          result[3],
          16
        )}`
      : "0, 0, 0";
  };

  // Get about images from the images array
  const aboutImages = images.filter(
    (img) => img.slotName.includes("about") || img.category === "about"
  );

  const styles = `
    @keyframes royal-float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      33% { transform: translateY(-8px) rotate(1deg); }
      66% { transform: translateY(-4px) rotate(-1deg); }
    }

    @keyframes fade-slide-up {
      from { opacity: 0; transform: translateY(40px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes geometric-spin {
      0% { transform: rotateX(0deg) rotateY(0deg); }
      100% { transform: rotateX(360deg) rotateY(360deg); }
    }

    @keyframes organic-pulse {
      0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.4; }
      50% { transform: scale(1.2) rotate(180deg); opacity: 0.8; }
    }

    @keyframes shimmer-flow {
      0% { transform: translateX(-100%) rotate(-45deg); }
      100% { transform: translateX(300%) rotate(-45deg); }
    }

    @keyframes depth-float {
      0%, 100% { transform: translateZ(0px) rotateX(0deg) rotateY(0deg); filter: blur(0px); }
      50% { transform: translateZ(20px) rotateX(5deg) rotateY(10deg); filter: blur(0.5px); }
    }

    .royal-about-title {
      font-size: clamp(2.5rem, 6vw, 4rem);
      font-weight: 300;
      line-height: 1;
      letter-spacing: -0.03em;
      color: #1a1a1a;
      font-family: 'serif', Georgia, 'Times New Roman', serif;
    }

    .royal-about-description {
      font-size: clamp(1rem, 2vw, 1.25rem);
      font-weight: 400;
      color: #6b7280;
    }

    .split-content {
      background: linear-gradient(135deg,
        rgba(var(--theme-primary-rgb), 0.02) 0%,
        rgba(var(--theme-secondary-rgb), 0.02) 100%);
      backdrop-filter: blur(20px);
    }

    .shimmer-overlay {
      position: absolute; inset: 0;
      background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%);
      transform: translateX(-100%) rotate(-45deg);
      animation: shimmer-flow 3s ease-in-out infinite; animation-delay: 1.5s;
    }

    .organic-shape {
      border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
      animation: organic-pulse 8s ease-in-out infinite;
    }

    .parallax-element { will-change: transform; }

    .depth-layer { animation: depth-float 6s ease-in-out infinite; }

    .fade-slide-animation { animation: fade-slide-up 0.9s ease-out forwards; }

    .royal-feature-card {
      background: white;
      border: 1px solid rgba(0,0,0,0.06);
      border-radius: 20px;
      padding: 1.5rem;
      position: relative;
      overflow: hidden;
      box-shadow: 0 6px 24px rgba(0,0,0,0.05);
      transition: transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;
    }

    .royal-feature-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 16px 48px rgba(var(--theme-primary-rgb), 0.15);
      border-color: rgba(var(--theme-primary-rgb), 0.15);
    }

    .royal-feature-icon {
      width: 56px; height: 56px; border-radius: 14px;
      display: flex; align-items: center; justify-content: center;
      background: linear-gradient(135deg, var(--theme-primary-color), var(--theme-secondary-color));
      box-shadow: 0 8px 24px rgba(var(--theme-primary-rgb), 0.2);
    }

    .royal-image-container {
      position: relative; overflow: hidden; border-radius: 24px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.12);
      transition: transform 0.6s ease, box-shadow 0.6s ease;
    }

    .royal-image-container:hover { transform: scale(1.03); box-shadow: 0 18px 60px rgba(0,0,0,0.18); }

    .royal-image-primary { clip-path: polygon(0 0, 85% 0, 100% 100%, 0 85%); }
    .royal-image-secondary { clip-path: circle(70% at 70% 30%); }

    .royal-cta-button {
      display: inline-flex; align-items: center; gap: 0.75rem;
      padding: 1rem 2.25rem; font-size: 1rem; font-weight: 500; text-decoration: none;
      color: white; background: transparent; border: 2px solid;
      border-image: linear-gradient(135deg, var(--theme-primary-color), var(--theme-secondary-color)) 1;
      border-radius: 50px; position: relative; overflow: hidden;
      transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1); backdrop-filter: blur(10px);
    }

    .royal-cta-button::before { content: ''; position: absolute; inset: 0;
      background: linear-gradient(135deg, var(--theme-primary-color), var(--theme-secondary-color));
      opacity: 0; transition: opacity 0.6s ease; border-radius: 50px; }
    .royal-cta-button:hover::before { opacity: 1; }
    .royal-cta-button > * { position: relative; z-index: 1; transition: color 0.3s ease; }
    .royal-cta-button:hover { transform: translateY(-3px); box-shadow: 0 15px 35px rgba(var(--theme-primary-rgb), 0.3); border-color: transparent; }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <section
        id="about"
        className="relative overflow-hidden py-24 bg-white"
        style={
          {
            "--theme-primary-color": primaryColor,
            "--theme-secondary-color": secondaryColor,
            "--theme-primary-rgb": hexToRgb(primaryColor),
            "--theme-secondary-rgb": hexToRgb(secondaryColor),
          } as React.CSSProperties
        }
      >
        {/* Royal Background with Parallax - aligned to hero/service highlights */}
        <div className="absolute inset-0 split-content">
          {/* Organic floating shapes */}
          <div 
            className="absolute top-24 right-1/5 w-96 h-96 organic-shape opacity-5"
            style={{
              background: `radial-gradient(circle, ${primaryColor}20, transparent 70%)`,
              transform: `translate(${mousePosition.x * 0.25}px, ${mousePosition.y * 0.25}px) translateY(${scrollY * 0.08}px)`
            }}
          />
          <div 
            className="absolute bottom-24 left-1/4 w-72 h-72 organic-shape opacity-4"
            style={{
              background: `radial-gradient(ellipse, ${secondaryColor}22, transparent 60%)`,
              transform: `translate(${-mousePosition.x * 0.18}px, ${-mousePosition.y * 0.18}px) translateY(${scrollY * 0.05}px)`,
              animationDelay: '1.5s'
            }}
          />

          {/* 3D Geometric elements */}
          <div 
            className="absolute top-1/3 left-1/6 parallax-element"
            style={{ transform: `translateY(${scrollY * 0.15}px) translateX(${mousePosition.x * 0.08}px)` }}
          >
            <div className="geometric-3d opacity-7">
              <svg width="110" height="110" viewBox="0 0 110 110">
                <defs>
                  <linearGradient id="aboutGeom1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: primaryColor, stopOpacity: 0.35 }} />
                    <stop offset="100%" style={{ stopColor: secondaryColor, stopOpacity: 0.15 }} />
                  </linearGradient>
                </defs>
                <polygon points="55,8 95,40 80,95 30,95 15,40" fill="url(#aboutGeom1)" stroke={primaryColor} strokeWidth="1" opacity="0.5" />
                <circle cx="55" cy="48" r="14" fill="none" stroke={secondaryColor} strokeWidth="1" opacity="0.4" />
              </svg>
            </div>
          </div>

          {/* Elegant floating accents */}
          <div 
            className="absolute top-1/2 left-10 w-3 h-24 royal-accent opacity-25 parallax-element"
            style={{ 
              transform: `translateY(${scrollY * 0.25}px) rotate(${mousePosition.x * 0.1}deg)`,
              borderRadius: '50px'
            }}
          />
          <div 
            className="absolute top-1/4 right-14 w-2 h-28 royal-accent opacity-20 parallax-element"
            style={{ 
              transform: `translateY(${scrollY * -0.18}px) rotate(${-mousePosition.y * 0.1}deg)`,
              borderRadius: '50px',
              animationDelay: '1s'
            }}
          />
        </div>

        <div className="relative z-10 min-h-screen flex items-center">
          <div className="container mx-auto px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-20 space-y-8">
              {/* Floating Icon */}
              <div
                className={`inline-block transition-all duration-1200 ${
                  isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-90"
                }`}
              >
                <div
                  className="w-18 h-18 rounded-full flex items-center justify-center mx-auto floating-element"
                  style={{
                    background: `linear-gradient(135deg, ${primaryColor}08, ${secondaryColor}08)`,
                    border: `1px solid ${primaryColor}15`,
                  }}
                >
                  <svg
                    className="w-8 h-8"
                    style={{ color: primaryColor }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
              </div>

              {/* Title */}
              <h2
                ref={titleRef}
                className={`royal-about-title fade-slide-animation mb-6 transition-all duration-1200 ${
                  titleVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
                style={{
                  animationDelay: "0.2s",
                  transform: `translateY(${scrollY * 0.05}px)`,
                }}
              >
                {title}
              </h2>

              {/* Divider */}
              <div className="flex items-center justify-center mt-6">
                <div
                  className={`h-px transition-all duration-1000 delay-500 ${
                    titleVisible ? "w-32 opacity-40" : "w-0 opacity-0"
                  }`}
                  style={{
                    background: `linear-gradient(90deg, transparent, ${primaryColor}, ${secondaryColor}, transparent)`,
                  }}
                />
              </div>

              {/* Description */}
              <p
                ref={descRef}
                className={`royal-about-description fade-slide-animation max-w-3xl mx-auto transition-all duration-1200 delay-400 ${
                  descVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  animationDelay: "0.4s",
                  transform: `translateY(${scrollY * 0.03}px)`,
                }}
              >
                {description}
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-20 items-center">
              {/* Features */}
              <div>
                {features && features.length > 0 && (
                  <div ref={featuresRef} className="space-y-6 mb-12">
                    {features.map((feature, index) => (
                      <div
                        key={index}
                        className={`feature-reveal-animation transition-all duration-1000 ${
                          visibleItems.includes(index)
                            ? "opacity-100 translate-x-0"
                            : "opacity-0 -translate-x-12"
                        }`}
                        style={{ animationDelay: `${0.6 + index * 0.2}s` }}
                      >
                        <div className="royal-feature-card group">
                          <div className="shimmer-overlay" />
                          <div className="flex items-start space-x-6">
                            <div className="royal-feature-icon flex-shrink-0">
                              <svg
                                className="w-7 h-7 text-white"
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
                            <div className="flex-1">
                              <p
                                className="text-lg font-medium leading-relaxed"
                                style={{
                                  color: primaryColor,
                                  letterSpacing: "0.01em",
                                }}
                              >
                                {feature}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {ctaButton && (
                  <a href={ctaButton.href} className="royal-cta-button group">
                    <span className="button-text">{ctaButton.label}</span>
                    <svg
                      className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </a>
                )}
              </div>

              {/* Image Section */}
              <div
                ref={imageRef}
                className={`relative transition-all duration-1200 delay-500 ${
                  imageVisible
                    ? "opacity-100 translate-x-0 scale-100"
                    : "opacity-0 translate-x-12 scale-95"
                }`}
                style={{ transform: `translateY(${scrollY * 0.02}px)` }}
              >
                <div className="relative w-full h-full">
                  {aboutImages.length > 0 ? (
                    <div className="relative h-[600px] sm:h-[700px] lg:h-[800px]">
                      {/* Main Image */}
                      <div className="absolute top-0 left-0 w-2/3 h-2/3 z-10">
                        <div className="royal-image-container royal-image-primary group">
                          <Image
                            src={aboutImages[0].imageUrl}
                            alt={`Featured: ${aboutImages[0].slotName}`}
                            width={800}
                            height={600}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20"></div>
                        </div>
                      </div>

                      {/* Secondary */}
                      {aboutImages[1] && (
                        <div className="absolute top-0 right-0 w-1/3 h-1/2 z-20">
                          <div className="royal-image-container royal-image-secondary group">
                            <Image
                              src={aboutImages[1].imageUrl}
                              alt={`Secondary: ${aboutImages[1].slotName}`}
                              width={400}
                              height={300}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          </div>
                        </div>
                      )}

                      {/* Third */}
                      {aboutImages[2] && (
                        <div className="absolute bottom-0 right-0 w-1/2 h-1/3 z-20">
                          <div
                            className="royal-image-container group"
                            style={{
                              clipPath:
                                "polygon(15% 0, 100% 0, 100% 85%, 0 100%)",
                            }}
                          >
                            <Image
                              src={aboutImages[2].imageUrl}
                              alt={`Tertiary: ${aboutImages[2].slotName}`}
                              width={500}
                              height={300}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          </div>
                        </div>
                      )}

                      {/* Fourth */}
                      {aboutImages[3] && (
                        <div className="absolute bottom-8 left-1/4 w-1/3 h-1/3 z-30">
                          <div className="royal-image-container group organic-shape overflow-hidden">
                            <Image
                              src={aboutImages[3].imageUrl}
                              alt={`Extra: ${aboutImages[3].slotName}`}
                              width={400}
                              height={400}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ) : image ? (
                    <div className="royal-image-container royal-image-primary">
                      <Image
                        src={image}
                        alt="About image"
                        width={800}
                        height={600}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
