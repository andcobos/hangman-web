import { useMemoryStore } from '@/store/useMemoryStore';
import { Card } from './Card';

export function Board() {
  const { cards, gridSize, flipCard } = useMemoryStore();

  const getGridCols = () => {
    switch (gridSize) {
      case 8:
        return 'grid-cols-4'; // 4x2
      case 12:
        return 'grid-cols-3 sm:grid-cols-4'; // 3x4 on mobile, 4x3 on desktop
      case 16:
        return 'grid-cols-4'; // 4x4
      default:
        return 'grid-cols-4';
    }
  };

  return (
    <div className={`grid ${getGridCols()} gap-3 sm:gap-4 w-full max-w-2xl mx-auto`}>
      {cards.map((card, index) => (
        <Card
          key={card.id}
          id={card.id}
          icon={card.icon}
          isFlipped={card.isFlipped}
          isMatched={card.isMatched}
          onClick={() => flipCard(index)}
        />
      ))}
    </div>
  );
}
