import type { Metadata } from "next";
import { AuthView } from "@neondatabase/auth/react";

export const dynamicParams = false;

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

export default async function AuthPage({
  params,
}: {
  params: Promise<{ path: string }>;
}) {
  const { path } = await params;

  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-lg flex-col items-center justify-center px-6 py-12">
      <AuthView path={path} />
    </main>
  );
}
