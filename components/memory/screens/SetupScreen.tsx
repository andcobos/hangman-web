import { motion } from 'framer-motion';
import { Users, User, Gamepad2, Play, Cpu, Database, Cloud, Code, Monitor, Smartphone, Terminal, Wifi, Cat, Dog, Bird, Fish, Rabbit, Turtle, Snail, Bug } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useMemoryStore, GameMode, Theme, MemoryCard } from '@/store/useMemoryStore';

const THEMES: Record<Theme, LucideIcon[]> = {
  TECHNOLOGY: [Cpu, Database, Cloud, Code, Monitor, Smartphone, Terminal, Wifi],
  ANIMALS: [Cat, Dog, Bird, Fish, Rabbit, Turtle, Snail, Bug]
};

export function SetupScreen() {
  const { setMode, setTheme, setGridSize, startGame, mode, theme, gridSize } = useMemoryStore();

  const handleStart = () => {
    // Generate deck
    const iconSet = THEMES[theme];
    const pairsNeeded = gridSize / 2;
    const selectedIcons = iconSet.slice(0, pairsNeeded);
    
    // Create pairs
    const deck: MemoryCard[] = [...selectedIcons, ...selectedIcons].map((icon, index) => ({
      id: `${theme}-${index}`,
      icon,
      isFlipped: false,
      isMatched: false
    }));

    // Shuffle
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    startGame(deck);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-md w-full mx-auto space-y-8 bg-card p-8 rounded-3xl border border-border/50 shadow-2xl"
    >
      <div className="text-center space-y-2">
        <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Gamepad2 className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-3xl font-bold">Memory Match</h2>
        <p className="text-muted-foreground">Configura tu partida</p>
      </div>

      <div className="space-y-6">
        {/* Mode Selection */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Modo de Juego
          </label>
          <div className="grid grid-cols-2 gap-3">
            {(['SOLO', 'MULTI'] as GameMode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-all ${
                  mode === m
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border/50 hover:border-primary/50 text-muted-foreground hover:text-foreground'
                }`}
              >
                {m === 'SOLO' ? <User className="w-5 h-5" /> : <Users className="w-5 h-5" />}
                {m === 'SOLO' ? 'Solitario' : 'Multijugador'}
              </button>
            ))}
          </div>
        </div>

        {/* Size Selection */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Tamaño del Tablero
          </label>
          <div className="grid grid-cols-3 gap-3">
            {([8, 12, 16] as const).map((size) => (
              <button
                key={size}
                onClick={() => setGridSize(size)}
                className={`py-3 rounded-xl border-2 transition-all font-medium ${
                  gridSize === size
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border/50 hover:border-primary/50 text-muted-foreground hover:text-foreground'
                }`}
              >
                {size} Cartas
              </button>
            ))}
          </div>
        </div>

        {/* Theme Selection */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Temática
          </label>
          <div className="grid grid-cols-2 gap-3">
            {(['TECHNOLOGY', 'ANIMALS'] as Theme[]).map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`py-3 rounded-xl border-2 transition-all font-medium ${
                  theme === t
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border/50 hover:border-primary/50 text-muted-foreground hover:text-foreground'
                }`}
              >
                {t === 'TECHNOLOGY' ? 'Tecnología' : 'Animales'}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleStart}
          className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/20"
        >
          <Play className="w-5 h-5" />
          Comenzar Juego
        </button>
      </div>
    </motion.div>
  );
}
