"use client";

import dynamic from "next/dynamic";

const MapLeaflet = dynamic(
  () => import("./MapLeafletClient"),
  { ssr: false }
);

export default MapLeaflet;
