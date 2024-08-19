import { NextResponse } from "next/server";
import mongoose from "mongoose";
import dbConnect from "@/lib/dbConnect";
import Course from "@/models/Course";
import User from "@/models/User"; // Import your User model

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

    const existingRating = course.ratings.find((rating) =>
      rating.user.equals(userId)
    );

    if (existingRating) {
      existingRating.rating = ratingValue;
    } else {
      course.ratings.push({ user: userId, rating: ratingValue });
    }

    await course.save();

    return NextResponse.json(
      { message: "Rating added/updated successfully" },
      { status: 200 }
    );
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
