import { useRef } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { navLinks, profile } from "../../data/resume";
import { useGSAP, gsap, ScrollTrigger } from "../../lib/gsap";
import "./Navbar.css";

export function Navbar() {
  const header = useRef<HTMLElement>(null);
  const bar = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const setScale = gsap.quickSetter(bar.current, "scaleX");
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        setScale(self.progress);
        header.current?.classList.toggle("is-solid", self.scroll() > 48);
      },
    });
    return () => st.kill();
  });

  return (
    <header className="nav" ref={header}>
      <div className="nav__row container">
        <a href="#top" className="nav__brand">
          <span className="nav__mark" aria-hidden />
          {profile.firstName} <span className="nav__brand-accent">Motamarri</span>
        </a>

        <nav className="nav__links" aria-label="Sections">
          {navLinks.map((l) => (
            <a key={l.id} href={`#${l.id}`}>
              {l.label}
            </a>
          ))}
        </nav>

        <a className="btn btn--ghost nav__cta" href={`mailto:${profile.email}`}>
          {profile.contactCta}
          <span className="btn__icon" aria-hidden>
            <ArrowUpRight size={14} weight="bold" />
          </span>
        </a>
      </div>
      <span className="nav__progress" ref={bar} aria-hidden />
    </header>
  );
}
