import dbConnect from "@/lib/dbConnect";
import Category from "@/models/Category";

import { NextResponse } from "next/server";

// Handle GET requests
export async function GET() {
  await dbConnect();

  try {
    const categories = await Category.find({}).exec();

    if (categories.length === 0) {
      // If no categories are found, return a 404 response with a message
      return NextResponse.json(
        { errorMsg: "Categories list is empty" },
        { status: 404 }
      );
    }

    // If categories are found, return them with a 200 status
    return NextResponse.json(categories);
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
