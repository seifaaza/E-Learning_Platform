import Question from "@/models/Question";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

// Handle POST requests
export async function POST(request: Request) {
  await dbConnect();

  try {
    // Parse the incoming request body
    const { question, options } = await request.json();

    // Validate required fields
    if (!question || !options || options.length === 0) {
      return NextResponse.json(
        { errorMsg: "Question text and at least one option are required." },
        { status: 400 }
      );
    }

    // Check if at least one option is correct
    if (!options.some((option: { isCorrect: boolean }) => option.isCorrect)) {
      return NextResponse.json(
        { errorMsg: "At least one option must be marked as correct." },
        { status: 400 }
      );
    }

    // Create a new question document
    const newQuestion = new Question({
      question,
      options,
    });

    // Save to the database
    const savedQuestion = await newQuestion.save();

    // Return the created question with a 201 status
    return NextResponse.json(savedQuestion, { status: 201 });
  } catch (error) {
    // Handle any errors that occur
    if (error instanceof Error) {
      return NextResponse.json({ errorMsg: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { errorMsg: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
