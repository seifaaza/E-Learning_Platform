import dbConnect from "@/lib/dbConnect";
import Course from "@/models/Course";
import { NextRequest, NextResponse } from "next/server";

// Handle GET requests
export async function GET() {
  await dbConnect();

  try {
    // Find all courses and populate the lessons field
    const courses = await Course.find({})
      .select("title thumbnail description lessons")
      .populate("lessons", "_id");

    if (courses.length === 0) {
      // If no courses are found, return a 404 response with a message
      return NextResponse.json(
        { errorMsg: "Courses list is empty" },
        { status: 404 }
      );
    }

    // Extract the ID of the first lesson for each course
    const coursesWithFirstLesson = courses.map((course) => {
      const initialLessonId =
        course.lessons.length > 0 ? course.lessons[0]._id : null;
      return {
        _id: course._id,
        title: course.title,
        thumbnail: course.thumbnail,
        description: course.description,
        initialLessonId, // Add the ID of the first lesson
      };
    });

    // Return the courses with first lesson ID
    return NextResponse.json(coursesWithFirstLesson);
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

// Handle POST requests
export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    // Parse the JSON body of the request
    const body = await req.json();
    const {
      title,
      thumbnail,
      description,
      source,
      tags,
      language,
      category,
      lessons,
    } = body;

    // Basic validation
    if (!title || !thumbnail || !description || !category || !lessons) {
      return NextResponse.json(
        { errorMsg: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create a new course document
    const newCourse = new Course({
      title,
      thumbnail,
      description,
      source,
      tags,
      language,
      category,
      lessons,
      created_at: new Date(),
      updated_at: new Date(),
    });

    // Save the course to the database
    await newCourse.save();

    // Return the newly created course with a 201 status
    return NextResponse.json(newCourse, { status: 201 });
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
