import { useEffect, useCallback } from 'react';
import { database } from '@/lib/firebase';
import { ref, set, get, onValue, remove, child, onDisconnect, update } from 'firebase/database';
import { useStopStore } from '@/store/useStopStore';

export function useStopMultiplayer() {
  const { 
    playerName, 
    roomCode, 
    setRoomCode, 
    setIsHost, 
    setGameStatus, 
    setCurrentLetter,
    setPlayers,
    resetStore
  } = useStopStore();

  const generateCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const createRoom = useCallback(async (hostName: string) => {
    if (!database) {
      console.error("Firebase DB not initialized");
      return;
    }
    const code = generateCode();
    const playerId = 'host_' + Date.now();
    const roomRef = ref(database, `rooms/${code}`);
    
    // Crear la sala y añadir el host dentro del nodo players
    await set(roomRef, {
      status: 'WAITING_ROOM',
      players: {
        [playerId]: { name: hostName, isHost: true }
      }
    });

    const playerRef = ref(database, `rooms/${code}/players/${playerId}`);
    onDisconnect(playerRef).remove();

    // Actualizamos el store INMEDIATAMENTE después de la escritura exitosa
    sessionStorage.setItem('stop_player_id', playerId);
    setRoomCode(code);
    setIsHost(true);
    setGameStatus('WAITING_ROOM');
  }, [setRoomCode, setIsHost, setGameStatus]);

  const joinRoom = useCallback(async (code: string, joinerName: string) => {
    if (!database) return { success: false, error: 'DB_ERROR' };
    
    const upperCode = code.toUpperCase();
    const roomRef = ref(database, `rooms/${upperCode}`);
    const snapshot = await get(roomRef);

    if (snapshot.exists()) {
      const roomData = snapshot.val();
      if (roomData.status !== 'WAITING_ROOM') {
        return { success: false, error: 'ROOM_NOT_WAITING' };
      }

      const playerId = 'player_' + Date.now();
      const playerRef = ref(database, `rooms/${upperCode}/players/${playerId}`);
      
      await set(playerRef, { name: joinerName, isHost: false });
      onDisconnect(playerRef).remove();

      sessionStorage.setItem('stop_player_id', playerId);
      setRoomCode(upperCode);
      setIsHost(false);
      setGameStatus('WAITING_ROOM');
      return { success: true };
    } else {
      return { success: false, error: 'ROOM_NOT_FOUND' };
    }
  }, [setRoomCode, setIsHost, setGameStatus]);

  const leaveRoom = useCallback(async () => {
    if (!database || !roomCode) {
      resetStore();
      return;
    }
    
    const playerId = sessionStorage.getItem('stop_player_id');
    if (playerId) {
      const playerRef = ref(database, `rooms/${roomCode}/players/${playerId}`);
      await remove(playerRef);
      sessionStorage.removeItem('stop_player_id');
    }
    
    resetStore();
  }, [roomCode, resetStore]);

  const startGame = useCallback(async () => {
    if (!database || !roomCode) return;
    
    // Generar letra aleatoria excluyendo letras complicadas
    const alphabet = 'ABCDEFGHIJLMNOPQRSTUV'; // Excluimos K, W, X, Y, Z
    const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];

    const roomRef = ref(database, `rooms/${roomCode}`);
    await update(roomRef, {
      status: 'PLAYING',
      currentLetter: randomLetter,
      answers: null, // Reiniciamos respuestas de rondas previas si las hay
      stoppedBy: null
    });
  }, [roomCode]);

  const triggerStop = useCallback(async () => {
    if (!database || !roomCode || !playerName) return;
    const roomRef = ref(database, `rooms/${roomCode}`);
    await update(roomRef, {
      status: 'COUNTDOWN',
      stoppedBy: playerName
    });
  }, [roomCode, playerName]);

  const submitAnswers = useCallback(async (answers: Record<string, string>) => {
    if (!database || !roomCode) return;
    const playerId = sessionStorage.getItem('stop_player_id');
    if (!playerId) return;

    const answersRef = ref(database, `rooms/${roomCode}/answers/${playerId}`);
    await set(answersRef, answers);

    // Si es el host, cambia a VOTING después de enviar sus respuestas
    const { isHost } = useStopStore.getState();
    if (isHost) {
      const statusRef = ref(database, `rooms/${roomCode}/status`);
      await set(statusRef, 'VOTING');
    }
  }, [roomCode]);

  const calculateScores = useCallback(async () => {
    if (!database || !roomCode) return;
    
    const roomRef = ref(database, `rooms/${roomCode}`);
    const snapshot = await get(roomRef);
    if (!snapshot.exists()) return;
    
    const data = snapshot.val();
    const answers = data.answers || {}; // { playerId: { category: answer, ... } }
    const votes = data.votes || {}; // { "category_normalizedWord": sum }
    const playersData = data.players || {}; // { playerId: { name, score, ... } }
    
    const categoryWordCounts: Record<string, number> = {};
    const playerScores: Record<string, number> = {};
    
    // Lazy import para evitar dependencias circulares si acaso
    const { normalizeWord } = await import('../utils/normalize');
    
    // Agrupar y contar palabras normalizadas
    Object.entries(answers as Record<string, Record<string, string>>).forEach(([playerId, playerAnswers]) => {
      Object.entries(playerAnswers).forEach(([cat, word]) => {
        const normWord = normalizeWord(word);
        if (normWord) {
          const key = `${cat}_${normWord}`;
          categoryWordCounts[key] = (categoryWordCounts[key] || 0) + 1;
        }
      });
      playerScores[playerId] = playersData[playerId]?.score || 0;
    });
    
    // Calcular puntaje por jugador
    Object.entries(answers as Record<string, Record<string, string>>).forEach(([playerId, playerAnswers]) => {
      let roundScore = 0;
      Object.entries(playerAnswers).forEach(([cat, word]) => {
        const normWord = normalizeWord(word);
        if (normWord) {
          const key = `${cat}_${normWord}`;
          const wordVotesObj = votes[key] || {};
          const voteScore = Object.values(wordVotesObj).reduce((acc: number, val: any) => acc + (val as number), 0);
          
          if (voteScore >= 0) { // Aprobada (beneficia al jugador en empate 0)
            if (categoryWordCounts[key] === 1) {
              roundScore += 2; // Única original
            } else if (categoryWordCounts[key] > 1) {
              roundScore += 1; // Repetida
            }
          }
        }
      });
      playerScores[playerId] += roundScore;
    });
    
    // Actualizar Firebase
    const updates: Record<string, any> = {};
    Object.keys(playerScores).forEach(playerId => {
      updates[`players/${playerId}/score`] = playerScores[playerId];
    });
    updates['status'] = 'RESULTS';
    
    await update(roomRef, updates);
  }, [roomCode]);

  const nextRound = useCallback(async () => {
    if (!database || !roomCode) return;
    
    const alphabet = 'ABCDEFGHIJLMNOPQRSTUV';
    const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];

    const roomRef = ref(database, `rooms/${roomCode}`);
    await update(roomRef, {
      status: 'PLAYING',
      currentLetter: randomLetter,
      answers: null,
      votes: null,
      stoppedBy: null
    });
  }, [roomCode]);

  const endGame = useCallback(async () => {
    if (!database || !roomCode) return;
    const roomRef = ref(database, `rooms/${roomCode}/status`);
    await set(roomRef, 'GAME_OVER');
  }, [roomCode]);

  const playAgain = useCallback(async () => {
    if (!database || !roomCode) return;
    const roomRef = ref(database, `rooms/${roomCode}`);
    const snapshot = await get(roomRef);
    if (!snapshot.exists()) return;

    const data = snapshot.val();
    const players = data.players || {};
    
    // Resetear puntajes de todos a 0
    const updates: Record<string, any> = {};
    Object.keys(players).forEach(playerId => {
      updates[`players/${playerId}/score`] = 0;
    });
    
    // Limpiar restos y volver a sala de espera
    updates['status'] = 'WAITING_ROOM';
    updates['answers'] = null;
    updates['votes'] = null;
    updates['currentLetter'] = null;
    updates['stoppedBy'] = null;

    await update(roomRef, updates);
  }, [roomCode]);

  const leaveAndDestroyRoom = useCallback(async () => {
    if (!database || !roomCode) return;
    const roomRef = ref(database, `rooms/${roomCode}`);
    await remove(roomRef);
  }, [roomCode]);

  // Listener para sincronización en tiempo real
  useEffect(() => {
    if (!database || !roomCode) return;

    const roomRef = ref(database, `rooms/${roomCode}`);
    
    const unsubscribe = onValue(roomRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        
        // Actualizar jugadores
        if (data.players) {
          const playersList = Object.entries(data.players).map(([id, p]: [string, any]) => ({
            id,
            name: p.name,
            isHost: p.isHost,
            score: p.score || 0
          }));
          setPlayers(playersList);
        } else {
          setPlayers([]);
        }

        // Actualizar letra actual
        if (data.currentLetter) {
          setCurrentLetter(data.currentLetter);
        }

        // Actualizar estado del juego
        if (data.status) {
          setGameStatus(data.status);
        }
      } else {
        // La sala ya no existe
        leaveRoom();
      }
    });

    return () => unsubscribe();
  }, [roomCode, setPlayers, setGameStatus, leaveRoom]);

  return {
    createRoom,
    joinRoom,
    leaveRoom,
    startGame,
    triggerStop,
    submitAnswers,
    calculateScores,
    nextRound,
    endGame,
    playAgain,
    leaveAndDestroyRoom
  };
}
