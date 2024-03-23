// Import necessary modules
import { NextResponse, NextRequest } from "next/server"; // Next.js server types
import { conn } from "@/models/mongo_db_connection"; // MongoDB connection
import Order from "@/models/Order"; // Order model
import User from "@/models/User"; // User model
import Turf from "@/models/Turf"; // Turf model
import { IOrderBase } from "@/types"; // Order base interface
export const dynamic = "force-dynamic"; // Export a constant for dynamic routing

// Function to handle POST requests (creating a new order)
export async function POST(request: Request) {
  try {
    await conn(); // Connect to the database
    const body: IOrderBase = await request.json(); // Get order data from the request body
    // Determine the time based on the rate
    const time =
      body.rate == "hourlyRate"
        ? { startTime: body.startTime, endTime: body.endTime, date: body.date }
        : { startDate: body.startDate, endDate: body.endDate };
    const turf = body.turf;
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
    // If there are conflicting orders, return an error message
    if (conflictingOrders.length > 0) {
      return NextResponse.json({
        success: false,
        message: "The turf is not available for the requested time.",
      });
    }
    // If there are no conflicting orders, create a new order
    const newOrder = await Order.create(body);
    return NextResponse.json(newOrder, {
      status: 201, // HTTP status code 201 means "Created"
    });
  } catch (error: any) {
    // If there's an error, return the error message
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}

// Function to handle PUT requests (updating an existing order)
export async function PUT(request: NextRequest) {
  await conn(); // Connect to the database
  const body = await request.json(); // Get order data from the request body
  const _id = body._id; // Get order id from the request body
  const updatedOrder = await Order.findByIdAndUpdate(_id, body, {
    new: true, // Return the updated order
  });
  return NextResponse.json(updatedOrder); // Return the updated order
}

// Function to handle GET requests (retrieving an order)
export async function GET(request: NextRequest) {
  try {
    await conn(); // Connect to the database
    const _id = request.nextUrl.searchParams.get("_id"); // Get order id from the request parameters
    const _owner = request.nextUrl.searchParams.get("_owner"); // Get owner from the request parameters
    const _user = request.nextUrl.searchParams.get("_user"); // Get user from the request parameters
    // Determine the query based on the provided parameters
    const query = _id
      ? { _id }
      : _owner
      ? { owner: _owner }
      : {
          user: _user,
        };
    // Find the orders that match the query and populate the user, turf, and owner fields
    const orders = await Order.find(query).populate(["user", "turf", "owner"]);
    return NextResponse.json(orders); // Return the found orders
  } catch (error: any) {
    // If there's an error, return the error message
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
