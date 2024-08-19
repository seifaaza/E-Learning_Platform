import dbConnect from "@/lib/dbConnect";
import Course from "@/models/Course";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { username: string } }
) {
  await dbConnect();

  try {
    await Course.init();
    const { username } = params;

    // Ensure username is provided
    if (!username) {
      return NextResponse.json(
        { errorMsg: "Username is required" },
        { status: 400 }
      );
    }

    // Find the user by username and populate savedCourses with necessary fields
    const user = await User.findOne({ username }).populate({
      path: "savedCourses",
      select: "title thumbnail lessons", // Select these fields from the Course model
    });

    // If the user does not exist
    if (!user) {
      return NextResponse.json({ errorMsg: "User not found" }, { status: 404 });
    }

    // Extract the course details
    const coursesWithDetails = user.savedCourses.map((course) => {
      return {
        _id: course._id,
        title: course.title,
        thumbnail: course.thumbnail,
        lessonsCount: course.lessons.length,
      };
    });

    // Return the courses with details
    return NextResponse.json(coursesWithDetails);
  } catch (error: any) {
    return NextResponse.json({ errorMsg: error.message }, { status: 500 });
  }
}
