import { NextResponse } from "next/server";
import {env} from "@/src/utils/env"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  console.log('searchParams', searchParams)
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  if (!lat || !lng) {
    return NextResponse.json(
      { error: "lat and lng are required" },
      { status: 400 }
    );
  }

  const params = new URLSearchParams({
    coords: `${lng},${lat}`,
    type: "point",
    radius: "1",
    unit: "miles",
    f: "json"
  });

  console.log('see parms>>>', params)
  const url = `${env.nepassistApiUrl}/nepaRESTbroker.aspx?${params}`;

  try {
    const response = await fetch(url, {
      cache: "no-store" // fresh data on each request
    });

    const data = await response.json();

    console.log('NEPAssist data fetched successfully', data);

    return NextResponse.json(data);

  } catch (err) {
    return NextResponse.json({
        success : false,
        message: "Failed to fetch NEPAssist data",
        error: err instanceof Error ? err.message : String(err)
      }
    );
  }
}


export async function POST(req: Request) {
  const body = await req.json();

  const res = await fetch(env.nepassistApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return NextResponse.json(data);
}

