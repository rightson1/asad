import { NextResponse, NextRequest } from "next/server";
import { conn } from "@/models/mongo_db_connection";
import Turf from "@/models/Turf";
export const dynamic = "force-dynamic";

export async function PUT(request: NextRequest) {
  await conn();
}
//get user by uid
export async function GET(request: NextRequest) {
  await conn();
  const owner = request.nextUrl.searchParams.get("owner");
  if (owner) {
    const turfs = await Turf.find({ owner });
    return NextResponse.json(turfs);
  }
  const turfs = await Turf.find();
  return NextResponse.json(turfs);
}
