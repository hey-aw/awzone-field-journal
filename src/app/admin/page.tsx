import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { CreativeFlow } from "@/components/flow/creative-flow";

export const metadata: Metadata = {
  title: "Creative Flow",
  description:
    "Seed an idea and let a LangGraph agent analyze, brainstorm, structure, draft, self-critique, and finalize a lab notebook post.",
};

export default function AdminFlowPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="mx-auto w-full max-w-3xl px-6 md:px-8">
        <SiteNav />
        <main className="py-8 md:py-10">
          <div className="mb-8">
            <h1 className="mb-2 text-2xl font-semibold tracking-tight md:text-3xl">
              Creative Flow
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground max-w-xl">
              Drop a seed idea — a rough thought, observation, or question. A LangGraph
              deep agent will work through it in six steps: analyze, brainstorm, structure,
              draft, self-critique, and finalize. Takes 1–3 minutes.
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              {[
                "analyze → brainstorm → structure",
                "draft with adaptive thinking",
                "self-critique + optional refinement",
                "save to notebook",
              ].map((step) => (
                <span
                  key={step}
                  className="rounded-full border border-border bg-muted px-3 py-1 text-xs text-muted-foreground"
                >
                  {step}
                </span>
              ))}
            </div>
          </div>

          <CreativeFlow />
        </main>
      </div>
    </div>
  );
}
