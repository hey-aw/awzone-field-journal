import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth/server";

const protect = auth.middleware({ loginUrl: "/auth/sign-in" });

export default function middleware(request: NextRequest) {
  return protect(request);
}

export const config = {
  matcher: [
    "/flow",
    "/flow/:path*",
    "/api/posts",
    "/api/flow/stream",
    "/account",
    "/account/:path*",
  ],
};
