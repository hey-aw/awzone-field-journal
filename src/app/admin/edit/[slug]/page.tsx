import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Edit: ${slug}`,
    description: "Edit a lab notebook post (admin).",
  };
}

export default async function AdminEditPage({ params }: Props) {
  const { slug } = await params;

  return (
    <div className="flex min-h-screen flex-col">
      <div className="mx-auto w-full max-w-3xl px-6 md:px-8">
        <SiteNav />
        <main className="py-8 md:py-10">
          <h1 className="mb-2 text-2xl font-semibold tracking-tight md:text-3xl">
            Edit post
          </h1>
          <p className="text-sm text-muted-foreground">
            Slug: <code className="text-foreground">{slug}</code>
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Editor UI is not wired yet. Use Creative Flow at{" "}
            <a href="/admin" className="text-foreground underline underline-offset-2">
              /admin
            </a>{" "}
            to draft posts.
          </p>
        </main>
      </div>
    </div>
  );
}
