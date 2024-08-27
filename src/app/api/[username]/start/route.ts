import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Course from "@/models/Course";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { username: string } }
) {
  await dbConnect();

  const { username } = params;

  try {
    // Find the user by username and populate startedCourses with selected fields
    const user = await User.findOne({ username }).populate({
      path: "startedCourses",
      select: "_id title thumbnail", // Select the fields you need, including isCertified
    });

    // If the user does not exist
    if (!user) {
      return NextResponse.json({ errorMsg: "User not found" }, { status: 404 });
    }

    // Create a map of courseId to progressPercentage for easy lookup
    const progressMap = new Map(
      user.progress.map((progress) => [
        progress.courseId.toString(),
        progress.progressPercentage,
      ])
    );

    // Prepare the response with course progress
    const coursesWithProgress = user.startedCourses.map((course) => {
      const courseId = course._id.toString();
      const progressPercentage = progressMap.get(courseId) || 0;

      return {
        _id: course._id,
        title: course.title,
        thumbnail: course.thumbnail,
        progressPercentage: progressPercentage,
      };
    });

    return NextResponse.json(coursesWithProgress);
  } catch (error) {
    // Handle any errors that occur
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

    const courseObjectId = new mongoose.Types.ObjectId(courseId);
    const user = await User.findOne({ username });

    if (!user) {
      return NextResponse.json({ errorMsg: "User not found" }, { status: 404 });
    }

    if (user.startedCourses.includes(courseObjectId)) {
      return NextResponse.json(
        { errorMsg: "Course already started" },
        { status: 400 }
      );
    }

    user.startedCourses.push(courseObjectId);

    const course = await Course.findById(courseObjectId);
    if (course) {
      // Initialize the course progress for this user
      const progressEntry: CourseProgress = {
        courseId: courseObjectId,
        totalLessons: course.lessons.length,
        completedLessons: [],
        progressPercentage: 0, // Initialize progressPercentage to 0
      };

      // Check if progress for this course already exists
      const existingProgressIndex = user.progress.findIndex(
        (progress) => progress.courseId.toString() === courseObjectId.toString()
      );

      if (existingProgressIndex === -1) {
        user.progress.push(progressEntry);
      }
    }

    await user.save();

    return NextResponse.json(
      { successMsg: "Course started successfully" },
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

    // Remove the course from the startedCourses array
    user.startedCourses = user.startedCourses.filter(
      (id) => !id.equals(courseObjectId)
    );

    // Remove the course progress from the progress array
    user.progress = user.progress.filter(
      (progress) => !progress.courseId.equals(courseObjectId)
    );

    await user.save();

    return NextResponse.json({
      message: "Course removed from started courses and progress successfully",
    });
  } catch (error: any) {
    return NextResponse.json({ errorMsg: error.message }, { status: 500 });
  }
}
