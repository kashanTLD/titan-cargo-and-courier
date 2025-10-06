"use client";

import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Configure default Leaflet marker icons on client only
function useConfigureLeafletIcons() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });
  }, []);
}

type MapAltSectionProps = {
  lat?: number;
  lng?: number;
  zoom?: number;
  markerLabel?: string;
};

export default function MapAltSection({
  lat = 39.9833,
  lng = -75.2300,
  zoom = 13,
  markerLabel = "Titan Cargo & Courier",
}: MapAltSectionProps) {
  useConfigureLeafletIcons();
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
            <MapContainer
              center={[lat, lng]}
              zoom={zoom}
              scrollWheelZoom={false}
              className="h-full w-full"
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[lat, lng]}>
                <Popup>
                  <div className="text-sm">
                    <div className="font-semibold">{markerLabel}</div>
                    <div className="text-slate-600">{lat.toFixed(4)}, {lng.toFixed(4)}</div>
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
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
