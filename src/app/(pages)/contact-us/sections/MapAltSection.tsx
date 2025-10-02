import React from "react";

export default function MapAltSection() {
  return (
    <section className="relative py-16 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            Find Us On The Map
          </h2>
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
            We&apos;re centrally located for rapid pickups and deliveries.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow">
          <div className="absolute inset-0 pointer-events-none" aria-hidden>
            <div className="absolute -top-20 right-10 h-64 w-64 rounded-full bg-emerald-300/30 blur-3xl" />
          </div>

          <div className="relative z-10 aspect-[16/9] w-full">
            {/* Replace with your actual map embed if available */}
            <iframe
              title="Titan Cargo & Courier Location"
              className="h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3174.781932640246!2d-121.894955!3d37.338208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fccb0a4a9%3A0x2!2sSan%20Jose%2C%20CA!5e0!3m2!1sen!2sus!4v1680000000000"
              style={{ border: 0 }}
              allowFullScreen
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
            <div className="rounded-xl bg-slate-100 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">Hub</div>
              <div className="mt-1 font-semibold text-slate-900">San Jose, CA</div>
            </div>
            <div className="rounded-xl bg-slate-100 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">Coverage</div>
              <div className="mt-1 font-semibold text-slate-900">Bay Area & Beyond</div>
            </div>
            <div className="rounded-xl bg-slate-100 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">Parking</div>
              <div className="mt-1 font-semibold text-slate-900">On-site Loading Bay</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
