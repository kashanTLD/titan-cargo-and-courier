"use client";

import React, { useMemo } from "react";
import { useLandingPageData } from "@/components/LandingPageDataProvider";

interface BannerProps {
  title: string;
  image?: string; // Optional explicit URL override
  slotName?: string; // Optional: prefer a specific slot from context images
  category?: string; // Optional: prefer a specific category from context images
  heightClassName?: string; // e.g., "h-[60vh]"
}

const Banner: React.FC<BannerProps> = ({ title, image, slotName, category, heightClassName }) => {
  const landing = useLandingPageData();
  const theme = landing?.themeData;

  const resolvedImage = useMemo(() => {
    if (image) return image;
    const imgs = landing?.images || [];
    // Priority: slotName -> category -> hero fallback
    const bySlot = slotName ? imgs.find((img) => img.slotName === slotName)?.imageUrl : undefined;
    if (bySlot) return bySlot;
    const byCategory = category ? imgs.find((img) => img.category === category)?.imageUrl : undefined;
    if (byCategory) return byCategory;
    const hero = imgs.find((img) => img.slotName === "hero-image-1" || img.category === "hero")?.imageUrl;
    return hero;
  }, [image, slotName, category, landing?.images]);

  const hasImage = Boolean(resolvedImage);

  return (
    <section
      className={`relative w-full ${heightClassName ?? "h-[50vh]"} overflow-hidden`}
      aria-label={title}
    >
      {/* Background */}
      {hasImage ? (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${resolvedImage})` }}
          role="img"
          aria-label={title}
        />
      ) : (
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{
            background: `linear-gradient(135deg, ${theme?.primaryColor || "#111827"}, ${theme?.secondaryColor || "#6b7280"})`,
          }}
        />
      )}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 flex h-full w-full items-center justify-center px-4">
        <h1 className="text-center text-3xl sm:text-4xl md:text-5xl font-semibold text-white">
          {title}
        </h1>
      </div>
    </section>
  );
};

export default Banner;
