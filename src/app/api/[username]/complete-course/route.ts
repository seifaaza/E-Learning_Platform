import CompletedCourse from "@/models/CompletedCourse";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Course from "@/models/Course";
import CourseProgress from "@/models/CourseProgress";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(
  request: Request,
  { params }: { params: { username: string } }
) {
  await dbConnect();

  const { username } = params;
  const url = new URL(request.url);
  const courseId = url.searchParams.get("courseId");

  try {
    if (!courseId) {
      return NextResponse.json(
        { errorMsg: "courseId is required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ username }).populate({
      path: "courseProgresses",
      model: "CourseProgress",
    });

    if (!user) {
      return NextResponse.json({ errorMsg: "User not found" }, { status: 404 });
    }

    const courseObjectId = new mongoose.Types.ObjectId(courseId);

    // Find the progress for the specific course
    const progress = user.courseProgresses.find((progress: any) =>
      progress.courseId.equals(courseObjectId)
    );

    const isStarted = !!progress;
    const isCompleted = user.completedCourses.some((completed: any) =>
      completed.equals(courseObjectId)
    );

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
          isStarted,
          isCompleted: true,
          _id: course._id,
          title: course.title,
          thumbnail: course.thumbnail,
        },
        { status: 200 }
      );
    }

    // If the course is started, determine the current lesson ID
    if (isStarted && progress) {
      const course = await Course.findById(courseObjectId)
        .populate({
          path: "lessons",
          select: "_id",
        })
        .exec();

      if (!course) {
        return NextResponse.json(
          { errorMsg: "Course not found" },
          { status: 404 }
        );
      }
      const courseProgress = progress as typeof progress & {
        completedLessons: mongoose.Types.ObjectId[];
      };
      const lessons = course.lessons || [];
      const completedLessons = new Set(
        courseProgress.completedLessons.map((lesson: any) =>
          lesson._id.toString()
        ) || []
      );

      let currentLessonId: string | null = null;

      // Find the next lesson that hasn't been completed
      for (const lesson of lessons) {
        if (!completedLessons.has(lesson._id.toString())) {
          currentLessonId = lesson._id.toString();
          break;
        }
      }

      // If no current lesson is found, check if all lessons are completed
      if (!currentLessonId && lessons.length > 0) {
        currentLessonId = lessons[lessons.length - 1]?._id.toString() || null;
      }

      return NextResponse.json(
        {
          isStarted,
          currentLessonId,
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { isStarted, isCompleted: false },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching course details:", error);
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
