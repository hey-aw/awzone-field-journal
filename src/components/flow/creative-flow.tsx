"use client";

import { useState, useRef, useCallback } from "react";
import { StepTrack } from "./step-track";
import type { FlowEvent, FlowNode, FinalOutput } from "@/lib/flow/types";
import { NODE_LABELS } from "@/lib/flow/types";
import { cn } from "@/lib/utils";

interface StepContent {
  node: FlowNode;
  text: string;
  thinking: string;
  done: boolean;
}

export function CreativeFlow() {
  const [seed, setSeed] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [steps, setSteps] = useState<StepContent[]>([]);
  const [activeNode, setActiveNode] = useState<FlowNode | null>(null);
  const [completedNodes, setCompletedNodes] = useState<Set<FlowNode>>(new Set());
  const [refineCount, setRefineCount] = useState(0);
  const [finalOutput, setFinalOutput] = useState<FinalOutput | null>(null);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [expandedThinking, setExpandedThinking] = useState<Set<FlowNode>>(new Set());

  const abortRef = useRef<AbortController | null>(null);
  const stepsRef = useRef<StepContent[]>([]);

  const updateStep = useCallback((node: FlowNode, patch: Partial<StepContent>) => {
    setSteps((prev) => {
      const idx = prev.findIndex((s) => s.node === node);
      if (idx === -1) {
        const next = [...prev, { node, text: "", thinking: "", done: false, ...patch }];
        stepsRef.current = next;
        return next;
      }
      const next = prev.map((s, i) => (i === idx ? { ...s, ...patch } : s));
      stepsRef.current = next;
      return next;
    });
  }, []);

  const handleEvent = useCallback(
    (event: FlowEvent) => {
      switch (event.type) {
        case "node_start":
          if (event.node) {
            setActiveNode(event.node);
            updateStep(event.node, { node: event.node, text: "", thinking: "", done: false });
            if (event.node === "draft") {
              setRefineCount((c) => c + 1);
            }
          }
          break;

        case "thinking_chunk":
          if (event.node && event.text) {
            updateStep(event.node, {
              thinking:
                (stepsRef.current.find((s) => s.node === event.node)?.thinking ?? "") +
                event.text,
            });
          }
          break;

        case "text_chunk":
          if (event.node && event.text) {
            updateStep(event.node, {
              text:
                (stepsRef.current.find((s) => s.node === event.node)?.text ?? "") +
                event.text,
            });
          }
          break;

        case "node_complete":
          if (event.node) {
            updateStep(event.node, { done: true });
            setCompletedNodes((prev) => new Set([...prev, event.node!]));
            setActiveNode(null);
          }
          break;

        case "done":
          if (event.data) {
            setFinalOutput(event.data);
          }
          setIsRunning(false);
          break;

        case "error":
          setError(event.message ?? "Something went wrong");
          setIsRunning(false);
          break;
      }
    },
    [updateStep],
  );

  const startFlow = useCallback(async () => {
    if (!seed.trim() || isRunning) return;

    // Reset state
    setSteps([]);
    stepsRef.current = [];
    setActiveNode(null);
    setCompletedNodes(new Set());
    setRefineCount(0);
    setFinalOutput(null);
    setSaveState("idle");
    setError(null);
    setExpandedThinking(new Set());
    setIsRunning(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch("/api/flow/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ seed }),
        signal: controller.signal,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? `HTTP ${res.status}`);
      }

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split("\n\n");
        buffer = parts.pop() ?? "";

        for (const part of parts) {
          const line = part.trim();
          if (!line.startsWith("data:")) continue;
          try {
            const event: FlowEvent = JSON.parse(line.slice(5).trim());
            handleEvent(event);
          } catch {
            // malformed event, skip
          }
        }
      }
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        setError(err instanceof Error ? err.message : "Stream failed");
        setIsRunning(false);
      }
    }
  }, [seed, isRunning, handleEvent]);

  const stopFlow = useCallback(() => {
    abortRef.current?.abort();
    setIsRunning(false);
  }, []);

  const savePost = useCallback(async () => {
    if (!finalOutput) return;
    setSaveState("saving");
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: finalOutput.title,
          excerpt: finalOutput.excerpt,
          content: finalOutput.draft,
          postType: finalOutput.postType,
          pillar: finalOutput.pillar,
        }),
      });
      if (!res.ok) throw new Error("Save failed");
      setSaveState("saved");
    } catch {
      setSaveState("error");
    }
  }, [finalOutput]);

  const toggleThinking = (node: FlowNode) => {
    setExpandedThinking((prev) => {
      const next = new Set(prev);
      if (next.has(node)) next.delete(node);
      else next.add(node);
      return next;
    });
  };

  const canStart = seed.trim().length >= 10 && !isRunning;
  const hasStarted = steps.length > 0 || isRunning;

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col gap-8 py-8 md:py-12">
      {/* Seed input */}
      <section className="space-y-3">
        <label className="block text-sm font-medium" htmlFor="seed">
          Seed idea
        </label>
        <p className="text-xs text-muted-foreground">
          A rough thought, question, or observation. The agent will analyze, brainstorm,
          structure, draft, self-critique, and finalize a post.
        </p>
        <textarea
          id="seed"
          value={seed}
          onChange={(e) => setSeed(e.target.value)}
          placeholder="e.g. I tried using AI to prep for a workshop last week and it mostly helped with structure but not with energy or reading the room…"
          rows={4}
          disabled={isRunning}
          className={cn(
            "w-full resize-none rounded-md border border-border bg-background px-4 py-3 text-sm leading-relaxed",
            "placeholder:text-muted-foreground/50",
            "focus:outline-none focus:ring-2 focus:ring-ring",
            "disabled:cursor-not-allowed disabled:opacity-50",
          )}
        />
        <div className="flex items-center gap-3">
          <button
            onClick={isRunning ? stopFlow : startFlow}
            disabled={!isRunning && !canStart}
            className={cn(
              "rounded-md px-5 py-2.5 text-sm font-medium transition-all",
              isRunning
                ? "border border-border hover:bg-muted"
                : "bg-foreground text-background hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40",
            )}
          >
            {isRunning ? "Stop" : "Start creative flow"}
          </button>
          {isRunning && (
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500" />
              Agent running…
            </span>
          )}
          {error && (
            <span className="text-xs text-destructive">{error}</span>
          )}
        </div>
      </section>

      {/* Main area: step track + step outputs */}
      {hasStarted && (
        <div className="flex gap-8 min-h-0">
          {/* Step track — sidebar */}
          <aside className="w-44 shrink-0 hidden md:block">
            <StepTrack
              activeNode={activeNode}
              completedNodes={completedNodes}
              refineCount={refineCount}
            />
          </aside>

          {/* Step outputs */}
          <div className="flex-1 min-w-0 space-y-4">
            {/* Mobile: compact step indicator */}
            <div className="flex flex-wrap gap-2 md:hidden">
              {Array.from(completedNodes).map((n) => (
                <span
                  key={n}
                  className="rounded-full border border-border bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                >
                  {NODE_LABELS[n]}
                </span>
              ))}
              {activeNode && (
                <span className="rounded-full border border-foreground bg-foreground px-2 py-0.5 text-xs text-background">
                  {NODE_LABELS[activeNode]}…
                </span>
              )}
            </div>

            {steps.map((step) => (
              <StepOutput
                key={step.node}
                step={step}
                isActive={activeNode === step.node}
                showThinking={expandedThinking.has(step.node)}
                onToggleThinking={() => toggleThinking(step.node)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Final output panel */}
      {finalOutput && (
        <FinalPanel
          output={finalOutput}
          saveState={saveState}
          onSave={savePost}
          onRestart={() => {
            setSteps([]);
            stepsRef.current = [];
            setActiveNode(null);
            setCompletedNodes(new Set());
            setRefineCount(0);
            setFinalOutput(null);
            setSaveState("idle");
            setError(null);
          }}
        />
      )}
    </div>
  );
}

// ─── Step output card ─────────────────────────────────────────────────────────

function StepOutput({
  step,
  isActive,
  showThinking,
  onToggleThinking,
}: {
  step: StepContent;
  isActive: boolean;
  showThinking: boolean;
  onToggleThinking: () => void;
}) {
  return (
    <div
      className={cn(
        "rounded-md border bg-card transition-colors",
        isActive ? "border-foreground/30" : "border-border",
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <div className="flex items-center gap-2">
          {isActive && (
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500" />
          )}
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {NODE_LABELS[step.node]}
          </span>
        </div>
        {step.thinking && (
          <button
            onClick={onToggleThinking}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            {showThinking ? "hide thinking" : "show thinking"}
          </button>
        )}
      </div>

      {/* Thinking (collapsible) */}
      {step.thinking && showThinking && (
        <div className="border-b border-border bg-muted/30 px-4 py-3">
          <p className="mb-1.5 text-xs font-medium text-muted-foreground">
            Claude&apos;s reasoning
          </p>
          <p className="whitespace-pre-wrap text-xs leading-relaxed text-muted-foreground/70">
            {step.thinking}
          </p>
        </div>
      )}

      {/* Output text */}
      <div className="px-4 py-4">
        {step.text ? (
          <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
            {step.text}
            {isActive && (
              <span className="inline-block h-4 w-0.5 animate-pulse bg-foreground align-middle ml-0.5" />
            )}
          </pre>
        ) : (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-muted-foreground" />
            {isActive ? "Thinking…" : "Waiting"}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Final output panel ───────────────────────────────────────────────────────

function FinalPanel({
  output,
  saveState,
  onSave,
  onRestart,
}: {
  output: FinalOutput;
  saveState: "idle" | "saving" | "saved" | "error";
  onSave: () => void;
  onRestart: () => void;
}) {
  const [copied, setCopied] = useState(false);

  const copyDraft = async () => {
    await navigator.clipboard.writeText(output.draft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="space-y-4 border-t border-border pt-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="mb-0.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Draft ready
          </p>
          <h2 className="text-xl font-semibold leading-snug tracking-tight">
            {output.title}
          </h2>
          {output.excerpt && (
            <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed max-w-prose">
              {output.excerpt}
            </p>
          )}
        </div>

        {/* Metadata badges */}
        <div className="flex shrink-0 flex-col items-end gap-2">
          <div className="flex flex-wrap gap-1.5">
            <span className="rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">
              {output.postType}
            </span>
            <span className="rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">
              {output.pillar}
            </span>
          </div>
        </div>
      </div>

      {/* Draft text */}
      <div className="rounded-md border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Full draft
          </span>
          <button
            onClick={copyDraft}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            {copied ? "copied!" : "copy"}
          </button>
        </div>
        <div className="px-4 py-4">
          <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed max-h-96 overflow-y-auto">
            {output.draft}
          </pre>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={onSave}
          disabled={saveState === "saving" || saveState === "saved"}
          className={cn(
            "rounded-md px-5 py-2.5 text-sm font-medium transition-all",
            saveState === "saved"
              ? "border border-border text-muted-foreground cursor-default"
              : saveState === "error"
                ? "bg-destructive/10 text-destructive border border-destructive/20"
                : "bg-foreground text-background hover:opacity-80 disabled:opacity-50",
          )}
        >
          {saveState === "saving"
            ? "Saving…"
            : saveState === "saved"
              ? "Saved as draft"
              : saveState === "error"
                ? "Save failed — try again"
                : "Save as draft"}
        </button>
        <button
          onClick={onRestart}
          className="rounded-md border border-border px-5 py-2.5 text-sm font-medium hover:bg-muted transition-colors"
        >
          Start over
        </button>
      </div>
    </section>
  );
}
