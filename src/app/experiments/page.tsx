import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/site-nav";

export const metadata: Metadata = {
  title: "Experiments",
  description:
    "Small tests with a question behind them. Ongoing projects and active experiments.",
};

// Placeholder experiments — replace with DB queries once entries exist
const PLACEHOLDER_EXPERIMENTS = [
  {
    status: "Active",
    title: "AWzone",
    question: "What does it look like to build and think in public?",
    description:
      "Setting up a public lab notebook as both a thinking tool and a trail of work. Testing cadence, format, and what's worth sharing.",
    startDate: "Mar 2026",
    href: "#",
  },
  {
    status: "Planned",
    title: "AI workflow for workshop facilitation",
    question:
      "Can AI tooling reduce prep friction for workshop facilitators without flattening the craft?",
    description:
      "A structured test of specific AI-assisted workflows across the design, prep, and debrief phases of a workshop.",
    startDate: "Coming soon",
    href: "#",
  },
  {
    status: "Planned",
    title: "Lightweight learning feedback loops",
    question:
      "What's the minimum viable feedback loop that helps learners notice their own progress?",
    description:
      "Testing small, low-overhead check-in formats with real learners. Looking for signal without adding load.",
    startDate: "Coming soon",
    href: "#",
  },
];

const STATUS_COLORS: Record<string, string> = {
  Active:
    "bg-green-500/10 text-green-700 border-green-500/20 dark:text-green-400",
  Planned: "bg-muted text-muted-foreground border-border",
  Complete:
    "bg-blue-500/10 text-blue-700 border-blue-500/20 dark:text-blue-400",
  Paused:
    "bg-yellow-500/10 text-yellow-700 border-yellow-500/20 dark:text-yellow-400",
};

export default function ExperimentsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="mx-auto w-full max-w-2xl px-6 md:px-8">
        <SiteNav />

        <main className="py-12 md:py-16">
          <div className="mb-10">
            <h1 className="mb-3 text-2xl font-semibold tracking-tight md:text-3xl">
              Experiments
            </h1>
            <p className="text-base text-muted-foreground leading-relaxed">
              Small tests with a question behind them. Each experiment has a
              clear question, a lightweight method, and notes on what happened.
            </p>
          </div>

          <div className="space-y-4">
            {PLACEHOLDER_EXPERIMENTS.map((exp) => (
              <Link
                key={exp.title}
                href={exp.href}
                className="block rounded-md border border-border bg-card p-5 transition-colors hover:bg-muted"
              >
                <div className="mb-3 flex items-start justify-between gap-3">
                  <h2 className="text-sm font-semibold leading-snug">
                    {exp.title}
                  </h2>
                  <div className="flex shrink-0 items-center gap-2">
                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${STATUS_COLORS[exp.status] ?? STATUS_COLORS.Planned}`}
                    >
                      {exp.status}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {exp.startDate}
                    </span>
                  </div>
                </div>
                <p className="mb-2 text-xs font-medium text-muted-foreground">
                  Question: {exp.question}
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {exp.description}
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-10 rounded-md border border-border bg-muted/40 px-5 py-4">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Experiments live here while they&apos;re running. When they wrap
              up, notes move to{" "}
              <Link
                href="/notes"
                className="text-foreground underline underline-offset-4 hover:opacity-70 transition-opacity"
              >
                Notes
              </Link>
              .
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
