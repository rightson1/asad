import { NextResponse, NextRequest } from "next/server";
import { conn } from "@/models/mongo_db_connection";
import Turf from "@/models/Turf";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    await conn();
    const body = await request.json();
    const newTurf = await Turf.create(body);
    return NextResponse.json(newTurf, {
      status: 201,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
export async function PUT(request: NextRequest) {
  await conn();
  const body = await request.json();
  const _id = body._id;
  const updatedTurf = await Turf.findByIdAndUpdate(_id, body, {
    new: true,
  });
  return NextResponse.json(updatedTurf);
}
//get user by uid
export async function GET(request: NextRequest) {
  await conn();
  const _id = request.nextUrl.searchParams.get("_id");
  const turf = await Turf.findById(_id);
  return NextResponse.json(turf);
}
