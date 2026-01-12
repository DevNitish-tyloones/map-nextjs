import { NextResponse } from "next/server";
import { env } from "@/src/utils/env";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const input = searchParams.get("input");

  if (!input) {
    return NextResponse.json({ predictions: [] });
  }

  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
    input
  )}&types=geocode&key=${env.googleApiKey}`;

  const res = await fetch(url);
  const data = await res.json();

  return NextResponse.json(data);
}
