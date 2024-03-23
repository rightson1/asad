// Import necessary modules
import { NextResponse, NextRequest } from "next/server"; // Next.js server types
import { conn } from "@/models/mongo_db_connection"; // MongoDB connection
import Turf from "@/models/Turf"; // Turf model
export const dynamic = "force-dynamic"; // Export a constant for dynamic routing

// Function to handle PUT requests
export async function PUT(request: NextRequest) {
  await conn(); // Connect to the database
  // The function currently does nothing after connecting to the database
}

// Function to handle GET requests
export async function GET(request: NextRequest) {
  await conn(); // Connect to the database
  const owner = request.nextUrl.searchParams.get("owner"); // Get owner from the request parameters
  if (owner) {
    // If an owner is provided, find all turfs owned by this owner
    const turfs = await Turf.find({ owner });
    return NextResponse.json(turfs); // Return the found turfs
  }
  // If no owner is provided, find all turfs
  const turfs = await Turf.find();
  return NextResponse.json(turfs); // Return all turfs
}
