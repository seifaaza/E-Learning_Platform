import { NextResponse } from "next/server";
import mongoose from "mongoose";
import dbConnect from "@/lib/dbConnect";
import Course from "@/models/Course";
import User from "@/models/User";

export async function GET(
  request: Request,
  { params }: { params: { username: string } }
) {
  await dbConnect();

  const { searchParams } = new URL(request.url);
  const courseId = searchParams.get("courseId");

  if (!courseId || !mongoose.Types.ObjectId.isValid(courseId)) {
    return NextResponse.json(
      { errorMsg: "Invalid or missing courseId" },
      { status: 400 }
    );
  }

  try {
    const course = await Course.findById(courseId);

    if (!course) {
      return NextResponse.json(
        { errorMsg: "Course not found" },
        { status: 404 }
      );
    }

    // Find the user by their username
    const user = await User.findOne({ username: params.username });

    if (!user) {
      return NextResponse.json({ errorMsg: "User not found" }, { status: 404 });
    }

    const userId = user._id as mongoose.Types.ObjectId;

    // Check if the user has already rated the course
    const existingRating = course.ratings.find((rating) =>
      rating.user.equals(userId)
    );

    if (existingRating) {
      return NextResponse.json(
        { hasRated: true, ratingValue: existingRating.rating },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ hasRated: false }, { status: 200 });
    }
  } catch (error) {
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

  const { searchParams } = new URL(request.url);
  const courseId = searchParams.get("courseId");

  if (!courseId || !mongoose.Types.ObjectId.isValid(courseId)) {
    return NextResponse.json(
      { errorMsg: "Invalid or missing courseId" },
      { status: 400 }
    );
  }

  const { ratingValue } = await request.json();

  if (typeof ratingValue !== "number" || ratingValue < 1 || ratingValue > 5) {
    return NextResponse.json(
      { errorMsg: "Invalid ratingValue. It must be a number between 1 and 5." },
      { status: 400 }
    );
  }

  try {
    const course = await Course.findById(courseId);

    if (!course) {
      return NextResponse.json(
        { errorMsg: "Course not found" },
        { status: 404 }
      );
    }

    // Find the user by their username
    const user = await User.findOne({ username: params.username });

    if (!user) {
      return NextResponse.json({ errorMsg: "User not found" }, { status: 404 });
    }

    const userId = user._id;

    // Ensure that userId is treated as an ObjectId
    if (!(userId instanceof mongoose.Types.ObjectId)) {
      return NextResponse.json(
        { errorMsg: "Invalid user ID" },
        { status: 400 }
      );
    }

    // Check if the user has already rated the course
    const existingRating = course.ratings.find((rating) =>
      rating.user.equals(userId)
    );

    if (existingRating) {
      // If the user has already rated the course, return an error
      return NextResponse.json(
        { errorMsg: "You have already rated this course" },
        { status: 400 }
      );
    } else {
      // If no existing rating, add a new rating
      course.ratings.push({ user: userId, rating: ratingValue });
      await course.save();

      return NextResponse.json(
        { message: "Rating added successfully" },
        { status: 200 }
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ errorMsg: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { errorMsg: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
