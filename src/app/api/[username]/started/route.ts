import dbConnect from "@/lib/dbConnect";
import Course from "@/models/Course";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

// Handle GET requests
export async function GET(
  req: NextRequest,
  { params }: { params: { username: string } }
) {
  await dbConnect();

  const { username } = params;

  try {
    // Find the user by username and populate startedCourses with selected fields
    const user = await User.findOne({ username }).populate({
      path: "startedCourses",
      select: "_id title thumbnail isCertified", // Select the fields you need, including isCertified
    });

    // If the user does not exist
    if (!user) {
      return NextResponse.json({ errorMsg: "User not found" }, { status: 404 });
    }

    // Extract the course details along with progress
    const startedCourses = user.startedCourses.map((course) => {
      const courseId = course._id.toString();
      const courseProgress = user.progress.get(courseId);

      // Calculate progress percentage based on whether the course is certified
      const totalLessons = courseProgress?.totalLessons || 0;
      const completedLessons = courseProgress?.completedLessons.length || 0;
      const maxProgress = course.isCertified ? 80 : 100;
      const progressPercentage =
        totalLessons > 0 ? (completedLessons / totalLessons) * maxProgress : 0;

      return {
        _id: course._id,
        title: course.title,
        thumbnail: course.thumbnail,
        progressPercentage: Math.trunc(progressPercentage),
      };
    });

    // Return the started courses with progress
    return NextResponse.json(startedCourses);
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
