import dbConnect from "@/lib/dbConnect";
import Course from "@/models/Course";
import Lesson from "@/models/Lesson";
import User from "@/models/User";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { courseId: string } }
) {
  await dbConnect();

  const { courseId } = params;
  const url = new URL(request.url);
  const lessonId = url.searchParams.get("lesson");
  const username = url.searchParams.get("username");

  try {
    if (!courseId) {
      return NextResponse.json(
        { errorMsg: "Course ID is missing" },
        { status: 400 }
      );
    }

    const courseObjectId = new mongoose.Types.ObjectId(courseId);
    const lessonObjectId = lessonId
      ? new mongoose.Types.ObjectId(lessonId)
      : null;

    const course = await Course.findById(courseObjectId)
      .populate("lessons", "_id")
      .select("title description tags language source creator created_at");

    if (!course) {
      return NextResponse.json(
        { errorMsg: "Course not found" },
        { status: 404 }
      );
    }

    const lessonIds = course.lessons.map((lessonInCourse: any) =>
      lessonInCourse._id.toString()
    );

    if (username) {
      const user = await User.findOne({ username }).exec();

      if (user) {
        console.log("User Progress Before Initialization:", user.progress);

        // Ensure progress is initialized
        if (!user.progress) {
          user.progress = new Map<string, CourseProgress>();
        }

        if (!user.progress.has(courseId)) {
          console.log(`Initializing progress for course ${courseId}`);
          user.progress.set(courseId, {
            completedLessons: [],
            totalLessons: lessonIds.length,
          });
        } else {
          console.log(
            `Progress already exists for course ${courseId}:`,
            user.progress.get(courseId)
          );
        }

        // Check if the course is already in watchedCourses
        if (!user.watchedCourses.includes(courseObjectId)) {
          user.watchedCourses.push(courseObjectId);
        }

        await user.save();

        console.log("User Progress After Initialization:", user.progress);
      } else {
        return NextResponse.json(
          { errorMsg: "User not found" },
          { status: 404 }
        );
      }
    }

    if (lessonObjectId) {
      const lesson = await Lesson.findById(lessonObjectId);
      if (!lesson) {
        return NextResponse.json(
          { errorMsg: "Lesson not found" },
          { status: 404 }
        );
      }

      const lessonIndex = lessonIds.indexOf(lessonObjectId.toString());

      if (lessonIndex === -1) {
        return NextResponse.json(
          { errorMsg: "Lesson does not belong to this course" },
          { status: 400 }
        );
      }

      return NextResponse.json({
        title: lesson.title,
        description: lesson.description,
        video: lesson.video,
        thumbnail: lesson.thumbnail,
        index: lessonIndex + 1,
        lessonIds,
      });
    }

    const courseResponse = {
      title: course.title,
      description: course.description,
      tags: course.tags,
      language: course.language,
      source: course.source,
      creator: course.creator,
      created_at: course.created_at,
      totalLessons: course.lessons.length,
    };

    return NextResponse.json(courseResponse);
  } catch (error: any) {
    return NextResponse.json({ errorMsg: error.message }, { status: 500 });
  }
}
