import { Link } from 'react-router-dom';
import type { SystemCard } from '../types/content';

type SystemCardGridProps = {
  cards: SystemCard[];
};

export function SystemCardGrid({ cards }: SystemCardGridProps) {
  return (
    <div className="system-card-grid">
      {cards.map((card) => (
        <Link key={card.path} to={card.path} className="system-card">
          <div className="system-card-head">
            <h2>{card.title}</h2>
            <span>{card.note}</span>
          </div>
          <p>{card.description}</p>
        </Link>
      ))}
    </div>
  );
}

