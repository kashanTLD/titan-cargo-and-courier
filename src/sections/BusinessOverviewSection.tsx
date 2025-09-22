"use client";

import Map from "@/components/Map";
import {
  useScrollAnimation,
  useStaggeredAnimation,
} from "@/hooks/useScrollAnimation";

interface Schedule {
  day: string;
  periods?: Array<{
    open: string;
    close?: string;
  }>;
}

interface BusinessHours {
  schedule?: Schedule[];
}

interface BusinessOverviewSectionProps {
  content: Array<{
    heading: string;
    description: string;
    ctaButton: {
      href: string;
      label: string;
    };
  }>;
  contact?: {
    title: string;
    description: string;
    showMap: boolean;
  };
  businessData?: {
    email: string;
    phone: string;
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
    };
    coordinates: {
      latitude: number;
      longitude: number;
    };
    hours?: BusinessHours;
  };
  theme?: {
    primaryColor: string;
    secondaryColor: string;
  };
}

export default function BusinessOverviewSection({
  content,
  contact,
  businessData,
  theme,
}: BusinessOverviewSectionProps) {
  const { ref: contentRef, visibleItems: contentVisible } =
    useStaggeredAnimation(content.length, 200);
  const { ref: mapRef, isVisible: mapVisible } =
    useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
  const { ref: formRef, isVisible: formVisible } =
    useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
  const { ref: contactRef, isVisible: contactVisible } =
    useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
  return (
    <section
      id="business-overview"
      className="py-20 relative"
      style={{
        background: theme
          ? `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})`
          : "#f9fafb",
      }}
    >
      {/* Background decoration with floating animation */}
      <div
        className="absolute top-0 left-0 w-96 h-96 opacity-8 rounded-full blur-3xl animate-pulse"
        style={{
          background: theme
            ? `linear-gradient(135deg, ${theme.secondaryColor}, ${theme.primaryColor})`
            : "#666",
          animationDuration: "5s",
        }}
      ></div>
      <div
        className="absolute bottom-0 right-0 w-80 h-80 opacity-5 rounded-full blur-2xl animate-bounce"
        style={{
          background: theme
            ? `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})`
            : "#000",
          animationDuration: "7s",
        }}
      ></div>

      <div className="md:max-w-[70vw] w-full mx-auto px-4 sm:px-6 relative ">
        <div className="grid grid-cols-1 lg:grid-cols-3 md:gap-16">
          {/* Left side - Business Overview Content */}
          <div ref={contentRef} className="space-y-16 col-span-2 ">
            {content.map((item, index) => (
              <div
                key={index}
                className={`space-y-8 transition-all duration-700 ${
                  contentVisible.includes(index)
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-8"
                }`}
              >
                <div>
                  <h2 className="section-title text-gray-50 mb-6 hover:scale-105 transition-transform duration-300">
                    {item.heading}
                  </h2>

                  <p className="text-lg text-gray-50 mb-8 leading-relaxed">
                    {item.description}
                  </p>

                  {item.ctaButton && (
                    <a
                      href={item.ctaButton.href}
                      className="inline-block px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:transform hover:-translate-y-1 hover:scale-105 bg-black/70 shadow-black/30 shadow-md group"
                    >
                      <span className="group-hover:animate-pulse">
                        {item.ctaButton.label}
                      </span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Right side - Contact Form and Map */}
          <div className="sticky top-5 self-start space-y-8">
            {/* Map */}
            {contact?.showMap && businessData?.coordinates && (
              <div
                ref={mapRef}
                className={`bg-gray-100 rounded-2xl overflow-hidden h-64 transition-all duration-1000 hover:shadow-2xl ${
                  mapVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <Map
                  latitude={businessData.coordinates.latitude}
                  longitude={businessData.coordinates.longitude}
                  businessName="Business Location"
                  address={`${businessData.address.street}, ${businessData.address.city}, ${businessData.address.state} ${businessData.address.zipCode}`}
                  className="h-full"
                />
              </div>
            )}

            {/* Contact Form */}
            <div
              ref={formRef}
              className={`bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 transition-all duration-1000 hover:bg-white/90 hover:shadow-2xl ${
                formVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Get In Touch
              </h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder:text-gray-500"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder:text-gray-500"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder:text-gray-500"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder:text-gray-500"
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder:text-gray-500"
                    placeholder="Tell us about your project..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:transform hover:-translate-y-1"
                  style={{
                    background: theme
                      ? `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})`
                      : "#000",
                  }}
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Business Contact Info */}
            {businessData && (
              <div
                ref={contactRef}
                className={`rounded-2xl p-8 text-white shadow-lg transition-all duration-1000 hover:shadow-2xl ${
                  contactVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  background: theme
                    ? `linear-gradient(135deg, ${theme.secondaryColor},  ${theme.primaryColor})`
                    : "linear-gradient(135deg, #000, #666)",
                }}
              >
                <h3 className="text-2xl font-bold text-white mb-6">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <span className="text-white/90">{businessData.email}</span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <span className="text-white/90">{businessData.phone}</span>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mt-1">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="text-white/90">
                      <div>{businessData.address.street}</div>
                      <div>
                        {businessData.address.city},{" "}
                        {businessData.address.state}{" "}
                        {businessData.address.zipCode}
                      </div>
                    </div>
                  </div>

                  {/* Business Hours */}
                  {businessData.hours?.schedule && (
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mt-1">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="text-white/90">
                        <div className="font-medium mb-2">Business Hours</div>
                        <div className="space-y-1 text-sm">
                          {businessData.hours.schedule.map((schedule: Schedule, index: number) => (
                            <div key={index} className="flex justify-between min-w-[200px]">
                              <span className="font-medium">{schedule.day}:</span>
                              <span className="ml-4">
                                {schedule.periods && schedule.periods.length > 0 ? (
                                  schedule.periods.map((period: { open: string; close?: string }, i: number) => (
                                    <span key={i}>
                                      {period.open} - {period.close || 'Late'}
                                      {i < (schedule.periods?.length || 0) - 1 && ', '}
                                    </span>
                                  ))
                                ) : 'Closed'}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
