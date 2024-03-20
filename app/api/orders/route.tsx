import { NextResponse, NextRequest } from "next/server";
import { conn } from "@/models/mongo_db_connection";
import Order from "@/models/Order";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    await conn();
    const body = await request.json();
    const newOrder = await Order.create(body);
    return NextResponse.json(newOrder, {
      status: 201,
    });
  } catch (error: any) {
    console.log(error.message);
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
  const updatedOrder = await Order.findByIdAndUpdate(_id, body, {
    new: true,
  });
  return NextResponse.json(updatedOrder);
}
//get user by uid
export async function GET(request: NextRequest) {
  await conn();
  const _id = request.nextUrl.searchParams.get("_id");
  const order = await Order.findById(_id);
  return NextResponse.json(order);
}
