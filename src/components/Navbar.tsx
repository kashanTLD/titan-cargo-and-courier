"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useLandingPageData } from "@/components/LandingPageDataProvider";

interface NavbarProps {
  businessName?: string;
  themeData?: {
    primaryColor: string;
    secondaryColor: string;
  };
  phoneNumber?: string;
}

export default function Navbar({
  businessName,
  themeData,
  phoneNumber,
}: NavbarProps) {
  // Helper to apply alpha to any CSS color (hex, rgb, rgba). Falls back to original color.
  const withAlpha = (color?: string, alpha: number = 1): string | undefined => {
    if (!color) return undefined;
    const a = Math.max(0, Math.min(1, alpha));
    const hexMatch = color.match(/^#([\da-f]{3}|[\da-f]{6})$/i);
    if (hexMatch) {
      let hex = hexMatch[1];
      if (hex.length === 3) {
        hex = hex.split('').map((c) => c + c).join('');
      }
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      return `rgba(${r}, ${g}, ${b}, ${a})`;
    }
    const rgbMatch = color.match(/^rgba?\(([^)]+)\)$/i);
    if (rgbMatch) {
      const parts = rgbMatch[1].split(',').map((p) => p.trim());
      const r = parseInt(parts[0], 10) || 0;
      const g = parseInt(parts[1], 10) || 0;
      const b = parseInt(parts[2], 10) || 0;
      return `rgba(${r}, ${g}, ${b}, ${a})`;
    }
    // Unsupported format (e.g., named color); return as-is without alpha
    return color;
  };
  const landing = useLandingPageData();
  const resolvedBusinessName = businessName || landing?.businessName || "Business";
  const resolvedTheme = themeData || landing?.themeData;
  const resolvedPhone = phoneNumber || landing?.businessData?.phone;
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine if scrolled past threshold
      setIsScrolled(currentScrollY > 50);
      
      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (resolvedTheme) {
      const root = document.documentElement;
      root.style.setProperty('--theme-primary-color', resolvedTheme.primaryColor);
      root.style.setProperty('--theme-secondary-color', resolvedTheme.secondaryColor);
      root.style.setProperty('--theme-primary-color-border', `${resolvedTheme.primaryColor}40`);
      root.style.setProperty('--theme-primary-color-shadow', `${resolvedTheme.primaryColor}30`);
      root.style.setProperty('--theme-primary-color-shadow-hover', `${resolvedTheme.primaryColor}40`);
      root.style.setProperty('--theme-primary-color-shimmer', `${resolvedTheme.primaryColor}20`);
      root.style.setProperty('--theme-primary-color-glow', `${resolvedTheme.primaryColor}20`);
      root.style.setProperty('--theme-secondary-color-glow', `${resolvedTheme.secondaryColor}15`);
    }
  }, [resolvedTheme]);

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
      } ${!isVisible ? '-translate-y-full' : 'translate-y-0'}`} style={{ 
        background: `linear-gradient(135deg, ${withAlpha(resolvedTheme?.secondaryColor, 0.8)} 0%, ${withAlpha(resolvedTheme?.primaryColor, 0.8)} 80%, ${withAlpha(resolvedTheme?.secondaryColor, 0.8)} 100%)`,
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        boxShadow: `0 4px 20px ${withAlpha(resolvedTheme?.primaryColor, 0.25)}`
      }}>
        <div className="minimal-navbar-container">
          {/* Left Logo */}
          <div className="minimal-logo-container">
            <Link href="/" className="minimal-logo-link">
            <Image alt="logo" src={'/logo.png' }  width={50} height={50} />
             
                <h1 className="minimal-logo-text text-white">
                  {resolvedBusinessName}
                </h1>
              
            </Link>
          </div>

          {/* Center Navigation */}
          <div className="hidden lg:flex items-center justify-center flex-1 space-x-6">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className="minimal-nav-link group"
              >
                <span className="text-white">{item.label}</span>
                <div className="minimal-nav-underline" style={{ backgroundColor: resolvedTheme?.primaryColor }}></div>
              </Link>
            ))}
          </div>

          {/* Right CTA Button */}
          <div className="hidden lg:flex items-center">
            <Link
              href={resolvedPhone ? `tel:${resolvedPhone}` : "#"}
              className="minimal-cta-button"
              style={{
                background: `linear-gradient(135deg, ${resolvedTheme?.primaryColor} 0%, ${resolvedTheme?.secondaryColor} 100%)`,
                color: 'white',
                borderRadius: '30px',
                boxShadow: `0 4px 15px ${resolvedTheme?.primaryColor}40`
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
                <span style={{ backgroundColor: resolvedTheme?.primaryColor }}></span>
                <span style={{ backgroundColor: resolvedTheme?.primaryColor }}></span>
                <span style={{ backgroundColor: resolvedTheme?.primaryColor }}></span>
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
            background: `linear-gradient(135deg, ${withAlpha(resolvedTheme?.primaryColor, 0.08)} 0%, ${withAlpha(resolvedTheme?.secondaryColor, 0.08)} 25%, ${withAlpha(resolvedTheme?.primaryColor, 0.06)} 50%, ${withAlpha(resolvedTheme?.secondaryColor, 0.06)} 75%, ${withAlpha(resolvedTheme?.primaryColor, 0.08)} 100%)`
          }}
        >
          <div className="luxury-mobile-content">
            {/* Mobile Logo */}
            <div className="luxury-mobile-logo">
              <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-4">
                <Image alt="logo" src={'/logo.png' }  width={40} height={40} />
                <h1 className="luxury-mobile-logo-text">
                  {resolvedBusinessName}
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
                href={resolvedPhone ? `tel:${resolvedPhone}` : "#"}
                className="luxury-mobile-cta-button group"
                style={{
                  background: `linear-gradient(135deg, ${resolvedTheme?.primaryColor} 0%, ${resolvedTheme?.secondaryColor} 100%)`
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
                style={{ backgroundColor: withAlpha(resolvedTheme?.primaryColor, 0.125) }}
              ></div>
              <div 
                className="luxury-mobile-decoration luxury-mobile-decoration-2"
                style={{ backgroundColor: withAlpha(resolvedTheme?.secondaryColor, 0.125) }}
              ></div>
              <div 
                className="luxury-mobile-decoration luxury-mobile-decoration-3"
                style={{ backgroundColor: withAlpha(resolvedTheme?.primaryColor, 0.125) }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
