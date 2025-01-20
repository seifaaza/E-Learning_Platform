import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Test from "@/models/Test";

export async function GET(
  request: Request,
  { params }: { params: { username: string } }
) {
  await dbConnect();

  const { username } = params;
  const url = new URL(request.url);
  const testId = url.searchParams.get("testId");

  try {
    if (!testId) {
      return NextResponse.json(
        { errorMsg: "testId is required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ username })
      .populate({
        path: "testProgresses",
        model: "TestProgress",
      })
      .populate({
        path: "completedTests",
        model: "CompletedTest", // Populating to get complete test info
      })
      .lean(); // Using .lean() for more efficient data access

    if (!user) {
      return NextResponse.json({ errorMsg: "User not found" }, { status: 404 });
    }

    const testObjectId = new mongoose.Types.ObjectId(testId);

    // Find the progress for the specific test
    const progress = user.testProgresses.find((progress: any) =>
      progress.testId.equals(testObjectId)
    );

    const isStarted = !!progress;
    // Check if the test is completed by comparing ObjectIds
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

    // If the test is started, determine the current question ID
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

      // Find the next question that hasn't been completed
      for (const question of questions) {
        if (!completedQuestions.has(question._id.toString())) {
          currentQuestionId = question._id.toString();
          break;
        }
      }

      // If no current question is found, check if all questions are completed
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
