import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { courseId: string } }
) {
  await dbConnect();

  const { courseId } = params;
  const url = new URL(request.url);
  const username = url.searchParams.get("username");

  try {
    if (!courseId || !username) {
      return NextResponse.json(
        { errorMsg: "Course ID or username is missing" },
        { status: 400 }
      );
    }

    // Find the user by their username
    const user = await User.findOne({ username });

    if (!user) {
      return NextResponse.json({ errorMsg: "User not found" }, { status: 404 });
    }

    const courseObjectId = new mongoose.Types.ObjectId(courseId);

    // Check if the course is already saved
    if (user.savedCourses.includes(courseObjectId)) {
      return NextResponse.json(
        { errorMsg: "Course already saved" },
        { status: 400 }
      );
    }

    // Add the course to the user's savedCourses array
    user.savedCourses.push(courseObjectId);

    await user.save();

    return NextResponse.json(
      { successMsg: "Course saved successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ errorMsg: error.message }, { status: 500 });
  }
}
