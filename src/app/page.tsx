import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { StripeBar, STRIPE_COLORS } from "@/components/stripe-bar";

const CONTENT_PILLARS = [
  {
    name: "Build Notes",
    href: "/notes?pillar=build-notes",
    description:
      "What I'm making right now — prototypes, workflow tools, product decisions, and lessons from shipping.",
  },
  {
    name: "Experiments",
    href: "/experiments",
    description:
      "Small tests with a question behind them. What happens when I try this instead of that?",
  },
  {
    name: "Field Reflections",
    href: "/notes?pillar=field-reflections",
    description:
      "What I'm noticing in work, teaching, and product strategy. Where tools create leverage and where they don't.",
  },
  {
    name: "Resources & Playbooks",
    href: "/notes?pillar=resources",
    description:
      "Useful, reusable pieces — checklists, templates, prompt packs, workshop recipes, and annotated links.",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="mx-auto w-full max-w-2xl px-6 md:px-8">
        <SiteNav />

        <main className="py-16 md:py-20">
          {/* Hero */}
          <section className="mb-16">
            {/* 80s racing-stripe accent — full-bleed background band, like the chest stripe on the hoodie */}
            <StripeBar height={18} fullBleed opacity={0.72} className="mb-8" />

            <p className="mb-3 text-sm font-medium tracking-widest text-primary uppercase">
              Field Journal
            </p>
            <h1 className="mb-5 text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
              Matt &ldquo;AW&rdquo; Anthes-Washburn
            </h1>

            <p className="mb-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
              Experiments in AI, learning, product design, and building useful
              things.
            </p>
            <p className="max-w-prose text-base leading-relaxed">
              I use this site as a public notebook — a place to document what
              I&apos;m building, testing, and learning along the way. Rough
              notes, mid-stream updates, and the occasional finished reflection.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/notes"
                className="inline-flex items-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Browse notes
              </Link>
              <Link
                href="/now"
                className="inline-flex items-center rounded-md border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
              >
                What I&apos;m doing now
              </Link>
            </div>
          </section>

          {/* Recent entries placeholder */}
          <section className="mb-16">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold tracking-tight">
                Recent notes
              </h2>
              <Link
                href="/notes"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                All notes →
              </Link>
            </div>
            <div className="space-y-px rounded-md border border-border overflow-hidden">
              {[
                {
                  label: "Lab note",
                  title: "Why I'm building this in public",
                  date: "Coming soon",
                  href: "/notes",
                },
                {
                  label: "Experiment",
                  title: "What I'm experimenting with right now",
                  date: "Coming soon",
                  href: "/experiments",
                },
                {
                  label: "Field reflection",
                  title: "A reflection on building for educators",
                  date: "Coming soon",
                  href: "/notes",
                },
              ].map((entry) => (
                <Link
                  key={entry.title}
                  href={entry.href}
                  className="flex items-start justify-between gap-4 bg-card px-5 py-4 transition-colors hover:bg-muted"
                >
                  <div>
                    <p className="mb-0.5 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                      {entry.label}
                    </p>
                    <p className="text-sm font-medium leading-snug">
                      {entry.title}
                    </p>
                  </div>
                  <span className="shrink-0 text-xs text-muted-foreground pt-0.5">
                    {entry.date}
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* Content pillars */}
          <section className="mb-16">
            <h2 className="mb-6 text-lg font-semibold tracking-tight">
              What&apos;s here
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {CONTENT_PILLARS.map((pillar, i) => (
                <Link
                  key={pillar.name}
                  href={pillar.href}
                  className="group rounded-md border border-border bg-card overflow-hidden transition-colors hover:bg-muted"
                >
                  {/* Per-card stripe accent — each pillar gets one stripe colour from the 80s band */}
                  <div
                    className="h-1.5 w-full"
                    style={{ backgroundColor: STRIPE_COLORS[i % STRIPE_COLORS.length] }}
                    aria-hidden
                  />
                  <div className="p-5">
                    <p className="mb-2 text-sm font-semibold group-hover:underline">
                      {pillar.name}
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {pillar.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Now teaser */}
          <section>
            <div className="rounded-md border border-border bg-muted/40 px-6 py-5">
              <p className="mb-1 text-xs font-medium tracking-widest text-primary uppercase">
                Currently
              </p>
              <p className="text-sm leading-relaxed">
                Setting up this public notebook. First posts incoming.{" "}
                <Link
                  href="/now"
                  className="underline underline-offset-4 hover:text-muted-foreground transition-colors"
                >
                  Read the now page →
                </Link>
              </p>
            </div>
          </section>
        </main>

        <footer className="border-t border-border py-8 text-sm text-muted-foreground">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span>Matt &ldquo;AW&rdquo; Anthes-Washburn</span>
            <div className="flex items-center gap-6">
              <Link href="/about" className="hover:text-foreground transition-colors">
                About
              </Link>
              <Link href="/now" className="hover:text-foreground transition-colors">
                Now
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
