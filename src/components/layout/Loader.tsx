import { useEffect, useRef, useState } from "react";
import { gsap } from "../../lib/gsap";
import "./Loader.css";

type Props = { ready: boolean };

export function Loader({ ready }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => {
        const ceiling = ready ? 100 : 90;
        if (c >= ceiling) return c;
        return Math.min(ceiling, c + Math.random() * 9 + 3);
      });
    }, 100);
    return () => clearInterval(id);
  }, [ready]);

  useEffect(() => {
    if (count < 100 || !root.current) return;
    const tw = gsap.to(root.current, {
      autoAlpha: 0,
      duration: 0.6,
      ease: "power2.inOut",
      delay: 0.25,
      onComplete: () => setGone(true),
    });
    return () => {
      tw.kill();
    };
  }, [count]);

  if (gone) return null;

  return (
    <div className="loader" ref={root}>
      <div className="loader__inner">
        <span className="loader__label mono">Compiling scene</span>
        <div className="loader__bar">
          <span className="loader__fill" style={{ width: `${count}%` }} />
        </div>
        <span className="loader__pct mono">{String(Math.floor(count)).padStart(3, "0")}</span>
      </div>
    </div>
  );
}
