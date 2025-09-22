'use client';

import { useState, useEffect, useRef } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface FAQSectionProps {
  title: string;
  description: string;
  questions: Array<{
    question: string;
    answer: string;
  }>;
  themeData?: {
    primaryColor: string;
    secondaryColor: string;
  };
}

export default function FAQSection({
  title,
  description,
  questions,
  themeData = { primaryColor: '#6366f1', secondaryColor: '#8b5cf6' }
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  
  const sectionRef = useRef<HTMLElement>(null);
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation<HTMLHeadingElement>({ threshold: 0.3 });
  const { ref: descriptionRef, isVisible: descriptionVisible } = useScrollAnimation<HTMLParagraphElement>({ threshold: 0.3 });

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    setIsLoaded(true);

    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setMousePosition({
        x: (x / rect.width - 0.5) * 20,
        y: (y / rect.height - 0.5) * 20
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

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? 
      `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : 
      '0, 0, 0';
  };

  const primaryColor = themeData?.primaryColor || '#6366f1';
  const secondaryColor = themeData?.secondaryColor || '#8b5cf6';
  const primaryRgb = hexToRgb(primaryColor);
  const secondaryRgb = hexToRgb(secondaryColor);

  return (
    <section 
      ref={sectionRef}
      className="py-16 sm:py-20 md:py-24 lg:py-32 relative overflow-hidden bg-white"
      style={{ perspective: '1000px' }}
    >
      {/* Decorative elements */}
      <div 
        className="absolute top-20 right-1/4 w-96 h-96 opacity-10"
        style={{
          background: `radial-gradient(circle, ${primaryColor}, transparent 70%)`,
          borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
          animation: 'faq-pulse 8s ease-in-out infinite',
          transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px) translateY(${scrollY * 0.1}px)`,
          willChange: 'transform'
        }}
      />
      
      <div 
        className="absolute bottom-32 left-1/3 w-64 h-64 opacity-10"
        style={{
          background: `radial-gradient(ellipse, ${secondaryColor}, transparent 60%)`,
          borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
          animation: 'faq-pulse 8s ease-in-out infinite 2s',
          transform: `translate(${-mousePosition.x * 0.2}px, ${-mousePosition.y * 0.2}px) translateY(${scrollY * 0.05}px)`,
          willChange: 'transform'
        }}
      />

      {/* 3D Geometric Elements */}
      <div 
        className="absolute top-1/3 left-1/4"
        style={{ 
          transform: `translateY(${scrollY * 0.2}px) translateX(${mousePosition.x * 0.1}px)`,
          willChange: 'transform'
        }}
      >
        <div style={{ 
          transform: 'rotateX(10deg) rotateY(10deg)',
          animation: 'faq-spin 25s linear infinite'
        }}>
          <svg width="120" height="120" viewBox="0 0 120 120">
            <defs>
              <linearGradient id={`geometric-${Math.random().toString(36).substr(2, 9)}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={primaryColor} stopOpacity="0.3" />
                <stop offset="100%" stopColor={secondaryColor} stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <polygon 
              points="60,10 100,45 85,90 35,90 20,45" 
              fill={`url(#geometric-${Math.random().toString(36).substr(2, 9)})`}
              stroke={primaryColor} 
              strokeWidth="1" 
              opacity="0.6"
            />
            <circle cx="60" cy="50" r="15" fill="none" stroke={secondaryColor} strokeWidth="1" opacity="0.4" />
          </svg>
        </div>
      </div>

      {/* Elegant floating accents */}
      <div 
        className="absolute top-1/2 left-12 w-3 h-20 opacity-30"
        style={{ 
          background: `linear-gradient(45deg, ${primaryColor}, ${secondaryColor})`,
          backgroundSize: '200% 200%',
          animation: 'faq-shimmer 4s ease-in-out infinite',
          transform: `translateY(${scrollY * 0.3}px) rotate(${mousePosition.x * 0.1}deg)`,
          borderRadius: '50px',
          willChange: 'transform'
        }}
      />
      
      <div 
        className="absolute top-1/4 right-16 w-2 h-32 opacity-25"
        style={{ 
          background: `linear-gradient(45deg, ${primaryColor}, ${secondaryColor})`,
          backgroundSize: '200% 200%',
          animation: 'shimmer 4s ease-in-out infinite 1s',
          transform: `translateY(${scrollY * -0.2}px) rotate(${-mousePosition.y * 0.1}deg)`,
          borderRadius: '50px',
          willChange: 'transform'
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header with animations */}
          <div className="text-center mb-16">
            <div 
              className={`transition-all duration-1000 ease-out ${
                titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            >
              <h2 
                ref={titleRef}
                className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6"
                style={{ 
                  transform: `translateY(${scrollY * 0.05}px)`,
                  willChange: 'transform'
                }}
              >
                {title}
              </h2>
            </div>
            
            {/* Elegant divider */}
            <div 
              className={`h-px mx-auto transition-all duration-1000 delay-300 ${
                titleVisible ? 'w-24 opacity-60' : 'w-0 opacity-0'
              }`}
              style={{
                background: `linear-gradient(90deg, transparent, ${primaryColor}, transparent)`
              }}
            />
            
            <p 
              ref={descriptionRef}
              className={`text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mt-6 transition-all duration-1000 ${
                descriptionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ 
                transform: `translateY(${scrollY * 0.03}px)`,
                willChange: 'transform'
              }}
            >
              {description}
            </p>
          </div>

          {/* Enhanced FAQ accordion */}
          <div className="space-y-6 relative z-10">
            {questions.map((faq, index) => (
              <div
                key={index}
                className={`border border-gray-200 rounded-xl overflow-hidden bg-white transition-all duration-500 ${
                  openIndex === index ? 'shadow-lg' : 'shadow-sm'
                }`}
                style={{
                  transform: `translateY(${scrollY * 0.02 * (index % 3 - 1)}px)`,
                  transition: `all 0.5s cubic-bezier(0.23, 1, 0.32, 1) ${index * 0.1}s`,
                  willChange: 'transform, box-shadow'
                }}
              >
                <button
                  className="w-full px-8 py-5 text-left flex justify-between items-center relative overflow-hidden"
                  onClick={() => toggleQuestion(index)}
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span 
                    className="font-medium text-lg text-gray-900 pr-4"
                    style={{
                      background: openIndex === index 
                        ? `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` 
                        : 'transparent',
                      WebkitBackgroundClip: openIndex === index ? 'text' : 'unset',
                      WebkitTextFillColor: openIndex === index ? 'transparent' : 'inherit',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {faq.question}
                  </span>
                  <div 
                    className="w-8 h-8 flex items-center justify-center rounded-full"
                    style={{
                      background: openIndex === index 
                        ? `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` 
                        : 'rgba(0,0,0,0.05)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <svg
                      className={`w-4 h-4 transform transition-transform duration-500 ${
                        openIndex === index ? 'rotate-180 text-white' : 'text-gray-500'
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                  
                  {/* Hover effect overlay */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-r opacity-0 hover:opacity-5 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(135deg, rgba(${primaryRgb}, 0.05), rgba(${secondaryRgb}, 0.05))`
                    }}
                  />
                </button>
                
                <div 
                  id={`faq-answer-${index}`}
                  className="overflow-hidden transition-all duration-500 ease-in-out"
                  style={{
                    maxHeight: openIndex === index ? '1000px' : '0px',
                    opacity: openIndex === index ? 1 : 0,
                    transform: openIndex === index ? 'translateY(0)' : 'translateY(-20px)'
                  }}
                >
                  <div className="px-8 py-6 bg-white border-t border-gray-100">
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced CTA */}
          <div 
            className="text-center mt-16"
            style={{ 
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s ease, transform 0.8s ease',
              transitionDelay: '0.6s'
            }}
          >
            <p className="text-gray-600 mb-6">
              Still have questions? We&apos;re here to help!
            </p>
            <a 
              href="tel:+1-800-555-0123" 
              className="inline-flex items-center gap-3 px-8 py-3 rounded-full font-medium text-white transition-all duration-300 group"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                boxShadow: `0 4px 15px rgba(${primaryRgb}, 0.2)`,
                transform: 'translateY(0)',
                willChange: 'transform, box-shadow'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = `0 8px 25px rgba(${primaryRgb}, 0.3)`;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = `0 4px 15px rgba(${primaryRgb}, 0.2)`;
              }}
            >
              <span>Call Our Team</span>
              <svg 
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
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

      {/* Add keyframe animations */}
      <style jsx global>{`
        @keyframes faq-pulse {
          0%, 100% { 
            transform: scale(1) rotate(0deg);
            opacity: 0.4;
          }
          50% { 
            transform: scale(1.2) rotate(180deg);
            opacity: 0.8;
          }
        }
        
        @keyframes faq-shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes faq-spin {
          0% { transform: rotateX(0deg) rotateY(0deg); }
          100% { transform: rotateX(360deg) rotateY(360deg); }
        }
      `}</style>
    </section>
  );
}
