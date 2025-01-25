import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import TestProgress from "@/models/TestProgress"; // Make sure this is imported
import Test from "@/models/Test";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(
  request: Request,
  { params }: { params: { username: string } }
) {
  await dbConnect();

  const { username } = params;
  const url = new URL(request.url);
  const testId = url.searchParams.get("testId");

  try {
    await TestProgress.init();

    if (!testId) {
      return NextResponse.json(
        { errorMsg: "testId is required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ username })
      .populate({
        path: "testProgresses",
        model: "TestProgress", // Ensure TestProgress model is used here
      })
      .populate({
        path: "completedTests",
        model: "CompletedTest", // Ensure CompletedTest is registered
      })
      .lean();

    if (!user) {
      return NextResponse.json({ errorMsg: "User not found" }, { status: 404 });
    }

    const testObjectId = new mongoose.Types.ObjectId(testId);

    // Find the progress for the specific test
    const progress = user.testProgresses.find((progress: any) =>
      progress.testId.equals(testObjectId)
    );

    const isStarted = !!progress;
    const isCompleted = user.completedTests.some((completed: any) =>
      completed.testId.equals(testObjectId)
    );

    if (isCompleted) {
      const test = await Test.findById(testObjectId)
        .select("_id title thumbnail questions")
        .exec();

      if (!test) {
        return NextResponse.json(
          { errorMsg: "Test not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(
        {
          isStarted,
          isCompleted: true,
          _id: test._id,
          title: test.title,
          thumbnail: test.thumbnail,
        },
        { status: 200 }
      );
    }

    if (isStarted && progress) {
      const test = await Test.findById(testObjectId)
        .populate({
          path: "questions",
          select: "_id",
        })
        .exec();

      if (!test) {
        return NextResponse.json(
          { errorMsg: "Test not found" },
          { status: 404 }
        );
      }

      const testProgress = progress as typeof progress & {
        completedQuestions: mongoose.Types.ObjectId[];
      };
      const questions = test.questions || [];
      const completedQuestions = new Set(
        testProgress.completedQuestions.map((question: any) =>
          question._id.toString()
        ) || []
      );

      let currentQuestionId: string | null = null;

      for (const question of questions) {
        if (!completedQuestions.has(question._id.toString())) {
          currentQuestionId = question._id.toString();
          break;
        }
      }

      if (!currentQuestionId && questions.length > 0) {
        currentQuestionId =
          questions[questions.length - 1]?._id.toString() || null;
      }

      return NextResponse.json(
        {
          isStarted,
          currentQuestionId,
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { isStarted, isCompleted: false },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching test details:", error);
    return NextResponse.json({ errorMsg: error.message }, { status: 500 });
  }
}
