import { StateGraph, Annotation, END, START } from "@langchain/langgraph";
import Anthropic from "@anthropic-ai/sdk";
import type { FlowEvent } from "./types";

// ─── State ────────────────────────────────────────────────────────────────────

const FlowStateAnnotation = Annotation.Root({
  seed: Annotation<string>({ default: () => "", reducer: (_, b) => b }),
  postType: Annotation<string>({ default: () => "lab-note", reducer: (_, b) => b }),
  pillar: Annotation<string>({ default: () => "build-notes", reducer: (_, b) => b }),
  coreQuestion: Annotation<string>({ default: () => "", reducer: (_, b) => b }),
  analysis: Annotation<string>({ default: () => "", reducer: (_, b) => b }),
  angles: Annotation<string>({ default: () => "", reducer: (_, b) => b }),
  structure: Annotation<string>({ default: () => "", reducer: (_, b) => b }),
  draft: Annotation<string>({ default: () => "", reducer: (_, b) => b }),
  critiqueScore: Annotation<number>({ default: () => 0, reducer: (_, b) => b }),
  critiqueNotes: Annotation<string>({ default: () => "", reducer: (_, b) => b }),
  title: Annotation<string>({ default: () => "", reducer: (_, b) => b }),
  excerpt: Annotation<string>({ default: () => "", reducer: (_, b) => b }),
  refineCount: Annotation<number>({ default: () => 0, reducer: (_, b) => b }),
});

type FlowState = typeof FlowStateAnnotation.State;
type PushFn = (event: FlowEvent) => void;

// ─── Anthropic client ─────────────────────────────────────────────────────────

function getClient() {
  return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
}

// ─── Helper: stream a Claude call, push events, return full text ──────────────

async function streamCall(opts: {
  nodeName: FlowState["seed"] extends string ? string : never;
  system: string;
  user: string;
  push: PushFn;
  thinking?: boolean;
  maxTokens?: number;
}): Promise<string> {
  const { nodeName, system, user, push, thinking = false, maxTokens = 8192 } = opts;
  const client = getClient();

  const params: Anthropic.MessageStreamParams = {
    model: "claude-opus-4-6",
    max_tokens: maxTokens,
    ...(thinking ? { thinking: { type: "adaptive" } } : {}),
    messages: [{ role: "user", content: user }],
    system,
  };

  const stream = client.messages.stream(params as Parameters<typeof client.messages.stream>[0]);

  let text = "";

  for await (const event of stream) {
    if (event.type === "content_block_delta") {
      if (event.delta.type === "thinking_delta") {
        push({
          type: "thinking_chunk",
          node: nodeName as FlowEvent["node"],
          text: event.delta.thinking,
        });
      } else if (event.delta.type === "text_delta") {
        text += event.delta.text;
        push({
          type: "text_chunk",
          node: nodeName as FlowEvent["node"],
          text: event.delta.text,
        });
      }
    }
  }

  return text;
}

// ─── Node 1: Analyze ──────────────────────────────────────────────────────────

async function analyzeNode(state: FlowState, config: any): Promise<Partial<FlowState>> {
  const push: PushFn = config?.configurable?.push ?? (() => {});
  push({ type: "node_start", node: "analyze" });

  const output = await streamCall({
    nodeName: "analyze",
    push,
    thinking: true,
    maxTokens: 16000,
    system: `You are a writing analyst helping develop lab notebook posts.
Analyze the seed idea deeply and produce a JSON response with these fields:
- "postType": best format — one of: lab-note, build-log, essay, how-to, open-question, roundup
- "pillar": content pillar — one of: build-notes, experiments, field-reflections, resources
- "coreQuestion": the sharpest single question this post could answer (1 sentence)
- "analysis": 2-3 paragraphs on what makes this interesting, what's specific about it, and what angle would make it most useful to a reader who is curious about AI, learning design, or building in public

Be specific. Avoid generic analysis. Find the real thing this idea is about.
Respond ONLY with valid JSON.`,
    user: `Seed idea: ${state.seed}`,
  });

  try {
    // Strip markdown code fences if present
    const cleaned = output.replace(/^```(?:json)?\s*/m, "").replace(/```\s*$/m, "").trim();
    const parsed = JSON.parse(cleaned);
    push({ type: "node_complete", node: "analyze" });
    return {
      postType: parsed.postType ?? "lab-note",
      pillar: parsed.pillar ?? "build-notes",
      coreQuestion: parsed.coreQuestion ?? "",
      analysis: parsed.analysis ?? output,
    };
  } catch {
    push({ type: "node_complete", node: "analyze" });
    return { analysis: output };
  }
}

// ─── Node 2: Brainstorm ───────────────────────────────────────────────────────

async function brainstormNode(state: FlowState, config: any): Promise<Partial<FlowState>> {
  const push: PushFn = config?.configurable?.push ?? (() => {});
  push({ type: "node_start", node: "brainstorm" });

  const angles = await streamCall({
    nodeName: "brainstorm",
    push,
    maxTokens: 4096,
    system: `You are a lateral thinker helping develop lab notebook posts.
Generate 5-7 specific, concrete angles for this post. Each angle should be a direction, observation, or question that would make the post concrete and useful.

Focus on:
- What's surprising or counterintuitive
- What's specific enough to be actionable
- What the reader can actually use or take away
- Moments where things broke or didn't work as expected
- The tension between what was expected and what happened

Format: numbered list, each item 1-2 sentences. No headers.`,
    user: `Seed: ${state.seed}
Post type: ${state.postType}
Pillar: ${state.pillar}
Core question: ${state.coreQuestion}
Analysis: ${state.analysis}`,
  });

  push({ type: "node_complete", node: "brainstorm" });
  return { angles };
}

// ─── Node 3: Structure ────────────────────────────────────────────────────────

async function structureNode(state: FlowState, config: any): Promise<Partial<FlowState>> {
  const push: PushFn = config?.configurable?.push ?? (() => {});
  push({ type: "node_start", node: "outline" });

  const isFieldNote =
    state.postType === "lab-note" ||
    state.postType === "build-log" ||
    state.postType === "roundup";

  const templateGuide = isFieldNote
    ? `Use this structure for ${state.postType} posts:
- Title (specific and concrete — not generic)
- Question (what were you trying to find out?)
- Context (why this mattered — brief)
- What I tried (tools, setup, approach — be specific)
- What happened (observations, surprises, results)
- What I learned (what changed in your thinking)
- Next step (what you want to test next)`
    : `Use an appropriate structure for a "${state.postType}" post.
Include: a clear title, the central argument or purpose, 3-5 main sections with specific section names, a strong opening hook, and a takeaway/next step.`;

  const structure = await streamCall({
    nodeName: "outline",
    push,
    maxTokens: 4096,
    system: `You are a writing architect helping develop lab notebook posts.
Create a detailed outline for this post. Use the actual content from the analysis and brainstorm — this should be specific, not generic placeholders.

${templateGuide}

For each section, write 1-2 sentences describing exactly what it will contain, drawing from the brainstormed angles.`,
    user: `Seed: ${state.seed}
Post type: ${state.postType}
Core question: ${state.coreQuestion}
Analysis: ${state.analysis}
Angles:
${state.angles}`,
  });

  push({ type: "node_complete", node: "outline" });
  return { structure };
}

// ─── Node 4: Draft ────────────────────────────────────────────────────────────

async function draftNode(state: FlowState, config: any): Promise<Partial<FlowState>> {
  const push: PushFn = config?.configurable?.push ?? (() => {});
  push({ type: "node_start", node: "draft" });

  const refinementContext =
    state.refineCount > 0 && state.critiqueNotes
      ? `\n\nPrevious critique to address:\n${state.critiqueNotes}`
      : "";

  const draft = await streamCall({
    nodeName: "draft",
    push,
    thinking: true,
    maxTokens: 32000,
    system: `You are writing a lab notebook post in the voice of Matthew Anthes-Washburn — an educator and product builder working at the intersection of AI, learning, and building useful things.

Tone principles:
- Thoughtful, concrete, curious, unfinished in a good way
- More "here's what I tried" and "here's where it broke" — less polished thought leadership
- Generous with specifics: tools, exact steps, what surprised you
- Short paragraphs. Plain language. No jargon unless explaining it.
- First person, present tense for observations

Write the COMPLETE post based on the outline. Follow the structure precisely. Use markdown for headers (## for main sections), bullet points where natural.

Do not write a preamble or note about the post. Just write the post.${refinementContext}`,
    user: `Seed: ${state.seed}

Structure to follow:
${state.structure}

Additional context:
${state.analysis}

Angles to draw from:
${state.angles}`,
  });

  push({ type: "node_complete", node: "draft" });
  return { draft, refineCount: state.refineCount + 1 };
}

// ─── Node 5: Critique ─────────────────────────────────────────────────────────

async function critiqueNode(state: FlowState, config: any): Promise<Partial<FlowState>> {
  const push: PushFn = config?.configurable?.push ?? (() => {});
  push({ type: "node_start", node: "critique" });

  const output = await streamCall({
    nodeName: "critique",
    push,
    maxTokens: 4096,
    system: `You are an honest editor reviewing a lab notebook post draft.

Evaluate the draft on:
1. Concreteness — does it have specific details, not generalities?
2. Usefulness — would a reader in AI/learning/product learn something?
3. Voice — does it sound like field notes, not marketing copy?
4. Completeness — does it follow its own structure and answer its core question?

Respond with JSON:
{
  "score": <1-10 integer>,
  "strengths": "<1-2 sentences on what works>",
  "gaps": "<1-2 sentences on what's missing or too vague>",
  "needsRefinement": <true if score < 7, false otherwise>
}

Be honest. A score of 7+ means it's ready to publish as a draft. Below 7 means it needs a pass.
Respond ONLY with valid JSON.`,
    user: `Core question this post should answer: ${state.coreQuestion}

Draft:
${state.draft}`,
  });

  try {
    const cleaned = output.replace(/^```(?:json)?\s*/m, "").replace(/```\s*$/m, "").trim();
    const parsed = JSON.parse(cleaned);
    push({ type: "node_complete", node: "critique" });
    return {
      critiqueScore: parsed.score ?? 7,
      critiqueNotes: `Strengths: ${parsed.strengths ?? ""}\nGaps: ${parsed.gaps ?? ""}`,
    };
  } catch {
    push({ type: "node_complete", node: "critique" });
    return { critiqueScore: 7, critiqueNotes: output };
  }
}

// ─── Conditional edge: refine or finalize ─────────────────────────────────────

function shouldRefine(state: FlowState): "draft" | "finalize" {
  if (state.refineCount < 2 && state.critiqueScore < 7) {
    return "draft";
  }
  return "finalize";
}

// ─── Node 6: Finalize ─────────────────────────────────────────────────────────

async function finalizeNode(state: FlowState, config: any): Promise<Partial<FlowState>> {
  const push: PushFn = config?.configurable?.push ?? (() => {});
  push({ type: "node_start", node: "finalize" });

  const output = await streamCall({
    nodeName: "finalize",
    push,
    maxTokens: 2048,
    system: `You are finalizing a lab notebook post for publication.

Extract from the draft:
- "title": a specific, concrete title (not generic — should hint at what the reader will learn)
- "excerpt": 1-2 sentences that could appear in a post listing — intriguing but honest

Respond ONLY with valid JSON: { "title": "...", "excerpt": "..." }`,
    user: state.draft,
  });

  try {
    const cleaned = output.replace(/^```(?:json)?\s*/m, "").replace(/```\s*$/m, "").trim();
    const parsed = JSON.parse(cleaned);
    push({ type: "node_complete", node: "finalize" });
    push({
      type: "done",
      data: {
        title: parsed.title ?? state.seed,
        excerpt: parsed.excerpt ?? "",
        postType: state.postType,
        pillar: state.pillar,
        draft: state.draft,
      },
    });
    return { title: parsed.title ?? "", excerpt: parsed.excerpt ?? "" };
  } catch {
    push({ type: "node_complete", node: "finalize" });
    push({
      type: "done",
      data: {
        title: state.seed,
        excerpt: "",
        postType: state.postType,
        pillar: state.pillar,
        draft: state.draft,
      },
    });
    return {};
  }
}

// ─── Graph assembly ───────────────────────────────────────────────────────────

const workflow = new StateGraph(FlowStateAnnotation)
  .addNode("analyze", analyzeNode)
  .addNode("brainstorm", brainstormNode)
  .addNode("outline", structureNode)
  .addNode("draft", draftNode)
  .addNode("critique", critiqueNode)
  .addNode("finalize", finalizeNode)
  .addEdge(START, "analyze")
  .addEdge("analyze", "brainstorm")
  .addEdge("brainstorm", "outline")
  .addEdge("outline", "draft")
  .addEdge("draft", "critique")
  .addConditionalEdges("critique", shouldRefine, {
    draft: "draft",
    finalize: "finalize",
  })
  .addEdge("finalize", END);

export const flowGraph = workflow.compile();
