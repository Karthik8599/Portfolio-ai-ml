import { useGSAP, gsap, ScrollTrigger, prefersReducedMotion } from "./gsap";

/**
 * Page-wide scroll entrances, batched so neighbours stagger together
 * (gsap-scrolltrigger: ScrollTrigger.batch).
 *
 *   [data-reveal]  text blocks: gentle fade + 18px rise
 *   [data-card]    cards / tiles: fade + 26px rise + slight scale settle
 *
 * Call once near the app root.
 */
export function useReveal() {
  useGSAP(() => {
    if (prefersReducedMotion()) return;

    document.documentElement.classList.add("reveal-ready");

    const text = ScrollTrigger.batch("[data-reveal]", {
      start: "top 88%",
      once: true,
      onEnter: (els) =>
        gsap.to(els, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.08,
          overwrite: true,
        }),
    });

    const cards = ScrollTrigger.batch("[data-card]", {
      start: "top 85%",
      once: true,
      onEnter: (els) =>
        gsap.to(els, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          overwrite: true,
        }),
    });

    return () => {
      [...text, ...cards].forEach((st) => st.kill());
      document.documentElement.classList.remove("reveal-ready");
    };
  });
}
