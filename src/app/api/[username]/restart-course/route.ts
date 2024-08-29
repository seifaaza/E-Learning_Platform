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

    // Remove the user's rating from the course
    const course = await Course.findById(courseObjectId);
    if (!course) {
      return NextResponse.json(
        { errorMsg: "Course not found" },
        { status: 404 }
      );
    }

    // Remove the user's rating from the ratings array
    course.ratings = course.ratings.filter(
      (rating) => !rating.user.equals(user._id)
    );

    // Recalculate the average rating
    if (course.ratings.length > 0) {
      const totalRating = course.ratings.reduce(
        (sum, rating) => sum + rating.rating,
        0
      );
      const avgRating = totalRating / course.ratings.length;
      course.averageRating = Math.round(avgRating * 2) / 2; // Round to nearest 0.5
    } else {
      course.averageRating = 0;
    }

    await course.save();
    await user.save();

    return NextResponse.json(
      { message: "User rating deleted and course progress reset successfully" },
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
