"use client";

import { useEffect, useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface ServiceArea {
  city: string;
  region: string;
  description: string;
}

interface ThemeData {
  primaryColor: string;
  secondaryColor: string;
}

interface ServiceAreasSectionProps {
  serviceAreas?: ServiceArea[];
  themeData?: ThemeData;
}

export default function ServiceAreasSection({
  serviceAreas,
  themeData,
}: ServiceAreasSectionProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation<HTMLHeadingElement>({ threshold: 0.3 });
  const { ref: areasRef, isVisible: areasVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Early return after hooks are initialized to comply with React Hooks rules
  if (!serviceAreas || serviceAreas.length === 0) {
    return null;
  }

  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 relative overflow-hidden bg-pink-50">
      {/* Background subtle elements */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${themeData?.primaryColor || '#8B4513'}, transparent 70%)`,
          }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${themeData?.secondaryColor || '#D2691E'}, transparent 70%)`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <div className="text-center mb-12">
            <h2 
              ref={titleRef}
              className={`text-4xl md:text-5xl font-bold mb-8 transition-all duration-1000 ${
                titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ 
                color: '#8B4513',
                fontFamily: 'Georgia, serif'
              }}
            >
              Our Serving Area
            </h2>
            
            {/* Decorative wavy line */}
            <div 
              className={`flex justify-center mb-8 transition-all duration-1000 delay-300 ${
                titleVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
              }`}
            >
              <svg 
                width="400" 
                height="40" 
                viewBox="0 0 400 40" 
                className="max-w-full"
              >
                <path 
                  d="M10 20 Q50 5, 90 20 T170 20 T250 20 T330 20 T390 20"
                  fill="none" 
                  stroke={themeData?.primaryColor || '#8B4513'} 
                  strokeWidth="2"
                  opacity="0.7"
                />
                {/* Small decorative elements on the line */}
                <circle cx="90" cy="20" r="2" fill={themeData?.primaryColor || '#8B4513'} opacity="0.8" />
                <circle cx="170" cy="20" r="2" fill={themeData?.secondaryColor || '#D2691E'} opacity="0.8" />
                <circle cx="250" cy="20" r="2" fill={themeData?.primaryColor || '#8B4513'} opacity="0.8" />
                <circle cx="330" cy="20" r="2" fill={themeData?.secondaryColor || '#D2691E'} opacity="0.8" />
              </svg>
            </div>
          </div>

          {/* Service Areas List */}
          <div 
            ref={areasRef}
            className={`flex flex-wrap justify-center items-center gap-6 md:gap-8 lg:gap-12 transition-all duration-1000 delay-500 ${
              areasVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {serviceAreas.map((area, index) => (
              <div
                key={index}
                className={`flex items-center gap-2 transition-all duration-700 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{
                  transitionDelay: `${0.6 + index * 0.1}s`
                }}
              >
                {/* Location Pin Icon */}
                <svg
                  className="w-5 h-5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  style={{ color: themeData?.primaryColor || '#8B4513' }}
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>

                {/* Location Text */}
                <span 
                  className="text-lg md:text-xl font-medium whitespace-nowrap"
                  style={{ 
                    color: '#8B4513',
                    fontFamily: 'Georgia, serif'
                  }}
                >
                  {area.city}, {area.region}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}