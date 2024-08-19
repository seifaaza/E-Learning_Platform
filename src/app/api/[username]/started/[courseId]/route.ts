import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Course from "@/models/Course";
import { NextRequest, NextResponse } from "next/server";
import Article from "@/models/Article";

// Handle GET requests
export async function GET(
  req: NextRequest,
  { params }: { params: { username: string; courseId: string } }
) {
  await dbConnect();

  const { username, courseId } = params;
  const lessonId = req.nextUrl.searchParams.get("lesson");

  try {
    await Article.init();
    if (!lessonId) {
      return NextResponse.json(
        { errorMsg: "Lesson ID is missing" },
        { status: 400 }
      );
    }

    const user = await User.findOne({
      username,
      startedCourses: courseId,
    });

    if (!user) {
      return NextResponse.json(
        { errorMsg: "User not found or course not started" },
        { status: 404 }
      );
    }

    const course = await Course.findById(courseId).populate({
      path: "lessons",
      match: { _id: lessonId },
      select:
        "title description topics tips objective video thumbnail articles",
      populate: { path: "articles", select: "title content" },
    });

    if (!course || !course.lessons || course.lessons.length === 0) {
      return NextResponse.json(
        { errorMsg: "Lesson not found" },
        { status: 404 }
      );
    }

    const lesson = course.lessons[0];

    return NextResponse.json(lesson);
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
