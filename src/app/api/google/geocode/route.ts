import { NextResponse } from "next/server";
import { env } from "@/src/utils/env";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const placeId = searchParams.get("placeId");

  console.log('myplaceid>>>',placeId)

  if (!placeId) {
    return NextResponse.json({ error: "placeId required" }, { status: 400 });
  }

  const url = `https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&key=${env.googleApiKey}`;

  const res = await fetch(url);
  const data = await res.json();

  console.log('coming>>>>',data)

  const location = data?.results?.[0]?.geometry?.location;

  return NextResponse.json({
    lat: location?.lat,
    lng: location?.lng,
  });
}
