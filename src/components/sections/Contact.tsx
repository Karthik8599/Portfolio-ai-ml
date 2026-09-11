import { ArrowUpRight } from "@phosphor-icons/react";
import { useMagnetic } from "../../lib/useMagnetic";
import { profile } from "../../data/resume";
import "./Contact.css";

export function Contact() {
  const mailRef = useMagnetic<HTMLAnchorElement>(0.2);

  return (
    <section className="section contact" id="contact">
      <div className="container">
        <h2 className="contact__title" data-reveal>
          Let&rsquo;s build something <span className="accent-word accent-word--violet">intelligent</span>.
        </h2>

        <p className="lead contact__lead" data-reveal>
          Open to AI/ML engineering roles across Generative AI, agentic systems and production ML
          infrastructure. Email is the fastest way to reach me.
        </p>

        <div className="contact__actions" data-reveal>
          <a ref={mailRef} className="btn btn--primary contact__mail" href={`mailto:${profile.email}`}>
            {profile.contactCta}
            <span className="btn__icon" aria-hidden>
              <ArrowUpRight size={15} weight="bold" />
            </span>
          </a>
          <span className="contact__email mono">{profile.email}</span>
        </div>

        <ul className="contact__links" data-reveal>
          <li>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              {profile.linkedinLabel}
            </a>
          </li>
          <li>
            <a href={`tel:${profile.phone.replace(/[^\d+]/g, "")}`}>{profile.phone}</a>
          </li>
          <li>
            <a href={profile.resume} target="_blank" rel="noreferrer">
              Résumé (PDF)
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
