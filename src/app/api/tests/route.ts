import Test from "@/models/Test";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

// Handle POST requests to create a test
export async function POST(request: Request) {
  await dbConnect();

  try {
    // Parse the incoming request body
    const {
      title,
      thumbnail,
      description,
      source,
      language,
      objectives,
      time,
      questions,
      passingScore,
    } = await request.json();

    // Validate required fields
    if (
      !title ||
      !description ||
      !passingScore ||
      !Array.isArray(questions) ||
      questions.length === 0
    ) {
      return NextResponse.json(
        {
          errorMsg:
            "Title, description, passing score, and at least one question are required.",
        },
        { status: 400 }
      );
    }

    // Ensure passing score is within valid range
    if (passingScore < 0 || passingScore > 100) {
      return NextResponse.json(
        { errorMsg: "Passing score must be between 0 and 100." },
        { status: 400 }
      );
    }

    // Create a new test document
    const newTest = new Test({
      title,
      thumbnail,
      description,
      source,
      language,
      objectives,
      time,
      questions,
      passingScore,
    });

    // Save to the database
    const savedTest = await newTest.save();

    // Return the created test with a 201 status
    return NextResponse.json(savedTest, { status: 201 });
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
