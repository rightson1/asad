// Import necessary modules
import { NextResponse, NextRequest } from "next/server"; // Next.js server types
import { conn } from "@/models/mongo_db_connection"; // MongoDB connection
import Turf from "@/models/Turf"; // Turf model
export const dynamic = "force-dynamic"; // Export a constant for dynamic routing

// Function to handle POST requests (creating a new turf)
export async function POST(request: Request) {
  try {
    await conn(); // Connect to the database
    const body = await request.json(); // Get turf data from the request body
    const newTurf = await Turf.create(body); // Create a new turf
    return NextResponse.json(newTurf, {
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

// Function to handle PUT requests (updating an existing turf)
export async function PUT(request: NextRequest) {
  await conn(); // Connect to the database
  const body = await request.json(); // Get turf data from the request body
  const _id = body._id; // Get turf id from the request body
  const updatedTurf = await Turf.findByIdAndUpdate(_id, body, {
    new: true, // Return the updated turf
  });
  return NextResponse.json(updatedTurf); // Return the updated turf
}

// Function to handle GET requests (retrieving a turf)
export async function GET(request: NextRequest) {
  await conn(); // Connect to the database
  const _id = request.nextUrl.searchParams.get("_id"); // Get turf id from the request parameters
  const turf = await Turf.findById(_id); // Find the turf by id
  return NextResponse.json(turf); // Return the found turf
}

// Function to handle DELETE requests (deleting a turf)
export async function DELETE(request: NextRequest) {
  await conn(); // Connect to the database
  const _id = request.nextUrl.searchParams.get("_id"); // Get turf id from the request parameters
  await Turf.findByIdAndDelete(_id); // Delete the turf by id
  return NextResponse.json({ success: true }); // Return success status
}
