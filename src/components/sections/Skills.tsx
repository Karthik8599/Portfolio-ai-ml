import { useRef, type CSSProperties } from "react";
import {
  siPython,
  siPytorch,
  siLanggraph,
  siHuggingface,
  siNvidia,
  siRay,
  siFastapi,
  siMlflow,
  siKubernetes,
  type SimpleIcon,
} from "simple-icons";
import { SectionHeading } from "../ui/SectionHeading";
import { flagshipSkills } from "../../data/resume";
import { gsap, useGSAP, ScrollTrigger, prefersReducedMotion } from "../../lib/gsap";
import "./Skills.css";

const ICONS: Record<string, SimpleIcon> = {
  siPython,
  siPytorch,
  siLanggraph,
  siHuggingface,
  siNvidia,
  siRay,
  siFastapi,
  siMlflow,
  siKubernetes,
};

export function Skills() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const tiles = gsap.utils.toArray<HTMLElement>(".skill-tile");
      gsap.set(tiles, { y: 30, opacity: 0, scale: 0.98 });
      gsap.set(".skill-tile__icon", { clipPath: "inset(0 0 100% 0)" });
      gsap.set(".skill-tile__text", { y: 8, opacity: 0 });

      const batch = ScrollTrigger.batch(".skill-tile", {
        start: "top 84%",
        once: true,
        onEnter: (els) =>
          (els as HTMLElement[]).forEach((el, i) => {
            const q = gsap.utils.selector(el);
            gsap
              .timeline({ delay: i * 0.07 })
              .to(el, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" })
              .to(
                q(".skill-tile__icon"),
                { clipPath: "inset(0 0 0% 0)", duration: 0.5, ease: "power2.out" },
                "-=0.28"
              )
              .to(
                q(".skill-tile__text"),
                { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
                "-=0.2"
              );
          }),
      });

      return () => batch.forEach((st) => st.kill());
    },
    { scope }
  );

  return (
    <section className="section skills" id="skills" ref={scope}>
      <div className="container">
        <SectionHeading
          title="The stack I have mastered"
          lead="Not a list of everything I have touched. These are the tools I reach for without thinking."
        />

        <div className="skills__grid">
          {flagshipSkills.map((s) => {
            const icon = ICONS[s.icon];
            const vars = { "--tile-bg": s.bg, "--tile-fg": s.fg } as CSSProperties;
            return (
              <article className="skill-tile" key={s.name} style={vars}>
                <span className="skill-tile__icon" aria-hidden>
                  <svg viewBox="0 0 24 24" role="img">
                    <path d={icon.path} fill="currentColor" />
                  </svg>
                </span>
                <div className="skill-tile__text">
                  <h3 className="skill-tile__name">{s.name}</h3>
                  <p className="skill-tile__note mono">{s.note}</p>
                </div>
                <span className="skill-tile__bar" aria-hidden />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
