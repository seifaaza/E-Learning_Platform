import Test from "@/models/Test";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import Question from "@/models/Question";

// Handle GET request to fetch test details
export async function GET(
  request: Request,
  { params }: { params: { testId: string } }
) {
  const { testId } = params;

  await dbConnect();

  try {
    await Question.init();
    // Find the test by ID and populate questions
    const test = await Test.findById(testId).populate("questions");

    if (!test) {
      return NextResponse.json(
        { errorMsg: "Test not found." },
        { status: 404 }
      );
    }

    // Extract the first question ID if available
    const firstQuestionId =
      test.questions.length > 0 ? test.questions[0]._id : null;

    // Extract required fields
    const responseData = {
      title: test.title,
      description: test.description,
      thumbnail: test.thumbnail,
      source: test.source,
      language: test.language,
      objectives: test.objectives,
      topics: test.topics,
      time: test.time,
      passingScore: test.passingScore,
      createdAt: test.created_at,
      numberOfQuestions: test.questions.length,
      firstQuestionId, // Add first question ID here
    };

    // Return the test details
    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ errorMsg: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { errorMsg: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
