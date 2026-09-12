import { Fragment, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ArrowUpRight } from "@phosphor-icons/react";
import { ArchitectureGraph } from "../three/ArchitectureGraph";
import { StatCounter } from "../ui/StatCounter";
import { profile, stats } from "../../data/resume";
import { useMagnetic } from "../../lib/useMagnetic";
import { gsap, useGSAP, prefersReducedMotion } from "../../lib/gsap";
import "./Hero.css";

type Props = { onSceneReady: () => void };

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%$&*/<>";
const LAST = "Motamarri";

// The side-by-side split only has room above ~900px; below that the hero
// stacks (compact graph panel on top, content below, see Hero.css), so
// "tablet" and "mobile" both need the compact treatment, just at different
// sizes within it.
function useViewportKind() {
  const classify = () =>
    window.innerWidth > 900 ? "desktop" : window.innerWidth > 640 ? "tablet" : "mobile";

  const [kind, setKind] = useState<"desktop" | "tablet" | "mobile">(
    typeof window === "undefined" ? "desktop" : classify()
  );
  useEffect(() => {
    const on = () => setKind(classify());
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);
  return kind;
}

export function Hero({ onSceneReady }: Props) {
  const scope = useRef<HTMLElement>(null);
  const lastRef = useRef<HTMLSpanElement>(null);
  const primaryRef = useMagnetic<HTMLAnchorElement>(0.22);
  const ghostRef = useMagnetic<HTMLAnchorElement>(0.22);
  const onReady = useCallback(() => onSceneReady(), [onSceneReady]);
  const vp = useViewportKind();

  // desktop: asymmetric split, graph offset right. tablet/mobile: both use
  // the compact stacked panel (see Hero.css), just centred with different scale.
  const rig: [number, number, number] =
    vp === "desktop" ? [3.0, -0.1, 0] : vp === "tablet" ? [0, 0.35, 0] : [0, 0.5, 0];
  const rigScale = vp === "mobile" ? 0.66 : vp === "tablet" ? 0.85 : 1.05;

  useGSAP(
    () => {
      const last = lastRef.current;
      if (prefersReducedMotion()) {
        if (last) last.textContent = LAST;
        return;
      }

      gsap.set(".hero__badge", { opacity: 0, y: 14, scale: 0.96 });
      gsap.set(".hero__word--wipe", { clipPath: "inset(0 100% 0 0)" });
      gsap.set(".hero__sub .l", { yPercent: 60, opacity: 0 });
      gsap.set("[data-hero='cta']", { y: 14, opacity: 0 });
      gsap.set("[data-hero='stats']", { y: 20, opacity: 0 });
      if (last) last.textContent = "";

      const tl = gsap.timeline({ delay: 0.2 });

      tl.to(".hero__badge", { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: "back.out(1.7)" }).to(
        ".hero__word--wipe",
        { clipPath: "inset(0 0% 0 0)", duration: 0.7, ease: "power4.inOut" },
        "-=0.25"
      );

      if (last) {
        const state = { p: 0 };
        tl.to(
          state,
          {
            p: 1,
            duration: 1,
            ease: "power2.out",
            onUpdate: () => {
              let out = "";
              for (let i = 0; i < LAST.length; i++) {
                if (state.p >= (i + 0.6) / LAST.length) out += LAST[i];
                else out += GLYPHS[(Math.random() * GLYPHS.length) | 0];
              }
              last.textContent = out;
            },
            onComplete: () => {
              last.textContent = LAST;
            },
          },
          "-=0.45"
        );
      }

      tl.to(".hero__sub .l", { yPercent: 0, opacity: 1, duration: 0.6, stagger: 0.1 }, "-=0.7")
        .to("[data-hero='cta']", { y: 0, opacity: 1, duration: 0.6 }, "-=0.4")
        .to("[data-hero='stats']", { y: 0, opacity: 1, duration: 0.6 }, "-=0.35");
    },
    { scope }
  );

  return (
    <section className="hero" id="top" ref={scope}>
      <div className="hero__ambient" aria-hidden />

      <div className="hero__canvas" aria-hidden>
        <Canvas
          camera={{ position: [0, 0, 9], fov: 40 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        >
          <Suspense fallback={null}>
            <group position={rig} scale={rigScale}>
              <ArchitectureGraph onReady={onReady} labels={vp === "desktop"} />
            </group>
          </Suspense>
        </Canvas>
      </div>

      <div className="hero__veil" aria-hidden />

      <div className="container hero__content">
        <div className="hero__badge glass" data-hero="badge">
          <i className="hero__badge-dot" aria-hidden />
          Open to AI/ML Engineer roles
        </div>

        <h1 className="hero__title">
          <span className="line">
            <span className="hero__word--wipe">{profile.firstName}</span>
          </span>
          <span className="line">
            <span className="hero__word--scramble" ref={lastRef}>
              {LAST}
            </span>
          </span>
        </h1>

        <p className="hero__sub">
          <span className="l">Five years building Generative AI</span>
          <span className="l">and agentic systems, plus the</span>
          <span className="l">infrastructure that serves them.</span>
        </p>

        <div className="hero__cta" data-hero="cta">
          <a ref={primaryRef} className="btn btn--primary" href="#work">
            See the work
            <span className="btn__icon" aria-hidden>
              <ArrowUpRight size={14} weight="bold" />
            </span>
          </a>
          <a
            ref={ghostRef}
            className="btn btn--ghost"
            href={profile.resume}
            target="_blank"
            rel="noreferrer"
          >
            Résumé
            <span className="btn__icon" aria-hidden>
              <ArrowUpRight size={14} weight="bold" />
            </span>
          </a>
        </div>

        <div className="hero__stats glass" data-hero="stats">
          {stats.map((s, i) => (
            <Fragment key={s.label}>
              {i > 0 && <span className="hero__stat-div" aria-hidden />}
              <div className="hero__stat">
                <span className={`hero__stat-v ${i === 1 ? "hero__stat-v--violet" : ""}`}>
                  <StatCounter value={s.value} suffix={s.suffix} />
                </span>
                <span className="hero__stat-l">{s.label}</span>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
