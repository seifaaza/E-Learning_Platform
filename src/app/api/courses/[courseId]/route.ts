import dbConnect from "@/lib/dbConnect";
import Course from "@/models/Course";
import Lesson from "@/models/Lesson";
import Category, { ICategory } from "@/models/Category";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import Article from "@/models/Article";

type Article = {
  _id: mongoose.Types.ObjectId;
  title: string;
  content: string;
};

type Lesson = {
  _id: mongoose.Types.ObjectId;
  title: string;
  articles?: Article[];
  topics: string[];
};

export async function GET(
  request: Request,
  { params }: { params: { courseId: string } }
) {
  await dbConnect();

  const { courseId } = params;

  try {
    await Category.init();
    await Article.init();
    await Lesson.init();

    if (!courseId) {
      return NextResponse.json(
        { errorMsg: "Course ID is missing" },
        { status: 400 }
      );
    }

    const courseObjectId = new mongoose.Types.ObjectId(courseId);

    const course = await Course.findById(courseObjectId)
      .populate({
        path: "lessons",
        select: "_id title articles topics",
        populate: {
          path: "articles",
          select: "_id title content",
        },
      })
      .populate({
        path: "category",
        select: "name",
      })
      .select("-ratings")
      .lean();

    if (!course) {
      return NextResponse.json(
        { errorMsg: "Course not found" },
        { status: 404 }
      );
    }

    // Assert the type of category to ICategory
    const category = course.category as ICategory;

    const lessons = course.lessons as unknown as Lesson[];

    const totalArticles = lessons.reduce(
      (sum, lesson) => sum + (lesson.articles?.length || 0),
      0
    );
    const totalTopics = lessons.reduce(
      (sum, lesson) => sum + (lesson.topics.length || 0),
      0
    );

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
      firstLessonId: lessons[0]?._id || null,
      lessonsTitles: lessons.map((lesson) => lesson.title),
      totalArticles,
      totalTopics,
      categoryName: category.name, // Use the asserted type
    };

    return NextResponse.json(courseResponse, {
      headers: {
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch (error: any) {
    return NextResponse.json({ errorMsg: error.message }, { status: 500 });
  }
}
