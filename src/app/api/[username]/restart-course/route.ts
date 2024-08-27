import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Course from "@/models/Course";
import CourseProgress from "@/models/CourseProgress";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function PUT(
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
        { errorMsg: "Course ID or username is missing" },
        { status: 400 }
      );
    }

    let courseObjectId;
    try {
      courseObjectId = new mongoose.Types.ObjectId(courseId);
    } catch (err) {
      return NextResponse.json(
        { errorMsg: "Invalid course ID format" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ username });

    if (!user) {
      return NextResponse.json({ errorMsg: "User not found" }, { status: 404 });
    }

    // Remove the course from completedCourses if it exists
    if (user.completedCourses.includes(courseObjectId)) {
      user.completedCourses = user.completedCourses.filter(
        (course) => !course.equals(courseObjectId)
      );
    }

    // Remove the course progress entry if it exists
    const existingProgress = await CourseProgress.findOne({
      courseId: courseObjectId,
      userId: user._id,
    });

    if (existingProgress) {
      // Delete the CourseProgress entry
      await CourseProgress.deleteOne({
        courseId: courseObjectId,
        userId: user._id,
      });

      // Remove the reference from the user's courseProgresses array
      user.courseProgresses = user.courseProgresses.filter(
        (progress) => !progress.equals(existingProgress._id)
      );
    }

    // Find the course to initialize progress
    const course = await Course.findById(courseObjectId);
    if (!course) {
      return NextResponse.json(
        { errorMsg: "Course not found" },
        { status: 404 }
      );
    }

    // Initialize the course progress for this user
    const progressEntry = new CourseProgress({
      courseId: courseObjectId,
      userId: user._id,
      totalLessons: course.lessons.length,
      completedLessons: [],
      progressPercentage: 0, // Initialize progressPercentage to 0
    });

    // Save the course progress entry
    await progressEntry.save();

    // Add the reference to the user's courseProgresses array
    user.courseProgresses.push(progressEntry._id);

    await user.save();

    return NextResponse.json(
      { message: "Course started successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { errorMsg: "Internal server error" },
      { status: 500 }
    );
  }
}
