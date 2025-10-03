"use client";

import { useLandingPageData } from "@/components/LandingPageDataProvider";
import type { ServiceHighlightsContent } from "@/types/template";
import Image from "next/image";

export default function ServiceHighlightsLocal() {
  const landing = useLandingPageData();
  const theme = landing?.themeData;
  const data = landing?.content?.serviceHighlights || { title: "", description: "", services: [] };

  const primary = theme?.primaryColor || "#0f172a";
  const secondary = theme?.secondaryColor || "#334155";

  return (
    <section id="service-highlights" className="py-20 bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left: Text */}
          <div>
            <div className="mx-auto max-w-2xl lg:mx-0">
              <span
                className="inline-block rounded-full px-3 py-1 text-xs font-medium"
                style={{ backgroundColor: `${primary}1A`, color: primary }}
              >
                Our Edge
              </span>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                {data.title}
              </h2>
              <p className="mt-3 text-slate-600">{data.description}</p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
              {data.services?.map((s: ServiceHighlightsContent["services"][number], idx: number) => (
                <div
                  key={idx}
                  className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-semibold" style={{ color: primary }}>
                      {/* show only number part of description if includes symbols */}
                      {s.description}
                    </div>
                    <div
                      className="h-10 w-10 rounded-lg"
                      style={{ background: `linear-gradient(135deg, ${primary}, ${secondary})` }}
                    />
                  </div>
                  <h3 className="mt-4 text-slate-800 font-medium">{s.name}</h3>
                  <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-1"
                      style={{ width: "100%", background: `linear-gradient(90deg, ${primary}, ${secondary})` }}
                    />
                  </div>
                </div>
              ))}
              {(!data.services || data.services.length === 0) && (
                <div className="col-span-full text-center text-slate-500">No service highlights available</div>
              )}
            </div>
          </div>

          {/* Right: Image */}
          <div className="relative h-full">
            <Image
              src="/about-us-service-highlights.jpg"
              alt="Service highlights"
              width={1200}
              height={900}
              priority={false}
              className="w-full h-full rounded-2xl shadow-lg object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
