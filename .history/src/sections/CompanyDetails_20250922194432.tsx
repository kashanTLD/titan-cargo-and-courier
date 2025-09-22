'use client';

import React from 'react';
import Image from "next/image";
import { CompanyDetailsContent, Image as ImageType } from '@/types/template';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface CompanyDetailsProps {
  data: CompanyDetailsContent;
  images?: ImageType[];
  theme?: {
    primaryColor: string;
    secondaryColor: string;
  };
}

export default function CompanyDetails({ data, images, theme }: CompanyDetailsProps) {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 });
  const { ref: section1Ref, isVisible: section1Visible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 });
  const { ref: section2Ref, isVisible: section2Visible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 });
  const { ref: section3Ref, isVisible: section3Visible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 });

  if (!data || !data.sections || data.sections.length === 0) {
    return null;
  }

  const getImageForSection = (sectionIndex: number) => {
    const preferredSlot = `company-details-${sectionIndex + 1}`;
    return (
      images?.find(img => img.slotName === preferredSlot) ||
      images?.find(img => img.category?.toLowerCase() === 'companydetails' || img.category?.toLowerCase() === 'company-details') ||
      images?.[sectionIndex] ||
      images?.[0]
    );
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? 
      `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : 
      '0, 0, 0';
  };

  const styles = `
    @keyframes royal-float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-8px) rotate(1deg); }
    }

    @keyframes fade-slide-up {
      from { opacity: 0; transform: translateY(40px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes geometric-spin {
      0% { transform: rotateX(0deg) rotateY(0deg); }
      100% { transform: rotateX(360deg) rotateY(360deg); }
    }

    @keyframes shimmer-flow {
      0% { transform: translateX(-100%) rotate(-45deg); }
      100% { transform: translateX(300%) rotate(-45deg); }
    }

    @keyframes depth-float {
      0%, 100% { transform: translateZ(0px) rotateX(0deg) rotateY(0deg); filter: blur(0px); }
      50% { transform: translateZ(20px) rotateX(5deg) rotateY(10deg); filter: blur(0.5px); }
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
      animation: royal-float 10s ease-in-out infinite;
    }

    .geometric-3d { transform-style: preserve-3d; animation: geometric-spin 28s linear infinite; }
    .depth-layer { animation: depth-float 7s ease-in-out infinite; }
    .parallax-element { will-change: transform; }
    .fade-slide-animation { animation: fade-slide-up 0.9s ease-out forwards; }

    .royal-title {
      font-size: clamp(2.25rem, 5vw, 3.25rem);
      font-weight: 300;
      line-height: 1.05;
      letter-spacing: -0.03em;
      color: #1a1a1a;
      font-family: 'serif', Georgia, 'Times New Roman', serif;
    }

    .royal-subtitle {
      font-size: clamp(1rem, 2vw, 1.15rem);
      font-weight: 400;
      letter-spacing: 0.06em;
      color: #666;
      text-transform: uppercase;
    }

    /* Card look matching provided images */
    .category-card {
      background: #ffffff;
      border-radius: 28px;
      border: 1px solid rgba(0,0,0,0.06);
      box-shadow: 0 12px 40px rgba(0,0,0,0.06);
      overflow: hidden;
      transition: transform 500ms cubic-bezier(0.23, 1, 0.32, 1), box-shadow 500ms cubic-bezier(0.23, 1, 0.32, 1);
      transform-origin: center;
    }

    .category-card:hover { transform: translateY(-6px); box-shadow: 0 20px 60px rgba(0,0,0,0.12); }

    .card-illustration {
      width: 120px; height: 120px; border-radius: 24px;
      margin: 0 auto 1rem; display: flex; align-items: center; justify-content: center;
      background: radial-gradient(circle at 30% 30%, rgba(var(--theme-primary-rgb),0.08), transparent 60%), #f7f8fa;
    }

    .card-title { font-size: 1.25rem; font-weight: 700; color: #111827; }
    .card-desc { font-size: 0.95rem; color: #6b7280; line-height: 1.6; }
    .card-link { font-size: 0.9rem; font-weight: 600; color: #111827; text-decoration: underline; }

    /* Stacked → grid animation */
    .cards-grid {
      display: grid; grid-template-columns: 1fr; gap: 1.25rem;
    }
    @media (min-width: 1024px) { .cards-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.5rem; } }

    .card-enter {
      opacity: 0;
      transform: translate(-40%, -20%) rotate(-6deg) scale(0.92);
      filter: blur(2px);
    }

    .card-enter.layer-2 { transform: translate(-20%, -10%) rotate(-3deg) scale(0.96); }
    .card-enter.layer-3 { transform: translate(0%, 0%) rotate(0deg) scale(1); }

    .card-enter-active {
      opacity: 1; filter: blur(0);
      transform: translate(0, 0) rotate(0) scale(1);
      transition: transform 900ms cubic-bezier(0.22, 1, 0.36, 1), opacity 700ms ease, filter 700ms ease;
    }

    .card-delay-0 { transition-delay: 0ms; }
    .card-delay-1 { transition-delay: 120ms; }
    .card-delay-2 { transition-delay: 240ms; }
    .card-delay-3 { transition-delay: 360ms; }
    .card-delay-4 { transition-delay: 480ms; }
    .card-delay-5 { transition-delay: 600ms; }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <section 
        className="relative overflow-hidden py-24 bg-white"
        style={{
          '--theme-primary-color': theme?.primaryColor,
          '--theme-secondary-color': theme?.secondaryColor,
          '--theme-primary-rgb': hexToRgb(theme?.primaryColor || '#000000'),
          '--theme-secondary-rgb': hexToRgb(theme?.secondaryColor || '#000000'),
        } as React.CSSProperties}
      >
        {/* Royal Background with Parallax (aligned to hero) */}
        <div className="absolute inset-0 split-content">
          {/* Organic shapes */}
          <div 
            className="absolute top-24 right-1/5 w-80 h-80 organic-shape opacity-5"
            style={{
              background: `radial-gradient(circle, ${theme?.primaryColor}20, transparent 70%)`
            }}
          />
          <div 
            className="absolute bottom-24 left-1/4 w-72 h-72 organic-shape opacity-4"
            style={{
              background: `radial-gradient(ellipse, ${theme?.secondaryColor}22, transparent 60%)`,
              animationDelay: '1.5s'
            }}
          />

          {/* Geometric accents */}
          <div className="absolute top-1/3 left-1/6 parallax-element">
            <div className="geometric-3d opacity-6">
              <svg width="100" height="100" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="companyGeom1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: theme?.primaryColor, stopOpacity: 0.35 }} />
                    <stop offset="100%" style={{ stopColor: theme?.secondaryColor, stopOpacity: 0.15 }} />
                  </linearGradient>
                </defs>
                <polygon points="50,6 86,36 72,84 28,84 14,36" fill="url(#companyGeom1)" stroke={theme?.primaryColor} strokeWidth="1" opacity="0.5" />
                <circle cx="50" cy="42" r="12" fill="none" stroke={theme?.secondaryColor} strokeWidth="1" opacity="0.4" />
              </svg>
            </div>
          </div>

          {/* Elegant floating royal accents */}
          <div className="absolute top-1/2 left-10 w-3 h-20" style={{ borderRadius: '50px', background: `linear-gradient(45deg, ${theme?.primaryColor}, ${theme?.secondaryColor})`, opacity: 0.25 }} />
          <div className="absolute top-1/4 right-14 w-2 h-28" style={{ borderRadius: '50px', background: `linear-gradient(45deg, ${theme?.primaryColor}, ${theme?.secondaryColor})`, opacity: 0.2 }} />
        </div>

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          {/* Header Section (hero-aligned) */}
          <div ref={headerRef} className="text-center mb-20 space-y-6">
            <h2 
              className={`royal-title transition-all duration-1200 ${
                headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            >
              {data.heading}
            </h2>
            <div className="flex items-center justify-center">
              <div 
                className={`h-px transition-all duration-1000 delay-300 ${
                  headerVisible ? 'w-24 opacity-60' : 'w-0 opacity-0'
                }`}
                style={{ background: `linear-gradient(90deg, ${theme?.primaryColor}, transparent)` }}
              />
            </div>
            {data.description && (
              <p 
                className={`royal-subtitle max-w-2xl mx-auto transition-all duration-1200 delay-300 ${
                  headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                {data.description}
              </p>
            )}
          </div>

        
          {/* Stacked-to-grid reveal for first three cards (large devices) */}
          <div className="hidden lg:block mt-6">
            <div className="cards-grid">
              {data.sections.slice(0, 3).map((section, i) => (
                <div key={`preview-${i}`} className={`category-card p-6 ${headerVisible ? 'card-enter-active' : ''} card-enter layer-${i+1} card-delay-${i}`}>
                  <div className="card-illustration">
                    {(() => { const img = getImageForSection(i); return img?.imageUrl ? <Image src={img.imageUrl} alt={section.heading}  className="object-contain"/> : <div className="text-5xl">🧊</div>; })()}
                  </div>
                  <div className="text-center space-y-3">
                    <h4 className="card-title">{section.heading}</h4>
                    <p className="card-desc">{section.description}</p>
                    <a className="card-link" href="#">Learn more</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}