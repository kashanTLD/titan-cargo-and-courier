"use client";

import dynamic from 'next/dynamic';

// Dynamically import Leaflet to avoid SSR issues
const DynamicMap = dynamic(() => import('./MapClient'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gray-200 animate-pulse rounded-2xl flex items-center justify-center">
    <span className="text-gray-500">Loading map...</span>
  </div>
}) as React.ComponentType<MapProps>;

interface MapProps {
  latitude: number;
  longitude: number;
  businessName?: string;
  address?: string;
  className?: string;
}

export default function Map({ latitude, longitude, businessName, address, className = "" }: MapProps) {
  return (
    <DynamicMap
      latitude={latitude}
      longitude={longitude}
      businessName={businessName}
      address={address}
      className={className}
    />
  );
}
