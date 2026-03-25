import { createNeonAuth } from "@neondatabase/auth/next/server";

const baseUrl = process.env.NEON_AUTH_BASE_URL;
const cookieSecret = process.env.NEON_AUTH_COOKIE_SECRET ?? "";

if (!baseUrl || cookieSecret.length < 32) {
  throw new Error(
    "Neon Auth is not configured. Set NEON_AUTH_BASE_URL and NEON_AUTH_COOKIE_SECRET (32+ characters). Enable Neon Auth in the Neon console and copy the Auth URL.",
  );
}

export const auth = createNeonAuth({
  baseUrl,
  cookies: { secret: cookieSecret },
});
