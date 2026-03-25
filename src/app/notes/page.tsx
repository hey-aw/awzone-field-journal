import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/site-nav";

export const metadata: Metadata = {
  title: "Notes",
  description: "Lab notes, build logs, essays, and field reflections.",
};

const POST_TYPES = [
  { label: "All", value: "" },
  { label: "Lab notes", value: "lab-note" },
  { label: "Build logs", value: "build-log" },
  { label: "Essays", value: "essay" },
  { label: "How-to", value: "how-to" },
  { label: "Open questions", value: "open-question" },
  { label: "Roundups", value: "roundup" },
];

// Placeholder entries — replace with DB queries once posts exist
const PLACEHOLDER_ENTRIES = [
  {
    type: "Lab note",
    pillar: "Build notes",
    title: "Why I'm building this in public",
    excerpt:
      "A site as a thinking tool, a public trail, and a memory system. Here's the reasoning behind publishing rough work.",
    date: "Coming soon",
    href: "#",
  },
  {
    type: "Experiment",
    pillar: "Experiments",
    title: "What I'm experimenting with right now",
    excerpt:
      "Current questions I'm poking at, tools I'm testing, and workflows I'm trying to break.",
    date: "Coming soon",
    href: "#",
  },
  {
    type: "Field reflection",
    pillar: "Field reflections",
    title: "A reflection on building for educators",
    excerpt:
      "What teachers actually need is rarely what tool builders think they need. Notes from the gap.",
    date: "Coming soon",
    href: "#",
  },
  {
    type: "How-to",
    pillar: "Resources",
    title: "A recent workflow or tool experiment",
    excerpt:
      "Step-by-step notes from solving a specific problem — set up, what broke, what worked.",
    date: "Coming soon",
    href: "#",
  },
];

export default function NotesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="mx-auto w-full max-w-2xl px-6 md:px-8">
        <SiteNav />

        <main className="py-12 md:py-16">
          <div className="mb-10">
            <h1 className="mb-3 text-2xl font-semibold tracking-tight md:text-3xl">
              Notes
            </h1>
            <p className="text-base text-muted-foreground leading-relaxed">
              A reverse-chronological feed of lab notes, build logs, essays,
              how-to walkthroughs, open questions, and monthly roundups.
            </p>
          </div>

          {/* Type filter — functional once posts exist */}
          <div className="mb-8 flex flex-wrap gap-2">
            {POST_TYPES.map((type) => (
              <span
                key={type.value}
                className="cursor-default rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground"
              >
                {type.label}
              </span>
            ))}
          </div>

          <div className="space-y-px rounded-md border border-border overflow-hidden">
            {PLACEHOLDER_ENTRIES.map((entry) => (
              <Link
                key={entry.title}
                href={entry.href}
                className="block bg-card px-5 py-5 transition-colors hover:bg-muted"
              >
                <div className="mb-2 flex items-center gap-3">
                  <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                    {entry.type}
                  </span>
                  <span className="text-xs text-muted-foreground">·</span>
                  <span className="text-xs text-muted-foreground">
                    {entry.pillar}
                  </span>
                  <span className="ml-auto text-xs text-muted-foreground">
                    {entry.date}
                  </span>
                </div>
                <p className="mb-1.5 text-sm font-semibold leading-snug">
                  {entry.title}
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {entry.excerpt}
                </p>
              </Link>
            ))}
          </div>

          <p className="mt-8 text-sm text-muted-foreground">
            First posts incoming. Check back soon, or{" "}
            <Link
              href="/about"
              className="underline underline-offset-4 hover:text-foreground transition-colors"
            >
              learn more about what this is
            </Link>
            .
          </p>
        </main>
      </div>
    </div>
  );
}
