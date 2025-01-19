import dbConnect from "@/lib/dbConnect";
import Test from "@/models/Test";
import TestProgress from "@/models/TestProgress";
import User from "@/models/User";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { username: string } }
) {
  await dbConnect();

  const { username } = params;
  const url = new URL(request.url);
  const testId = url.searchParams.get("testId");

  try {
    if (!testId || !username) {
      return NextResponse.json(
        { errorMsg: "Test ID or username is missing" },
        { status: 400 }
      );
    }

    // Explicitly cast testId to string
    const testObjectId = new mongoose.Types.ObjectId(testId as string);
    const user = await User.findOne({ username });

    if (!user) {
      return NextResponse.json({ errorMsg: "User not found" }, { status: 404 });
    }

    // Check if there is already a test progress entry for this user and test
    const existingProgress = await TestProgress.findOne({
      testId: testObjectId,
      userId: user._id,
    });

    if (existingProgress) {
      return NextResponse.json(
        { errorMsg: "Test already started" },
        { status: 400 }
      );
    }

    const test = await Test.findById(testObjectId);
    if (test) {
      // Initialize the test progress for this user
      const progressEntry = new TestProgress({
        testId: testObjectId,
        userId: user._id,
        totalQuestions: test.questions.length,
        completedQuestions: [],
        progressPercentage: 0, // Initialize progressPercentage to 0
      });

      // Save the test progress entry
      await progressEntry.save();

      // Add the reference to the user's TestProgresses array
      user.testProgresses.push(progressEntry._id as mongoose.Types.ObjectId);
    }

    await user.save();

    return NextResponse.json(
      { message: "Test started successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ errorMsg: error.message }, { status: 500 });
  }
}
