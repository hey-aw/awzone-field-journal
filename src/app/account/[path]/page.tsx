import type { Metadata } from "next";
import { AccountView } from "@neondatabase/auth/react";
import { accountViewPaths } from "@neondatabase/auth/react/ui/server";

export const dynamicParams = false;

export const metadata: Metadata = {
  title: "Account",
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return Object.values(accountViewPaths).map((path) => ({ path }));
}

export default async function AccountPage({
  params,
}: {
  params: Promise<{ path: string }>;
}) {
  const { path } = await params;

  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-10">
      <AccountView path={path} />
    </main>
  );
}
