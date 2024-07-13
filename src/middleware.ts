import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// it will be called and executed when use hit the matcher routes
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // you can't access these route after login
  const isPublicPath =
    path === "/login" || path === "/signup" || path === "/verify-email";

  const token = request.cookies.get("token")?.value;

  // if you have token and you're hitting public route, you will be rdirect to home
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // if you don't have token you're hitting matcher routes you'll be redirect to login
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// matcher will call the function declared before
export const config = {
  matcher: ["/login", "/signup", "/verify-email", "/profile"],
};
