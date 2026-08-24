type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageHero({eyebrow, title, description}: PageHeroProps) {
  return (
    <header className="page-hero">
      <div className="page-hero__glow" aria-hidden="true" />
      <div className="noise" aria-hidden="true" />
      <div className="page-hero__content">
        <div className="page-hero__eyebrow">
          <span className="diamond-bullet" aria-hidden="true" />
          {eyebrow}
          <span className="diamond-bullet" aria-hidden="true" />
        </div>
        <h1 className="text-gradient">{title}</h1>
        <p>{description}</p>
        <div className="ornament" aria-hidden="true">
          <span className="diamond" />
        </div>
      </div>
    </header>
  );
}
