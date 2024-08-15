import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Course from "@/models/Course";
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

    // Find the course and user by their respective IDs
    const courseObjectId = new mongoose.Types.ObjectId(courseId);
    const user = await User.findOne({ username });

    if (!user) {
      return NextResponse.json({ errorMsg: "User not found" }, { status: 404 });
    }

    // Check if the course is already started
    if (user.startedCourses.includes(courseObjectId)) {
      return NextResponse.json(
        { errorMsg: "Course already started" },
        { status: 400 }
      );
    }

    // Add the course to the user's startedCourses array
    user.startedCourses.push(courseObjectId);

    // Initialize the course progress for this user
    const course = await Course.findById(courseObjectId);
    if (course) {
      // Ensure progress is an object before setting the course progress
      if (!user.progress) {
        user.progress = {};
      }

      user.progress[courseId] = {
        totalLessons: course.lessons.length,
        completedLessons: [],
      };
    }

    await user.save();

    return NextResponse.json(
      { successMsg: "Course started successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ errorMsg: error.message }, { status: 500 });
  }
}
