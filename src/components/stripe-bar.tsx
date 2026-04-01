import { cn } from "@/lib/utils";

// 80s-style horizontal stripe bar — colours taken from the racing-stripe hoodie palette
// (royal blue → violet → red → amber, top-to-bottom on the jacket)
export const STRIPE_COLORS = [
  "#2563EB", // royal blue
  "#7C3AED", // violet
  "#DC2626", // red
  "#F59E0B", // amber / gold
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
