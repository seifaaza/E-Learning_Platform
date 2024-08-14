import dbConnect from "@/lib/dbConnect";
import Course from "@/models/Course";
import Lesson from "@/models/Lesson";
import { NextRequest, NextResponse } from "next/server";

// Handle GET requests
export async function GET() {
  await dbConnect();

  try {
    // Ensure that the Lesson model is registered before using it
    await Lesson.init();

    // Find all courses and populate the lessons field
    const courses = await Course.find({})
      .select("title thumbnail lessons")
      .populate("lessons", "_id");

    if (courses.length === 0) {
      // If no courses are found, return a 404 response with a message
      return NextResponse.json(
        { errorMsg: "Courses list is empty" },
        { status: 404 }
      );
    }

    // Extract the ID of the first lesson and count of lessons for each course
    const coursesWithDetails = courses.map((course) => {
      const initialLessonId =
        course.lessons.length > 0 ? course.lessons[0]._id : null;
      return {
        _id: course._id,
        title: course.title,
        thumbnail: course.thumbnail,
        description: course.description,
        initialLessonId,
        lessonsCount: course.lessons.length, // Include the count of lessons
      };
    });

    // Return the courses with first lesson ID and lesson count
    return NextResponse.json(coursesWithDetails);
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
