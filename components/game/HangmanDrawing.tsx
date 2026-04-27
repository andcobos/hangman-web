import { useMemo } from 'react';
import { motion } from 'framer-motion';

interface HangmanDrawingProps {
  wrongGuesses: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

const drawTransition = { duration: 0.6, ease: "easeInOut" as const };

const BaseGallows = (
  <g>
    {/* Base */}
    <motion.line x1="10" y1="250" x2="150" y2="250" stroke="currentColor" strokeWidth="10" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={drawTransition} />
    {/* Pillar */}
    <motion.line x1="80" y1="250" x2="80" y2="20" stroke="currentColor" strokeWidth="10" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={drawTransition} />
    {/* Top Beam */}
    <motion.line x1="75" y1="20" x2="200" y2="20" stroke="currentColor" strokeWidth="10" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={drawTransition} />
    {/* Rope */}
    <motion.line x1="200" y1="20" x2="200" y2="50" stroke="currentColor" strokeWidth="5" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={drawTransition} />
  </g>
);

const Head = (
  <motion.circle cx="200" cy="80" r="30" stroke="currentColor" strokeWidth="5" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={drawTransition} />
);

const Body = (
  <motion.line x1="200" y1="110" x2="200" y2="170" stroke="currentColor" strokeWidth="5" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={drawTransition} />
);

const Arms = (
  <g>
    <motion.line x1="200" y1="130" x2="160" y2="160" stroke="currentColor" strokeWidth="5" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={drawTransition} />
    <motion.line x1="200" y1="130" x2="240" y2="160" stroke="currentColor" strokeWidth="5" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={drawTransition} />
  </g>
);

const Legs = (
  <g>
    <motion.line x1="200" y1="170" x2="170" y2="220" stroke="currentColor" strokeWidth="5" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={drawTransition} />
    <motion.line x1="200" y1="170" x2="230" y2="220" stroke="currentColor" strokeWidth="5" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={drawTransition} />
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
    <motion.circle cx="190" cy="75" r="2" fill="currentColor" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={drawTransition} />
    <motion.circle cx="210" cy="75" r="2" fill="currentColor" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={drawTransition} />
    <motion.path d="M 190 95 Q 200 85 210 95" stroke="currentColor" strokeWidth="2" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={drawTransition} />
  </g>
);

const WorriedFace = (
  <g>
    <motion.line x1="185" y1="70" x2="195" y2="73" stroke="currentColor" strokeWidth="2" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={drawTransition} />
    <motion.line x1="215" y1="70" x2="205" y2="73" stroke="currentColor" strokeWidth="2" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={drawTransition} />
    <motion.circle cx="190" cy="80" r="2" fill="currentColor" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={drawTransition} />
    <motion.circle cx="210" cy="80" r="2" fill="currentColor" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={drawTransition} />
    <motion.circle cx="200" cy="95" r="3" fill="currentColor" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={drawTransition} />
  </g>
);

const Hair = (
  <motion.path d="M 175 70 C 180 50, 220 50, 225 70 M 180 60 C 190 45, 210 45, 220 60" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={drawTransition} />
);

const FireBelow = (
  <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={drawTransition}>
    {/* Convert paths to motion.path to also anim pathLength but then they animate infinitely bouncing */}
    <motion.g animate={{ y: [0, 5, 0] }} transition={{ duration: 0.5, repeat: Infinity }}>
      <motion.path d="M 170 250 Q 185 220 200 250 Q 215 220 230 250" stroke="#f0B12F" strokeWidth="6" fill="none" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={drawTransition} />
      <motion.path d="M 180 250 Q 200 200 220 250" stroke="#e13812" strokeWidth="6" fill="none" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={drawTransition} />
    </motion.g>
  </motion.g>
);

const EnvironmentDecor = (
  <g>
    {/* Sun */}
    <motion.circle cx="50" cy="50" r="15" fill="#facc15" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={drawTransition} />
    {/* Cloud */}
    <motion.path d="M 250 60 Q 260 40 280 50 Q 300 40 310 60 Z" fill="currentColor" opacity="0.2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={drawTransition} />
  </g>
);

export const HangmanDrawing = ({ wrongGuesses, difficulty }: HangmanDrawingProps) => {
  const parts = useMemo(() => {
    switch(difficulty) {
      case 'easy':
        // Max 4 errores
        return [BaseGallows, Head, LimbsTogether, FireBelow];
      case 'medium':
        // Max 6 errores
        return [BaseGallows, Head, <g key="body-arms">{Body}{Arms}</g>, Legs, SadFace, FireBelow];
      case 'hard':
        // Max 8 errores
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
