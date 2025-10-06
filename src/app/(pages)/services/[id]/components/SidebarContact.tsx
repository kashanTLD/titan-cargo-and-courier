import React from "react";
import { LandingPageData } from "@/types/template";

export default function SidebarContact({ landingPageData }: { landingPageData: LandingPageData }) {
  if (!landingPageData?.businessData) return null;
  return (
    <div
      className="rounded-2xl py-6 px-5 text-white shadow-lg"
      style={{
        background: landingPageData.themeData
          ? `linear-gradient(135deg, ${landingPageData.themeData.secondaryColor},  ${landingPageData.themeData.primaryColor})`
          : 'linear-gradient(135deg, #000, #666)'
      }}
    >
      <h3 className="text-lg md:text-xl font-bold text-white mb-4">Contact Information</h3>
      <div className="space-y-3 text-sm">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
          </div>
          <span className="text-white/90">{landingPageData.businessData.email}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
          </div>
          <a href={landingPageData.businessData?.phone ? `tel:${landingPageData.businessData.phone}` : '#'} className="text-white/90 underline-offset-2 hover:underline">
            {landingPageData.businessData.phone}
          </a>
        </div>
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mt-1">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/></svg>
          </div>
          <div className="text-white/90">
            <div>{landingPageData.businessData.address.street}</div>
            <div>{landingPageData.businessData.address.city}, {landingPageData.businessData.address.state} {landingPageData.businessData.address.zipCode}</div>
          </div>
        </div>
        {Array.isArray(landingPageData.businessData.businessHours) && landingPageData.businessData.businessHours.length > 0 && (
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mt-1">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/></svg>
            </div>
            <div className="text-white/90">
              <div className="font-medium mb-1">Business Hours</div>
              <div className="space-y-1 text-xs">
                {landingPageData.businessData.businessHours.map((schedule: { day: string; hours: string; isClosed: boolean }, index: number) => (
                  <div key={index} className="flex justify-between">
                    <span className="font-medium">{schedule.day}:</span>
                    <span className="ml-2">{schedule.isClosed ? 'Closed' : schedule.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

