import { useRef } from "react";
import { SectionHeading } from "../ui/SectionHeading";
import { experience } from "../../data/resume";
import { gsap, useGSAP, ScrollTrigger, prefersReducedMotion } from "../../lib/gsap";
import "./Experience.css";

export function Experience() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const cards = gsap.utils.toArray<HTMLElement>(".exp-card");
      if (cards.length < 2) return;
      const last = cards[cards.length - 1];

      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;

        ScrollTrigger.create({
          trigger: card,
          start: "top top",
          endTrigger: last,
          end: "top top",
          pin: true,
          pinSpacing: false,
        });

        gsap.to(card, {
          scale: 0.965,
          opacity: 0.55,
          ease: "none",
          scrollTrigger: {
            trigger: cards[i + 1],
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        });
      });
    },
    { scope }
  );

  return (
    <section className="section experience" id="experience" ref={scope}>
      <div className="container">
        <SectionHeading
          title="Five years shipping AI in production"
          lead="From data pipelines at Accenture to enterprise RAG at Adobe to multi-agent infrastructure at Scale AI. Each role scaled the systems and the impact."
        />
      </div>

      <div className="exp-stack">
        {experience.map((job) => (
          <div className="exp-card" key={job.company}>
            <div className="container">
              <article className="exp-card__inner">
                <div className="exp-card__head">
                  <div>
                    <h3 className="exp-card__company">{job.company}</h3>
                    <p className="exp-card__role mono">
                      {job.role}, {job.location}
                    </p>
                  </div>
                  <span className="exp-card__period mono">{job.period}</span>
                </div>

                <p className="exp-card__summary">{job.summary}</p>

                <ul className="exp-card__list">
                  {job.highlights.slice(0, 4).map((h, j) => (
                    <li key={j}>{h}</li>
                  ))}
                </ul>

                <div className="exp-card__stack">
                  {job.stack.map((s) => (
                    <span className="chip" key={s}>
                      {s}
                    </span>
                  ))}
                </div>
              </article>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
