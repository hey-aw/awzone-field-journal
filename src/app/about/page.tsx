import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/site-nav";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Matt \"AW\" Anthes-Washburn — educator, product builder, and experimenter at the intersection of learning, AI, and product design.",
};

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="mx-auto w-full max-w-2xl px-6 md:px-8">
        <SiteNav />

        <main className="py-12 md:py-16">
          <div className="mb-10">
            <h1 className="mb-3 text-2xl font-semibold tracking-tight md:text-3xl">
              About
            </h1>
          </div>

          <div className="prose prose-sm max-w-none space-y-6 text-sm leading-relaxed">
            <p className="text-base leading-relaxed">
              I&apos;m Matt &ldquo;AW&rdquo; Anthes-Washburn — an educator and product builder
              working at the intersection of learning, AI, and building useful
              things.
            </p>

            <p>
              This site is my public lab notebook. I use it to clarify ideas by
              writing them down, leave a trail of what I&apos;m making and
              testing, and share thinking that might be useful to others working
              on similar problems.
            </p>

            <p>
              Most of what appears here is unfinished in a good way — rough
              notes, mid-stream updates, and the occasional more developed
              reflection. The goal is to publish before things feel
              &ldquo;finished enough.&rdquo;
            </p>

            <hr className="border-border my-8" />

            <div>
              <h2 className="mb-4 text-base font-semibold tracking-tight">
                What I care about
              </h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  Making AI tools that create real leverage for educators and
                  learners — not just novelty
                </li>
                <li>
                  Product thinking that starts with the smallest useful version
                  of an idea
                </li>
                <li>
                  Learning design that respects how people actually change their
                  minds
                </li>
                <li>Building in public as a discipline, not just a strategy</li>
              </ul>
            </div>

            <hr className="border-border my-8" />

            <div>
              <h2 className="mb-4 text-base font-semibold tracking-tight">
                What kinds of conversations fit
              </h2>
              <p className="text-muted-foreground">
                I&apos;m interested in talking with educators exploring AI
                workflows, product people thinking about learning tools,
                collaborators building things at the intersection of any of the
                above, and curious people who found something here worth
                following up on.
              </p>
            </div>

            <hr className="border-border my-8" />

            <div className="flex flex-wrap gap-4">
              <Link
                href="/now"
                className="inline-flex items-center rounded-md border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
              >
                What I&apos;m doing now →
              </Link>
              <Link
                href="/notes"
                className="inline-flex items-center rounded-md border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
              >
                Browse notes →
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
