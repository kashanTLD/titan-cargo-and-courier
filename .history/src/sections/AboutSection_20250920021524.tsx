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
    120
  );
  const { ref: imageRef, isVisible: imageVisible } =
    useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });

  return (
    <section
      id="about"
      className="py-16 sm:py-20 lg:py-24 relative min-h-screen flex items-center"
      style={{
        background: `linear-gradient(135deg, ${theme?.primaryColor}20, ${theme?.secondaryColor}20)`,
      }}
    >
      {/* Soft Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at top left, ${theme?.primaryColor}10, transparent 60%), 
                       radial-gradient(circle at bottom right, ${theme?.secondaryColor}10, transparent 60%)`,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Title */}
        <h2
          ref={titleRef}
          className={`text-center text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-10 transition-all duration-1000 ${
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{
            background: `linear-gradient(90deg, ${theme?.primaryColor}, ${theme?.secondaryColor})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {title}
        </h2>

        {/* Grid Layout */}
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left Column - Text */}
          <div>
            <p
              ref={descRef}
              className={`text-lg sm:text-xl text-gray-700 mb-8 leading-relaxed transition-all duration-1000 delay-200 ${
                descVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              {description}
            </p>

            {/* Features */}
            {features && features.length > 0 && (
              <div ref={featuresRef} className="space-y-4 mb-8">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className={`flex items-center p-4 rounded-lg bg-white shadow-md transition-all duration-500 ${
                      visibleItems.includes(index)
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 translate-x-6"
                    }`}
                  >
                    <div
                      className="w-10 h-10 flex items-center justify-center rounded-full mr-4 shadow"
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
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 
                          0 01-1.414 0l-4-4a1 1 
                          0 011.414-1.414L8 12.586l7.293-7.293a1 1 
                          0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="font-medium text-gray-800">{feature}</span>
                  </div>
                ))}
              </div>
            )}

            {/* CTA Button */}
            {ctaButton && (
              <a
                href={ctaButton.href}
                className="inline-block px-8 py-4 rounded-lg font-semibold text-white transition-transform duration-300 shadow-lg hover:scale-105"
                style={{
                  background: `linear-gradient(90deg, ${theme?.primaryColor}, ${theme?.secondaryColor})`,
                }}
              >
                {ctaButton.label}
              </a>
            )}
          </div>

          {/* Right Column - Image */}
          <div
            ref={imageRef}
            className={`relative transition-all duration-1000 delay-300 ${
              imageVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            {image ? (
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src={image}
                  alt="About us"
                  width={600}
                  height={600}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
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
      </div>
    </section>
  );
}
