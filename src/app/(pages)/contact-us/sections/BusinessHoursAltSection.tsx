import React from "react";

const HOURS: Array<{ day: string; open: string; close: string; note?: string }> = [
  { day: "Monday", open: "08:00", close: "18:00" },
  { day: "Tuesday", open: "08:00", close: "18:00" },
  { day: "Wednesday", open: "08:00", close: "18:00" },
  { day: "Thursday", open: "08:00", close: "18:00" },
  { day: "Friday", open: "08:00", close: "18:00" },
  { day: "Saturday", open: "09:00", close: "15:00", note: "Limited support" },
  { day: "Sunday", open: "Closed", close: "", note: "On-call for urgent freight" },
];

export default function BusinessHoursAltSection() {
  return (
    <section className="relative py-16 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            Operating Window
          </h2>
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
            We align with your timelines. See our standard hours below.
          </p>
        </div>

        <div className="max-w-4xl mx-auto overflow-hidden rounded-2xl border border-slate-200 shadow-sm bg-white">
          <div className="grid grid-cols-1 divide-y divide-slate-100">
            {HOURS.map((h) => (
              <div key={h.day} className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="font-medium text-slate-900">{h.day}</span>
                </div>
                <div className="text-right">
                  {h.open === "Closed" ? (
                    <span className="text-rose-600 font-semibold">Closed</span>
                  ) : (
                    <span className="tabular-nums text-slate-800">
                      {h.open} – {h.close}
                    </span>
                  )}
                  {h.note && (
                    <div className="text-xs text-slate-500">{h.note}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
