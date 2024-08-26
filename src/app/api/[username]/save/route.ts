import dbConnect from "@/lib/dbConnect";
import Course from "@/models/Course";
import User from "@/models/User";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(
  req: Request,
  { params }: { params: { username: string } }
) {
  await dbConnect();

  try {
    await Course.init();
    const { username } = params;

    // Ensure username is provided
    if (!username) {
      return NextResponse.json(
        { errorMsg: "Username is required" },
        { status: 400 }
      );
    }

    // Find the user by username and populate savedCourses with necessary fields
    const user = await User.findOne({ username }).populate({
      path: "savedCourses",
      select: "title thumbnail lessons", // Select these fields from the Course model
    });

    // If the user does not exist
    if (!user) {
      return NextResponse.json({ errorMsg: "User not found" }, { status: 404 });
    }

    // Extract the course details
    const coursesWithDetails = user.savedCourses.map((course) => {
      return {
        _id: course._id,
        title: course.title,
        thumbnail: course.thumbnail,
        lessonsCount: course.lessons.length,
      };
    });

    // Return the courses with details
    return NextResponse.json(coursesWithDetails);
  } catch (error: any) {
    return NextResponse.json({ errorMsg: error.message }, { status: 500 });
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

    // Find the user by their username
    const user = await User.findOne({ username });

    if (!user) {
      return NextResponse.json({ errorMsg: "User not found" }, { status: 404 });
    }

    const courseObjectId = new mongoose.Types.ObjectId(courseId);

    // Check if the course is already saved
    if (user.savedCourses.includes(courseObjectId)) {
      return NextResponse.json(
        { errorMsg: "Course already saved" },
        { status: 400 }
      );
    }

    // Add the course to the user's savedCourses array
    user.savedCourses.push(courseObjectId);

    await user.save();

    return NextResponse.json(
      { successMsg: "Course saved successfully" },
      { status: 200 }
    );
  } catch (error: any) {
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

  try {
    if (!courseId || !username) {
      return NextResponse.json(
        { errorMsg: "Course ID or username is missing" },
        { status: 400 }
      );
    }

    // Find the user by their username
    const user = await User.findOne({ username });

    if (!user) {
      return NextResponse.json({ errorMsg: "User not found" }, { status: 404 });
    }

    const courseObjectId = new mongoose.Types.ObjectId(courseId);

    // Check if the course is in the savedCourses array
    const courseIndex = user.savedCourses.indexOf(courseObjectId);
    if (courseIndex === -1) {
      return NextResponse.json(
        { errorMsg: "Course not found in saved courses" },
        { status: 404 }
      );
    }

    // Remove the course from the user's savedCourses array
    user.savedCourses.splice(courseIndex, 1);

    await user.save();

    return NextResponse.json(
      { successMsg: "Course removed from saved courses successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ errorMsg: error.message }, { status: 500 });
  }
}
