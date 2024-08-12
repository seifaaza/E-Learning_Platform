import dbConnect from "@/lib/dbConnect";
import Course from "@/models/Course";
import Lesson from "@/models/Lesson";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { courseId: string } }
) {
  await dbConnect();

  const { courseId } = params;
  const url = new URL(request.url);
  const lessonId = url.searchParams.get("lesson");

  try {
    // Find the course by its ID, excluding `updated_at` and `category`
    const course = await Course.findById(courseId)
      .populate("lessons", "_id")
      .select("title description tags language source creator created_at");

    if (!course) {
      return NextResponse.json(
        { errorMsg: "Course not found" },
        { status: 404 }
      );
    }

    // Create an array of all lesson IDs
    const lessonIds = course.lessons.map((lessonInCourse: any) =>
      lessonInCourse._id.toString()
    );

    if (lessonId) {
      // Find the lesson by ID
      const lesson = await Lesson.findById(lessonId);
      if (!lesson) {
        return NextResponse.json(
          { errorMsg: "Lesson not found" },
          { status: 404 }
        );
      }

      // Check if the lesson is part of the course
      const lessonIndex = lessonIds.indexOf(lessonId);

      if (lessonIndex === -1) {
        return NextResponse.json(
          { errorMsg: "Lesson does not belong to this course" },
          { status: 400 }
        );
      }

      // Return the lesson with the specified format, total number of lessons, and all lessons
      return NextResponse.json({
        title: lesson.title,
        description: lesson.description,
        video: lesson.video,
        thumbnail: lesson.thumbnail,
        index: lessonIndex + 1,
        lessonIds,
      });
    }

    // If no specific lesson ID is provided, return the course details with the total number of lessons
    const courseResponse = {
      title: course.title,
      description: course.description,
      tags: course.tags,
      language: course.language,
      source: course.source,
      creator: course.creator,
      created_at: course.created_at,
    };

    return NextResponse.json(courseResponse);
  } catch (error: any) {
    return NextResponse.json({ errorMsg: error.message }, { status: 500 });
  }
}
