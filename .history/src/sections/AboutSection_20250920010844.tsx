"use client";

import Image from "next/image";
import {
  useScrollAnimation,
  useStaggeredAnimation,
} from "@/hooks/useScrollAnimation";

interface AboutSectionProps {
  title: string;
  description: string;
  features: string[];
  ctaButton: {
    href: string;
    label: string;
  };
  image?: string;
  theme?: {
    primaryColor: string;
    secondaryColor: string;
  };
}

export default function AboutSection({
  title,
  description,
  features,
  ctaButton,
  image,
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
  return (
    <section
      id="about"
      className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden min-h-screen xl:h-screen"
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <h2
              ref={titleRef}
              className={`text-center mb-5 md:mb-10 text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold mb-4 sm:mb-6 transition-all duration-1000 ${
                titleVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-8"
              }`}
              style={{
                background: `linear-gradient(135deg, ${theme?.primaryColor || '#1f2937'}, ${theme?.secondaryColor || '#374151'})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              {title}
            </h2>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>

            <p
              ref={descRef}
              className={`text-base sm:text-lg md:text-xl mb-6 sm:mb-8 leading-relaxed transition-all duration-1000 delay-300 ${
                descVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-8"
              }`}
              style={{
                color: '#4b5563',
                textShadow: '0 1px 2px rgba(255,255,255,0.1)'
              }}
            >
              {description}
            </p>

            {features && features.length > 0 && (
              <div ref={featuresRef} className="grid grid-cols-1 gap-4 mb-8">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className={`group flex items-start space-x-4 p-4 rounded-xl bg-white/70 shadow-2xl shadow-black/30 transition-all duration-500 hover:bg-white/80 hover:scale-105 hover:-translate-y-1 ${
                      visibleItems.includes(index)
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-8"
                    }`}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-125 group-hover:rotate-12 transition-all duration-300"
                      style={{
                        background: `linear-gradient(135deg, ${theme?.primaryColor || '#3b82f6'}, ${theme?.secondaryColor || '#1d4ed8'})`,
                        boxShadow: `0 10px 25px -5px ${theme?.primaryColor}40`
                      }}
                    >
                      <svg
                        className="w-4 h-4 text-white group-hover:animate-pulse"
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
                    <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {ctaButton && (
              <a
                href={ctaButton.href}
                className="inline-block px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:transform hover:-translate-y-1 bg-black/70 shadow-black/30 shadow-md"
              >
                {ctaButton.label}
              </a>
            )}
          </div>

          <div
            ref={imageRef}
            className={`relative transition-all duration-1000 delay-500 w-full h-full ${
              imageVisible
                ? "opacity-100 translate-x-0 scale-100"
                : "opacity-0 translate-x-8 scale-95"
            }`}
          >
            {/* Modern visual element with floating cards */}
            <div className="relative w-full h-full">
              {image ? (
                <div className="aspect-square rounded-3xl w-full h-full overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105">
                  <Image
                    src={image}
                    alt="About us"
                    width={600}
                    height={600}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              ) : (
                <div
                  className="aspect-square rounded-3xl flex items-center justify-center relative overflow-hidden hover:scale-105 transition-all duration-500"
                  style={{
                    background: theme
                      ? `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})`
                      : "linear-gradient(135deg, #000, #666)",
                  }}
                >
                  {/* Floating elements with animations */}
                  <div
                    className="absolute top-4 left-4 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center animate-bounce"
                    style={{ animationDuration: "3s", animationDelay: "0s" }}
                  >
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>

                  <div
                    className="absolute top-4 right-4 w-12 h-12 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center animate-pulse"
                    style={{ animationDuration: "2s" }}
                  >
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>

                  <div className="absolute bottom-4 left-4 w-20 h-12 bg-white/25 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <div className="flex space-x-1">
                      <div
                        className="w-2 h-2 bg-white rounded-full animate-ping"
                        style={{ animationDelay: "0s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-white/70 rounded-full animate-ping"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-white/40 rounded-full animate-ping"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>

                  <div className="text-center text-white">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform duration-300">
                      <svg
                        className="w-10 h-10 text-white animate-pulse"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <p className="text-white/80 text-sm">Modern Solutions</p>
                  </div>
                </div>
              )}
              {/* Floating accent elements */}
              <div
                className="absolute -top-4 -right-4 w-8 h-8 rounded-full shadow-lg"
                style={{
                  background: theme?.secondaryColor || "#666",
                }}
              ></div>
              <div
                className="absolute -bottom-4 -left-4 w-6 h-6 rounded-full shadow-lg"
                style={{
                  background: theme?.primaryColor || "#000",
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
