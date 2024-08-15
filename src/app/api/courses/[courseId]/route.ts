import dbConnect from "@/lib/dbConnect";
import Course from "@/models/Course";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { courseId: string } }
) {
  await dbConnect();

  const { courseId } = params;

  try {
    if (!courseId) {
      return NextResponse.json(
        { errorMsg: "Course ID is missing" },
        { status: 400 }
      );
    }

    const courseObjectId = new mongoose.Types.ObjectId(courseId);

    // Find the course by ID, populate the lessons (including titles, articles, and topics), and exclude the category and ratings
    const course = await Course.findById(courseObjectId)
      .populate("lessons", "_id title articles topics") // Include lesson titles, articles, and topics in the population
      .select("-category -ratings");

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
      objectives: course.objectives,
      created_at: course.created_at,
      firstLessonId: course.lessons[0]?._id || null,
      lessonsTitles: course.lessons.map((lesson) => lesson.title),
      totalArticles,
      totalTopics,
    };

    return NextResponse.json(courseResponse);
  } catch (error: any) {
    return NextResponse.json({ errorMsg: error.message }, { status: 500 });
  }
}
