import { cn } from "@/lib/utils";

// 80s-style horizontal stripe bar — colours taken from the racing-stripe hoodie palette
// (royal blue → violet → red → amber, top-to-bottom on the jacket)
// Slightly desaturated from pure web primaries so they read as vintage rather than neon.
export const STRIPE_COLORS = [
  "#4A82D4", // faded royal blue
  "#9B6ECC", // dusty violet
  "#C95252", // vintage red
  "#D4943A", // warm amber / gold
] as const;

interface StripeBarProps {
  height?: number;
  className?: string;
  /** If provided, renders only the stripe at that index (0–3) */
  index?: number;
  /** Break out of any max-width container to span the full viewport width */
  fullBleed?: boolean;
  /** 0–1 opacity, useful for background-accent usage */
  opacity?: number;
}

export function StripeBar({ height = 6, className, index, fullBleed, opacity = 1 }: StripeBarProps) {
  const colors = index !== undefined ? [STRIPE_COLORS[index % STRIPE_COLORS.length]] : STRIPE_COLORS;
  return (
    <div
      className={cn("flex flex-col overflow-hidden", className)}
      style={{
        opacity,
        ...(fullBleed
          ? { width: "100vw", marginLeft: "calc(50% - 50vw)" }
          : { width: "100%" }),
      }}
      aria-hidden
    >
      {colors.map((color) => (
        <div key={color} style={{ backgroundColor: color, height: `${height}px` }} />
      ))}
    </div>
  );
}
