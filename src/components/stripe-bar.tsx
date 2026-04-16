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
}

export function StripeBar({ height = 6, className, index }: StripeBarProps) {
  const colors = index !== undefined ? [STRIPE_COLORS[index % STRIPE_COLORS.length]] : STRIPE_COLORS;
  return (
    <div
      className={cn("flex w-full flex-col overflow-hidden", className)}
      aria-hidden
    >
      {colors.map((color) => (
        <div key={color} className="w-full" style={{ backgroundColor: color, height: `${height}px` }} />
      ))}
    </div>
  );
}
