"use client";

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
  if (!serviceAreas || serviceAreas.length === 0) {
    return null;
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden bg-gray-100">
      {/* Background decoration */}
      <div
        className="absolute top-0 right-0 w-96 h-96 opacity-10 rounded-full blur-3xl"
        style={{
          background: themeData
            ? `radial-gradient(circle, ${themeData.primaryColor}20, transparent)`
            : "rgba(59, 130, 246, 0.1)",
        }}
      ></div>
      <div
        className="absolute bottom-0 left-0 w-80 h-80 opacity-5 rounded-full blur-2xl"
        style={{
          background: themeData
            ? `radial-gradient(circle, ${themeData.secondaryColor}20, transparent)`
            : "rgba(16, 185, 129, 0.1)",
        }}
      ></div>

      <div className="px-4 sm:px-6 md:px-10 lg:px-20 relative">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold mb-4 sm:mb-6"
            style={{
              background: themeData
                ? `linear-gradient(135deg, ${themeData.primaryColor}, ${themeData.secondaryColor})`
                : "linear-gradient(135deg, #1f2937, #374151)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Service Areas
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            We proudly serve communities across the region, bringing
            professional services directly to your neighborhood.
          </p>
        </div>

        {/* Service Areas Grid */}
        <div className="flex flex-wrap gap-8 items-center justify-center">
          {serviceAreas.map((area, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 w-full md:w-[500px] md:h-[400px justify-center]"
            >
              {/* Location Icon */}
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                style={{
                  background: themeData
                    ? `linear-gradient(135deg, ${themeData.primaryColor}15, ${themeData.secondaryColor}15)`
                    : "linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(16, 185, 129, 0.1))",
                }}
              >
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  style={{ color: themeData?.primaryColor || "#3b82f6" }}
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
              </div>

              {/* Content */}
              <div>
                <h3 className="text-2xl font-bold mb-2 text-gray-900">
                  {area.city}
                </h3>
                <p
                  className="text-lg font-semibold mb-4"
                  style={{ color: themeData?.primaryColor || "#3b82f6" }}
                >
                  {area.region}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {area.description}
                </p>
              </div>

              {/* Hover Effect Border */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: themeData
                    ? `linear-gradient(135deg, ${themeData.primaryColor}10, ${themeData.secondaryColor}10)`
                    : "linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(16, 185, 129, 0.05))",
                  border: `2px solid ${themeData?.primaryColor || "#3b82f6"}20`,
                }}
              ></div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 max-w-2xl mx-auto">
            <h3 className="text-xl sm:text-2xl md:text-2xl lg:text-2xl font-bold mb-4 text-gray-900">
              Don&apos;t See Your Area?
            </h3>
            <p className="text-gray-600 mb-6">
              We&apos;re always expanding our service areas. Contact us to discuss
              availability in your location.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              style={{
                background: themeData
                  ? `linear-gradient(135deg, ${themeData.primaryColor}, ${themeData.secondaryColor})`
                  : "linear-gradient(135deg, #3b82f6, #10b981)",
              }}
            >
              Contact Us
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
