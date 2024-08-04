import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { userId: string } }
) {
  await dbConnect();

  try {
    const { userId } = params;

    // Ensure userId is provided
    if (!userId) {
      return NextResponse.json(
        { errorMsg: "User ID is required" },
        { status: 400 }
      );
    }

    // Find and delete the user by ID
    const deletedUser = await User.findByIdAndDelete(userId);

    // If the user does not exist
    if (!deletedUser) {
      return NextResponse.json({ errorMsg: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ errorMsg: error.message }, { status: 500 });
  }
}
