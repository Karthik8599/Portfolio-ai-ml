import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger, prefersReducedMotion } from "../../lib/gsap";

type Props = {
  value: number;
  suffix?: string;
};

/**
 * Counts up from 0 to `value` the first time it scrolls into view.
 * GSAP tween on a plain object, no React state per frame.
 */
export function StatCounter({ value, suffix = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (prefersReducedMotion()) {
        el.textContent = `${value}${suffix}`;
        return;
      }

      const obj = { n: 0 };
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        once: true,
        onEnter: () =>
          gsap.to(obj, {
            n: value,
            duration: 1.4,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = `${Math.round(obj.n)}${suffix}`;
            },
          }),
      });
      return () => st.kill();
    },
    { dependencies: [value, suffix], scope: ref }
  );

  return (
    <span ref={ref} className="mono">
      0{suffix}
    </span>
  );
}
