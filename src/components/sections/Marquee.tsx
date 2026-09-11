import { marqueeSkills } from "../../data/resume";
import "./Marquee.css";

export function Marquee() {
  const row = [...marqueeSkills, ...marqueeSkills];
  return (
    <div className="marquee" aria-hidden>
      <div className="marquee__track">
        {row.map((s, i) => (
          <span key={i} className={`marquee__pill ${i % 2 ? "marquee__pill--violet" : ""}`}>
            <i className="marquee__dot" aria-hidden />
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
