"use client";

import Image from "next/image";
import { useLandingPageData } from "@/components/LandingPageDataProvider";
import { useMemo } from "react";
import type { Image as TemplateImage } from "@/types/template";

export default function AboutSectionLocal() {
  const landing = useLandingPageData();
  const images = useMemo(
    () => (landing?.images || []).filter((img: TemplateImage) => img.slotName.includes("about") || img.category === "about"),
    [landing]
  );

  // Note: computed values from theme/about are not used in this static copy block

  return (
    <section id="about" className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col gap-10">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Who We Are? Professional & Local Courier OR Cargo Moving Contractor
            </h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
            Titan Cargo and Courier is your premier professional & local courier and cargo moving contractor dedicated to excellence. We are a trusted Philadelphia-based company specializing in seamless residential, commercial, and freight transport solutions. Our skilled team provides reliable logistics with an unwavering customer-centric approach, ensuring every delivery and move is handled with maximum care and efficiency, all at affordable rates.
            </p>

          

            
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 overflow-hidden rounded-xl border border-slate-200">
                {images[0]?.imageUrl ? (
                  <Image src={images[0].imageUrl} alt={images[0].slotName} width={1000} height={700} className="h-[500px] w-full object-cover" />
                ) : (
                  <div className="h-[500px] w-full bg-slate-100" />
                )}
              </div>
             
            </div>
          </div>
        </div>
        <div className="grid items-center gap-12 lg:grid-cols-2">
        

          <div className="relative h-full">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 overflow-hidden rounded-xl border border-slate-200">
                {images[1]?.imageUrl ? (
                  <Image src={images[1].imageUrl} alt={images[1].slotName} width={1000} height={700} className="h-[500px] w-full object-cover" />
                ) : (
                  <div className="h-[500px] w-full bg-slate-100" />
                )}
              </div>
             
            </div>
          </div>
          <div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Why Choose Titan Cargo and Courier Contractor For Your Residential or Commercial Buildings Material Moving Contractor?
            </h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
            When it comes to specialized logistics, choose the Titan Cargo and Courier Contractor. We are the skilled moving contractor providing reliable service for all residential or commercial buildings material moving. Our unique expertise handles bulky or sensitive construction freight with safety and precision. We offer affordable solutions and a dedicated customer-centric approach to keep your project on schedule and budget.
            </p>

          

            
          </div>
        </div>
      </div>
    </section>
  );
}

