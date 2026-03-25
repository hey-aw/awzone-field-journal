import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/site-nav";

export const metadata: Metadata = {
  title: "Projects",
  description: "Current and recent things I'm building, with status.",
};

const PROJECTS = [
  {
    status: "Active",
    title: "AWzone",
    type: "Site / public notebook",
    description:
      "This site. A public lab notebook built on Next.js, Neon Postgres, and Drizzle ORM. Designed as a thinking tool first, public trail second.",
    tags: ["Next.js", "Neon", "Drizzle", "TypeScript"],
    href: "#",
  },
  {
    status: "Exploring",
    title: "AI workflow toolkit for educators",
    type: "Product experiment",
    description:
      "A lightweight set of AI-assisted tools designed for workshop facilitators and educators — focused on reducing prep friction without flattening craft.",
    tags: ["AI", "Education", "Workflow"],
    href: "#",
  },
  {
    status: "Paused",
    title: "Learning feedback loop prototype",
    type: "Research prototype",
    description:
      "A minimal check-in format that helps learners notice their own progress. Testing what the lowest-overhead version of useful feedback looks like.",
    tags: ["Learning design", "Prototype"],
    href: "#",
  },
];

const STATUS_COLORS: Record<string, string> = {
  Active:
    "bg-green-500/10 text-green-700 border-green-500/20 dark:text-green-400",
  Exploring:
    "bg-blue-500/10 text-blue-700 border-blue-500/20 dark:text-blue-400",
  Paused:
    "bg-yellow-500/10 text-yellow-700 border-yellow-500/20 dark:text-yellow-400",
  Complete: "bg-muted text-muted-foreground border-border",
};

export default function ProjectsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="mx-auto w-full max-w-2xl px-6 md:px-8">
        <SiteNav />

        <main className="py-12 md:py-16">
          <div className="mb-10">
            <h1 className="mb-3 text-2xl font-semibold tracking-tight md:text-3xl">
              Projects
            </h1>
            <p className="text-base text-muted-foreground leading-relaxed">
              Current and recent things I&apos;m building. Status is honest —
              not everything is active, not everything ships.
            </p>
          </div>

          <div className="space-y-4">
            {PROJECTS.map((project) => (
              <div
                key={project.title}
                className="rounded-md border border-border bg-card p-5"
              >
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-sm font-semibold leading-snug">
                      {project.title}
                    </h2>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {project.type}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-medium ${STATUS_COLORS[project.status] ?? STATUS_COLORS.Complete}`}
                  >
                    {project.status}
                  </span>
                </div>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 text-sm text-muted-foreground">
            Build notes and progress updates for these projects live in{" "}
            <Link
              href="/notes?pillar=build-notes"
              className="text-foreground underline underline-offset-4 hover:opacity-70 transition-opacity"
            >
              Notes → Build notes
            </Link>
            .
          </p>
        </main>
      </div>
    </div>
  );
}
