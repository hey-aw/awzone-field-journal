"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

type Status = "idle" | "saving" | "saved" | "error";

const POST_TYPES = [
  { label: "Lab note", value: "lab-note" },
  { label: "Build log", value: "build-log" },
  { label: "Idea / open question", value: "open-question" },
  { label: "Experiment", value: "essay" },
  { label: "How-to", value: "how-to" },
] as const;

export function QuickCapture() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [postType, setPostType] = useState("open-question");
  const [status, setStatus] = useState<Status>("idle");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Open with keyboard shortcut Cmd/Ctrl + Shift + C
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === "c") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape" && open) {
        handleClose();
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open]);

  // Focus textarea when dialog opens
  useEffect(() => {
    if (open) {
      setTimeout(() => textareaRef.current?.focus(), 50);
    }
  }, [open]);

  function handleClose() {
    if (status === "saving") return;
    setOpen(false);
    if (status === "saved") {
      setTitle("");
      setContent("");
      setPostType("open-question");
      setStatus("idle");
    }
  }

  async function handleSave() {
    if (!content.trim()) return;
    setStatus("saving");
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim(), content: content.trim(), postType }),
      });
      if (!res.ok) throw new Error("Save failed");
      setStatus("saved");
      setTimeout(() => {
        setOpen(false);
        setTitle("");
        setContent("");
        setPostType("open-question");
        setStatus("idle");
      }, 1200);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    handleSave();
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Quick capture"
        title="Quick capture (⌘⇧C)"
        className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-background shadow-lg transition-all hover:scale-105 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClose();
          }}
        >
          <div className="absolute inset-0 bg-black/40" aria-hidden="true" />

          {/* Dialog */}
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Quick capture"
            className="relative z-10 w-full max-w-lg rounded-xl border border-border bg-background shadow-2xl"
          >
            <form onSubmit={handleSubmit}>
              <div className="px-5 pt-5 pb-4">
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
                    Quick capture
                  </span>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="rounded-md p-1 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Close"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>

                <input
                  type="text"
                  placeholder="Title (optional)"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mb-3 w-full bg-transparent text-base font-semibold placeholder:text-muted-foreground/50 focus:outline-none"
                  disabled={status === "saving" || status === "saved"}
                />

                <textarea
                  ref={textareaRef}
                  placeholder="What's on your mind?"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  onKeyDown={(e) => {
                    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                      e.preventDefault();
                      handleSave();
                    }
                  }}
                  rows={5}
                  className="w-full resize-none bg-transparent text-sm leading-relaxed placeholder:text-muted-foreground/50 focus:outline-none"
                  disabled={status === "saving" || status === "saved"}
                />
              </div>

              <div className="flex items-center justify-between border-t border-border px-5 py-3 gap-3">
                <select
                  value={postType}
                  onChange={(e) => setPostType(e.target.value)}
                  disabled={status === "saving" || status === "saved"}
                  className="rounded-md border border-border bg-background px-2 py-1 text-xs text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                >
                  {POST_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>

                <div className="flex items-center gap-3">
                  <span className="hidden text-xs text-muted-foreground sm:block">
                    ⌘↵ to save
                  </span>
                  <Button
                    type="submit"
                    size="sm"
                    disabled={!content.trim() || status === "saving" || status === "saved"}
                  >
                    {status === "saving"
                      ? "Saving…"
                      : status === "saved"
                      ? "Saved"
                      : status === "error"
                      ? "Error — retry?"
                      : "Save"}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
