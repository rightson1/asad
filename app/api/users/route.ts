import { IUser } from "@/types";
import User from "@/models/User";
import { NextResponse, NextRequest } from "next/server";
import { conn } from "@/models/mongo_db_connection";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  await conn();
  const userData: IUser = await request.json();
  const existingUser = await User.findOne({ uid: userData.uid });
  if (existingUser) {
    return NextResponse.json(existingUser, {
      status: 200,
    });
  }
  const newUser = await User.create(userData);
  return NextResponse.json(newUser, {
    status: 201,
  });
}

export async function PUT(request: NextRequest) {
  await conn();
  const userData = await request.json();

  const user = await User.findOneAndUpdate(
    {
      _id: userData._id,
    },
    userData,
    {
      new: true,
    }
  );
  if (!user) {
    return NextResponse.json(null, {
      status: 404,
      statusText: "User not found",
    });
  }
  return NextResponse.json(user);
}
//get user by uid
export async function GET(request: NextRequest) {
  await conn();
  const uid = request.nextUrl.searchParams.get("uid");
  const user = await User.findOne({ uid });
  if (!user) {
    return NextResponse.json({
      status: 404,
      success: false,
      statusText: "User not found",
    });
  }
  return NextResponse.json(user);
}
