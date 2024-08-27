import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Course from "@/models/Course";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import CourseProgress from "@/models/CourseProgress";

export async function GET(
  request: Request,
  { params }: { params: { username: string } }
) {
  await dbConnect();

  const { username } = params;
  const url = new URL(request.url);
  const courseId = url.searchParams.get("courseId");

  try {
    // Find the user by username
    const user = await User.findOne({ username })
      .populate("completedCourses")
      .exec();

    if (!user) {
      return NextResponse.json({ errorMsg: "User not found" }, { status: 404 });
    }

    if (courseId) {
      const courseObjectId = new mongoose.Types.ObjectId(courseId);

      // Check if the courseId is in the user's completedCourses
      const isCompleted = user.completedCourses.some((completedCourseId) =>
        completedCourseId.equals(courseObjectId)
      );

      if (!isCompleted) {
        // Check if the course exists
        const courseExists = await Course.findById(courseObjectId).exec();
        if (!courseExists) {
          return NextResponse.json(
            { errorMsg: "Course not found" },
            { status: 404 }
          );
        }

        return NextResponse.json({ isCompleted: false }, { status: 404 });
      }

      return NextResponse.json({ isCompleted }, { status: 200 });
    } else {
      // Find all completed courses for the user
      const completedCourses = await Course.find({
        _id: { $in: user.completedCourses },
      }).select("_id title thumbnail");

      if (completedCourses.length === 0) {
        return NextResponse.json({ isCompleted: false }, { status: 404 });
      }

      // Return the completed courses with details
      return NextResponse.json(completedCourses, { status: 200 });
    }
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

  if (!courseId) {
    return NextResponse.json(
      { errorMsg: "Course ID is required" },
      { status: 400 }
    );
  }

  try {
    // Find the user by username to get the user's ObjectId
    const user = await User.findOne({ username });

    if (!user) {
      return NextResponse.json({ errorMsg: "User not found" }, { status: 404 });
    }

    const userId = user._id;

    // Fetch the user's progress for the specific course
    const courseProgress = await CourseProgress.findOne({
      userId,
      courseId,
    });

    if (!courseProgress) {
      return NextResponse.json(
        { errorMsg: "Course progress not found" },
        { status: 404 }
      );
    }

    // Check if all lessons are completed
    if (
      courseProgress.completedLessons.length === courseProgress.totalLessons
    ) {
      // Remove the course from the user's courseProgresses
      await User.updateOne(
        { _id: userId },
        {
          $pull: { courseProgresses: courseProgress._id },
          $addToSet: { completedCourses: courseId },
        }
      );

      // Remove the CourseProgress document
      await CourseProgress.deleteOne({ _id: courseProgress._id });

      return NextResponse.json({
        success: true,
        message: "Course marked as completed",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Not all lessons are completed",
      });
    }
  } catch (error: any) {
    return NextResponse.json({ errorMsg: error.message }, { status: 500 });
  }
}
