import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Course from "@/models/Course";
import CourseProgress from "@/models/CourseProgress";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import CompletedCourse from "@/models/CompletedCourse";

export async function PUT(
  request: Request,
  { params }: { params: { username: string } }
) {
  await dbConnect();

  const { username } = params;
  const url = new URL(request.url);
  const courseId = url.searchParams.get("courseId");

  if (!courseId || !username) {
    return NextResponse.json(
      { errorMsg: "Course ID or username is missing" },
      { status: 400 }
    );
  }

  let courseObjectId: mongoose.Types.ObjectId;
  try {
    courseObjectId = new mongoose.Types.ObjectId(courseId);
  } catch (err) {
    return NextResponse.json(
      { errorMsg: "Invalid course ID format" },
      { status: 400 }
    );
  }

  try {
    // Find the user
    const user = await User.findOne({ username }).exec();
    if (!user) {
      return NextResponse.json({ errorMsg: "User not found" }, { status: 404 });
    }

    const userId = user._id as mongoose.Types.ObjectId;

    console.log("User found:", user);

    // Check if the course is in the completedCourses collection
    const completedCourse = await CompletedCourse.findOne({
      courseId: courseObjectId,
      userId: userId,
    }).exec();

    if (!completedCourse) {
      return NextResponse.json(
        { errorMsg: "Course is not completed or does not exist" },
        { status: 404 }
      );
    }

    console.log("Completed course found:", completedCourse);

    // Remove course from CompletedCourse collection
    const deleteResult = await CompletedCourse.deleteOne({
      courseId: courseObjectId,
      userId: userId,
    });

    if (deleteResult.deletedCount === 0) {
      console.error("Course deletion failed: No document was deleted");
    } else {
      console.log("Course removed from CompletedCourse:", courseId);
    }

    // Remove the course from the completedCourses array in User model
    const originalCompletedCourses = user.completedCourses;
    user.completedCourses = user.completedCourses.filter(
      (courseId) => !courseId.equals(courseObjectId)
    );

    console.log("Completed courses before update:", originalCompletedCourses);
    console.log("Completed courses after update:", user.completedCourses);

    // Save the user after updating completedCourses
    await user.save();

    // Remove progress for the course from CourseProgress
    const existingProgress = await CourseProgress.findOne({
      courseId: courseObjectId,
      userId: userId,
    }).exec();

    if (existingProgress) {
      // Delete the progress entry from CourseProgress
      await existingProgress.deleteOne();
      console.log("Progress entry deleted for course:", courseId);
    }

    // Find the course and remove the user's rating
    const course = await Course.findById(courseObjectId).exec();
    if (!course) {
      return NextResponse.json(
        { errorMsg: "Course not found" },
        { status: 404 }
      );
    }

    // Remove user's rating for the course
    course.ratings = course.ratings.filter(
      (rating) => !rating.user.equals(userId)
    );

    // Recalculate average rating
    if (course.ratings.length > 0) {
      const totalRating = course.ratings.reduce(
        (sum, rating) => sum + rating.rating,
        0
      );
      course.averageRating =
        Math.round((totalRating / course.ratings.length) * 2) / 2;
    } else {
      course.averageRating = 0; // If no ratings, set average rating to 0
    }

    // Save the updated course after removing ratings and updating average rating
    await course.save();

    // Create a new progress entry for the user
    const progressEntry = new CourseProgress({
      courseId: courseObjectId,
      userId: userId,
      totalLessons: course.lessons.length,
      completedLessons: [],
      progressPercentage: 0,
    });

    await progressEntry.save();

    // Add the new progress entry to the user's courseProgresses
    user.courseProgresses.push(progressEntry._id as mongoose.Types.ObjectId);

    // Save the user after adding new progress entry
    await user.save();

    return NextResponse.json(
      { message: "Course restarted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error restarting course:", error);
    return NextResponse.json(
      { errorMsg: "Internal server error" },
      { status: 500 }
    );
  }
}
