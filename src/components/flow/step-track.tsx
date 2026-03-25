"use client";

import { cn } from "@/lib/utils";
import type { FlowNode } from "@/lib/flow/types";
import { NODE_LABELS, NODE_DESCRIPTIONS } from "@/lib/flow/types";

const ORDERED_NODES: FlowNode[] = [
  "analyze",
  "brainstorm",
  "structure",
  "draft",
  "critique",
  "finalize",
];

interface StepTrackProps {
  activeNode: FlowNode | null;
  completedNodes: Set<FlowNode>;
  refineCount: number;
}

export function StepTrack({ activeNode, completedNodes, refineCount }: StepTrackProps) {
  return (
    <div className="space-y-1">
      {ORDERED_NODES.map((node, i) => {
        const isActive = activeNode === node;
        const isDone = completedNodes.has(node);
        const isPending = !isActive && !isDone;

        return (
          <div key={node} className="flex items-start gap-3">
            {/* connector line */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-semibold transition-colors",
                  isActive &&
                    "border-foreground bg-foreground text-background animate-pulse",
                  isDone && "border-muted-foreground bg-muted text-muted-foreground",
                  isPending && "border-border text-border",
                )}
              >
                {isDone ? (
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
              {i < ORDERED_NODES.length - 1 && (
                <div
                  className={cn(
                    "mt-1 h-5 w-px",
                    isDone ? "bg-muted-foreground/40" : "bg-border",
                  )}
                />
              )}
            </div>

            {/* label */}
            <div className="pb-4 pt-0.5">
              <p
                className={cn(
                  "text-sm font-medium leading-none",
                  isActive && "text-foreground",
                  isDone && "text-muted-foreground",
                  isPending && "text-muted-foreground/50",
                )}
              >
                {NODE_LABELS[node]}
                {node === "draft" && refineCount > 1 && (
                  <span className="ml-2 text-xs text-amber-500">
                    refined ×{refineCount - 1}
                  </span>
                )}
              </p>
              <p
                className={cn(
                  "mt-0.5 text-xs leading-relaxed",
                  isActive ? "text-muted-foreground" : "text-muted-foreground/40",
                )}
              >
                {NODE_DESCRIPTIONS[node]}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
