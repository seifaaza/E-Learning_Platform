import dbConnect from "@/lib/dbConnect";
import Article from "@/models/Article";
import { NextResponse } from "next/server";

// Handle GET requests
export async function GET() {
  await dbConnect();

  try {
    const articles = await Article.find({}).exec();

    if (articles.length === 0) {
      // If no articles are found, return a 404 response with a message
      return NextResponse.json(
        { errorMsg: "articles list is empty" },
        { status: 404 }
      );
    }

    // If articles are found, return them with a 200 status
    return NextResponse.json(articles);
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
