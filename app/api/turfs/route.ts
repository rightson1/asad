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
}
//get user by uid
export async function GET(request: NextRequest) {
  await conn();
}
