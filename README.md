# Siva Motamarri, AI/ML Engineer Portfolio

A premium, developer-product-styled dark portfolio: **Vite + React + TypeScript**, with
**Three.js / react-three-fiber** for the hero's AI-pipeline visualisation and **GSAP**
(`useGSAP` + ScrollTrigger) for scroll-telling.

## Design read

"Premium AI Engineer Dark Portfolio" — near-black charcoal base (`#0a0a0d`, never pure
black), two restrained accents (**electric blue** `#5b8def` primary, **violet** `#8b7cf6`
secondary), minimal glass on a handful of surfaces (nav, badges, cards), generous
whitespace, gradients used sparingly and only where they carry meaning (the primary CTA,
the surname in the hero, one glow behind the hero graph). Professional and
engineering-focused rather than flashy, inspired by developer-product sites (Vercel,
Linear) rather than agency-portfolio or dashboard defaults. Typeface is Geist (Vercel's
own), self-hosted.

Colour is used with intent, not decoration: blue is the brand colour (nav, links,
primary CTA, focus rings); violet appears alongside it in the gradient and on alternating
data points. Metrics live in exactly **one place** — the hero stat row — not repeated
section to section.

## Run it

```bash
npm install
npm run dev            # http://localhost:5173
```

```bash
npm run build          # type-check + production build -> dist/
npm run preview        # serve the build on http://localhost:4173
```

## Stack

- **React 18 + Vite + TypeScript**
- **GSAP 3 + @gsap/react** for motion. `useGSAP` handles cleanup; ScrollTrigger drives the
  hero intro timeline (badge pop, clip-wipe, character-scramble decode), the pinned
  Experience sticky-stack, the horizontal Work pan, the nav progress bar, the hero stat
  count-up, and two batched scroll entrances (`[data-reveal]` text, `[data-card]` tiles).
  Lenis provides inertial scroll, wired to `ScrollTrigger.update`.
- **three / @react-three/fiber** for the hero centrepiece: a small literal AI-pipeline
  graph (ingest, embed, retrieve, reason, generate, evaluate, serve, with an agentic
  feedback edge) with markers animating along each edge to read as live data flow.
  Isolated from the GSAP tree. Labels hide on mobile in favour of a compact abstract
  graph so nothing collides with page content.
- **@phosphor-icons/react** for UI glyphs; **simple-icons** for the brand logos in the
  Skills section (each tinted for the dark surface: a low-alpha wash of the real brand
  colour behind a brightened version of it). Never hand-rolled SVG.
- **Fonts self-hosted** via `@fontsource-variable/*`: Geist (display + body), Geist Mono
  (numbers, labels). No Google Fonts `<link>`.

## Structure

```
src/
  data/resume.ts              One typed source of truth for all content (no em-dashes)
  lib/
    gsap.ts                   Registers plugins once; shared gsap / ScrollTrigger exports
    useLenis.ts               Inertial scroll, synced to ScrollTrigger
    useReveal.ts              Two batched scroll-reveals: [data-reveal] text, [data-card] tiles
    useMagnetic.ts            Magnetic buttons via gsap.quickTo (no React state per frame)
  components/
    three/    ArchitectureGraph (hero AI-pipeline visual, data-flow pulses)
    layout/   Navbar (GSAP progress, two-tone logotype), Footer, Loader
    sections/ Hero (badge + gradient scramble + stat row), Marquee (glass pill ticker),
              About, Experience (pinned sticky-stack), Skills (curated icon tiles,
              simple-icons), Work (horizontal pan), Contact  -- each a distinct layout family
    ui/       SectionHeading, StatCounter
  styles/global.css           Tokens, glass utility, grain, reveal base state
public/
  favicon.svg                 Brand mark
  Siva-Motamarri-Resume.pdf   Linked from hero + contact
```

## Notes

- No photo is used. Tune the hero graph in `src/components/three/ArchitectureGraph.tsx`
  (`NODES`, `EDGES`).
- Every animation above `MOTION_INTENSITY 3` collapses to static under
  `prefers-reduced-motion` (Lenis, reveals, pinned sections, magnetic hover, marquee,
  stat count-up).
- One theme (dark), two accents used with intent, minimal glass, generous whitespace.
- Deploy: any static host. Framework preset "Vite", build `npm run build`, output `dist`.
