import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/site-nav";

export const metadata: Metadata = {
  title: "Now",
  description: "What I'm focused on right now.",
};

// Last updated date — update this when you update the page
const LAST_UPDATED = "March 2026";

export default function NowPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="mx-auto w-full max-w-2xl px-6 md:px-8">
        <SiteNav />

        <main className="py-12 md:py-16">
          <div className="mb-10">
            <div className="mb-2 flex items-center gap-3">
              <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Now
              </h1>
              <span className="text-sm text-muted-foreground">
                Updated {LAST_UPDATED}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              A snapshot of what I&apos;m focused on. Inspired by{" "}
              <a
                href="https://nownownow.com/about"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-foreground transition-colors"
              >
                nownownow.com
              </a>
              .
            </p>
          </div>

          <div className="space-y-8 text-sm leading-relaxed">
            <section>
              <h2 className="mb-3 text-sm font-semibold tracking-wide uppercase text-primary">
                Building
              </h2>
              <div className="space-y-3">
                <p>
                  Setting up this public notebook. Getting the structure right
                  so it&apos;s easy to maintain and publish to regularly. The
                  goal is a rhythm, not a launch event.
                </p>
                <p>
                  Exploring AI-assisted workflows for workshop facilitation.
                  Early stage — mostly reading, testing tools, and noticing
                  where the friction actually is.
                </p>
              </div>
            </section>

            <section>
              <h2 className="mb-3 text-sm font-semibold tracking-wide uppercase text-primary">
                Learning
              </h2>
              <div className="space-y-3">
                <p>
                  Thinking carefully about what makes AI tools genuinely useful
                  for educators versus just novel. There&apos;s a big gap
                  between the two.
                </p>
                <p>
                  Reading on learning design, feedback loops, and what it
                  actually takes to change how someone does something.
                </p>
              </div>
            </section>

            <section>
              <h2 className="mb-3 text-sm font-semibold tracking-wide uppercase text-primary">
                Thinking about
              </h2>
              <div className="space-y-3">
                <p>
                  The difference between a tool that creates leverage and a tool
                  that just shifts work around. Most &ldquo;productivity
                  AI&rdquo; is the latter.
                </p>
                <p>
                  What building in public actually requires, beyond just posting.
                  The discipline of sharing rough work before it feels ready.
                </p>
              </div>
            </section>

            <section>
              <h2 className="mb-3 text-sm font-semibold tracking-wide uppercase text-primary">
                Not doing
              </h2>
              <p className="text-muted-foreground">
                Trying to keep the scope tight. One notebook. A small number of
                active experiments. Less starting, more finishing.
              </p>
            </section>
          </div>

          <div className="mt-12 border-t border-border pt-8">
            <p className="text-sm text-muted-foreground">
              This is a now page, not a full bio.{" "}
              <Link
                href="/about"
                className="text-foreground underline underline-offset-4 hover:opacity-70 transition-opacity"
              >
                Read the about page
              </Link>{" "}
              for more context on who I am and what I care about.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
