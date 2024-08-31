import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Course from "@/models/Course";
import CourseProgress from "@/models/CourseProgress";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(
  request: Request,
  { params }: { params: { username: string } }
) {
  await dbConnect();

  const { username } = params;
  const url = new URL(request.url);
  const courseId = url.searchParams.get("courseId");

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return NextResponse.json({ errorMsg: "User not found" }, { status: 404 });
    }

    if (courseId) {
      const courseObjectId = new mongoose.Types.ObjectId(courseId);

      const isCompleted = user.completedCourses.some(
        (completedCourseId: any) =>
          completedCourseId && completedCourseId.equals(courseObjectId)
      );

      if (isCompleted) {
        const course = await Course.findById(courseObjectId)
          .select("_id title thumbnail lessons")
          .exec();

        if (!course) {
          return NextResponse.json(
            { errorMsg: "Course not found" },
            { status: 404 }
          );
        }

        return NextResponse.json(
          {
            isCompleted,
            _id: course._id,
            title: course.title,
            thumbnail: course.thumbnail,
          },
          { status: 200 }
        );
      }

      const courseProgress = await CourseProgress.findOne({
        courseId: courseObjectId,
        userId: user._id,
      });

      if (courseProgress) {
        const courseProgress = await CourseProgress.findOne({
          userId: user._id,
          courseId: new mongoose.Types.ObjectId(courseId),
        }).populate({
          path: "completedLessons",
          select: "_id",
        });

        // Get the course details
        const course = await Course.findById(courseId).populate({
          path: "lessons",
          select: "_id",
        });

        if (!course) {
          return NextResponse.json(
            { errorMsg: "Course not found" },
            { status: 404 }
          );
        }

        const lessons = course.lessons;
        const completedLessons = new Set(
          courseProgress?.completedLessons.map((lesson) =>
            lesson._id.toString()
          ) || []
        );

        let currentLessonId: string | null = null;
        let lastLessonId: string | null = null;

        // Determine if the course is considered started
        if (courseProgress) {
          // Find the next lesson that hasn't been completed
          for (const lesson of lessons) {
            if (!completedLessons.has(lesson._id.toString())) {
              currentLessonId = lesson._id.toString();
              break;
            }
          }

          // If no current lesson is found, check if all lessons are completed
          if (!currentLessonId) {
            currentLessonId =
              lessons[lessons.length - 1]?._id.toString() || null;
          }
        }

        // Check if the current lesson is the last lesson
        if (currentLessonId) {
          const currentLessonIndex = lessons.findIndex(
            (lesson) => lesson._id.toString() === currentLessonId
          );
          if (currentLessonIndex === lessons.length - 1) {
            lastLessonId = currentLessonId;
          }
        } else {
          lastLessonId = lessons[lessons.length - 1]?._id.toString() || null;
        }

        // Determine if the course is started
        const isStarted = !!currentLessonId;

        return NextResponse.json({
          isStarted,
          currentLessonId: isStarted ? currentLessonId : null,
        });
      }

      return NextResponse.json(
        { isStarted: false, isCompleted: false },
        { status: 200 }
      );
    } else {
      const completedCourses = await Course.find({
        _id: { $in: user.completedCourses },
      })
        .select("_id title thumbnail lessons")
        .exec();

      return NextResponse.json(
        completedCourses.map((course) => ({
          _id: course._id,
          title: course.title,
          thumbnail: course.thumbnail,
          firstLessonId: course.lessons[0],
        })),
        { status: 200 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ errorMsg: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { username: string } }
) {
  await dbConnect();

  const { username } = params;
  const url = new URL(request.url);
  const courseId = url.searchParams.get("courseId");

  if (!courseId) {
    return NextResponse.json(
      { errorMsg: "Course ID is required" },
      { status: 400 }
    );
  }

  try {
    // Find the user by username to get the user's ObjectId
    const user = await User.findOne({ username });

    if (!user) {
      return NextResponse.json({ errorMsg: "User not found" }, { status: 404 });
    }

    const userId = user._id;

    // Fetch the user's progress for the specific course
    const courseProgress = await CourseProgress.findOne({
      userId,
      courseId,
    });

    if (!courseProgress) {
      return NextResponse.json(
        { errorMsg: "Course progress not found" },
        { status: 404 }
      );
    }

    // Check if all lessons are completed
    if (
      courseProgress.completedLessons.length === courseProgress.totalLessons
    ) {
      // Remove the course from the user's courseProgresses
      await User.updateOne(
        { _id: userId },
        {
          $pull: { courseProgresses: courseProgress._id },
          $addToSet: { completedCourses: courseId },
        }
      );

      // Remove the CourseProgress document
      await CourseProgress.deleteOne({ _id: courseProgress._id });

      return NextResponse.json({
        success: true,
        message: "Course marked as completed",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Not all lessons are completed",
      });
    }
  } catch (error: any) {
    return NextResponse.json({ errorMsg: error.message }, { status: 500 });
  }
}
