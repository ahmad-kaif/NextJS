import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export async function POST(req: Request) {
  const { email, username, password } = await req.json(); // Destructuring username correctly

  // Validate request body
  if (!username || !email || !password) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  try {
    await dbConnect();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const user = await User.create({
      username, // Use username instead of name
      email,
      password: hashedPassword,
    });

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("Error during signup:", error); // Add logging for debugging
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
