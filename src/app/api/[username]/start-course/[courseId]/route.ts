import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Course from "@/models/Course";
import CourseProgress from "@/models/CourseProgress";
import { NextRequest, NextResponse } from "next/server";
import Article from "@/models/Article";
import Lesson from "@/models/Lesson";

export async function GET(
  req: NextRequest,
  { params }: { params: { username: string; courseId: string } }
) {
  await dbConnect();

  const { username, courseId } = params;
  const lessonId = req.nextUrl.searchParams.get("lessonId");

  try {
    await Article.init();
    await Lesson.init();

    if (!lessonId) {
      return NextResponse.json(
        { errorMsg: "Lesson ID is missing" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ username });

    if (!user) {
      return NextResponse.json({ errorMsg: "User not found" }, { status: 404 });
    }

    // Check if the user has started the course by looking into courseProgresses
    const courseProgress = await CourseProgress.findOne({
      userId: user._id,
      courseId: courseId,
    });

    if (!courseProgress) {
      return NextResponse.json(
        { errorMsg: "Course not started" },
        { status: 404 }
      );
    }

    // Fetch the course with lessons and populated articles
    const course = await Course.findById(courseId).populate({
      path: "lessons",
      select:
        "title description topics tips objective video thumbnail articles",
      populate: {
        path: "articles",
        select: "title content",
      },
    });

    if (!course || !course.lessons || course.lessons.length === 0) {
      return NextResponse.json(
        { errorMsg: "Lessons not found" },
        { status: 404 }
      );
    }

    // Extract lesson IDs
    const lessonIds = course.lessons.map((lesson) => lesson._id.toString());

    // Find the index of the current lesson
    const currentLessonIndex = lessonIds.indexOf(lessonId) + 1;

    if (currentLessonIndex === 0) {
      return NextResponse.json(
        { errorMsg: "Lesson ID does not match any lesson in the course" },
        { status: 404 }
      );
    }

    // Find the current lesson and populate articles
    const lessonDocument = await Lesson.findById(lessonId).populate({
      path: "articles",
      select: "title content",
    });

    if (!lessonDocument) {
      return NextResponse.json(
        { errorMsg: "Current lesson not found" },
        { status: 404 }
      );
    }

    const responseData = {
      ...lessonDocument.toObject(),
      lessonIds,
      currentLessonIndex,
    };

    return NextResponse.json(responseData);
  } catch (error: any) {
    if (error instanceof Error) {
      return NextResponse.json({ errorMsg: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { errorMsg: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
