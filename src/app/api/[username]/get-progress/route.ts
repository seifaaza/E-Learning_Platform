import dbConnect from "@/lib/dbConnect";
import CourseProgress from "@/models/CourseProgress";
import TestProgress from "@/models/TestProgress";
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
  const type = url.searchParams.get("type"); // 'course' or 'test'
  const id = url.searchParams.get("id"); // courseId or testId

  try {
    if (!type || !id) {
      return NextResponse.json(
        { errorMsg: "Type or ID is missing" },
        { status: 400 }
      );
    }

    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return NextResponse.json({ errorMsg: "User not found" }, { status: 404 });
    }

    if (type === "course") {
      // Handle course progress
      const isCourseCompleted = user.completedCourses.includes(
        new mongoose.Types.ObjectId(id)
      );

      if (isCourseCompleted) {
        return NextResponse.json(
          { progressPercentage: 100, courseCompleted: true },
          { status: 200 }
        );
      }

      const courseProgress = await CourseProgress.findOne({
        userId: user._id,
        courseId: new mongoose.Types.ObjectId(id),
      });

      if (!courseProgress) {
        return NextResponse.json(
          { errorMsg: "Course progress not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { progressPercentage: courseProgress.progressPercentage },
        { status: 200 }
      );
    } else if (type === "test") {
      // Handle test progress
      const isTestCompleted = user.completedTests.includes(
        new mongoose.Types.ObjectId(id)
      );

      if (isTestCompleted) {
        return NextResponse.json(
          { progressPercentage: 100, testCompleted: true },
          { status: 200 }
        );
      }

      const testProgress = await TestProgress.findOne({
        userId: user._id,
        testId: new mongoose.Types.ObjectId(id),
      });

      if (!testProgress) {
        return NextResponse.json(
          { errorMsg: "Test progress not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(
        {
          progressPercentage: testProgress.progressPercentage,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { errorMsg: "Invalid type. Must be 'course' or 'test'." },
        { status: 400 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ errorMsg: error.message }, { status: 500 });
  }
}
