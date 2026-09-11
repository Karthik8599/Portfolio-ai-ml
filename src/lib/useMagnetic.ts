import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "./gsap";

/**
 * Magnetic hover: the element leans toward the cursor while it is near, then
 * springs back on leave. Uses gsap.quickTo (per gsap-performance skill) so a
 * single reused tween drives the frequently-updated x/y, never React state.
 * No-ops on coarse pointers and under reduced motion.
 */
export function useMagnetic<T extends HTMLElement>(strength = 0.3) {
  const ref = useRef<T | null>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (prefersReducedMotion()) return;
      if (window.matchMedia("(pointer: coarse)").matches) return;

      const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });

      const onMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * strength);
        yTo((e.clientY - (r.top + r.height / 2)) * strength);
      };
      const onLeave = () => {
        xTo(0);
        yTo(0);
      };

      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      return () => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      };
    },
    { dependencies: [strength] }
  );

  return ref;
}
