import type { ReactNode } from 'react';

type PageTitleProps = {
  eyebrow?: string;
  title: string;
  description: string;
  aside?: ReactNode;
};

export function PageTitle({ eyebrow, title, description, aside }: PageTitleProps) {
  return (
    <section className="page-title">
      <div>
        {eyebrow ? <p className="page-title-eyebrow">{eyebrow}</p> : null}
        <h1>{title}</h1>
        <p className="page-title-description">{description}</p>
      </div>
      {aside ? <div className="page-title-aside">{aside}</div> : null}
    </section>
  );
}

