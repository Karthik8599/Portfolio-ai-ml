import { profile } from "../../data/resume";
import "./About.css";

export function About() {
  return (
    <section className="section about" id="about">
      <div className="container">
        <div className="about__body">
          <p className="about__headline" data-reveal>
            {profile.headline}
          </p>
          <p className="about__summary lead" data-reveal>
            {profile.summary}
          </p>
        </div>
      </div>
    </section>
  );
}
