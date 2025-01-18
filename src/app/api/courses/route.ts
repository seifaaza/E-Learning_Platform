import dbConnect from "@/lib/dbConnect";
import CompletedCourse from "@/models/CompletedCourse";
import Course from "@/models/Course";
import Lesson from "@/models/Lesson";
import { NextResponse } from "next/server";

// Handle GET requests
export async function GET() {
  await dbConnect();

  try {
    await Lesson.init();

    // Find all courses
    const courses = await Course.find({})
      .select("title thumbnail averageRating test")
      .lean();

    if (courses.length === 0) {
      return NextResponse.json(
        { errorMsg: "Courses list is empty" },
        { status: 404 }
      );
    }

    // Map through courses and calculate achievers count for each
    const coursesWithDetails = await Promise.all(
      courses.map(async (course) => {
        const achieversCount = await CompletedCourse.countDocuments({
          courseId: course._id,
        });

        return {
          _id: course._id,
          title: course.title,
          thumbnail: course.thumbnail,
          averageRating: course.averageRating,
          isCertified: !!course.test, // Convert to boolean
          achieversCount,
        };
      })
    );

    return NextResponse.json(coursesWithDetails, {
      headers: {
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
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

export async function POST(request: Request) {
  await dbConnect();

  try {
    const body = await request.json();

    // Validate required fields
    const { title, thumbnail, description, category, lessons } = body;
    if (!title || !thumbnail || !description || !category) {
      return NextResponse.json(
        {
          errorMsg: "Title, thumbnail, description, and category are required",
        },
        { status: 400 }
      );
    }

    // Validate lessons as an array of ObjectIds
    if (lessons && !Array.isArray(lessons)) {
      return NextResponse.json(
        { errorMsg: "Lessons must be an array of lesson IDs" },
        { status: 400 }
      );
    }

    // Create the course
    const newCourse = await Course.create({
      title,
      thumbnail,
      description,
      source: body.source || null,
      creator: body.creator || null,
      language: body.language || "en",
      objectives: body.objectives || [],
      category,
      lessons: lessons || [],
      created_at: new Date(),
    });

    return NextResponse.json(newCourse, { status: 201 });
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

// Enable revalidation on every request (no caching)
export const revalidate = 0;
