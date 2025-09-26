"use client";

import { useLandingPageData } from "@/components/LandingPageDataProvider";
import { useEffect, useState } from "react";

// Local types for hours structure coming from backend/context
interface Period { open?: string; close?: string }
interface HoursScheduleEntry { day: string; periods?: Period[] }
interface HoursData { schedule?: HoursScheduleEntry[]; timezone?: string }
interface DisplaySchedule { day: string; hours: string; isOpen: boolean; _periods: Period[] }

export default function BusinessHoursSection() {
  const landingPageData = useLandingPageData();
  const theme = landingPageData?.themeData;
  const businessData = landingPageData?.businessData;
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, [businessData]);

  // Helper: format HH:MM (24h) to 12h AM/PM
  const to12h = (hhmm: string) => {
    const m = hhmm.match(/^(\d{1,2}):(\d{2})$/);
    if (!m) return hhmm;
    let h = parseInt(m[1], 10);
    const min = m[2];
    const period = h >= 12 ? 'PM' : 'AM';
    h = h % 12;
    if (h === 0) h = 12;
    return `${h}:${min} ${period}`;
  };

  // Time utilities (simplified)
  const getHoursData = (v: unknown): HoursData | undefined => {
    return v && typeof v === 'object' ? (v as HoursData) : undefined;
  };
  const hoursData: HoursData | undefined = getHoursData((businessData as unknown as { hours?: unknown })?.hours);

  // Map hoursData.schedule (with periods) to display list
  const businessHours: DisplaySchedule[] = (hoursData?.schedule || []).map((entry: HoursScheduleEntry) => {
    const day = String(entry?.day || '');
    const periods: Period[] = Array.isArray(entry?.periods) ? entry.periods! : [];
    if (!periods.length) {
      return { day, hours: 'Closed', isOpen: false, _periods: periods };
    }
    const hoursStr = periods
      .map((p: Period) => {
        const o = String(p?.open || '').trim();
        const c = String(p?.close || '').trim();
        const openStr = /[AP]M/i.test(o) ? o : to12h(o);
        const closeStr = c ? (/[AP]M/i.test(c) ? c : to12h(c)) : '';
        return closeStr ? `${openStr} - ${closeStr}` : `${openStr}`;
      })
      .join(', ');
    return { day, hours: hoursStr, isOpen: true, _periods: periods };
  });

  // Removed dynamic open/close status and current time logic for simplicity

  // Removed hardcoded emergency services; only show hours from context

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        {/* Header */}
        <div className="text-center mb-12 ">
          <h2 
            className={`text-3xl md:text-4xl font-bold text-gray-900 mb-4 transition-all duration-1000 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Business Hours
          </h2>
        </div>

        <div className="md:w-[600px]">
          {/* Business Hours (render only if provided in context) */}
          {businessHours.length > 0 && (
            <div 
              className={`bg-white rounded-2xl p-8 shadow-lg border border-gray-100 transition-all duration-1000 delay-300 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Business Hours</h3>
              </div>
  
              <div className="space-y-3">
                {businessHours.map((schedule) => {
                  const todayName = new Date().toLocaleDateString('en-US', { weekday: 'long' });
                  const norm = (s: string) => s.trim().toLowerCase().slice(0, 3);
                  const isToday = norm(schedule.day) === norm(todayName);
                  return (
                    <div
                      key={schedule.day}
                      className={`flex justify-between items-center py-3 px-4 rounded-lg transition-all duration-300 ${
                        isToday 
                          ? 'bg-gray-50 border-2' 
                          : 'hover:bg-gray-50'
                      }`}
                      style={{
                        borderColor: isToday ? theme?.primaryColor : 'transparent'
                      }}
                    >
                      <span className={`font-medium ${isToday ? 'text-gray-900' : 'text-gray-700'}`}>
                        {schedule.day}
                      </span>
                      <span className={`${isToday ? 'font-semibold' : 'font-normal'} ${
                        schedule.isOpen ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {schedule.hours}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
