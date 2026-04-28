import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStopStore } from '@/store/useStopStore';
import { useStopMultiplayer } from '../hooks/useStopMultiplayer';
import { Hand, Loader2 } from 'lucide-react';

const CATEGORIES = [
  { id: 'nombre', label: 'Nombre' },
  { id: 'apellido', label: 'Apellido' },
  { id: 'animal', label: 'Animal' },
  { id: 'pais', label: 'País o Ciudad' },
  { id: 'color', label: 'Color' },
  { id: 'comida', label: 'Comida o Bebida' },
  { id: 'famoso', label: 'Famoso o Deportista' }
];

export function GameScreen() {
  const { currentLetter, gameStatus } = useStopStore();
  const { triggerStop, submitAnswers } = useStopMultiplayer();

  const [answers, setAnswers] = useState<Record<string, string>>(
    CATEGORIES.reduce((acc, cat) => ({ ...acc, [cat.id]: '' }), {})
  );

  const [countdown, setCountdown] = useState(5);
  const submittedRef = useRef(false);

  // Check if all fields are filled with at least one non-whitespace character
  const allFilled = CATEGORIES.every((cat) => answers[cat.id].trim().length > 0);

  const handleStop = async () => {
    if (allFilled && gameStatus === 'PLAYING') {
      await triggerStop();
    }
  };

  // Manejo de la cuenta regresiva sincronizada
  useEffect(() => {
    if (gameStatus === 'COUNTDOWN') {
      // Reiniciar por si acaso (aunque de PLAYING a COUNTDOWN sucede una vez por ronda)
      setCountdown(5);
      submittedRef.current = false;
      
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [gameStatus]);

  // Enviar respuestas cuando el contador llega a 0
  useEffect(() => {
    if (gameStatus === 'COUNTDOWN' && countdown === 0 && !submittedRef.current) {
      submittedRef.current = true;
      submitAnswers(answers);
    }
  }, [countdown, gameStatus, submitAnswers, answers]);

  return (
    <div className="w-full max-w-4xl mx-auto relative flex flex-col items-center">
      
      {/* Cabecera con Letra */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full bg-card border border-border/50 rounded-3xl p-6 shadow-xl mb-8 flex flex-col md:flex-row items-center justify-between"
      >
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h2 className="text-muted-foreground font-bold uppercase tracking-widest text-sm mb-1">
            Letra Actual
          </h2>
          <div className="text-6xl md:text-8xl font-black text-emerald-500 drop-shadow-sm">
            {currentLetter || '?'}
          </div>
        </div>
        
        <button
          onClick={handleStop}
          disabled={!allFilled || gameStatus !== 'PLAYING'}
          className="w-full md:w-auto flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 disabled:bg-red-500/30 text-white px-8 py-4 md:py-6 rounded-2xl text-2xl md:text-3xl font-black transition-all shadow-lg shadow-red-500/20 disabled:shadow-none uppercase tracking-widest disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <Hand className="w-8 h-8 md:w-10 md:h-10" fill="currentColor" />
          ¡STOP!
        </button>
      </motion.div>

      {/* Tablero de Inputs */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8 relative"
      >
        {CATEGORIES.map((cat) => (
          <div key={cat.id} className="flex flex-col gap-2">
            <label className="text-sm font-bold text-foreground uppercase tracking-wider ml-2">
              {cat.label}
            </label>
            <input
              type="text"
              value={answers[cat.id]}
              onChange={(e) => setAnswers({ ...answers, [cat.id]: e.target.value })}
              disabled={gameStatus !== 'PLAYING'}
              placeholder={`Escribe con ${currentLetter || '...'}`}
              className="w-full bg-card border-2 border-border/50 focus:border-emerald-500 rounded-xl px-4 py-4 text-lg font-bold text-foreground focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed placeholder:font-normal placeholder:text-muted-foreground/40 shadow-sm"
            />
          </div>
        ))}
      </motion.div>

      {/* Modal / Overlay de Cuenta Regresiva */}
      <AnimatePresence>
        {gameStatus === 'COUNTDOWN' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md"
          >
            <div className="flex flex-col items-center justify-center p-8 bg-card border border-border shadow-2xl rounded-3xl max-w-sm w-full mx-4 text-center">
              <h2 className="text-3xl font-black text-red-500 uppercase tracking-widest mb-2 animate-bounce">
                ¡Alguien dijo STOP!
              </h2>
              <p className="text-muted-foreground font-medium mb-8">
                Lápices arriba. Enviando respuestas en...
              </p>
              
              <div className="text-8xl font-black text-foreground drop-shadow-md">
                {countdown}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
