"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

interface NavbarProps {
  businessName?: string;
  logoImage?: string;
  themeData?: {
    primaryColor: string;
    secondaryColor: string;
  };
  phoneNumber?: string;
}

export default function Navbar({
  businessName = "Business",
  logoImage,
  themeData,
  phoneNumber,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (themeData) {
      const root = document.documentElement;
      root.style.setProperty('--theme-primary-color', themeData.primaryColor);
      root.style.setProperty('--theme-secondary-color', themeData.secondaryColor);
      root.style.setProperty('--theme-primary-color-border', `${themeData.primaryColor}40`);
      root.style.setProperty('--theme-primary-color-shadow', `${themeData.primaryColor}30`);
      root.style.setProperty('--theme-primary-color-shadow-hover', `${themeData.primaryColor}40`);
      root.style.setProperty('--theme-primary-color-shimmer', `${themeData.primaryColor}20`);
      root.style.setProperty('--theme-primary-color-glow', `${themeData.primaryColor}20`);
      root.style.setProperty('--theme-secondary-color-glow', `${themeData.secondaryColor}15`);
    }
  }, [themeData]);

  const navItems = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <>
      {/* Minimal Line Accent Navbar */}
      <nav className={`minimal-navbar transition-all duration-300 ${
        isScrolled ? 'minimal-navbar-scrolled' : ''
      }`} style={{ 
        backgroundColor: 'white', 
        borderBottom: `3px solid ${themeData?.primaryColor || '#d4a574'}` 
      }}>
        <div className="minimal-navbar-container">
          {/* Left Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navItems.slice(0, 2).map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className="minimal-nav-link group"
              >
                {item.label}
                <div className="minimal-nav-underline" style={{ backgroundColor: themeData?.primaryColor }}></div>
              </Link>
            ))}
          </div>

          {/* Center Logo */}
          <div className="minimal-logo-container">
            <Link href="/" className="minimal-logo-link">
              {logoImage ? (
                <div className="flex items-center gap-3">
                  <Image
                    src={logoImage}
                    alt={`${businessName} Logo`}
                    width={40}
                    height={40}
                    className="minimal-logo-image"
                    priority
                  />
                  <h1 className="minimal-logo-text">
                    {businessName}
                  </h1>
                </div>
              ) : (
                <h1 className="minimal-logo-text">
                  {businessName}
                </h1>
              )}
            </Link>
          </div>

          {/* Right Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navItems.slice(2).map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className="minimal-nav-link group"
              >
                {item.label}
                <div className="minimal-nav-underline" style={{ backgroundColor: themeData?.primaryColor }}></div>
              </Link>
            ))}
            <Link
              href={phoneNumber ? `tel:${phoneNumber}` : "#"}
              className="minimal-cta-button"
              style={{
                backgroundColor: themeData?.primaryColor,
                color: 'white'
              }}
            >
              Call Us
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="minimal-mobile-button"
            >
              <div className={`minimal-hamburger ${isOpen ? 'minimal-hamburger-open' : ''}`}>
                <span style={{ backgroundColor: themeData?.primaryColor }}></span>
                <span style={{ backgroundColor: themeData?.primaryColor }}></span>
                <span style={{ backgroundColor: themeData?.primaryColor }}></span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Luxury Full-Screen Mobile Menu */}
      {isOpen && (
        <div 
          className="luxury-mobile-overlay"
          style={{
            background: `linear-gradient(135deg, ${themeData?.primaryColor}15 0%, ${themeData?.secondaryColor}15 25%, ${themeData?.primaryColor}10 50%, ${themeData?.secondaryColor}10 75%, ${themeData?.primaryColor}15 100%)`
          }}
        >
          <div className="luxury-mobile-content">
            {/* Mobile Logo */}
            <div className="luxury-mobile-logo">
              <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-4">
                {logoImage && (
                  <div 
                    className="luxury-mobile-logo-frame"
                    style={{
                      borderColor: `${themeData?.primaryColor}40`
                    }}
                  >
                    <Image
                      src={logoImage}
                      alt={`${businessName} Logo`}
                      width={60}
                      height={60}
                      className="luxury-mobile-logo-image"
                    />
                  </div>
                )}
                <h1 className="luxury-mobile-logo-text">
                  {businessName}
                </h1>
              </Link>
            </div>

            {/* Mobile Navigation */}
            <nav className="luxury-mobile-nav">
              {navItems.map((item, index) => (
                <Link
                  key={item.href}
                  onClick={() => setIsOpen(false)}
                  href={item.href}
                  className="luxury-mobile-link group"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <span className="luxury-mobile-link-text">{item.label}</span>
                  <div className="luxury-mobile-link-shimmer"></div>
                </Link>
              ))}
            </nav>

            {/* Mobile CTA */}
            <div className="luxury-mobile-cta-container">
              <Link
                onClick={() => setIsOpen(false)}
                href={phoneNumber ? `tel:${phoneNumber}` : "#"}
                className="luxury-mobile-cta-button group"
                style={{
                  background: `linear-gradient(135deg, ${themeData?.primaryColor} 0%, ${themeData?.secondaryColor} 100%)`
                }}
              >
                <span className="luxury-mobile-cta-text">Call Us Now</span>
                <div className="luxury-mobile-cta-shimmer"></div>
                <svg className="w-6 h-6 ml-3 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </Link>
            </div>

            {/* Decorative Elements */}
            <div className="luxury-mobile-decorations">
              <div 
                className="luxury-mobile-decoration luxury-mobile-decoration-1"
                style={{ backgroundColor: `${themeData?.primaryColor}20` }}
              ></div>
              <div 
                className="luxury-mobile-decoration luxury-mobile-decoration-2"
                style={{ backgroundColor: `${themeData?.secondaryColor}20` }}
              ></div>
              <div 
                className="luxury-mobile-decoration luxury-mobile-decoration-3"
                style={{ backgroundColor: `${themeData?.primaryColor}20` }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
