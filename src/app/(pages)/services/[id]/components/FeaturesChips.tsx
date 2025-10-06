  import React from "react";
import { useLandingPageData } from "@/components/LandingPageDataProvider";

export default function FeaturesChips({ features }: { features: string[] }) {
  const landing = useLandingPageData();
  if (!features?.length) return null;
  const primary = landing?.themeData?.primaryColor || "#6366F1"; // indigo-500
  const secondary = landing?.themeData?.secondaryColor || "#A855F7"; // purple-500
  const panelBg = `linear-gradient(135deg, ${hexToRgba(primary, 0.08)}, ${hexToRgba(secondary, 0.08)})`;
  const iconBg = `linear-gradient(135deg, ${primary}, ${secondary})`;

  function hexToRgba(hex: string, alpha = 1) {
    const shorthand = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthand, (_m, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return `rgba(99,102,241,${alpha})`;
    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  return (
    <div id="features" className="border-t border-gray-100 pt-8">
      <h3 className="text-xl md:text-2xl font-semibold text-gray-900">What’s included</h3>

      {/* Gradient panel */}
      <div
        className="mt-4 rounded-2xl p-4 sm:p-6 border border-gray-200 shadow-sm"
        style={{ background: panelBg }}
      >
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {features.map((f, i) => (
            <li
              key={i}
              className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/80 backdrop-blur border border-gray-200 shadow-sm hover:shadow-md transition"
            >
              {/* Icon */}
              <span
                className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-white shrink-0"
                style={{ background: iconBg }}
                aria-hidden
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3.5-3.5a1 1 0 111.414-1.414l2.793 2.793 6.543-6.543a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <span className="text-sm font-medium text-gray-800">{f}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

