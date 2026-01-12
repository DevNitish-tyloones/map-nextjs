"use client";

import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  useMap,
  useMapEvents,
  Marker,
  Circle,
} from "react-leaflet";
import dynamic from "next/dynamic";
import L from "leaflet";

/* ===== FIX MARKER ICON ===== */
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

/* ===== MAP CLICK HANDLER ===== */
function ClickHandler({
  onClick,
}: {
  onClick: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click(e) {
      onClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

/* ===== MAP CONTROLLER ===== */
function MapController({
  selectedLocation,
}: {
  selectedLocation?: { lat: number; lng: number };
}) {
  const map = useMap();

  useEffect(() => {
    if (selectedLocation) {
      map.setView(
        [selectedLocation.lat, selectedLocation.lng],
        13,
        { animate: true }
      );
    }
  }, [selectedLocation, map]);

  return null;
}

/* ===== MAIN MAP ===== */
function MapLeafletClient({
  onLocationSelect,
  selectedLocation,
}: {
  onLocationSelect: (lat: number, lng: number) => void;
  selectedLocation?: { lat: number; lng: number };
}) {
  const [center, setCenter] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setCenter([41.583125, -104.667736]);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCenter([position.coords.latitude, position.coords.longitude]);
      },
      () => {
        setCenter([41.583125, -104.667736]);
      }
    );
  }, []);

  if (!center) {
    return (
      <div className="h-full w-full flex items-center justify-center text-gray-600">
        Detecting your location…
      </div>
    );
  }

  return (
    <MapContainer center={center} zoom={10} className="h-full w-full">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Map click */}
      <ClickHandler onClick={onLocationSelect} />

      {/* Search / external control */}
      <MapController selectedLocation={selectedLocation} />

      {/* Marker + Circle */}
      {selectedLocation && (
        <>
          <Marker position={[selectedLocation.lat, selectedLocation.lng]} />
          <Circle
            center={[selectedLocation.lat, selectedLocation.lng]}
            radius={1609} // 1 mile
            pathOptions={{
              color: "#2563eb",
              fillColor: "#3b82f6",
              fillOpacity: 0.15,
              weight: 2,
            }}
          />
        </>
      )}
    </MapContainer>
  );
}

const MapLeaflet = dynamic(() => Promise.resolve(MapLeafletClient), {
  ssr: false,
});

export default MapLeaflet;
