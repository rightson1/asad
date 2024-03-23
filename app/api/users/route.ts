// Importing necessary modules and types
import { IUser } from "@/types"; // User type
import User from "@/models/User"; // User model
import { NextResponse, NextRequest } from "next/server"; // Next.js server types
import { conn } from "@/models/mongo_db_connection"; // MongoDB connection
export const dynamic = "force-dynamic";

// Function to handle POST requests (creating a new user)
export async function POST(request: Request) {
  await conn(); // Connect to the database
  const userData: IUser = await request.json(); // Get user data from the request body
  const existingUser = await User.findOne({ uid: userData.uid }); // Check if a user with the same uid already exists
  if (existingUser) {
    // If the user already exists, return the existing user
    return NextResponse.json(existingUser, {
      status: 200, // HTTP status code 200 means "OK"
    });
  }
  const newUser = await User.create(userData); // If the user doesn't exist, create a new user
  return NextResponse.json(newUser, {
    status: 201, // HTTP status code 201 means "Created"
  });
}

// Function to handle PUT requests (updating an existing user)
export async function PUT(request: NextRequest) {
  await conn(); // Connect to the database
  const userData = await request.json(); // Get user data from the request body

  // Find the user by _id and update it with the new data
  const user = await User.findOneAndUpdate(
    {
      _id: userData._id,
    },
    userData,
    {
      new: true, // Return the updated user
    }
  );
  if (!user) {
    // If the user doesn't exist, return an error
    return NextResponse.json(null, {
      status: 404, // HTTP status code 404 means "Not Found"
      statusText: "User not found",
    });
  }
  return NextResponse.json(user); // Return the updated user
}

// Function to handle GET requests (retrieving a user)
export async function GET(request: NextRequest) {
  await conn(); // Connect to the database
  const uid = request.nextUrl.searchParams.get("uid"); // Get uid from the request parameters
  const _id = request.nextUrl.searchParams.get("_id"); // Get _id from the request parameters
  const query = uid ? { uid } : { _id }; // If uid is provided, search by uid, otherwise search by _id
  const user = await User.findOne(query); // Find the user
  if (!user) {
    // If the user doesn't exist, return an error
    return NextResponse.json({
      status: 404, // HTTP status code 404 means "Not Found"
      success: false,
      statusText: "User not found",
    });
  }
  return NextResponse.json(user); // Return the found user
}
