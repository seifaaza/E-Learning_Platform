import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Course from "@/models/Course";
import Lesson from "@/models/Lesson";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { courseId: string } }
) {
  await dbConnect();

  const { courseId } = params;
  const url = new URL(request.url);
  const lessonId = url.searchParams.get("lessonId");
  const username = url.searchParams.get("username");

  try {
    if (!courseId || !lessonId || !username) {
      return NextResponse.json(
        { errorMsg: "Missing course ID, lesson ID, or username" },
        { status: 400 }
      );
    }

    const courseObjectId = new mongoose.Types.ObjectId(courseId);
    const lessonObjectId = new mongoose.Types.ObjectId(lessonId);

    // Check if the course and lesson exist
    const course = await Course.findById(courseObjectId);
    const lesson = await Lesson.findById(lessonObjectId);

    if (!course) {
      return NextResponse.json(
        { errorMsg: "Course not found" },
        { status: 404 }
      );
    }

    if (!lesson) {
      return NextResponse.json(
        { errorMsg: "Lesson not found" },
        { status: 404 }
      );
    }

    // Find the user and update progress
    const user = await User.findOne({ username }).exec();

    if (!user) {
      return NextResponse.json({ errorMsg: "User not found" }, { status: 404 });
    }

    // Initialize progress for the course if it doesn't exist
    if (!user.progress.has(courseId)) {
      user.progress.set(courseId, {
        completedLessons: [],
        totalLessons: course.lessons.length,
        progressPercentage: 0,
      });
    }

    const courseProgress = user.progress.get(courseId);

    if (!courseProgress) {
      return NextResponse.json(
        { errorMsg: "Course progress not found" },
        { status: 404 }
      );
    }

    // Add lesson to completedLessons if not already present
    if (!courseProgress.completedLessons.includes(lessonObjectId)) {
      courseProgress.completedLessons.push(lessonObjectId);

      user.progress.set(courseId, courseProgress);
      await user.save();

      return NextResponse.json({
        message: "Lesson marked as completed",
        progress: courseProgress,
      });
    } else {
      return NextResponse.json(
        { message: "Lesson already marked as completed" },
        { status: 400 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ errorMsg: error.message }, { status: 500 });
  }
}