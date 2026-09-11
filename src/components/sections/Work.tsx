import { useRef } from "react";
import { SectionHeading } from "../ui/SectionHeading";
import { projects } from "../../data/resume";
import { gsap, useGSAP, prefersReducedMotion } from "../../lib/gsap";
import "./Work.css";

export function Work() {
  const scope = useRef<HTMLElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !viewport.current || !track.current) return;

      const getDistance = () => track.current!.scrollWidth - window.innerWidth;

      gsap.to(track.current, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: viewport.current,
          start: "top top",
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // cards settle in as the section arrives, before the pan takes over
      gsap.from(".work__card", {
        y: 42,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: viewport.current, start: "top 78%", once: true },
      });
    },
    { scope }
  );

  return (
    <section className="section work" id="work" ref={scope}>
      <div className="container">
        <SectionHeading
          title="Systems built, measured, shipped"
          lead="Four production systems, each a real deployment with numbers attached."
        />
      </div>

      <div className="work__viewport" ref={viewport}>
        <div className="work__track" ref={track}>
          {projects.map((p, i) => (
            <article className="work__card" key={p.title}>
              <div className="work__card-top">
                <span className="work__num mono">{String(i + 1).padStart(2, "0")}</span>
                <span className="work__kind mono">{p.kind}</span>
              </div>
              <h3 className="work__title">{p.title}</h3>
              <p className="work__blurb">{p.blurb}</p>

              <dl className="work__metrics">
                {p.metrics.map((m) => (
                  <div key={m.label}>
                    <dt className="work__metric-v mono">{m.value}</dt>
                    <dd className="work__metric-l">{m.label}</dd>
                  </div>
                ))}
              </dl>

              <div className="work__tags">
                {p.tags.map((t) => (
                  <span className="chip" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
