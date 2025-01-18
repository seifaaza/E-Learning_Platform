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
    // Find the test by ID
    const test = await Test.findById(testId).populate("questions");

    if (!test) {
      return NextResponse.json(
        { errorMsg: "Test not found." },
        { status: 404 }
      );
    }

    // Extract required fields
    const responseData = {
      title: test.title,
      description: test.description,
      thumbnail: test.thumbnail,
      source: test.source,
      language: test.language,
      objectives: test.objectives,
      time: test.time,
      passingScore: test.passingScore,
      createdAt: test.created_at,
      numberOfQuestions: test.questions.length,
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
