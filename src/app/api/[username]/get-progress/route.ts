import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(
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
        { errorMsg: "Missing course ID or username" },
        { status: 400 }
      );
    }

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json({ errorMsg: "User not found" }, { status: 404 });
    }

    // Get the progress for the specified course
    const courseProgress = user.progress.get(courseId);
    if (!courseProgress) {
      return NextResponse.json(
        { errorMsg: "No progress found for this course" },
        { status: 404 }
      );
    }

    // Return the progressPercentage
    return NextResponse.json(
      { progressPercentage: courseProgress.progressPercentage },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ errorMsg: error.message }, { status: 500 });
  }
}
