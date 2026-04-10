import type { ReactNode } from 'react';

type SectionCardProps = {
  title: string;
  children: ReactNode;
  description?: string;
};

export function SectionCard({ title, description, children }: SectionCardProps) {
  return (
    <section className="section-card">
      <div className="section-card-header">
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
      <div className="section-card-body">{children}</div>
    </section>
  );
}

