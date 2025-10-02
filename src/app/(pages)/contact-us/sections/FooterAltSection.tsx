import React from "react";

export default function FooterAltSection() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-16 border-t border-slate-200 bg-white">
      <div className="absolute inset-x-0 -top-6 flex justify-center" aria-hidden>
        <div className="h-3 w-40 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-400 blur-md opacity-70" />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-semibold tracking-wide text-slate-900 uppercase">Titan Cargo & Courier</h3>
            <p className="mt-2 text-sm text-slate-600 max-w-sm">
              Reliable, on-time deliveries across the Bay Area and beyond.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="text-xs font-semibold text-slate-500 uppercase">Company</h4>
              <ul className="mt-2 space-y-2 text-sm text-slate-600">
                <li>About</li>
                <li>Services</li>
                <li>Careers</li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-slate-500 uppercase">Support</h4>
              <ul className="mt-2 space-y-2 text-sm text-slate-600">
                <li>FAQ</li>
                <li>Contact</li>
                <li>Status</li>
              </ul>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-slate-500 uppercase">Subscribe</h4>
            <form className="mt-2 flex gap-2">
              <input
                type="email"
                placeholder="Email address"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
              <button
                type="submit"
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Join
              </button>
            </form>
          </div>
        </div>
        <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-6 text-xs text-slate-500">
          <div>© {year} Titan Cargo & Courier. All rights reserved.</div>
          <div className="flex gap-4">
            <span>Privacy</span>
            <span>Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
