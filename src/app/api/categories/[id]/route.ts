import dbConnect from "@/lib/dbConnect";
import Category from "@/models/Category";

import { NextResponse } from "next/server";

// The 'id' parameter will be extracted from the request URL
export async function GET(
  request: Request,
  { params }: { params: { categoryId: string } }
) {
  await dbConnect();

  const { categoryId } = params;

  try {
    // Find the category by its ID
    const category = await Category.findById(categoryId);

    return NextResponse.json(category);
  } catch (error: any) {
    return NextResponse.json(
      { errorMsg: "Category is not found" },
      { status: 404 }
    );
  }
}
