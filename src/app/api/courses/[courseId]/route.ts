import dbConnect from "@/lib/dbConnect";
import Course from "@/models/Course";
import Lesson from "@/models/Lesson";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { courseId: string } }
) {
  await dbConnect();

  const { courseId } = params;

  try {
    await Lesson.init();
    if (!courseId) {
      return NextResponse.json(
        { errorMsg: "Course ID is missing" },
        { status: 400 }
      );
    }

    const courseObjectId = new mongoose.Types.ObjectId(courseId);

    const course = await Course.findById(courseObjectId)
      .populate("lessons", "_id title articles topics")
      .populate("category", "name") // Populate the category name
      .select("-ratings");

    if (!course) {
      return NextResponse.json(
        { errorMsg: "Course not found" },
        { status: 404 }
      );
    }

    // Calculate total articles and total topics
    const totalArticles = course.lessons.reduce(
      (sum, lesson) => sum + lesson.articles.length,
      0
    );
    const totalTopics = course.lessons.reduce(
      (sum, lesson) => sum + lesson.topics.length,
      0
    );

    // Prepare the course response object
    const courseResponse = {
      _id: course._id,
      title: course.title,
      thumbnail: course.thumbnail,
      description: course.description,
      averageRating: course.averageRating,
      language: course.language,
      source: course.source,
      creator: course.creator,
      isCertified: course.isCertified,
      objectives: course.objectives,
      created_at: course.created_at,
      firstLessonId: course.lessons[0]?._id || null,
      lessonsTitles: course.lessons.map((lesson) => lesson.title),
      totalArticles,
      totalTopics,
      categoryName: course.category.name, // Add category name to the response
    };

    return NextResponse.json(courseResponse);
  } catch (error: any) {
    return NextResponse.json({ errorMsg: error.message }, { status: 500 });
  }
}
