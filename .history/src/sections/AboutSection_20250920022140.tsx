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
      className="py-20 lg:py-28 relative"
      style={{
        background: `white
      }}
    >
      {/* Decorative Split Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to top right, ${theme?.primaryColor}10 40%, transparent 70%),
                       linear-gradient(to bottom left, ${theme?.secondaryColor}10 40%, transparent 70%)`,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left - Content */}
        <div>
          {/* Title */}
          <h2
            ref={titleRef}
            className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-6 transition-all duration-1000 ${
              titleVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
            }`}
            style={{
              background: `linear-gradient(90deg, ${theme?.primaryColor}, ${theme?.secondaryColor})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {title}
          </h2>

          {/* Description */}
          <p
            ref={descRef}
            className={`text-lg sm:text-xl text-gray-700 mb-10 leading-relaxed transition-all duration-1000 delay-150 ${
              descVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            {description}
          </p>

          {/* Features - Vertical timeline style */}
          {features && features.length > 0 && (
            <div ref={featuresRef} className="space-y-6 mb-10">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-4 transition-all duration-500 ${
                    visibleItems.includes(index)
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-6"
                  }`}
                >
                  <div
                    className="w-9 h-9 flex items-center justify-center rounded-full shadow-md shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${theme?.primaryColor}, ${theme?.secondaryColor})`,
                    }}
                  >
                    <svg
                      className="w-5 h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 
                        8a1 1 0 01-1.414 0l-4-4a1 1 
                        0 011.414-1.414L8 12.586l7.293-7.293a1 1 
                        0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-800 font-medium">{feature}</span>
                </div>
              ))}
            </div>
          )}

          {/* CTA Button */}
          {ctaButton && (
            <a
              href={ctaButton.href}
              className="inline-block px-10 py-4 rounded-full font-semibold text-white shadow-lg hover:scale-105 transition-transform duration-300"
              style={{
                background: `linear-gradient(90deg, ${theme?.primaryColor}, ${theme?.secondaryColor})`,
                boxShadow: `0 4px 20px ${theme?.primaryColor}40`,
              }}
            >
              {ctaButton.label}
            </a>
          )}
        </div>

        {/* Right - Image */}
        <div
          ref={imageRef}
          className={`relative transition-all duration-1000 delay-300 ${
            imageVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {image ? (
            <div className="rounded-2xl overflow-hidden shadow-xl transform hover:rotate-1 hover:scale-105 transition-transform duration-500">
              <Image
                src={image}
                alt="About us"
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div
              className="aspect-square rounded-2xl flex items-center justify-center text-white shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${theme?.primaryColor}, ${theme?.secondaryColor})`,
              }}
            >
              <p className="text-lg font-semibold">About Visual</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
