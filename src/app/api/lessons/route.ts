import dbConnect from "@/lib/dbConnect";
import Lesson from "@/models/Lesson";
import { NextResponse } from "next/server";

// Handle GET requests
export async function GET() {
  await dbConnect();
  try {
    const lessons = await Lesson.find({}).select("title img description");
    return NextResponse.json(lessons);
  } catch (error: any) {
    return NextResponse.json({ errorMsg: error.message });
  }
}
