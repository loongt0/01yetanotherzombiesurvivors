type SectionTitleProps = {
  eyebrow: string;
  title: string;
};

export function SectionTitle({eyebrow, title}: SectionTitleProps) {
  return (
    <div className="section-title">
      <div className="kicker">{eyebrow}</div>
      <h2>{title}</h2>
      <div className="deco" aria-hidden="true">
        <span />
      </div>
    </div>
  );
}
