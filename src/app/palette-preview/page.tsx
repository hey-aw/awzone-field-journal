export default function StripePreview() {
  // The four stripe colors, left to right
  const stripes = [
    "oklch(0.52 0.22 252)", // blue
    "oklch(0.52 0.25 285)", // purple
    "oklch(0.55 0.24 18)",  // red
    "oklch(0.68 0.20 38)",  // orange
  ]

  return (
    <div>
      <div className="bg-background border-b border-border px-6 py-3 flex items-center gap-3 text-sm">
        <a href="/" className="text-muted-foreground hover:text-foreground transition-colors">← Back</a>
        <span className="text-muted-foreground">·</span>
        <span className="font-medium">Racing stripe placements</span>
      </div>

      <Mock label="Top bar — full width, 4px" stripes={stripes} dark placement="topbar" />
      <Mock label="Top bar — full width, 4px" stripes={stripes} dark={false} placement="topbar" />

      <Mock label="Hero accent — diagonal sweep" stripes={stripes} dark placement="diagonal" />
      <Mock label="Hero accent — diagonal sweep" stripes={stripes} dark={false} placement="diagonal" />

      <Mock label="Left edge — card / section marker" stripes={stripes} dark placement="leftedge" />
      <Mock label="Left edge — card / section marker" stripes={stripes} dark={false} placement="leftedge" />
    </div>
  )
}

function RacingStripe({ stripes, height = 4 }: { stripes: string[]; height?: number }) {
  return (
    <div className="flex w-full" style={{ height }}>
      {stripes.map((color, i) => (
        <div key={i} className="flex-1" style={{ backgroundColor: color }} />
      ))}
    </div>
  )
}

function Mock({
  label,
  stripes,
  dark,
  placement,
}: {
  label: string
  stripes: string[]
  dark: boolean
  placement: "topbar" | "diagonal" | "leftedge"
}) {
  const bg      = dark ? "oklch(0.12 0.025 262)" : "oklch(0.99 0.005 68)"
  const card    = dark ? "oklch(0.18 0.025 262)" : "oklch(0.96 0.01 68)"
  const border  = dark ? "oklch(1 0 0 / 10%)"   : "oklch(0.87 0.02 68)"
  const fg      = dark ? "oklch(0.95 0 0)"       : "oklch(0.15 0 0)"
  const muted   = dark ? "oklch(0.63 0.015 262)" : "oklch(0.45 0.01 68)"
  const primary = dark ? "oklch(0.74 0.17 68)"   : "oklch(0.40 0.18 262)"
  const primaryFg = dark ? "oklch(0.12 0 0)"     : "oklch(0.97 0 0)"

  return (
    <section style={{ backgroundColor: bg, color: fg, fontFamily: "'IBM Plex Sans', sans-serif" }}>
      {/* Label bar */}
      <div className="px-6 py-1.5 text-xs font-semibold tracking-widest uppercase flex justify-between"
        style={{ backgroundColor: primary, color: primaryFg }}>
        <span>{label}</span>
        <span className="opacity-60">{dark ? "Dark" : "Light"}</span>
      </div>

      {/* Top bar placement */}
      {placement === "topbar" && <RacingStripe stripes={stripes} height={4} />}

      <div className="mx-auto max-w-2xl px-6 md:px-8">
        {/* Nav */}
        <nav className="flex items-center justify-between py-5"
          style={{ borderBottom: `1px solid ${border}` }}>
          <span className="text-sm font-semibold tracking-tight">AWzone</span>
          <div className="flex gap-6 text-xs" style={{ color: muted }}>
            <span style={{ color: primary }}>Notes</span>
            <span>Experiments</span>
            <span>Projects</span>
            <span>About</span>
          </div>
        </nav>

        {/* Hero */}
        <div className="py-14 relative">
          {/* Diagonal sweep placement */}
          {placement === "diagonal" && (
            <div className="absolute right-0 top-8 flex" style={{ height: 120, width: 160, transform: "skewX(-12deg)", gap: 3 }}>
              {stripes.map((color, i) => (
                <div key={i} className="flex-1" style={{ backgroundColor: color, opacity: 0.9 }} />
              ))}
            </div>
          )}

          <p className="mb-3 text-xs font-medium tracking-widest uppercase" style={{ color: primary }}>
            Field Journal
          </p>
          <h1 className="mb-5 text-3xl font-semibold leading-tight tracking-tight md:text-4xl" style={{ color: fg }}>
            Matt &ldquo;AW&rdquo; Anthes-Washburn
          </h1>
          <p className="mb-6 text-lg leading-relaxed" style={{ color: muted }}>
            Experiments in AI, learning, product design, and building useful things.
          </p>
          <div className="flex gap-4">
            <button className="rounded-md px-5 py-2.5 text-sm font-medium"
              style={{ backgroundColor: primary, color: primaryFg }}>
              Browse notes
            </button>
            <button className="rounded-md px-5 py-2.5 text-sm font-medium"
              style={{ border: `1px solid ${border}`, color: fg }}>
              What I&apos;m doing now
            </button>
          </div>
        </div>

        {/* Entry list */}
        <div className="mb-16 overflow-hidden rounded-md" style={{ border: `1px solid ${border}` }}>
          {[
            { label: "Lab note",         title: "Why I'm building this in public" },
            { label: "Experiment",       title: "What I'm experimenting with right now" },
            { label: "Field reflection", title: "A reflection on building for educators" },
          ].map((entry, i) => (
            <div key={i} className="flex items-start justify-between gap-4 px-5 py-4"
              style={{
                backgroundColor: card,
                borderBottom: i < 2 ? `1px solid ${border}` : undefined,
                // Left edge placement: stripe on the left side of each card
                borderLeft: placement === "leftedge" ? `3px solid ${stripes[i % stripes.length]}` : undefined,
              }}>
              <div>
                <p className="mb-0.5 text-xs font-medium tracking-wide uppercase" style={{ color: muted }}>
                  {entry.label}
                </p>
                <p className="text-sm font-medium leading-snug" style={{ color: fg }}>{entry.title}</p>
              </div>
              <span className="shrink-0 pt-0.5 text-xs" style={{ color: muted }}>Coming soon</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
