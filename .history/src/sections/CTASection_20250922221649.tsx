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
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaButtonRef = useRef<HTMLAnchorElement>(null);
  
  const headingVisible = useScrollAnimation(headingRef);
  const descriptionVisible = useScrollAnimation(descriptionRef);
  const ctaButtonVisible = useScrollAnimation(ctaButtonRef);
  
  const primaryColor = theme?.primaryColor || '#3B82F6';
  const secondaryColor = theme?.secondaryColor || '#1E40AF';
  
  // Find the CTA background image or use fallback
  const ctaImage = images?.find(img => img.slotName === 'cta-image-1')?.imageUrl || 'https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg';

  // Handle mouse movement and scroll effects
  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      
      // Check if mouse is within the section
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        return;
      }
      
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Reduce the movement intensity for more subtle effect
      setMousePosition({
        x: (x / rect.width - 0.5) * 15,
        y: (y / rect.height - 0.5) * 15
      });
    };
    
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // Only update scroll value when section is in viewport
        if (rect.top < viewportHeight && rect.bottom > 0) {
          setScrollY(window.scrollY);
        }
      }
    };
    
    // Initial scroll position
    handleScroll();
    
    const section = sectionRef.current;
    if (section) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('scroll', handleScroll);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Utility function to convert hex to rgba
  const hexToRgb = (hex: string, alpha = 1) => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
    
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}, ${alpha})`
      : null;
  };

  return (
    <>
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        
        @keyframes pulse {
          0% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.05); }
          100% { opacity: 0.3; transform: scale(1); }
        }
        
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
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes shimmer-flow {
          0% { transform: translateX(-100%) rotate(-45deg); }
          100% { transform: translateX(300%) rotate(-45deg); }
        }
        
        .fade-in-up {
          opacity: 0;
          transform: translateY(30px);
        }
        
        .fade-in-up.visible {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .scale-in {
          opacity: 0;
          transform: scale(0.9);
        }
        
        .scale-in.visible {
          animation: scaleIn 0.8s ease-out forwards;
        }
        
        .floating-shape {
          animation: float 8s ease-in-out infinite;
        }
        
        .pulse-glow {
          animation: pulse 6s ease-in-out infinite;
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
          border-image: linear-gradient(135deg, ${primaryColor}, ${secondaryColor}) 1;
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
          background: linear-gradient(135deg, ${primaryColor}, ${secondaryColor});
          opacity: 0;
          transition: opacity 0.6s ease;
          border-radius: 50px;
        }

        .organic-button:hover::before {
          opacity: 1;
        }

        .organic-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 35px ${hexToRgb(primaryColor, 0.3)};
          border-color: transparent;
        }

        .organic-button > * {
          position: relative;
          z-index: 1;
          transition: color 0.3s ease;
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
      `}</style>
      
      <section 
        ref={sectionRef}
        className="py-20 relative overflow-hidden min-h-[600px] flex items-center"
      >
        {/* Background Image with Parallax */}
        <div 
          className="absolute inset-0 transition-transform duration-500"
          style={{ transform: `translateY(${scrollY * 0.05}px)` }}
        >
          <NextImage
            src={ctaImage}
            alt="CTA background"
            fill
            className={`object-cover transition-all duration-1000 ${
              isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
            quality={95}
            sizes="100vw"
          />
          
          {/* Overlay with gradient */}
          <div 
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${hexToRgb(primaryColor, 0.85)}, ${hexToRgb(secondaryColor, 0.85)})`
            }}
          ></div>
          
          <div className="shimmer-overlay"></div>
        </div>
        
        {/* Decorative elements */}
        <div 
          className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl pulse-glow"
          style={{ transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)` }}
        ></div>
        <div 
          className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-white opacity-3 rounded-full blur-3xl pulse-glow"
          style={{ 
            transform: `translate(${mousePosition.x * -0.05}px, ${mousePosition.y * -0.05}px)`,
            animationDelay: '2s'
          }}
        ></div>
        
        {/* Floating decorative elements */}
        <div 
          className="absolute top-[20%] left-[10%] w-24 h-24 rounded-full bg-white opacity-10 blur-xl floating-shape" 
          style={{
            animationDelay: '0.5s', 
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        ></div>
        <div 
          className="absolute bottom-[30%] right-[15%] w-32 h-32 rounded-full bg-white opacity-10 blur-xl floating-shape" 
          style={{
            animationDelay: '1.2s', 
            transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`
          }}
        ></div>
        
        {/* Geometric elements */}
        <div className="absolute top-1/3 left-1/4 opacity-20">
          <svg 
            width="120" 
            height="120" 
            viewBox="0 0 120 120"
            style={{ transform: `translateY(${scrollY * 0.2}px) translateX(${mousePosition.x * 0.1}px)` }}
          >
            <defs>
              <linearGradient id="geometric1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: 'white', stopOpacity: 0.3 }} />
                <stop offset="100%" style={{ stopColor: 'white', stopOpacity: 0.1 }} />
              </linearGradient>
            </defs>
            <polygon 
              points="60,10 100,45 85,90 35,90 20,45" 
              fill="url(#geometric1)" 
              stroke="white" 
              strokeWidth="1" 
              opacity="0.6"
            />
          </svg>
        </div>
        
        <div className="absolute bottom-1/4 right-1/3 opacity-15">
          <svg 
            width="80" 
            height="80" 
            viewBox="0 0 80 80"
            style={{ transform: `translateY(${scrollY * -0.15}px) translateX(${-mousePosition.x * 0.15}px)` }}
          >
            <rect 
              x="20" y="20" width="40" height="40" 
              fill="none" 
              stroke="white" 
              strokeWidth="2" 
              opacity="0.5"
              transform="rotate(45 40 40)"
            />
            <circle cx="40" cy="40" r="25" fill="none" stroke="white" strokeWidth="1" opacity="0.3" />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Sub heading with animation */}
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

            {/* Main heading with animation */}
            <h2 
              ref={headingRef}
              className={`royal-heading mb-6 fade-in-up ${headingVisible ? 'visible' : ''}`}
              style={{ 
                animationDelay: '0.4s',
                transform: `translateY(${scrollY * 0.1}px)`
              }}
            >
              {data.heading}
            </h2>

            {/* Description with animation */}
            <p 
              ref={descriptionRef}
              className={`text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed fade-in-up ${
                descriptionVisible ? 'visible' : ''
              }`}
              style={{ 
                animationDelay: '0.6s',
                transform: `translateY(${scrollY * 0.05}px)`
              }}
            >
              {data.description}
            </p>

            {/* CTA Button with organic style */}
            {data.ctaButton && (
              <div 
                className={`fade-in-up ${ctaButtonVisible ? 'visible' : ''}`}
                style={{ animationDelay: '0.8s' }}
              >
                <a
                  ref={ctaButtonRef}
                  href={data.ctaButton.href}
                  className="organic-button group"
                >
                  <span>{data.ctaButton.label}</span>
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
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default CTASection;
