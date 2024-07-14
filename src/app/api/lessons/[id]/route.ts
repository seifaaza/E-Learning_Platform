import dbConnect from "@/lib/dbConnect";
import Lesson from "@/models/Lesson";
import { NextResponse } from "next/server";

// The 'id' parameter will be extracted from the request URL
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();

  const { id } = params;

  try {
    // Find the lesson by its ID
    const lesson = await Lesson.findById(id);

    if (!lesson) {
      return NextResponse.json(
        { errorMsg: "Lesson not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(lesson);
  } catch (error: any) {
    return NextResponse.json({ errorMsg: error.message }, { status: 500 });
  }
}
