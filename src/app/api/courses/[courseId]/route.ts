import dbConnect from "@/lib/dbConnect";
import Course from "@/models/Course";
import Lesson from "@/models/Lesson";
import { ICategory } from "@/models/Category";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import Article from "@/models/Article";
import CompletedCourse from "@/models/CompletedCourse";

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
    await Article.init();

    if (!courseId || !mongoose.Types.ObjectId.isValid(courseId)) {
      return NextResponse.json(
        { errorMsg: "Invalid Course ID" },
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

    const lessons = (course.lessons as unknown as Lesson[]) || [];
    const category = (course.category as ICategory) || { name: "Unknown" };

    const totalArticles = lessons.reduce(
      (sum, lesson) => sum + (lesson.articles || []).length,
      0
    );
    const totalTopics = lessons.reduce(
      (sum, lesson) => sum + (lesson.topics?.length || 0),
      0
    );

    const achieversCount = await CompletedCourse.countDocuments({
      courseId: courseObjectId,
    });

    const courseResponse = {
      _id: course._id,
      title: course.title,
      thumbnail: course.thumbnail,
      description: course.description,
      averageRating: course.averageRating,
      language: course.language,
      source: course.source,
      creator: course.creator,
      isCertified: course.test ? true : false,
      achieversCount,
      objectives: course.objectives,
      created_at: course.created_at,
      firstLessonId: lessons[0]?._id || null,
      lessonsTitles: lessons.map((lesson) => lesson.title),
      totalArticles,
      totalTopics,
      categoryName: category.name,
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
    return NextResponse.json(
      { errorMsg: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
