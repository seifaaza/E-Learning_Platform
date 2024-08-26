import dbConnect from "@/lib/dbConnect";
import Course from "@/models/Course";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

// Handle GET requests
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
      select: "_id title thumbnail isCertified", // Select the fields you need, including isCertified
    });

    // If the user does not exist
    if (!user) {
      return NextResponse.json({ errorMsg: "User not found" }, { status: 404 });
    }

    // Extract the course details along with progress
    const startedCourses = user.startedCourses.map((course) => {
      const courseId = course._id.toString();
      const courseProgress = user.progress.get(courseId);

      // Calculate progress percentage based on whether the course is certified
      const totalLessons = courseProgress?.totalLessons || 0;
      const completedLessons = courseProgress?.completedLessons.length || 0;
      const maxProgress = course.isCertified ? 80 : 100;
      const progressPercentage =
        totalLessons > 0 ? (completedLessons / totalLessons) * maxProgress : 0;

      return {
        _id: course._id,
        title: course.title,
        thumbnail: course.thumbnail,
        progressPercentage: Math.trunc(progressPercentage),
      };
    });

    // Return the started courses with progress
    return NextResponse.json(startedCourses);
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

    // Find the course and user by their respective IDs
    const courseObjectId = new mongoose.Types.ObjectId(courseId);
    const user = await User.findOne({ username });

    if (!user) {
      return NextResponse.json({ errorMsg: "User not found" }, { status: 404 });
    }

    // Check if the course is already started
    if (user.startedCourses.includes(courseObjectId)) {
      return NextResponse.json(
        { errorMsg: "Course already started" },
        { status: 400 }
      );
    }

    // Add the course to the user's startedCourses array
    user.startedCourses.push(courseObjectId);

    // Initialize the course progress for this user
    const course = await Course.findById(courseObjectId);
    if (course) {
      // Ensure progress is a Map before setting the course progress
      if (!user.progress) {
        user.progress = new Map();
      }

      user.progress.set(courseId, {
        totalLessons: course.lessons.length,
        completedLessons: [],
        progressPercentage: 0, // Initialize progressPercentage to 0
      });
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

export async function DELETE(
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

    // Remove the course from the startedCourses array and progress field
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        $pull: { startedCourses: courseObjectId },
        $unset: { [`progress.${courseId}`]: "" }, // Remove the specific course progress
      },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { errorMsg: "Failed to update started courses" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Course removed from started courses and progress successfully",
    });
  } catch (error: any) {
    return NextResponse.json({ errorMsg: error.message }, { status: 500 });
  }
}
