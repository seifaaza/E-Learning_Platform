import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Lesson from "@/models/Lesson";

export async function POST(req: NextRequest) {
  try {
    const { userId, lessonId } = await req.json();

    // Validate the userId and lessonId
    if (!userId || !lessonId) {
      return NextResponse.json(
        { error: "userId and lessonId are required" },
        { status: 400 }
      );
    }

    await dbConnect();

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
    }

    if (!user.watchingList.includes(lessonId)) {
      user.watchingList.push(lessonId);
      await user.save();
    }

    return NextResponse.json(
      {
        message: "Lesson added to watching list",
        watchingList: user.watchingList,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding lesson to watching list:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
