import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  if (request.cookies.has("loginToken")) {
    const response = NextResponse.next();
    return response;
  }
  return NextResponse.redirect(new URL("/user/login", request.url));
}

export const config = {
  matcher: "/(github.*)",
};
