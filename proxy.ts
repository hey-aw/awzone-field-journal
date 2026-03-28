import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

function unauthorized() {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Admin Area"',
      "Cache-Control": "no-store",
    },
  });
}

function requiresAdminGate(pathname: string, method: string): boolean {
  if (pathname.startsWith("/admin")) return true;
  if (pathname === "/api/flow/stream") return true;
  if (pathname === "/api/posts" && method === "POST") return true;
  return false;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!requiresAdminGate(pathname, request.method)) {
    return NextResponse.next();
  }

  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Basic ")) {
    return unauthorized();
  }

  try {
    const base64Credentials = authHeader.split(" ")[1] ?? "";
    const decoded = atob(base64Credentials);
    const separatorIndex = decoded.indexOf(":");

    if (separatorIndex === -1) {
      return unauthorized();
    }

    const username = decoded.slice(0, separatorIndex);
    const password = decoded.slice(separatorIndex + 1);

    const validUsername = process.env.ADMIN_USERNAME;
    const validPassword = process.env.ADMIN_PASSWORD;

    if (!validUsername || !validPassword) {
      return new NextResponse("Server auth is not configured", { status: 500 });
    }

    if (username !== validUsername || password !== validPassword) {
      return unauthorized();
    }

    return NextResponse.next();
  } catch {
    return unauthorized();
  }
}

export const config = {
  matcher: ["/admin/:path*", "/api/flow/stream", "/api/posts"],
};
