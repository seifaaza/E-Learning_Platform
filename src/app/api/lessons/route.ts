import dbConnect from "@/lib/dbConnect";
import Lesson from "@/models/Lesson";
import { NextResponse } from "next/server";

// Handle GET requests
export async function GET() {
  await dbConnect();

  try {
    const lessons = await Lesson.find({}).exec();

    if (lessons.length === 0) {
      // If no lessons are found, return a 404 response with a message
      return NextResponse.json(
        { errorMsg: "Lessons list is empty" },
        { status: 404 }
      );
    }

    // If lessons are found, return them with a 200 status
    return NextResponse.json(lessons);
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
