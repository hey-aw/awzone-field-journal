import type { Metadata } from "next"

export const metadata: Metadata = { title: "Palette Preview" }

interface ColorSet {
  bg: string
  card: string
  border: string
  fg: string
  muted: string
  accentSubtle: string
  accent: string
  accentFg: string
  stripe: string
}

interface PaletteConfig {
  id: string
  label: string
  tagline: string
  fontFamily: string
  headingFontFamily: string
  dark: ColorSet
  light: ColorSet
}

const palettes: PaletteConfig[] = [
  {
    id: "trimaxion",
    label: "A — Trimaxion",
    tagline: "Cobalt blue · Burnt orange · Space Grotesk",
    fontFamily: "'Space Grotesk', sans-serif",
    headingFontFamily: "'Space Grotesk', sans-serif",
    dark: {
      accent: "oklch(0.52 0.22 252)",
      accentFg: "oklch(0.97 0 0)",
      stripe: "oklch(0.65 0.19 42)",
      bg: "oklch(0.12 0.025 255)",
      card: "oklch(0.17 0.025 255)",
      border: "oklch(0.27 0.04 255)",
      fg: "oklch(0.95 0 0)",
      muted: "oklch(0.62 0.015 255)",
      accentSubtle: "oklch(0.52 0.22 252 / 0.10)",
    },
    light: {
      accent: "oklch(0.52 0.22 252)",
      accentFg: "oklch(0.97 0 0)",
      stripe: "oklch(0.50 0.19 42)",
      bg: "oklch(0.99 0.005 255)",
      card: "oklch(0.96 0.01 255)",
      border: "oklch(0.87 0.025 255)",
      fg: "oklch(0.15 0 0)",
      muted: "oklch(0.45 0.015 255)",
      accentSubtle: "oklch(0.52 0.22 252 / 0.07)",
    },
  },
  {
    id: "deep-synth",
    label: "B — Deep Synth",
    tagline: "Electric violet · Hot magenta · DM Mono headings",
    fontFamily: "var(--font-inter), sans-serif",
    headingFontFamily: "'DM Mono', monospace",
    dark: {
      accent: "oklch(0.58 0.26 292)",
      accentFg: "oklch(0.97 0 0)",
      stripe: "oklch(0.62 0.28 335)",
      bg: "oklch(0.10 0.03 295)",
      card: "oklch(0.16 0.03 295)",
      border: "oklch(0.26 0.05 295)",
      fg: "oklch(0.95 0 0)",
      muted: "oklch(0.62 0.02 295)",
      accentSubtle: "oklch(0.58 0.26 292 / 0.10)",
    },
    light: {
      accent: "oklch(0.48 0.26 292)",
      accentFg: "oklch(0.97 0 0)",
      stripe: "oklch(0.48 0.28 335)",
      bg: "oklch(0.98 0.01 295)",
      card: "oklch(0.95 0.015 295)",
      border: "oklch(0.85 0.03 295)",
      fg: "oklch(0.12 0 0)",
      muted: "oklch(0.44 0.02 295)",
      accentSubtle: "oklch(0.58 0.26 292 / 0.07)",
    },
  },
  {
    id: "solar-drift",
    label: "C — Solar Drift",
    tagline: "Amber gold · Deep indigo · IBM Plex Sans",
    fontFamily: "'IBM Plex Sans', sans-serif",
    headingFontFamily: "'IBM Plex Sans', sans-serif",
    dark: {
      accent: "oklch(0.74 0.17 68)",
      accentFg: "oklch(0.12 0 0)",
      stripe: "oklch(0.55 0.18 262)",
      bg: "oklch(0.12 0.025 262)",
      card: "oklch(0.18 0.025 262)",
      border: "oklch(0.28 0.045 262)",
      fg: "oklch(0.95 0 0)",
      muted: "oklch(0.63 0.015 262)",
      accentSubtle: "oklch(0.74 0.17 68 / 0.10)",
    },
    light: {
      // Swap: indigo becomes primary accent, amber becomes stripe eyebrow
      accent: "oklch(0.40 0.18 262)",
      accentFg: "oklch(0.97 0 0)",
      stripe: "oklch(0.58 0.17 68)",
      bg: "oklch(0.99 0.005 68)",
      card: "oklch(0.96 0.01 68)",
      border: "oklch(0.87 0.02 68)",
      fg: "oklch(0.15 0 0)",
      muted: "oklch(0.45 0.01 68)",
      accentSubtle: "oklch(0.40 0.18 262 / 0.07)",
    },
  },
  {
    id: "night-launch",
    label: "D — Night Launch",
    tagline: "Bright cyan · Deep purple · Inter 300–700",
    fontFamily: "'Inter', sans-serif",
    headingFontFamily: "'Inter', sans-serif",
    dark: {
      accent: "oklch(0.72 0.17 196)",
      accentFg: "oklch(0.10 0 0)",
      stripe: "oklch(0.48 0.22 303)",
      bg: "oklch(0.10 0.02 215)",
      card: "oklch(0.16 0.02 215)",
      border: "oklch(0.26 0.04 215)",
      fg: "oklch(0.95 0 0)",
      muted: "oklch(0.63 0.01 215)",
      accentSubtle: "oklch(0.72 0.17 196 / 0.10)",
    },
    light: {
      accent: "oklch(0.38 0.17 196)",
      accentFg: "oklch(0.97 0 0)",
      stripe: "oklch(0.42 0.22 303)",
      bg: "oklch(0.99 0.005 215)",
      card: "oklch(0.96 0.01 215)",
      border: "oklch(0.86 0.02 215)",
      fg: "oklch(0.12 0 0)",
      muted: "oklch(0.44 0.01 215)",
      accentSubtle: "oklch(0.38 0.17 196 / 0.07)",
    },
  },
]

export default function PalettePreview() {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Mono:ital,wght@0,400;0,500&family=IBM+Plex+Sans:wght@400;500;600&family=Inter:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <div>
        <div className="bg-background border-b border-border px-6 py-3 flex items-center gap-3 text-sm">
          <a href="/" className="text-muted-foreground hover:text-foreground transition-colors">
            ← Back
          </a>
          <span className="text-muted-foreground">·</span>
          <span className="font-medium">80s Space — Palette Mocks</span>
        </div>
        {palettes.map((p) => (
          <div key={p.id}>
            <PaletteMock p={p} colors={p.dark} mode="Dark" />
            <PaletteMock p={p} colors={p.light} mode="Light" />
          </div>
        ))}
      </div>
    </>
  )
}

function PaletteMock({ p, colors: c, mode }: { p: PaletteConfig; colors: ColorSet; mode: string }) {
  return (
    <section style={{ backgroundColor: c.bg, color: c.fg, fontFamily: p.fontFamily }}>
      {/* Label bar */}
      <div
        className="px-6 py-2 text-xs font-semibold tracking-widest uppercase flex items-center justify-between"
        style={{ backgroundColor: c.accent, color: c.accentFg }}
      >
        <span>{p.label} · {p.tagline}</span>
        <span className="opacity-70">{mode}</span>
      </div>

      <div className="mx-auto max-w-2xl px-6 md:px-8">
        {/* Nav */}
        <nav
          className="flex items-center justify-between py-5"
          style={{ borderBottom: `1px solid ${c.border}` }}
        >
          <span className="text-sm font-semibold tracking-tight">AWzone</span>
          <div className="flex gap-6 text-xs">
            {["Notes", "Experiments", "Projects", "About"].map((link, i) => (
              <span
                key={link}
                style={{
                  color: i === 0 ? c.accent : c.muted,
                  borderBottom: i === 0 ? `1px solid ${c.accent}` : "none",
                  paddingBottom: i === 0 ? "2px" : undefined,
                }}
              >
                {link}
              </span>
            ))}
          </div>
        </nav>

        {/* Hero */}
        <div className="py-16">
          <p
            className="mb-3 text-xs font-medium tracking-widest uppercase"
            style={{ color: c.stripe }}
          >
            Field Journal
          </p>
          <h1
            className="mb-5 text-3xl font-semibold leading-tight tracking-tight md:text-4xl"
            style={{ color: c.fg, fontFamily: p.headingFontFamily }}
          >
            Matt &ldquo;AW&rdquo; Anthes-Washburn
          </h1>
          <p className="mb-6 text-lg leading-relaxed md:text-xl" style={{ color: c.muted }}>
            Experiments in AI, learning, product design, and building useful things.
          </p>
          <p className="max-w-prose text-base leading-relaxed" style={{ color: c.muted }}>
            A public notebook — documenting what I&apos;m building, testing, and learning.
            Rough notes, mid-stream updates, and the occasional finished reflection.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <button
              className="inline-flex items-center rounded-md px-5 py-2.5 text-sm font-medium"
              style={{ backgroundColor: c.accent, color: c.accentFg }}
            >
              Browse notes
            </button>
            <button
              className="inline-flex items-center rounded-md px-5 py-2.5 text-sm font-medium"
              style={{ border: `1px solid ${c.border}`, color: c.fg }}
            >
              What I&apos;m doing now
            </button>
          </div>
        </div>

        {/* Entry list */}
        <div className="mb-12">
          <div className="mb-5 flex items-center justify-between">
            <h2
              className="text-lg font-semibold tracking-tight"
              style={{ color: c.fg, fontFamily: p.headingFontFamily }}
            >
              Recent notes
            </h2>
            <span className="text-sm" style={{ color: c.muted }}>
              All notes →
            </span>
          </div>
          <div className="overflow-hidden rounded-md" style={{ border: `1px solid ${c.border}` }}>
            {[
              { label: "Lab note", title: "Why I'm building this in public" },
              { label: "Experiment", title: "What I'm experimenting with right now" },
              { label: "Field reflection", title: "A reflection on building for educators" },
            ].map((entry, i) => (
              <div
                key={i}
                className="flex items-start justify-between gap-4 px-5 py-4"
                style={{
                  backgroundColor: c.card,
                  borderBottom: i < 2 ? `1px solid ${c.border}` : undefined,
                }}
              >
                <div>
                  <p
                    className="mb-0.5 text-xs font-medium tracking-wide uppercase"
                    style={{ color: c.muted }}
                  >
                    {entry.label}
                  </p>
                  <p className="text-sm font-medium leading-snug" style={{ color: c.fg }}>
                    {entry.title}
                  </p>
                </div>
                <span className="shrink-0 pt-0.5 text-xs" style={{ color: c.muted }}>
                  Coming soon
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Pillar cards */}
        <div className="mb-12 grid gap-4 sm:grid-cols-2">
          {[
            {
              name: "Build Notes",
              desc: "What I'm making right now — prototypes, workflow tools, and lessons from shipping.",
            },
            {
              name: "Experiments",
              desc: "Small tests with a question behind them. What happens when I try this instead?",
            },
            {
              name: "Field Reflections",
              desc: "What I'm noticing in work, teaching, and product strategy.",
            },
            {
              name: "Resources & Playbooks",
              desc: "Useful, reusable pieces — checklists, templates, and prompt packs.",
            },
          ].map((pillar, i) => (
            <div
              key={i}
              className="rounded-md p-5"
              style={{ backgroundColor: c.card, border: `1px solid ${c.border}` }}
            >
              <p
                className="mb-2 text-sm font-semibold"
                style={{ color: c.fg, fontFamily: p.headingFontFamily }}
              >
                {pillar.name}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: c.muted }}>
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Currently teaser */}
        <div
          className="mb-16 rounded-md px-6 py-5"
          style={{ border: `1px solid ${c.border}`, backgroundColor: c.accentSubtle }}
        >
          <p
            className="mb-1 text-xs font-medium tracking-widest uppercase"
            style={{ color: c.accent }}
          >
            Currently
          </p>
          <p className="text-sm leading-relaxed" style={{ color: c.fg }}>
            Setting up this public notebook. First posts incoming.{" "}
            <span
              style={{
                color: c.accent,
                textDecoration: "underline",
                textUnderlineOffset: "4px",
              }}
            >
              Read the now page →
            </span>
          </p>
        </div>
      </div>
    </section>
  )
}
