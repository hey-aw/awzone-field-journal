export type FlowNode =
  | "analyze"
  | "brainstorm"
  | "outline"
  | "draft"
  | "critique"
  | "finalize";

export interface FlowEvent {
  type:
    | "node_start"
    | "thinking_chunk"
    | "text_chunk"
    | "node_complete"
    | "done"
    | "error";
  node?: FlowNode;
  text?: string;
  data?: FinalOutput;
  message?: string;
}

export interface FinalOutput {
  title: string;
  excerpt: string;
  postType: string;
  pillar: string;
  draft: string;
}

export const NODE_LABELS: Record<FlowNode, string> = {
  analyze: "Analyze",
  brainstorm: "Brainstorm",
  outline: "Structure",
  draft: "Draft",
  critique: "Critique",
  finalize: "Finalize",
};

export const NODE_DESCRIPTIONS: Record<FlowNode, string> = {
  analyze: "Understanding the seed idea and its core question",
  brainstorm: "Generating angles, observations, and directions",
  outline: "Building the post outline with sections",
  draft: "Writing the full content with detail",
  critique: "Honest self-review — does this land?",
  finalize: "Polishing the title, excerpt, and metadata",
};
