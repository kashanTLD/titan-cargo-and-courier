'use client';

import { useState, useEffect, useRef } from 'react';
import NextImage from 'next/image';
import { CTAContent, ThemeData, Image } from '@/types/template';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface CTASectionProps {
  data: CTAContent;
  theme?: ThemeData;
  images?: Image[];
}

const CTASection: React.FC<CTASectionProps> = ({ data, theme, images }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const { ref: headingRef, isVisible: headingVisible } = useScrollAnimation<HTMLHeadingElement>({ threshold: 0.1 });
  const { ref: descriptionRef, isVisible: descriptionVisible } = useScrollAnimation<HTMLParagraphElement>({ threshold: 0.1 });
  const { ref: ctaButtonRef, isVisible: ctaButtonVisible } = useScrollAnimation<HTMLAnchorElement>({ threshold: 0.1 });

  const primaryColor = theme?.primaryColor || '#3B82F6';
  const secondaryColor = theme?.secondaryColor || '#1E40AF';
  const ctaImage = images?.find(img => img.slotName === 'cta-image-1')?.imageUrl || 'https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg';

  useEffect(() => {
    setIsLoaded(true);

    let rafId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const x = e.clientX - window.innerWidth / 2;
        const y = e.clientY - window.innerHeight / 2;
        setMousePosition({ x, y });
      });
    };

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setScrollY(window.scrollY || window.pageYOffset || 0);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    handleScroll();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll as EventListener);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const hexToRgb = (hex: string, alpha = 1) => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}, ${alpha})`
      : null;
  };

  return (
    <section 
      ref={sectionRef}
      className="py-20 relative overflow-hidden min-h-[600px] flex items-center"
      style={{ 
        backgroundImage: `url(${ctaImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        
        @keyframes pulse {
          0% { opacity: 0.3; }
          50% { opacity: 0.4; }
          100% { opacity: 0.3; }
        }
        
        .fade-in-up {
          opacity: 0;
          transform: translateY(30px);
        }
        
        .fade-in-up.visible {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .floating-shape {
          animation: float 8s ease-in-out infinite;
          pointer-events: none;
        }
        
        .pulse-glow {
          animation: pulse 6s ease-in-out infinite;
          pointer-events: none;
        }
        
        .royal-heading {
          font-size: clamp(3rem, 8vw, 6rem);
          font-weight: 300;
          line-height: 0.9;
          letter-spacing: -0.04em;
          color: white;
          font-family: 'serif', Georgia, 'Times New Roman', serif;
        }
        
        .royal-subheading {
          font-size: clamp(1rem, 2vw, 1.25rem);
          font-weight: 400;
          letter-spacing: 0.05em;
          color: rgba(255, 255, 255, 0.8);
          text-transform: uppercase;
        }
        
        .cta-button {
          position: relative;
          z-index: 999;
          pointer-events: auto;
        }
        
        .decorative-bg {
          position: absolute;
          pointer-events: none;
          z-index: 1;
        }
        
        .content-layer {
          position: relative;
          z-index: 100;
        }
        
        .overlay-layer {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }
      `}</style>
      
      {/* Gradient and dark overlays above the image background */}
      <div
        className="overlay-layer"
        style={{
          background: `linear-gradient(135deg, ${hexToRgb(theme?.primaryColor || '#3B82F6', 0.65)}, ${hexToRgb(theme?.secondaryColor || '#1E40AF', 0.65)})`
        }}
      />
      <div
        className="overlay-layer"
        style={{
          background: 'rgba(0, 0, 0, 0.45)'
        }}
      />
      
      {/* Simplified decorative background elements - all set to not interfere with clicks */}
      <div 
        className="decorative-bg top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl pulse-glow"
        style={{ 
          transform: `translate3d(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px, 0)`,
          transition: 'transform 0.6s ease-out'
        }}
      ></div>
      
      <div 
        className="decorative-bg bottom-0 left-0 w-[30rem] h-[30rem] bg-white opacity-5 rounded-full blur-3xl pulse-glow"
        style={{ 
          transform: `translate3d(${mousePosition.x * -0.05}px, ${mousePosition.y * -0.05}px, 0)`,
          transition: 'transform 0.8s ease-out',
          animationDelay: '2s'
        }}
      ></div>
      
      <div 
        className="decorative-bg top-[20%] left-[10%] w-24 h-24 rounded-full bg-white opacity-10 blur-xl floating-shape" 
        style={{
          animationDelay: '0.5s', 
          transform: `translate3d(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px, 0)`,
        }}
      ></div>
      
      <div 
        className="decorative-bg bottom-[30%] right-[15%] w-32 h-32 rounded-full bg-white opacity-10 blur-xl floating-shape" 
        style={{
          animationDelay: '1.2s', 
          transform: `translate3d(${mousePosition.x * -0.02}px, ${mousePosition.y * -0.02}px, 0)`,
        }}
      ></div>

      {/* Main content - properly isolated */}
      <div className="content-layer w-full">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Sub heading */}
            <p 
              className={`royal-subheading mb-4 fade-in-up ${headingVisible ? 'visible' : ''}`}
              style={{ animationDelay: '0.2s' }}
            >
              {data.subHeading}
            </p>
            
            {/* Elegant divider */}
            <div 
              className={`h-px mx-auto transition-all duration-1000 delay-300 ${
                headingVisible ? 'w-24 opacity-60' : 'w-0 opacity-0'
              }`}
              style={{
                background: `linear-gradient(90deg, transparent, white, transparent)`
              }}
            ></div>

            {/* Main heading */}
            <h2 
              ref={headingRef}
              className={`royal-heading mb-6 fade-in-up ${headingVisible ? 'visible' : ''}`}
              style={{ animationDelay: '0.4s' }}
            >
              {data.heading}
            </h2>

            {/* Description */}
            <p 
              ref={descriptionRef}
              className={`text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed fade-in-up ${
                descriptionVisible ? 'visible' : ''
              }`}
              style={{ animationDelay: '0.6s' }}
            >
              {data.description}
            </p>

            {/* CTA Button - completely isolated and guaranteed clickable */}
            {data.ctaButton && (
              <div 
                className={`fade-in-up ${ctaButtonVisible ? 'visible' : ''}`}
                style={{ animationDelay: '0.8s' }}
              >
                <a
                  ref={ctaButtonRef}
                  href={data.ctaButton.href}
                  className="cta-button inline-flex items-center gap-4 px-12 py-5 text-base font-medium text-white bg-transparent relative overflow-hidden transition-all duration-500 ease-out backdrop-blur-sm border border-white/20 rounded-full hover:-translate-y-1 hover:shadow-2xl hover:border-white/40 hover:bg-white/10 group"
                >
                  <span className="relative z-10 transition-colors duration-300">
                    {data.ctaButton.label}
                  </span>
                  <svg 
                    className="w-5 h-5 relative z-10 transition-all duration-300 group-hover:translate-x-2" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                  
                  {/* Button shimmer effect - properly contained */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full transition-transform duration-1000 ease-in-out group-hover:translate-x-full"
                    style={{ pointerEvents: 'none' }}
                  ></div>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;