"use client";

import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/useScrollAnimation";
import { ServiceHighlightsContent } from "@/types/template";

interface ServiceHighlightsSectionProps {
  data: ServiceHighlightsContent;
  theme?: {
    primaryColor: string;
    secondaryColor: string;
  };
}

export default function ServiceHighlightsSection({
  data,
  theme,
}: ServiceHighlightsSectionProps) {
  const { ref: titleRef, isVisible: titleVisible } =
    useScrollAnimation<HTMLHeadingElement>({ threshold: 0.2 });
  const { ref: descRef, isVisible: descVisible } =
    useScrollAnimation<HTMLParagraphElement>({ threshold: 0.2 });
  const { ref: servicesRef, visibleItems } = useStaggeredAnimation(
    data.services.length,
    120
  );

  // Helper function to format the display value
  const formatDisplayValue = (description: string) => {
    if (description.includes("+")) {
      return { value: description.replace("+", ""), suffix: "+" };
    }
    if (description.includes("%")) {
      return { value: description.replace("%", ""), suffix: "%" };
    }
    if (description.includes("/")) {
      return { value: description, suffix: "" };
    }
    return { value: description, suffix: "" };
  };

  return (
    <section
      id="service-highlights"
      className="relative overflow-hidden py-16 sm:py-20 md:py-24 lg:py-32"
      style={{
        background: `linear-gradient(135deg, ${theme?.primaryColor}15 0%, ${theme?.secondaryColor}15 25%, ${theme?.primaryColor}10 50%, ${theme?.secondaryColor}10 75%, ${theme?.primaryColor}15 100%)`
      }}
    >
      {/* Luxury Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: `radial-gradient(circle at 25% 25%, ${theme?.primaryColor} 0%, transparent 50%)`
          }}
        ></div>
        <div 
          className="absolute top-0 right-0 w-full h-full"
          style={{
            background: `radial-gradient(circle at 75% 25%, ${theme?.secondaryColor} 0%, transparent 50%)`
          }}
        ></div>
        <div 
          className="absolute bottom-0 left-0 w-full h-full"
          style={{
            background: `radial-gradient(circle at 25% 75%, ${theme?.primaryColor} 0%, transparent 50%)`
          }}
        ></div>
      </div>

      {/* Floating Luxury Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-20 left-20 w-2 h-2 rounded-full animate-float opacity-60" 
          style={{ 
            backgroundColor: theme?.primaryColor,
            animationDelay: '0s' 
          }}
        ></div>
        <div 
          className="absolute top-40 right-32 w-1 h-1 rounded-full animate-float opacity-40" 
          style={{ 
            backgroundColor: theme?.secondaryColor,
            animationDelay: '1s' 
          }}
        ></div>
        <div 
          className="absolute bottom-32 left-40 w-3 h-3 rounded-full animate-float opacity-50" 
          style={{ 
            backgroundColor: theme?.primaryColor,
            animationDelay: '2s' 
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header with Luxury Style */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${theme?.primaryColor || '#3b82f6'}, ${theme?.secondaryColor || '#1d4ed8'})`,
              boxShadow: `0 10px 25px -5px ${theme?.primaryColor}40`
            }}
          >
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          
          <h2
            ref={titleRef}
            className={`text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-extrabold mb-6 transition-all duration-1000 ${
              titleVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{
              background: `linear-gradient(135deg, ${theme?.primaryColor || '#1f2937'}, ${theme?.secondaryColor || '#374151'})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            {data.title}
          </h2>
          
          <div className="w-24 h-1 mx-auto mb-6 rounded-full"
            style={{
              background: `linear-gradient(90deg, ${theme?.primaryColor || '#3b82f6'}, ${theme?.secondaryColor || '#1d4ed8'})`
            }}
          />
          
          <p
            ref={descRef}
            className={`text-base sm:text-lg md:text-xl max-w-4xl mx-auto leading-relaxed transition-all duration-300 ${
              descVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{
              color: '#4b5563',
              textShadow: '0 1px 2px rgba(255,255,255,0.1)'
            }}
          >
            {data.description}
          </p>
        </div>

        {/* Enhanced Service Highlights Grid */}
        <div
          ref={servicesRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10"
        >
          {data.services && data.services.length > 0 ? data.services.map((service, index) => {
            const { value, suffix } = formatDisplayValue(service.description);
            
            return (
              <div
                key={`service-${index}`}
                className={`group relative rounded-3xl p-8 lg:p-10 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-4 hover:scale-105 ${
                  visibleItems.includes(index)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
                style={{
                  background: `linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.95) 100%)`,
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)'
                }}
              >
                {/* Gradient Border Effect */}
                <div className="absolute inset-0 rounded-3xl p-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${theme?.primaryColor || '#3b82f6'}, ${theme?.secondaryColor || '#1d4ed8'})`
                  }}
                >
                  <div className="rounded-3xl h-full w-full" style={{
                    background: `linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.95) 100%)`,
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)'
                  }} />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Enhanced Number Display */}
                  <div className="text-center mb-6">
                    <div className="relative inline-block">
                      <div
                        className="w-24 h-24 mx-auto rounded-2xl flex flex-col items-center justify-center text-white mb-4 shadow-lg transform group-hover:rotate-6 transition-transform duration-300"
                        style={{
                          background: `linear-gradient(135deg, ${theme?.primaryColor || '#3b82f6'}, ${theme?.secondaryColor || '#1d4ed8'})`,
                          boxShadow: `0 10px 25px -5px ${theme?.primaryColor}40`
                        }}
                      >
                        <span className="text-2xl font-black leading-none">
                          {value}
                        </span>
                        {suffix && (
                          <span className="text-lg font-bold opacity-90">
                            {suffix}
                          </span>
                        )}
                      </div>
                      
                      {/* Floating particles effect */}
                      <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full opacity-60 animate-bounce"
                        style={{
                          background: theme?.primaryColor || '#3b82f6',
                          animationDelay: `${index * 0.5}s`
                        }}
                      />
                      <div className="absolute -bottom-2 -left-2 w-3 h-3 rounded-full opacity-40 animate-bounce"
                        style={{
                          background: theme?.secondaryColor || '#1d4ed8',
                          animationDelay: `${index * 0.7}s`
                        }}
                      />
                    </div>
                  </div>

                  {/* Enhanced Service Name */}
                  <h3 className="text-xl font-bold text-center leading-tight transition-colors duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${theme?.primaryColor || '#1f2937'}, ${theme?.secondaryColor || '#374151'})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    {service.name}
                  </h3>
                  
                  {/* Subtle accent line */}
                  <div className="w-12 h-0.5 mx-auto mt-4 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                    style={{
                      background: `linear-gradient(90deg, ${theme?.primaryColor || '#3b82f6'}, ${theme?.secondaryColor || '#1d4ed8'})`
                    }}
                  />
                </div>
              </div>
            );
          }) : (
            <div className="col-span-full text-center text-gray-500">
              No service highlights available
            </div>
          )}
        </div>

        {/* Bottom accent */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 text-gray-500">
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
            <span className="text-sm font-medium">Excellence in Numbers</span>
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
