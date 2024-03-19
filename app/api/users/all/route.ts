import { IUser } from "@/types";
import User from "@/models/User";
import { NextResponse, NextRequest } from "next/server";
import { conn } from "@/models/mongo_db_connection";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  await conn();
  const user = await User.find({
    isSeller: true,
  }).sort({ createdAt: -1 });
  if (!user) {
    return NextResponse.json({
      status: 404,
      success: false,
      statusText: "User not found",
    });
  }
  return NextResponse.json(user);
}
