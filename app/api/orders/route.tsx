import { NextResponse, NextRequest } from "next/server";
import { conn } from "@/models/mongo_db_connection";
import Order from "@/models/Order";
import User from "@/models/User";
import Turf from "@/models/Turf";
import { IOrderBase } from "@/types";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    await conn();
    const body: IOrderBase = await request.json();
    const time =
      body.rate == "hourlyRate"
        ? { startTime: body.startTime, endTime: body.endTime, date: body.date }
        : { startDate: body.startDate, endDate: body.endDate };
    const turf = body.turf;
    console.log(body);
    // Check if the turf is available
    // Check if the turf is available
    const conflictingOrders = await Order.find({
      turf: turf,
      $or: [
        {
          rate: "hourlyRate",
          date: body.date,
          $or: [
            { startTime: { $lt: time.endTime, $gte: time.startTime } },
            { endTime: { $lte: time.endTime, $gt: time.startTime } },
          ],
        },
        {
          rate: "dailyRate",
          $or: [
            { startDate: { $lte: time.endDate, $gte: time.startDate } },
            { endDate: { $lte: time.endDate, $gte: time.startDate } },
          ],
        },
      ],
    });

    if (conflictingOrders.length > 0) {
      return NextResponse.json({
        success: false,
        message: "The turf is not available for the requested time.",
      });
    }

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
  try {
    await conn();
    const _id = request.nextUrl.searchParams.get("_id");
    const _owner = request.nextUrl.searchParams.get("_owner");
    const _user = request.nextUrl.searchParams.get("_user");
    const query = _id
      ? { _id }
      : _owner
      ? { owner: _owner }
      : {
          user: _user,
        };

    User;
    Turf;
    console.log(query);

    const orders = await Order.find(query).populate(["user", "turf", "owner"]);
    return NextResponse.json(orders);
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
