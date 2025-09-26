"use client";

import { useLandingPageData } from "@/components/LandingPageDataProvider";
import { useEffect, useState } from "react";

export default function ContactInfoSection() {
  const landingPageData = useLandingPageData();
  const theme = landingPageData?.themeData;
  const businessData = landingPageData?.businessData;
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Get contact info from businessData
  const address = businessData?.address ? 
    `${businessData.address.street}, ${businessData.address.city}, ${businessData.address.state} ${businessData.address.zipCode}` :
    "123 Business Street, New York, NY 10001";

  const contactInfo = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: "Phone Support",
      description: "Speak directly with our customer service team",
      contact: businessData?.phone || "+1 (555) 123-4567",
      action: "Call Now",
      href: `tel:${businessData?.phone?.replace(/\D/g, '') || '15551234567'}`
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Email Support",
      description: "Send us your questions and we'll respond within 24 hours",
      contact: businessData?.email || "info@titan-cargo.com",
      action: "Send Email",
      href: `mailto:${businessData?.email || "info@titan-cargo.com"}`
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Visit Our Office",
      description: "Come see us in person for personalized service",
      contact: address,
      action: "Get Directions",
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
    }
  ];

  // Get business details from serviceHighlights or use defaults
  const serviceHighlights = landingPageData?.content?.serviceHighlights;
  const businessDetails = serviceHighlights?.services && serviceHighlights.services.length > 0 ? [
    {
      title: "Services Offered",
      value: serviceHighlights.services.length.toString(),
      description: "Professional services available"
    },
    {
      title: "Service Areas",
      value: businessData?.serviceAreas?.length ? `${businessData.serviceAreas.length}+` : "25+",
      description: "Cities and regions served"
    },
    {
      title: "Years Experience",
      value: "8+",
      description: "Years of reliable service"
    },
    {
      title: "Customer Satisfaction",
      value: "99%",
      description: "Happy customers"
    }
  ] : [
    {
      title: "Company Founded",
      value: "2015",
      description: "Over 8 years of reliable service"
    },
    {
      title: "Team Members",
      value: "50+",
      description: "Dedicated professionals"
    },
    {
      title: "Countries Served",
      value: "25+",
      description: "Global shipping network"
    },
    {
      title: "Packages Delivered",
      value: "1M+",
      description: "Successful deliveries"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 
            className={`text-3xl md:text-4xl font-bold text-gray-900 mb-4 transition-all duration-1000 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Get In Touch
          </h2>
          <p 
            className={`text-lg text-gray-600 max-w-2xl mx-auto transition-all duration-1000 delay-200 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Multiple ways to reach us. Choose the method that works best for you.
          </p>
        </div>

        {/* Contact Methods Grid */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-16">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-2 w-[300px] md:w-[380px] lg:w-[450px] md:min-h-[300px] ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: `${0.3 + index * 0.1}s`
              }}
            >
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                style={{
                  background: `linear-gradient(135deg, ${theme?.primaryColor}15, ${theme?.secondaryColor}15)`,
                  color: theme?.primaryColor
                }}
              >
                {info.icon}
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {info.title}
              </h3>
              
              <p className="text-gray-600 text-sm mb-4">
                {info.description}
              </p>
              
              <p className="text-gray-800 font-medium mb-4">
                {info.contact}
              </p>
              
              <a
                href={info.href}
                className={`inline-block px-4 py-2 rounded-lg font-medium text-white transition-all duration-300 hover:shadow-lg ${
                  info.title === "Live Chat" ? "opacity-50 cursor-not-allowed" : ""
                }`}
                style={{
                  background: info.title === "Live Chat" 
                    ? "#9CA3AF" 
                    : `linear-gradient(135deg, ${theme?.primaryColor}, ${theme?.secondaryColor})`
                }}
                onClick={(e) => {
                  if (info.title === "Live Chat") {
                    e.preventDefault();
                  }
                }}
              >
                {info.action}
              </a>
            </div>
          ))}
        </div>

        {/* Business Details Section */}
        <div className="bg-gray-50 rounded-3xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h3 
              className={`text-2xl md:text-3xl font-bold text-gray-900 mb-4 transition-all duration-1000 delay-700 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Why Choose {landingPageData?.businessName || "Titan Cargo & Courier"}?
            </h3>
            <p 
              className={`text-gray-600 max-w-2xl mx-auto transition-all duration-1000 delay-800 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Trusted by thousands of customers worldwide for reliable, fast, and secure shipping services.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {businessDetails.map((detail, index) => (
              <div
                key={index}
                className={`text-center transition-all duration-1000 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: `${0.9 + index * 0.1}s`
                }}
              >
                <div 
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{
                    background: `linear-gradient(135deg, ${theme?.primaryColor}, ${theme?.secondaryColor})`
                  }}
                >
                  <span className="text-2xl font-bold text-white">
                    {detail.value}
                  </span>
                </div>
                
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {detail.title}
                </h4>
                
                <p className="text-gray-600 text-sm">
                  {detail.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Business Information */}
        <div 
          className={`mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 delay-1200 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-center">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{
                background: `linear-gradient(135deg, ${theme?.primaryColor}15, ${theme?.secondaryColor}15)`
              }}
            >
              <svg className="w-8 h-8" style={{ color: theme?.primaryColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">Fully Insured</h4>
            <p className="text-gray-600">All shipments are fully insured for your peace of mind.</p>
          </div>

          <div className="text-center">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{
                background: `linear-gradient(135deg, ${theme?.primaryColor}15, ${theme?.secondaryColor}15)`
              }}
            >
              <svg className="w-8 h-8" style={{ color: theme?.primaryColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">24/7 Tracking</h4>
            <p className="text-gray-600">Real-time tracking updates for all your shipments.</p>
          </div>

          <div className="text-center">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{
                background: `linear-gradient(135deg, ${theme?.primaryColor}15, ${theme?.secondaryColor}15)`
              }}
            >
              <svg className="w-8 h-8" style={{ color: theme?.primaryColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">Fast Delivery</h4>
            <p className="text-gray-600">Express delivery options available for urgent shipments.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
