import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useStopStore } from '@/store/useStopStore';
import { useStopMultiplayer } from '../hooks/useStopMultiplayer';
import { database } from '@/lib/firebase';
import { ref, onValue, update } from 'firebase/database';
import { ThumbsUp, ThumbsDown, Loader2, CheckCircle } from 'lucide-react';
import { normalizeWord } from '../utils/normalize';

const CATEGORIES = [
  { id: 'nombre', label: 'Nombre' },
  { id: 'apellido', label: 'Apellido' },
  { id: 'animal', label: 'Animal' },
  { id: 'pais', label: 'País o Ciudad' },
  { id: 'color', label: 'Color' },
  { id: 'comida', label: 'Comida o Bebida' },
  { id: 'famoso', label: 'Famoso o Deportista' }
];

export function VotingScreen() {
  const { roomCode, isHost, playerName } = useStopStore();
  const { calculateScores } = useStopMultiplayer();

  const [groupedAnswers, setGroupedAnswers] = useState<Record<string, { word: string, normWord: string }[]>>({});
  const [votes, setVotes] = useState<Record<string, Record<string, number>>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!database || !roomCode) return;
    const roomRef = ref(database, `rooms/${roomCode}`);
    
    const unsubscribe = onValue(roomRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        
        // Procesar respuestas
        if (data.answers) {
          const newGrouped: Record<string, Map<string, string>> = {};
          CATEGORIES.forEach(c => newGrouped[c.id] = new Map());

          Object.values(data.answers).forEach((playerAnswers: any) => {
            Object.entries(playerAnswers).forEach(([catId, word]: [string, any]) => {
              const norm = normalizeWord(word);
              if (norm.length > 0) {
                // Mantenemos la palabra original bonita, pero indexamos por la normalizada
                if (!newGrouped[catId].has(norm)) {
                  newGrouped[catId].set(norm, word);
                }
              }
            });
          });

          const finalGrouped: Record<string, { word: string, normWord: string }[]> = {};
          CATEGORIES.forEach(c => {
            finalGrouped[c.id] = Array.from(newGrouped[c.id].entries()).map(([norm, word]) => ({
              normWord: norm,
              word: word as string
            }));
          });
          
          setGroupedAnswers(finalGrouped);
        }
        
        // Procesar votos
        if (data.votes) {
          setVotes(data.votes);
        }
        
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [roomCode]);

  const handleVote = async (categoryId: string, normWord: string, voteValue: number) => {
    if (!database || !roomCode || !playerName) return;
    const voteKey = `${categoryId}_${normWord}`;
    
    // Verificamos el voto existente de este jugador
    const existingVote = votes[voteKey]?.[playerName];
    
    // Si hace click en el que ya tiene, lo borra (toggle off)
    const finalValue = existingVote === voteValue ? null : voteValue;
    
    const updates = {
      [`rooms/${roomCode}/votes/${voteKey}/${playerName}`]: finalValue
    };
    await update(ref(database), updates);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-12">
        <Loader2 className="w-12 h-12 animate-spin text-emerald-500 mb-4" />
        <p className="text-muted-foreground font-medium text-xl">Recopilando respuestas...</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto space-y-8"
    >
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black text-emerald-500 uppercase tracking-widest">Fase de Votación</h2>
        <p className="text-muted-foreground">Vota si las palabras son válidas para la letra y categoría.</p>
      </div>

      <div className="space-y-6">
        {CATEGORIES.map(cat => {
          const words = groupedAnswers[cat.id] || [];
          if (words.length === 0) return null;

          return (
            <div key={cat.id} className="bg-card border border-border/50 rounded-2xl overflow-hidden shadow-md">
              <div className="bg-muted px-6 py-3 border-b border-border">
                <h3 className="font-bold text-foreground uppercase tracking-wider">{cat.label}</h3>
              </div>
              <div className="divide-y divide-border/30">
                {words.map(({ word, normWord }) => {
                  const voteKey = `${cat.id}_${normWord}`;
                  const currentVotesObj = votes[voteKey] || {};
                  const currentVoteSum = Object.values(currentVotesObj).reduce((acc: number, val: any) => acc + (val as number), 0);
                  const isApproved = currentVoteSum >= 0;
                  
                  // Saber si YO voté
                  const myVote = currentVotesObj[playerName] || 0;

                  return (
                    <div key={normWord} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 px-6 gap-4 hover:bg-muted/30 transition-colors">
                      <div className="flex items-center gap-3">
                        <span className="text-xl font-black text-foreground">{word}</span>
                        <div className={`px-2 py-0.5 rounded text-xs font-bold ${isApproved ? 'bg-emerald-500/20 text-emerald-500' : 'bg-red-500/20 text-red-500'}`}>
                          {isApproved ? 'Aprobada' : 'Rechazada'}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 bg-background border border-border rounded-xl p-1">
                        <button
                          onClick={() => handleVote(cat.id, normWord, 1)}
                          className={`p-2 rounded-lg transition-colors flex items-center gap-2 ${myVote === 1 ? 'bg-emerald-500 text-white' : 'hover:bg-emerald-500/20 text-emerald-500'}`}
                        >
                          <ThumbsUp className="w-5 h-5" />
                        </button>
                        <span className="font-bold text-lg min-w-[2ch] text-center">
                          {currentVoteSum > 0 ? `+${currentVoteSum}` : currentVoteSum}
                        </span>
                        <button
                          onClick={() => handleVote(cat.id, normWord, -1)}
                          className={`p-2 rounded-lg transition-colors flex items-center gap-2 ${myVote === -1 ? 'bg-red-500 text-white' : 'hover:bg-red-500/20 text-red-500'}`}
                        >
                          <ThumbsDown className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {isHost ? (
        <div className="sticky bottom-8 mt-8 flex justify-center">
          <button
            onClick={calculateScores}
            className="flex items-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-2xl text-xl font-black transition-all shadow-xl shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98]"
          >
            <CheckCircle className="w-6 h-6" />
            Finalizar Votación
          </button>
        </div>
      ) : (
        <div className="mt-8 flex justify-center">
          <div className="bg-muted/50 border border-border px-8 py-4 rounded-2xl flex items-center gap-3 text-muted-foreground font-medium">
            <Loader2 className="w-5 h-5 animate-spin" />
            Esperando a que el Host finalice la votación...
          </div>
        </div>
      )}
    </motion.div>
  );
}
