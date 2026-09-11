/**
 * Central GSAP setup. Import { gsap, ScrollTrigger } from here so plugins are
 * registered exactly once (per gsap-react + gsap-scrolltrigger skills).
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Site-wide default so nothing uses linear / ease-in-out by reflex.
gsap.defaults({ ease: "power3.out", duration: 0.6 });

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export { gsap, ScrollTrigger, useGSAP };
