"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";

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

export default function MapLeafletClient({
  onLocationSelect,
}: {
  onLocationSelect: (lat: number, lng: number) => void;
}) {
  const [center, setCenter] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setCenter([41.583125, -104.667736]); // fallback
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCenter([latitude, longitude]);
      },
      () => {
        // Permission denied or error
        setCenter([41.583125, -104.667736]); // fallback
      }
    );
  }, []);
  
  if (!center) {
    return (
      <div className="h-[500px] w-full flex items-center justify-center text-gray-600">
        Detecting your location…
      </div>
    );
  }

  return (
    <MapContainer
      center={center}
      zoom={10}
      className="h-[500px] w-full"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <ClickHandler onClick={onLocationSelect} />
    </MapContainer>
  );
}
