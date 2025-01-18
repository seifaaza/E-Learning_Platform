import Response from "@/models/Response";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

// Handle POST requests to create a response
export async function POST(request: Request) {
  await dbConnect();

  try {
    // Parse the incoming request body
    const { user, question, selectedOptionIndex, test, isCorrect } =
      await request.json();

    // Validate required fields
    if (
      !user ||
      !question ||
      selectedOptionIndex === undefined ||
      !test ||
      isCorrect === undefined
    ) {
      return NextResponse.json(
        {
          errorMsg:
            "User, question, selected option index, test, and correctness are required.",
        },
        { status: 400 }
      );
    }

    // Create a new response document
    const newResponse = new Response({
      user,
      question,
      selectedOptionIndex,
      isCorrect,
      test,
    });

    // Save to the database
    const savedResponse = await newResponse.save();

    // Return the created response with a 201 status
    return NextResponse.json(savedResponse, { status: 201 });
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
