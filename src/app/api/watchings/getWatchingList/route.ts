import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Lesson from "@/models/Lesson"; // Adjust the import path based on your actual setup
import { NextRequest, NextResponse } from "next/server";

// Handle GET requests
export async function GET(req: NextRequest) {
  try {
    // Access query parameters directly from request
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");

    // Check if userId is provided
    if (!userId || userId.trim() === "") {
      return NextResponse.json(
        { error: "userId is required and must be a non-empty string" },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await dbConnect();

    // Find user by userId
    const user = await User.findById(userId);

    // Handle if user is not found
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Fetch details for each lesson in watchingList
    const watchingListDetails = [];
    for (const lessonId of user.watchingList) {
      const lesson = await Lesson.findById(lessonId);
      if (lesson) {
        watchingListDetails.push({
          title: lesson.title,
          img: lesson.img,
          description: lesson.description,
        });
      }
    }

    // Return watchingList details if user found
    return NextResponse.json(watchingListDetails);
  } catch (error: any) {
    console.error("Error fetching watching list:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
