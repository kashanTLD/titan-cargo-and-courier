"use client";

import Image from "next/image";
import Link from "next/link";
import { useLandingPageData } from "@/components/LandingPageDataProvider";

export default function FooterSectionLocal() {
  const landing = useLandingPageData();
  const theme = landing?.themeData;
  const business = landing?.businessData;
  const businessName = landing?.businessName || "Business";
  const aboutDesc = landing?.content?.about?.description || "";

  const primary = theme?.primaryColor || "#0f172a";
  const secondary = theme?.secondaryColor || "#334155";

  return (
    <footer id="contact" className="relative mt-24 border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3">
              <Image src="/logo.png" alt={`${businessName} logo`} width={40} height={40} className="h-10 w-10" />
              <span className="text-lg font-semibold text-slate-900">{businessName}</span>
            </div>
            {aboutDesc && <p className="mt-4 max-w-sm text-sm leading-6 text-slate-600">{aboutDesc}</p>}
            {business?.socialLinks?.length ? (
              <div className="mt-4 flex gap-3">
                {business.socialLinks.map((s, i) => (
                  <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex h-9 w-9 items-center justify-center rounded-md text-white" style={{ background: `linear-gradient(135deg, ${primary}, ${secondary})` }}>
                    <span className="text-xs font-medium">{s.platform?.[0]?.toUpperCase()}</span>
                  </a>
                ))}
              </div>
            ) : null}
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-900">Quick Links</h4>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              {[
                { href: "#home", label: "Home" },
                { href: "#about", label: "About" },
                { href: "#services", label: "Services" },
                { href: "#testimonials", label: "Testimonials" },
                { href: "#contact", label: "Contact" },
              ].map((l, i) => (
                <li key={i}>
                  <Link href={l.href} className="hover:text-slate-900">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-900">Contact Info</h4>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              {business?.phone && (
                <li>
                  <a href={`tel:${business.phone}`} className="hover:text-slate-900">
                    {business.phone}
                  </a>
                </li>
              )}
              {business?.email && (
                <li>
                  <a href={`mailto:${business.email}`} className="hover:text-slate-900">
                    {business.email}
                  </a>
                </li>
              )}
              {business?.address && (
                <li className="text-slate-600">
                  <div>{business.address.street}</div>
                  <div>
                    {business.address.city}, {business.address.state} {business.address.zipCode}
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between border-t border-slate-200 pt-6 text-xs text-slate-500">
          <p>
            2025 Titan Cargo and Courier LLC. All Rights Reserved. Build by{' '}
            <a href="https://usbrandbooster.com" target="_blank" rel="noopener noreferrer" className="underline decoration-dotted hover:text-slate-700">
              US Brand Booster LLC
            </a>
          </p>
          <a
            href="#home"
            className="inline-flex items-center rounded-md px-3 py-2 text-white"
            style={{ background: `linear-gradient(135deg, ${primary}, ${secondary})` }}
          >
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
