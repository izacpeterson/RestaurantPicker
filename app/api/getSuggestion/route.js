import { NextResponse } from "next/server";
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  console.log(lat, lon);
  let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=restaurant&location=${lat}%2C${lon}&radius=5500&type=restaurant&key=${process.env.API_KEY}`;
  let response = await fetch(url);
  let data = await response.json();
  return NextResponse.json(data);
}
