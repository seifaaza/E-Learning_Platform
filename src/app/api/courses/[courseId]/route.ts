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
    // Find the course by its ID
    const course = await Course.findById(courseId).populate("lessons");

    if (!course) {
      return NextResponse.json(
        { errorMsg: "Course not found" },
        { status: 404 }
      );
    }

    // Get the total number of lessons
    const lessonsCount = course.lessons.length;

    // If a specific lesson ID is provided, find the lesson and include it in the response
    if (lessonId) {
      const lesson = await Lesson.findById(lessonId);
      if (!lesson) {
        return NextResponse.json(
          { errorMsg: "Lesson not found" },
          { status: 404 }
        );
      }

      // Check if the lesson is part of the course
      const lessonIndex = course.lessons.findIndex(
        (lessonInCourse: any) => lessonInCourse._id.toString() === lessonId
      );

      if (lessonIndex === -1) {
        return NextResponse.json(
          { errorMsg: "Lesson does not belong to this course" },
          { status: 400 }
        );
      }

      // Extract other lessons excluding the current one
      const otherLessons = course.lessons
        .filter(
          (lessonInCourse: any) => lessonInCourse._id.toString() !== lessonId
        )
        .map((lessonInCourse: any) => ({
          id: lessonInCourse._id.toString(),
          title: lessonInCourse.title,
          thumbnail: lessonInCourse.thumbnail,
        }));

      // Return the lesson with the specified format, total number of lessons, and other lessons
      return NextResponse.json({
        _id: lesson._id.toString(),
        title: lesson.title,
        video: lesson.video,
        thumbnail: lesson.thumbnail,
        index: lessonIndex + 1,
        lessonsCount,
        otherLessons,
      });
    }

    // If no specific lesson ID is provided, return the course details with the total number of lessons
    return NextResponse.json({ ...course.toObject(), lessonsCount });
  } catch (error: any) {
    return NextResponse.json({ errorMsg: error.message }, { status: 500 });
  }
}
