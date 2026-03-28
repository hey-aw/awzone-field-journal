import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { db } from "@/lib/db/client";
import { posts } from "@/lib/posts/schema";
import { desc, eq } from "drizzle-orm";

export const metadata: Metadata = {
  title: "Captures",
  description: "Quick-captured ideas and notes.",
};

export const dynamic = "force-dynamic";

const TYPE_LABELS: Record<string, string> = {
  "lab-note": "Lab note",
  "build-log": "Build log",
  "essay": "Experiment",
  "how-to": "How-to",
  "open-question": "Idea",
  "roundup": "Roundup",
};

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export default async function CapturesPage() {
  let captures: Awaited<ReturnType<typeof fetchCaptures>> = [];
  let error: string | null = null;

  try {
    captures = await fetchCaptures();
  } catch (e) {
    error = e instanceof Error ? e.message : "Failed to load captures";
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="mx-auto w-full max-w-2xl px-6 md:px-8">
        <SiteNav />

        <main className="py-12 md:py-16">
          <div className="mb-10">
            <h1 className="mb-3 text-2xl font-semibold tracking-tight md:text-3xl">
              Captures
            </h1>
            <p className="text-base text-muted-foreground leading-relaxed">
              Quick-captured ideas, notes, and fragments saved for later.
            </p>
          </div>

          {error ? (
            <div className="rounded-md border border-border bg-card px-5 py-4 text-sm text-muted-foreground">
              {error}
            </div>
          ) : captures.length === 0 ? (
            <div className="rounded-md border border-border bg-card px-5 py-8 text-center">
              <p className="mb-1 text-sm font-medium">No captures yet</p>
              <p className="text-sm text-muted-foreground">
                Use the <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 text-xs font-mono">+</kbd> button or{" "}
                <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 text-xs font-mono">⌘⇧C</kbd>{" "}
                to save an idea.
              </p>
            </div>
          ) : (
            <div className="space-y-px rounded-md border border-border overflow-hidden">
              {captures.map((capture) => (
                <div
                  key={capture.id}
                  className="bg-card px-5 py-5"
                >
                  <div className="mb-2 flex items-center gap-3">
                    <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                      {TYPE_LABELS[capture.type] ?? capture.type}
                    </span>
                    <span className="text-xs text-muted-foreground">·</span>
                    <span className="text-xs text-muted-foreground">Draft</span>
                    <span className="ml-auto text-xs text-muted-foreground">
                      {formatDate(capture.createdAt)}
                    </span>
                  </div>
                  {capture.title !== "Untitled capture" && (
                    <p className="mb-1.5 text-sm font-semibold leading-snug">
                      {capture.title}
                    </p>
                  )}
                  <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-wrap">
                    {capture.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

async function fetchCaptures() {
  return db
    .select({
      id: posts.id,
      title: posts.title,
      content: posts.content,
      type: posts.type,
      createdAt: posts.createdAt,
    })
    .from(posts)
    .where(eq(posts.status, "draft"))
    .orderBy(desc(posts.createdAt));
}
