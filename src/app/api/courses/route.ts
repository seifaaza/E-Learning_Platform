import dbConnect from "@/lib/dbConnect";
import Course from "@/models/Course";
import Lesson from "@/models/Lesson";
import { NextResponse } from "next/server";

// Handle GET requests
export async function GET() {
  await dbConnect();

  try {
    await Lesson.init();

    // Find all courses and ensure fresh data by using .lean()
    const courses = await Course.find({})
      .select("title thumbnail averageRating isCertified")
      .lean(); // Use lean to get raw JavaScript objects and avoid Mongoose's internal caching

    if (courses.length === 0) {
      // If no courses are found, return a 404 response with a message
      return NextResponse.json(
        { errorMsg: "Courses list is empty" },
        { status: 404 }
      );
    }

    // Extract the course details including average rating
    const coursesWithDetails = courses.map((course) => {
      // Return course details including average rating
      return {
        _id: course._id,
        title: course.title,
        thumbnail: course.thumbnail,
        averageRating: course.averageRating,
        isCertified: course.isCertified,
      };
    });

    // Return the courses with details and force no caching
    return NextResponse.json(coursesWithDetails, {
      headers: {
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
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

// Enable revalidation on every request (no caching)
export const revalidate = 0;
