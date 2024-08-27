import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { username: string } }
) {
  await dbConnect();

  try {
    const { username } = params;

    if (!username) {
      return NextResponse.json(
        { errorMsg: "Username is required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ username }).populate({
      path: "savedCourses",
      select: "title thumbnail lessons",
    });

    if (!user) {
      return NextResponse.json({ errorMsg: "User not found" }, { status: 404 });
    }

    const coursesWithDetails = user.savedCourses.map((course) => ({
      _id: course._id,
      title: course.title,
      thumbnail: course.thumbnail,
      lessonsCount: course.lessons.length,
    }));

    return NextResponse.json(coursesWithDetails);
  } catch (error) {
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

    const user = await User.findOne({ username });

    if (!user) {
      return NextResponse.json({ errorMsg: "User not found" }, { status: 404 });
    }

    const courseObjectId = new mongoose.Types.ObjectId(courseId);

    if (user.savedCourses.includes(courseObjectId)) {
      return NextResponse.json(
        { errorMsg: "Course already saved" },
        { status: 400 }
      );
    }

    user.savedCourses.push(courseObjectId);

    await user.save();

    return NextResponse.json(
      { successMsg: "Course saved successfully" },
      { status: 200 }
    );
  } catch (error) {
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

  try {
    if (!courseId || !username) {
      return NextResponse.json(
        { errorMsg: "Course ID or username is missing" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ username });

    if (!user) {
      return NextResponse.json({ errorMsg: "User not found" }, { status: 404 });
    }

    const courseObjectId = new mongoose.Types.ObjectId(courseId);

    const courseIndex = user.savedCourses.indexOf(courseObjectId);
    if (courseIndex === -1) {
      return NextResponse.json(
        { errorMsg: "Course not found in saved courses" },
        { status: 404 }
      );
    }

    user.savedCourses.splice(courseIndex, 1);

    await user.save();

    return NextResponse.json(
      { successMsg: "Course removed from saved courses successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ errorMsg: error.message }, { status: 500 });
  }
}
