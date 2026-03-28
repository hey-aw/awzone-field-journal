export default function StripePreview() {
  // Blue dominant · purple narrow · red narrow · orange dominant
  // flex values approximate the jacket's proportions
  const stripes = [
    { color: "oklch(0.55 0.22 252)", flex: 3   }, // blue
    { color: "oklch(0.50 0.25 285)", flex: 1.5 }, // purple
    { color: "oklch(0.55 0.24 18)",  flex: 2   }, // red
    { color: "oklch(0.72 0.18 50)",  flex: 3   }, // orange
  ]

  return (
    <div>
      <div className="bg-background border-b border-border px-6 py-3 flex items-center gap-3 text-sm">
        <a href="/" className="text-muted-foreground hover:text-foreground transition-colors">← Back</a>
        <span className="text-muted-foreground">·</span>
        <span className="font-medium">Racing stripe — horizontal</span>
      </div>

      <Mock label="Below nav" stripes={stripes} dark placement="below-nav" />
      <Mock label="Below nav" stripes={stripes} dark={false} placement="below-nav" />

      <Mock label="Hero divider" stripes={stripes} dark placement="hero-divider" />
      <Mock label="Hero divider" stripes={stripes} dark={false} placement="hero-divider" />

      <Mock label="Page footer" stripes={stripes} dark placement="footer" />
      <Mock label="Page footer" stripes={stripes} dark={false} placement="footer" />
    </div>
  )
}

function HStripe({ stripes, height = 18 }: { stripes: { color: string; flex: number }[]; height?: number }) {
  return (
    <div className="flex w-full" style={{ height }}>
      {stripes.map((s, i) => (
        <div key={i} style={{ backgroundColor: s.color, flex: s.flex }} />
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
  stripes: { color: string; flex: number }[]
  dark: boolean
  placement: "below-nav" | "hero-divider" | "footer"
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

      <div className="mx-auto max-w-2xl px-6 md:px-8">
        {/* Nav */}
        <nav className="flex items-center justify-between py-5"
          style={{ borderBottom: placement === "below-nav" ? undefined : `1px solid ${border}` }}>
          <span className="text-sm font-semibold tracking-tight">AWzone</span>
          <div className="flex gap-6 text-xs" style={{ color: muted }}>
            <span style={{ color: primary }}>Notes</span>
            <span>Experiments</span>
            <span>Projects</span>
            <span>About</span>
          </div>
        </nav>
      </div>

      {placement === "below-nav" && <HStripe stripes={stripes} height={18} />}

      <div className="mx-auto max-w-2xl px-6 md:px-8">
        {/* Hero */}
        <div className="py-14">
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

        {placement === "hero-divider" && (
          <div className="mb-14">
            <HStripe stripes={stripes} height={18} />
          </div>
        )}

        {/* Entry list */}
        <div className="mb-14 overflow-hidden rounded-md" style={{ border: `1px solid ${border}` }}>
          {[
            { label: "Lab note",         title: "Why I'm building this in public" },
            { label: "Experiment",       title: "What I'm experimenting with right now" },
            { label: "Field reflection", title: "A reflection on building for educators" },
          ].map((entry, i) => (
            <div key={i} className="flex items-start justify-between gap-4 px-5 py-4"
              style={{ backgroundColor: card, borderBottom: i < 2 ? `1px solid ${border}` : undefined }}>
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

      {placement === "footer" && <HStripe stripes={stripes} height={18} />}

      {/* Spacer at bottom for footer option */}
      {placement === "footer" && <div style={{ height: 32 }} />}
    </section>
  )
}
