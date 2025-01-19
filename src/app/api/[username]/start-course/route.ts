import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import CourseProgress from "@/models/CourseProgress";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Course from "@/models/Course";
import Lesson from "@/models/Lesson";

export async function GET(
  req: NextRequest,
  { params }: { params: { username: string } }
) {
  await dbConnect();

  const { username } = params;

  try {
    await Lesson.init();

    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return NextResponse.json({ errorMsg: "User not found" }, { status: 404 });
    }

    // If no courseId is provided, return all courses with their progress
    const courseProgresses = await CourseProgress.find({
      userId: user._id,
    }).populate({
      path: "courseId",
      select: "_id title thumbnail",
    });

    const coursesWithProgress = await Promise.all(
      courseProgresses.map(async (progress) => {
        const course = await Course.findById(progress.courseId._id).populate({
          path: "lessons",
          select: "_id",
        });

        const lessons = course?.lessons || [];
        const completedLessons = new Set(
          progress.completedLessons.map((lesson) => lesson._id.toString()) || []
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

        return {
          _id: progress.courseId._id,
          title: (progress.courseId as any).title,
          thumbnail: (progress.courseId as any).thumbnail,
          progressPercentage: progress.progressPercentage,
          currentLessonId: currentLessonId || null,
        };
      })
    );

    return NextResponse.json(coursesWithProgress);
  } catch (error: any) {
    if (error instanceof Error) {
      return NextResponse.json({ errorMsg: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { errorMsg: "An unexpected error occurred" },
      { status: 500 }
    );
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

  try {
    if (!courseId || !username) {
      return NextResponse.json(
        { errorMsg: "Course ID or username is missing" },
        { status: 400 }
      );
    }

    // Explicitly cast courseId to string
    const courseObjectId = new mongoose.Types.ObjectId(courseId as string);
    const user = await User.findOne({ username });

    if (!user) {
      return NextResponse.json({ errorMsg: "User not found" }, { status: 404 });
    }

    // Check if there is already a course progress entry for this user and course
    const existingProgress = await CourseProgress.findOne({
      courseId: courseObjectId,
      userId: user._id,
    });

    if (existingProgress) {
      return NextResponse.json(
        { errorMsg: "Course already started" },
        { status: 400 }
      );
    }

    const course = await Course.findById(courseObjectId);
    if (course) {
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
      user.courseProgresses.push(progressEntry._id as mongoose.Types.ObjectId);
    }

    await user.save();

    return NextResponse.json(
      { message: "Course started successfully" },
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

  if (!courseId || !username) {
    return NextResponse.json(
      { errorMsg: "Course ID and username are required" },
      { status: 400 }
    );
  }

  try {
    // Find the user
    const user = await User.findOne({ username });

    if (!user) {
      return NextResponse.json({ errorMsg: "User not found" }, { status: 404 });
    }

    const courseObjectId = new mongoose.Types.ObjectId(courseId);

    // Find and remove the course progress document
    const progress = await CourseProgress.findOneAndDelete({
      courseId: courseObjectId,
      userId: user._id,
    });

    if (progress) {
      user.courseProgresses = user.courseProgresses.filter(
        (progressId) =>
          !progressId.equals(progress._id as mongoose.Types.ObjectId)
      );

      await user.save();

      return NextResponse.json(
        { message: "Course removed from progress successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Course not started" },
        { status: 400 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ errorMsg: error.message }, { status: 500 });
  }
}
