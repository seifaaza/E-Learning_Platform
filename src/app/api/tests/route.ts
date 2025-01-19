import Test from "@/models/Test";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import CompletedTest from "@/models/CompletedTest";

export async function GET(request: Request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);

    // Get query parameters for pagination
    const page = parseInt(searchParams.get("page") || "1", 1); // Default to page 1
    const limit = parseInt(searchParams.get("limit") || "12", 12); // Default to 10 items per page
    const skip = (page - 1) * limit;

    // Fetch all tests with pagination
    const tests = await Test.find({}, "title thumbnail time")
      .sort({ created_at: -1 }) // Sort by most recent
      .skip(skip)
      .limit(limit)
      .lean(); // Use lean to improve performance since we don't need Mongoose documents

    // Fetch achievers count for each test
    const testIds = tests.map((test) => test._id);
    const achieversCounts = await CompletedTest.aggregate([
      { $match: { testId: { $in: testIds } } },
      { $group: { _id: "$testId", count: { $sum: 1 } } },
    ]);

    // Map achieversCount to test data
    const achieversMap = achieversCounts.reduce((acc, item) => {
      acc[item._id.toString()] = item.count;
      return acc;
    }, {} as Record<string, number>);

    // Construct response data
    const responseData = {
      currentPage: page,
      totalPages: Math.ceil((await Test.countDocuments()) / limit),
      totalTests: tests.length,
      tests: tests.map((test) => ({
        id: test._id,
        title: test.title,
        thumbnail: test.thumbnail,
        time: test.time,
        achieversCount: achieversMap[test._id.toString()] || 0, // Default to 0 if no achievers
      })),
    };

    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    console.error(error);
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
      topics,
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
      topics,
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
