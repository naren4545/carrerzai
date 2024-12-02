import { type NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pintudeToken = request.cookies.get("pintude_token")?.value;
  const pinqueryToken = request.cookies.get("pinquery_token")?.value;

  // If the user has pinquery_token, block access to /job-recruiter
  if (pinqueryToken) {
    if (pathname.startsWith("/job-recruiter")) {
      // Prevent redirect loop if already on /job-recruiter
      return NextResponse.redirect(new URL("/", request.url));  // Redirect to home page
    }
    return NextResponse.next();  // Allow access to other pages
  }

  // If the user has pintude_token, allow access only to /job-recruiter
  if (pintudeToken) {
    if (!pathname.startsWith("/job-recruiter")) {
      // Prevent redirect loop if already on /job-recruiter
      return NextResponse.redirect(new URL("/job-recruiter", request.url));  // Redirect to /job-recruiter
    }
    return NextResponse.next();  // Allow access to /job-recruiter
  }

  // No token: Redirect to login (or home) page
  if (pathname !== "/") {  // Ensure we don't get stuck in a loop on the home page
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Allow access to the home page if no token is set
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)", // Apply to all routes except static files and APIs
  ],
};
