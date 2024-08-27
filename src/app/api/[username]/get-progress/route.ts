import dbConnect from "@/lib/dbConnect";
import CourseProgress from "@/models/CourseProgress";
import User from "@/models/User";
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
    if (!courseId) {
      return NextResponse.json(
        { errorMsg: "Course ID is missing" },
        { status: 400 }
      );
    }

    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return NextResponse.json({ errorMsg: "User not found" }, { status: 404 });
    }

    // Check if the course is completed by the user
    const isCourseCompleted = user.completedCourses.includes(
      new mongoose.Types.ObjectId(courseId)
    );

    if (isCourseCompleted) {
      // Return progressPercentage of 100 if the course is completed
      return NextResponse.json(
        { progressPercentage: 100, courseCompleted: true },
        { status: 200 }
      );
    }

    // If course is not completed, find the course progress
    const courseProgress = await CourseProgress.findOne({
      userId: user._id,
      courseId: new mongoose.Types.ObjectId(courseId),
    });

    if (!courseProgress) {
      return NextResponse.json(
        { errorMsg: "Course progress not found" },
        { status: 404 }
      );
    }

    // Extract the progress percentage
    const { progressPercentage } = courseProgress;

    // Return the progress percentage in the response
    return NextResponse.json({ progressPercentage }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ errorMsg: error.message }, { status: 500 });
  }
}
