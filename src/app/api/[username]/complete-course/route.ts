import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Course from "@/models/Course";
import CourseProgress from "@/models/CourseProgress";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import CompletedCourse from "@/models/CompletedCourse";

export async function GET(
  request: Request,
  { params }: { params: { username: string } }
) {
  await dbConnect();

  const { username } = params;
  const url = new URL(request.url);
  const courseId = url.searchParams.get("courseId");

  try {
    const user = await User.findOne({ username });

    if (!user || !courseId) {
      return NextResponse.json(
        { errorMsg: "Missing user or courseId" },
        { status: 400 }
      );
    }

    const courseObjectId = new mongoose.Types.ObjectId(courseId);

    // Check if there is already a course progress entry for this user and course
    const isCompleted = await CompletedCourse.findOne({
      courseId: courseObjectId,
      userId: user._id,
    });

    console.log(isCompleted);

    if (isCompleted) {
      const course = await Course.findById(courseObjectId)
        .select("_id title thumbnail lessons")
        .exec();

      if (!course) {
        return NextResponse.json(
          { errorMsg: "Course not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(
        {
          isCompleted: true,
          _id: course._id,
          title: course.title,
          thumbnail: course.thumbnail,
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { isStarted: false, isCompleted: false },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);

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

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const courseObjectId = new mongoose.Types.ObjectId(courseId);

    const user = await User.findOne({ username }).session(session);

    if (!user) {
      throw new Error("User not found");
    }

    const courseProgress = await CourseProgress.findOne({
      userId: user._id,
      courseId: courseObjectId,
    }).session(session);

    if (!courseProgress) {
      throw new Error("Course progress not found");
    }

    // Check if all lessons are completed
    if (
      courseProgress.completedLessons.length !== courseProgress.totalLessons
    ) {
      return NextResponse.json(
        { errorMsg: "Not all lessons are completed" },
        { status: 400 }
      );
    }

    // Remove the course progress reference from the user document
    await User.updateOne(
      { _id: user._id },
      { $pull: { courseProgresses: courseProgress._id } }
    ).session(session);

    // Create a CompletedCourse entry
    const completedCourse = new CompletedCourse({
      courseId: courseObjectId,
      userId: user._id,
    });
    await completedCourse.save({ session });

    // Add to user's completedCourses array
    await User.updateOne(
      { _id: user._id },
      { $push: { completedCourses: completedCourse._id } }
    ).session(session);

    // Delete the course progress document
    await CourseProgress.deleteOne({ _id: courseProgress._id }).session(
      session
    );

    // Commit transaction
    await session.commitTransaction();

    return NextResponse.json({
      success: true,
      message: "Course marked as completed",
    });
  } catch (error: any) {
    await session.abortTransaction();
    return NextResponse.json({ errorMsg: error.message }, { status: 500 });
  } finally {
    session.endSession();
  }
}
