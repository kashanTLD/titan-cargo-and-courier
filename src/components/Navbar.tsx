"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
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
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  // Delay closing of Services dropdown to improve hover usability
  const closeServicesTimeoutRef = useRef<number | null>(null);
  const openServices = () => {
    if (closeServicesTimeoutRef.current) {
      clearTimeout(closeServicesTimeoutRef.current);
      closeServicesTimeoutRef.current = null;
    }
    setServicesOpen(true);
  };
  const scheduleCloseServices = () => {
    if (closeServicesTimeoutRef.current) {
      clearTimeout(closeServicesTimeoutRef.current);
    }
    closeServicesTimeoutRef.current = window.setTimeout(() => {
      setServicesOpen(false);
    }, 400);
  };

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

  // Cleanup any pending close timeout on unmount
  useEffect(() => {
    return () => {
      if (closeServicesTimeoutRef.current) {
        clearTimeout(closeServicesTimeoutRef.current);
      }
    };
  }, []);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about-us", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/reviews", label: "Testimonials" },
    { href: "/contact-us", label: "Contact" },
  ];

  // Build services list from landing page data for dropdown
  const rawServices: unknown[] = Array.isArray(landing?.content?.services?.services)
    ? (landing?.content?.services?.services as unknown[])
    : [];
  const toSlug = (str: string) =>
    String(str || "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  const services = rawServices.map((s, idx) => {
    const obj = (s || {}) as Record<string, unknown>;
    const id = obj.id as string | number | undefined;
    const title = typeof obj.title === 'string' ? obj.title : undefined;
    const name = typeof obj.name === 'string' ? obj.name : undefined;
    const label = String(title ?? name ?? `Service ${idx + 1}`);
    const slug = toSlug(label);
    const href = `/services/${slug || String(id ?? idx + 1)}`;
    return { label, href };
  });

  return (
    <>
      {/* Minimal Line Accent Navbar */}
      <nav className={`minimal-navbar transition-all duration-300 ${
        isScrolled ? 'minimal-navbar-scrolled' : ''
      } ${!isVisible ? '-translate-y-full' : 'translate-y-0'}`} style={{ 
        background: `linear-gradient(135deg, ${withAlpha(resolvedTheme?.secondaryColor, 0.8)} 0%, ${withAlpha(resolvedTheme?.primaryColor, 0.8)} 80%, ${withAlpha(resolvedTheme?.secondaryColor, 0.8)} 100%)`,
        backdropFilter: 'blur(8px)',
        boxShadow: `0 4px 20px ${withAlpha(resolvedTheme?.primaryColor, 0.25)}`
      }}>
        <div className="minimal-navbar-container">
          {/* Left Logo */}
          <div className="minimal-logo-container">
            <Link href="/" replace className="minimal-logo-link">
              <Image alt="logo" src={'/logo.png' }  width={50} height={50} />
            </Link>
          </div>

          {/* Center Navigation */}
          <div className="hidden lg:flex items-center justify-center flex-1 space-x-6">
            {navItems.map((item) => {
              if (item.label === 'Services') {
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={openServices}
                    onMouseLeave={scheduleCloseServices}
                  >
                    <button className="minimal-nav-link group inline-flex items-center gap-1">
                      <span className="text-white">Services</span>
                      <svg className={`w-3 h-3 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.08 1.04l-4.25 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                      </svg>
                      <div className="minimal-nav-underline" style={{ backgroundColor: resolvedTheme?.primaryColor }}></div>
                    </button>
                    {servicesOpen && services.length > 0 && (
                      <div
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 rounded-xl overflow-hidden shadow-xl border border-white/20 backdrop-blur"
                        style={{
                          background: `linear-gradient(135deg, ${withAlpha(resolvedTheme?.secondaryColor, 0.9)} 0%, ${withAlpha(resolvedTheme?.primaryColor, 0.9)} 100%)`,
                        }}
                      >
                        <ul className="py-2">
                          {services.map((svc) => (
                            <li key={svc.href}>
                              <Link
                                href={svc.href}
                                replace
                                className="block px-4 py-2 text-white hover:bg-white/10"
                              >
                                {svc.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  replace
                  className="minimal-nav-link group"
                >
                  <span className="text-white">{item.label}</span>
                  <div className="minimal-nav-underline" style={{ backgroundColor: resolvedTheme?.primaryColor }}></div>
                </Link>
              );
            })}
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
                <span style={{ backgroundColor: "white" }}></span>
                <span style={{ backgroundColor: "white" }}></span>
                <span style={{ backgroundColor: "white" }}></span>
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
              <Link href="/" replace onClick={() => setIsOpen(false)} className="flex items-center gap-4">
                <Image alt="logo" src={'/logo.png' }  width={40} height={40} />
              </Link>
            </div>

            {/* Mobile Navigation */}
            <nav className="luxury-mobile-nav">
              {navItems.map((item, index) => {
                if (item.label === 'Services') {
                  return (
                    <div key={item.label} className="w-full" style={{ animationDelay: `${index * 150}ms` }}>
                      <button
                        type="button"
                        className="luxury-mobile-link group w-full flex items-center justify-between"
                        onClick={() => setMobileServicesOpen((v) => !v)}
                      >
                        <span className="luxury-mobile-link-text">Services</span>
                        <svg className={`w-5 h-5 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.08 1.04l-4.25 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                        </svg>
                        <div className="luxury-mobile-link-shimmer"></div>
                      </button>
                      {/* Direct link to Services page */}
                      <Link
                        key="services-root"
                        onClick={() => setIsOpen(false)}
                        href="/services"
                        replace
                        className="block pl-4 pr-2 py-2 text-white/90 hover:text-white"
                        style={{ animationDelay: `${(index + 1) * 120}ms` }}
                      >
                        View all services
                      </Link>
                      {mobileServicesOpen && services.length > 0 && (
                        <div className="mt-2 ml-4 border-l border-white/20">
                          {services.map((svc, i) => (
                            <Link
                              key={svc.href}
                              onClick={() => setIsOpen(false)}
                              href={svc.href}
                              replace
                              className="block pl-4 pr-2 py-2 text-white/90 hover:text-white"
                              style={{ animationDelay: `${(index + i + 1) * 100}ms` }}
                            >
                              {svc.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }
                return (
                  <Link
                    key={item.href}
                    onClick={() => setIsOpen(false)}
                    href={item.href}
                    replace
                    className="luxury-mobile-link group"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <span className="luxury-mobile-link-text">{item.label}</span>
                    <div className="luxury-mobile-link-shimmer"></div>
                  </Link>
                );
              })}
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
