"use client";

import { Image } from "@/types/template";
import NextImage from "next/image";
import { useState } from "react";
import { useLandingPageData } from "@/components/LandingPageDataProvider";

interface GalleryImage {
  id: string;
  slotName: string;
  title: string;
  altText: string;
  imageUrl: string;
  category: string;
}

interface GallerySectionProps {
  title?: string;
  description?: string;
  images?: Image[];
}

export default function GallerySection({
  title,
  description,
  images,
}: GallerySectionProps) {
  const landing = useLandingPageData();
  const resolvedTitle = title || landing?.content?.gallery?.title || "Gallery";
  const resolvedDescription = description || landing?.content?.gallery?.description || "";
  const resolvedImages = images ?? landing?.images?.filter((img)=> img.category === 'gallery' || img.slotName === 'gallery');
  // Fallback sample images
  const galleryImages: Image[] =
    resolvedImages && resolvedImages.length > 0
      ? resolvedImages
      : [
          {
            id: "1",
            slotName: "gallery",
            title: "Sunset Mountains",
            altText: "Beautiful mountain sunset",
            imageUrl:
              "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800",
            category: "gallery",
            landingPageId: "default",
            createdAt: new Date().toISOString(),
          },
          {
            id: "2",
            slotName: "gallery",
            title: "Starry Night",
            altText: "Starry night over mountains",
            imageUrl:
              "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800",
            category: "gallery",
            landingPageId: "default",
            createdAt: new Date().toISOString(),
          },
          {
            id: "3",
            slotName: "gallery",
            title: "Coastal View",
            altText: "Ocean and rocks",
            imageUrl:
              "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
            category: "gallery",
            landingPageId: "default",
            createdAt: new Date().toISOString(),
          },
          {
            id: "4",
            slotName: "gallery",
            title: "Friends Hiking",
            altText: "Group of friends hiking",
            imageUrl:
              "https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=800",
            category: "gallery",
            landingPageId: "default",
            createdAt: new Date().toISOString(),
          },
          {
            id: "5",
            slotName: "gallery",
            title: "Work & Coffee",
            altText: "Laptop and coffee",
            imageUrl:
              "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?w=800",
            category: "gallery",
            landingPageId: "default",
            createdAt: new Date().toISOString(),
          },
        ];

  const [selectedImage, setSelectedImage] = useState<GalleryImage>(
    galleryImages[0]
  );

  return (
    <section
      id="gallery"
      className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-[clamp(2.5rem,6vw,4rem)] font-light leading-[1] tracking-[-0.03em] text-[#1a1a1a] font-serif mb-4 text-primary">{resolvedTitle}</h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            {resolvedDescription}
          </p>
        </div>

        {/* Main Layout */}
        <div className="flex flex-col lg:flex-row items-start gap-6">
          {/* Large Selected Image */}
          <div className="flex-1 rounded-2xl overflow-hidden shadow-xl">
            <NextImage
              src={selectedImage.imageUrl}
              alt={selectedImage.altText}
              width={800}
              height={500}
              className="w-full h-[500px] object-cover"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex lg:flex-col gap-4 w-full lg:w-64">
            {galleryImages.map((image) => (
              <button
                key={image.id}
                onClick={() => setSelectedImage(image)}
                className={`relative rounded-xl overflow-hidden shadow-md border-2 transition-all duration-300 ${
                  selectedImage.id === image.id
                    ? "border-gray-800 scale-105"
                    : "border-transparent hover:scale-105"
                }`}
              >
                <NextImage
                  src={image.imageUrl}
                  alt={image.altText}
                  width={256}
                  height={112}
                  className="w-full h-28 object-cover"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white text-sm font-medium">
                  {image.title}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
