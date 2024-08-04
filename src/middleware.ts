import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  // Define the secret used to sign the token
  const secret = process.env.NEXTAUTH_SECRET;

  // Get the token from the request
  const token = await getToken({ req, secret });

  // Define the base paths that require authentication
  const protectedRoutes = [
    "/courses",
    "/quizzes",
    "/saved",
    "/watched",
    "/learning",
  ];

  // Extract the path segments from the request URL
  const { pathname } = req.nextUrl;
  const pathParts = pathname.split("/");

  // Check if the user is trying to access a protected route
  const isProtectedRoute = protectedRoutes.some((route) => {
    // For static routes
    if (route === `/${pathParts[1]}`) return true;

    // For dynamic routes like /username/saved, check the third segment
    if (pathParts.length >= 3 && `/${pathParts[2]}` === route) {
      return true;
    }

    return false;
  });

  if (isProtectedRoute && !token) {
    // If no token, redirect to the login page
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Continue to the requested route
  return NextResponse.next();
}

// Specify the paths that should be matched by the middleware
export const config = {
  matcher: [
    "/courses/:path*",
    "/quizzes/:path*",
    "/:username/saved/:path*",
    "/:username/watched/:path*",
    "/:username/learning/:path*",
  ],
};
