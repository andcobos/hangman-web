import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';
import type { ElementType } from 'react';

interface CardProps {
  id: string;
  icon: ElementType;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
}

export function Card({ id, icon: Icon, isFlipped, isMatched, onClick }: CardProps) {
  return (
    <div
      className={`relative w-full aspect-square cursor-pointer transition-transform duration-200 hover:scale-105 ${
        isMatched ? 'opacity-80' : ''
      }`}
      onClick={onClick}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        className="w-full h-full relative"
        initial={false}
        animate={{ rotateY: isFlipped || isMatched ? 180 : 0 }}
        transition={{ duration: 0.4, type: 'spring', stiffness: 260, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Back of Card (Face Down) */}
        <div
          className="absolute inset-0 w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg border-2 border-indigo-400 flex items-center justify-center"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <Brain className="w-1/3 h-1/3 text-white/50" />
        </div>

        {/* Front of Card (Face Up) */}
        <div
          className="absolute inset-0 w-full h-full bg-card rounded-xl shadow-lg border-2 border-primary flex items-center justify-center"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <Icon className="w-1/2 h-1/2 text-primary" />
        </div>
      </motion.div>
    </div>

  );
}
