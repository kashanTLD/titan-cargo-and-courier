import React from "react";

export default function ContactInfoAltSection() {
  return (
    <section className="relative py-16 bg-slate-900 text-slate-100">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full blur-3xl opacity-25 bg-gradient-to-br from-indigo-500 to-cyan-400" />
        <div className="absolute -bottom-24 -right-10 h-72 w-72 rounded-full blur-3xl opacity-25 bg-gradient-to-tr from-fuchsia-500 to-rose-400" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Our Coordinates
          </h2>
          <p className="mt-3 text-slate-300 max-w-2xl mx-auto">
            Multiple ways to reach us. Choose what works best for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6 hover:border-cyan-400/40 transition">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-300 ring-1 ring-inset ring-cyan-400/30">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5c-1.4 0-2.5-1.1-2.5-2.5S10.6 6.5 12 6.5s2.5 1.1 2.5 2.5S13.4 11.5 12 11.5z"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold">Address</h3>
            <p className="mt-2 text-sm text-slate-300">
              123 Titan Way, Suite 500, San Jose, CA 95110
            </p>
          </div>

          <div className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6 hover:border-indigo-400/40 transition">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-300 ring-1 ring-inset ring-indigo-400/30">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 8V7l-3 2-2-2-3 2-2-2-3 2V8l-4 3 4 3v-1l3-2 2 2 3-2 2 2 3-2v1l4-3-4-3z"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold">Email</h3>
            <p className="mt-2 text-sm text-slate-300">
              support@titancargo.com
            </p>
          </div>

          <div className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6 hover:border-fuchsia-400/40 transition">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-fuchsia-500/20 text-fuchsia-300 ring-1 ring-inset ring-fuchsia-400/30">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.6 10.8c1.2 2.4 3.2 4.4 5.6 5.6l1.9-1.9c.2-.2.4-.3.7-.2 1 .3 2 .5 3.1.5.4 0 .7.3.7.7V19c0 .4-.3.7-.7.7C10.5 19.7 4.3 13.5 4.3 6.4c0-.4.3-.7.7-.7H7c.4 0 .7.3.7.7 0 1.1.2 2.1.5 3.1.1.2 0 .5-.2.7l-1.4 1.4z"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold">Phone</h3>
            <p className="mt-2 text-sm text-slate-300">
              (408) 555-0133
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
