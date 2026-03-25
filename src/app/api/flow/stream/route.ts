import { NextRequest } from "next/server";
import { flowGraph } from "@/lib/flow/graph";
import type { FlowEvent } from "@/lib/flow/types";

export const runtime = "nodejs";
export const maxDuration = 300; // 5 min — deep agent takes time

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const seed = typeof body.seed === "string" ? body.seed.trim() : "";

  if (!seed) {
    return new Response(JSON.stringify({ error: "seed is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return new Response(
      JSON.stringify({ error: "ANTHROPIC_API_KEY is not set" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  const encoder = new TextEncoder();
  const encode = (event: FlowEvent) =>
    encoder.encode(`data: ${JSON.stringify(event)}\n\n`);

  const stream = new ReadableStream({
    async start(controller) {
      const push = (event: FlowEvent) => {
        try {
          controller.enqueue(encode(event));
        } catch {
          // controller may already be closed
        }
      };

      try {
        // Stream the LangGraph graph, passing the push function via configurable
        const graphStream = await flowGraph.stream(
          { seed },
          { configurable: { push } },
        );

        // Drain state updates (nodes push events themselves)
        for await (const _chunk of graphStream) {
          // state chunks are consumed here; events already pushed to controller
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        push({ type: "error", message });
      } finally {
        try {
          controller.close();
        } catch {
          // already closed
        }
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
