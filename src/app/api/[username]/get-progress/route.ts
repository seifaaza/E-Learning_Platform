import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Course from "@/models/Course";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { username: string } }
) {
  await dbConnect();

  const { username } = params;
  const url = new URL(request.url);
  const courseId = url.searchParams.get("courseId");

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

    if (!course.lessons || !Array.isArray(course.lessons)) {
      return NextResponse.json(
        { errorMsg: "Course lessons are not properly defined" },
        { status: 500 }
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

    const totalLessons = course.lessons.length;
    const completedLessons = courseProgress.completedLessons.length || 0;

    // Calculate progressPercentage based on whether the course is certified
    const maxProgress = course.isCertified ? 80 : 100;
    const progressPercentage = Math.trunc(
      (completedLessons / totalLessons) * maxProgress
    );

    return NextResponse.json({ progressPercentage });
  } catch (error: any) {
    return NextResponse.json({ errorMsg: error.message }, { status: 500 });
  }
}
