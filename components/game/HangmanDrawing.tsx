import { useMemo } from 'react';
import { motion } from 'framer-motion';

interface HangmanDrawingProps {
  wrongGuesses: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

const BaseGallows = (
  <g>
    {/* Base */}
    <motion.line x1="10" y1="250" x2="150" y2="250" stroke="currentColor" strokeWidth="10" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5 }} />
    {/* Pillar */}
    <motion.line x1="80" y1="250" x2="80" y2="20" stroke="currentColor" strokeWidth="10" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.2 }} />
    {/* Top Beam */}
    <motion.line x1="75" y1="20" x2="200" y2="20" stroke="currentColor" strokeWidth="10" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.4 }} />
    {/* Rope */}
    <motion.line x1="200" y1="20" x2="200" y2="50" stroke="currentColor" strokeWidth="5" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.6 }} />
  </g>
);

const Head = (
  <motion.circle cx="200" cy="80" r="30" stroke="currentColor" strokeWidth="5" fill="none" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 200, damping: 10 }} />
);

const Body = (
  <motion.line x1="200" y1="110" x2="200" y2="170" stroke="currentColor" strokeWidth="5" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3 }} />
);

const Arms = (
  <g>
    <motion.line x1="200" y1="130" x2="160" y2="160" stroke="currentColor" strokeWidth="5" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3 }} />
    <motion.line x1="200" y1="130" x2="240" y2="160" stroke="currentColor" strokeWidth="5" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3 }} />
  </g>
);

const Legs = (
  <g>
    <motion.line x1="200" y1="170" x2="170" y2="220" stroke="currentColor" strokeWidth="5" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3 }} />
    <motion.line x1="200" y1="170" x2="230" y2="220" stroke="currentColor" strokeWidth="5" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3 }} />
  </g>
);

const LimbsTogether = (
  <g>
    {Body}
    {Arms}
    {Legs}
  </g>
);

const SadFace = (
  <g>
    <motion.circle cx="190" cy="75" r="2" fill="currentColor" initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
    <motion.circle cx="210" cy="75" r="2" fill="currentColor" initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
    <motion.path d="M 190 95 Q 200 85 210 95" stroke="currentColor" strokeWidth="2" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />
  </g>
);

const WorriedFace = (
  <g>
    <motion.line x1="185" y1="70" x2="195" y2="73" stroke="currentColor" strokeWidth="2" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />
    <motion.line x1="215" y1="70" x2="205" y2="73" stroke="currentColor" strokeWidth="2" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />
    <motion.circle cx="190" cy="80" r="2" fill="currentColor" initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
    <motion.circle cx="210" cy="80" r="2" fill="currentColor" initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
    <motion.circle cx="200" cy="95" r="3" fill="currentColor" initial={{ scale: 0 }} animate={{ scale: 1 }} />
  </g>
);

const Hair = (
  <motion.path d="M 175 70 C 180 50, 220 50, 225 70 M 180 60 C 190 45, 210 45, 220 60" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />
);

const FireBelow = (
  <motion.g initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}>
    <path d="M 170 250 Q 185 220 200 250 Q 215 220 230 250" stroke="#f0B12F" strokeWidth="6" fill="none" strokeLinecap="round" />
    <path d="M 180 250 Q 200 200 220 250" stroke="#e13812" strokeWidth="6" fill="none" strokeLinecap="round" />
  </motion.g>
);

const EnvironmentDecor = (
  <g>
    {/* Sun */}
    <motion.circle cx="50" cy="50" r="15" fill="#facc15" initial={{ scale: 0 }} animate={{ scale: 1 }} />
    {/* Cloud */}
    <motion.path d="M 250 60 Q 260 40 280 50 Q 300 40 310 60 Z" fill="currentColor" opacity="0.2" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 0.2 }} transition={{ duration: 1 }}/>
  </g>
);

export const HangmanDrawing = ({ wrongGuesses, difficulty }: HangmanDrawingProps) => {
  const parts = useMemo(() => {
    switch(difficulty) {
      case 'easy':
        // Max 4 errores: 1: Palo, 2: Cabeza, 3: Extremidades, 4: Fuego
        return [BaseGallows, Head, LimbsTogether, FireBelow];
      case 'medium':
        // Max 6 errores: 1: Palo, 2: Cabeza, 3: Brazos, 4: Piernas, 5: Cara triste, 6: Fuego
        return [BaseGallows, Head, <g key="body-arms">{Body}{Arms}</g>, Legs, SadFace, FireBelow];
      case 'hard':
        // Max 8 errores: 1: Palo, 2: Cabeza, 3: Brazos, 4: Piernas, 5: Cabello, 6: Cara preocupada, 7: Nubes/Sol, 8: Fuego
        return [BaseGallows, Head, <g key="body-arms">{Body}{Arms}</g>, Legs, Hair, WorriedFace, EnvironmentDecor, FireBelow];
      default:
        return [BaseGallows, Head, LimbsTogether, FireBelow];
    }
  }, [difficulty]);

  return (
    <div className="relative w-full max-w-sm aspect-[4/3] flex items-center justify-center pointer-events-none drop-shadow-xl text-foreground">
      <svg viewBox="0 0 350 260" className="w-full h-full">
        {parts.slice(0, wrongGuesses).map((Part, i) => (
          <g key={i}>{Part}</g>
        ))}
      </svg>
    </div>
  );
};
