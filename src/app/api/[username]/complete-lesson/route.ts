import dbConnect from "@/lib/dbConnect";
import Course from "@/models/Course";
import Lesson from "@/models/Lesson";
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
    if (!courseId || !username) {
      return NextResponse.json(
        { errorMsg: "Missing course ID or username" },
        { status: 400 }
      );
    }

    // Find the user
    const user = await User.findOne({ username }).exec();

    if (!user) {
      return NextResponse.json({ errorMsg: "User not found" }, { status: 404 });
    }

    // Check if the user's progress for the course exists
    const courseProgress = user.progress.get(courseId);

    if (!courseProgress) {
      return NextResponse.json(
        { errorMsg: "Course progress not found" },
        { status: 404 }
      );
    }

    // Get all completed lesson IDs for the course
    const completedLessonIds = courseProgress.completedLessons;

    return NextResponse.json(completedLessonIds);
  } catch (error: any) {
    return NextResponse.json({ errorMsg: error.message }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: { username: string } }
) {
  await dbConnect();

  const { username } = params;
  const url = new URL(request.url);
  const courseId = url.searchParams.get("courseId");
  const lessonId = url.searchParams.get("lessonId");

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

      // Calculate the progress percentage
      const totalLessons = course.lessons.length;
      const completedLessons = courseProgress.completedLessons.length || 0;

      // Determine the max progress based on course certification
      const maxProgress = course.isCertified ? 80 : 100;
      const progressPercentage = Math.trunc(
        (completedLessons / totalLessons) * maxProgress
      );

      // Update the progressPercentage
      courseProgress.progressPercentage = progressPercentage;

      user.progress.set(courseId, courseProgress);
      await user.save();

      return NextResponse.json({
        message: "Lesson marked as completed",
        progress: courseProgress,
      });
    } else {
      return NextResponse.json({
        message: "Lesson already marked as completed",
      });
    }
  } catch (error: any) {
    return NextResponse.json({ errorMsg: error.message }, { status: 500 });
  }
}
