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

    // Check if the course exists in completedCourses
    if (!user.completedCourses.includes(courseObjectId)) {
      return NextResponse.json(
        { errorMsg: "Course is not completed" },
        { status: 400 }
      );
    }

    // Remove the course from completedCourses
    user.completedCourses = user.completedCourses.filter(
      (course) => !course.equals(courseObjectId as mongoose.Types.ObjectId)
    );

    // Remove the course progress entry if it exists
    const existingProgress = await CourseProgress.findOne({
      courseId: courseObjectId,
      userId: user._id,
    });

    if (existingProgress) {
      // Delete the CourseProgress entry
      await CourseProgress.deleteOne({
        courseId: courseObjectId,
        userId: user._id as mongoose.Types.ObjectId,
      });

      // Remove the reference from the user's courseProgresses array
      user.courseProgresses = user.courseProgresses.filter(
        (progress) =>
          !progress.equals(existingProgress._id as mongoose.Types.ObjectId)
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
      (rating) => !rating.user.equals(user._id as mongoose.Types.ObjectId)
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

    // Type assertion to ensure _id is treated as ObjectId
    const progressEntryId = progressEntry._id as mongoose.Types.ObjectId;

    // Add the reference to the user's courseProgresses array
    user.courseProgresses.push(progressEntryId);

    await course.save();
    await user.save();

    return NextResponse.json(
      {
        message: "Course restarted successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { errorMsg: "Internal server error" },
      { status: 500 }
    );
  }
}
