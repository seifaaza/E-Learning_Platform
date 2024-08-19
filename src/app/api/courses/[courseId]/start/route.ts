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
      // Ensure progress is a Map before setting the course progress
      if (!user.progress) {
        user.progress = new Map();
      }

      user.progress.set(courseId, {
        totalLessons: course.lessons.length,
        completedLessons: [],
      });
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

export async function DELETE(
  request: Request,
  { params }: { params: { courseId: string } }
) {
  await dbConnect();

  const { courseId } = params;
  const username = new URL(request.url).searchParams.get("username");

  if (!courseId || !username) {
    return NextResponse.json(
      { errorMsg: "Course ID and username are required" },
      { status: 400 }
    );
  }

  try {
    // Find the user
    const user = await User.findOne({ username });

    if (!user) {
      return NextResponse.json({ errorMsg: "User not found" }, { status: 404 });
    }

    const courseObjectId = new mongoose.Types.ObjectId(courseId);

    // Remove the course from the startedCourses array and progress field
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        $pull: { startedCourses: courseObjectId },
        $unset: { [`progress.${courseId}`]: "" }, // Remove the specific course progress
      },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { errorMsg: "Failed to update started courses" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Course removed from started courses and progress successfully",
    });
  } catch (error: any) {
    return NextResponse.json({ errorMsg: error.message }, { status: 500 });
  }
}
