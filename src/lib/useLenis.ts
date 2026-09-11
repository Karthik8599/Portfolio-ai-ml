import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "./gsap";

/**
 * Inertial smooth scrolling, driven by GSAP's ticker and kept in sync with
 * ScrollTrigger (per the gsap-scrolltrigger skill: notify ScrollTrigger.update
 * whenever a third-party scroller moves). Bails out entirely under
 * prefers-reduced-motion so scroll stays native and instant.
 *
 * Returns nothing; mount once near the app root.
 */
export function useLenis() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // anchor links drive Lenis
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement)?.closest<HTMLAnchorElement>("a[href^='#']");
      const id = link?.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -72 });
    };
    document.addEventListener("click", onClick);

    // recalc trigger positions once fonts have settled
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);
}
