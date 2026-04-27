import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/store/useGameStore';
import { cn } from '@/lib/utils';
import { SmartphoneNfc } from 'lucide-react';

export const TransitionScreen = () => {
  const { setGameState, settings, currentTurn, playerNames } = useGameStore();
  const [phase, setPhase] = useState<'pass' | 'ready' | 'go'>('pass');

  const guesserName = currentTurn === 'red' ? playerNames.red : playerNames.blue;
  const guesserColor = currentTurn === 'red' ? 'text-red-500' : 'text-blue-500';

  useEffect(() => {
    if (settings.mode === 'solo') {
      setPhase('ready');
      setTimeout(() => setPhase('go'), 800);
      setTimeout(() => setGameState('playing'), 1500);
      return;
    }

    // Multiplayer sequence
    const timers = [
      setTimeout(() => setPhase('ready'), 2500),
      setTimeout(() => setPhase('go'), 3500),
      setTimeout(() => setGameState('playing'), 4500)
    ];

    return () => timers.forEach(clearTimeout);
  }, [settings.mode, setGameState]);

  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-[80vh] w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {settings.mode === 'multiplayer' && phase === 'pass' && (
        <motion.div 
          className="text-center space-y-6"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
        >
          <div className="flex justify-center mb-8">
            <motion.div
              animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
            >
              <SmartphoneNfc size={80} className="text-zinc-600 dark:text-zinc-400" />
            </motion.div>
          </div>
          <h2 className="text-3xl font-bold">Pasa el dispositivo</h2>
          <p className="text-xl text-muted-foreground">
            Es el turno de adivinar para: <br/> 
            <span className={cn("font-extrabold text-3xl block mt-4", guesserColor)}>
              {guesserName}
            </span>
          </p>
        </motion.div>
      )}

      {phase === 'ready' && (
        <motion.h2 
          className="text-5xl md:text-7xl font-black text-indigo-500"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          ¿Listo?
        </motion.h2>
      )}

      {phase === 'go' && (
        <motion.h2 
          className="text-6xl md:text-8xl font-black text-green-500"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1.2, opacity: 1 }}
        >
          ¡YA!
        </motion.h2>
      )}
    </motion.div>
  );
};
