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
    // Find the course by its ID
    const course = await Lesson.findById(id);

    if (!course) {
      return NextResponse.json(
        { errorMsg: "course not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(course);
  } catch (error: any) {
    return NextResponse.json({ errorMsg: error.message }, { status: 500 });
  }
}
