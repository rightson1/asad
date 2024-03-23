// Import necessary modules and types
import { IUser } from "@/types"; // User type
import User from "@/models/User"; // User model
import { NextResponse, NextRequest } from "next/server"; // Next.js server types
import { conn } from "@/models/mongo_db_connection"; // MongoDB connection
export const dynamic = "force-dynamic"; // Export a constant for dynamic routing

// Function to handle GET requests
export async function GET(request: NextRequest) {
  await conn(); // Connect to the database

  // Find all users who are sellers and sort them by creation date in descending order
  const user = await User.find({
    isSeller: true,
  }).sort({ createdAt: -1 });

  if (!user) {
    // If no user is found, return a 404 error
    return NextResponse.json({
      status: 404,
      success: false,
      statusText: "User not found",
    });
  }

  // If a user is found, return the user data
  return NextResponse.json(user);
}
