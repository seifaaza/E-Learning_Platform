import Test from "@/models/Test";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);

    // Get query parameters for pagination
    const page = parseInt(searchParams.get("page") || "1", 10); // Default to page 1
    const limit = parseInt(searchParams.get("limit") || "10", 10); // Default to 10 items per page
    const skip = (page - 1) * limit;

    // Get all tests with pagination
    const tests = await Test.find({}, "title thumbnail source createdAt")
      .sort({ createdAt: -1 }) // Sort by most recent
      .skip(skip)
      .limit(limit);

    // Get the total count of tests
    const totalTests = await Test.countDocuments();

    // Calculate total pages
    const totalPages = Math.ceil(totalTests / limit);

    // Construct response data
    const responseData = {
      currentPage: page,
      totalPages,
      totalTests,
      tests: tests.map((test) => ({
        title: test.title,
        thumbnail: test.thumbnail, // Assuming `thumbnail` exists in the Test schema
        source: test.source,
        time: test.time,
      })),
    };

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
