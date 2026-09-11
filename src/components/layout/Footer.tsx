import { profile } from "../../data/resume";
import "./Footer.css";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__row">
        <span className="mono footer__name">
          {profile.name} / {new Date().getFullYear()}
        </span>
        <nav className="footer__links" aria-label="Elsewhere">
          <a href={`mailto:${profile.email}`}>{profile.contactCta}</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={profile.resume} target="_blank" rel="noreferrer">
            Résumé
          </a>
          <a href="#top">Top</a>
        </nav>
      </div>
    </footer>
  );
}
