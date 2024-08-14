import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Course from "@/models/Course";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(
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
        { errorMsg: "Missing course ID or username" },
        { status: 400 }
      );
    }

    const courseObjectId = new mongoose.Types.ObjectId(courseId);

    // Check if the course exists
    const course = await Course.findById(courseObjectId);

    if (!course) {
      return NextResponse.json(
        { errorMsg: "Course not found" },
        { status: 404 }
      );
    }

    // Find the user and retrieve progress
    const user = await User.findOne({ username }).exec();

    if (!user) {
      return NextResponse.json({ errorMsg: "User not found" }, { status: 404 });
    }

    const courseProgress = user.progress.get(courseId);

    if (!courseProgress) {
      return NextResponse.json(
        { errorMsg: "Course progress not found" },
        { status: 404 }
      );
    }

    // Calculate the course completion percentage
    const totalLessons = course.lessons.length;
    const completedLessons = courseProgress.completedLessons.length;
    const progressPercentage = (completedLessons / totalLessons) * 100;

    return NextResponse.json({
      message: "Course progress retrieved successfully",
      progressPercentage: progressPercentage,
    });
  } catch (error: any) {
    return NextResponse.json({ errorMsg: error.message }, { status: 500 });
  }
}
