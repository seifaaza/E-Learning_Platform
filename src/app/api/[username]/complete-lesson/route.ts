import dbConnect from "@/lib/dbConnect";
import Course from "@/models/Course";
import Lesson from "@/models/Lesson";
import User from "@/models/User";
import CourseProgress from "@/models/CourseProgress";
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

    // Find the course progress for the specified courseId
    const courseProgress = await CourseProgress.findOne({
      userId: user._id,
      courseId: courseId,
    });

    if (!courseProgress) {
      return NextResponse.json(
        { errorMsg: "Course progress not found" },
        { status: 404 }
      );
    }

    // Get all completed lesson IDs for the course
    const completedLessonIds = courseProgress.completedLessons;

    // Get the course details including isCertified
    const course = await Course.findById(courseId).exec();

    if (!course) {
      return NextResponse.json(
        { errorMsg: "Course not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      completedLessonIds,
      isCertified: course.test !== null,
    });
  } catch (error: any) {
    return NextResponse.json({ errorMsg: error.message }, { status: 500 });
  }
}

export async function PUT(
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

    // Convert IDs to ObjectId
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

    // Find the user
    const user = await User.findOne({ username }).exec();

    if (!user) {
      return NextResponse.json({ errorMsg: "User not found" }, { status: 404 });
    }

    // Find or create course progress for the user
    let courseProgress = await CourseProgress.findOne({
      userId: user._id,
      courseId: courseObjectId,
    });

    if (!courseProgress) {
      // Initialize progress for the course if it doesn't exist
      courseProgress = new CourseProgress({
        userId: user._id,
        courseId: courseObjectId,
        totalLessons: course.lessons.length,
        completedLessons: [],
        progressPercentage: 0,
      });
    }

    // Ensure `completedLessons` is an array of ObjectIds
    const completedLessons = courseProgress.completedLessons.map(
      (id) => new mongoose.Types.ObjectId(id)
    );

    // Add lesson to completedLessons if not already present
    if (!completedLessons.some((id) => id.equals(lessonObjectId))) {
      courseProgress.completedLessons.push(lessonObjectId);

      // Calculate the progress percentage
      const totalLessons = course.lessons.length;
      const updatedCompletedLessons = courseProgress.completedLessons.length;

      // Determine the max progress based on course certification
      const maxProgress = course.test === null ? 99 : 80;

      const progressPercentage = Math.trunc(
        (updatedCompletedLessons / totalLessons) * maxProgress
      );

      // Update the progressPercentage
      courseProgress.progressPercentage = progressPercentage;

      // Save the updated course progress
      await courseProgress.save();

      return NextResponse.json({
        message: "Lesson marked as completed",
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
