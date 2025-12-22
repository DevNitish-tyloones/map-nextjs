"use client";

import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";

function ClickHandler({
  onClick,
}:{
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
  return (
    <MapContainer
      center={[40.17887331434698 , 259.4652822401459]}
      zoom={5}
      className="h-[500px] w-full"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <ClickHandler onClick={onLocationSelect} />
    </MapContainer>
  );
}
