import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { username: string } }
) {
  await dbConnect();

  try {
    const { username } = params;

    // Ensure username is provided
    if (!username) {
      return NextResponse.json(
        { errorMsg: "Username is required" },
        { status: 400 }
      );
    }

    // Find and delete the user by username
    const deletedUser = await User.findOneAndDelete({ username });

    // If the user does not exist
    if (!deletedUser) {
      return NextResponse.json({ errorMsg: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ errorMsg: error.message }, { status: 500 });
  }
}
