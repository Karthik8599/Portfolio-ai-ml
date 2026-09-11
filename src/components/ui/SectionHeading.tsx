type Props = {
  title: string;
  /** Rationed to <= 1 per 3 sections. Leave undefined for most sections. */
  eyebrow?: string;
  lead?: string;
  id?: string;
};

export function SectionHeading({ title, eyebrow, lead, id }: Props) {
  return (
    <header style={{ marginBottom: "clamp(44px, 8vw, 88px)" }}>
      {eyebrow && (
        <p className="eyebrow" data-reveal style={{ marginBottom: 18 }}>
          {eyebrow}
        </p>
      )}
      <h2 className="section-title" data-reveal id={id}>
        {title}
      </h2>
      {lead && (
        <p className="lead" data-reveal style={{ marginTop: 22 }}>
          {lead}
        </p>
      )}
    </header>
  );
}
