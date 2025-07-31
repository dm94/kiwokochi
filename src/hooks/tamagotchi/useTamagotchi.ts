import { useState, useEffect, useRef, useCallback } from 'react';
import type { TamagotchiState, TamagotchiAction, GameSettings } from '../../types/tamagotchi';

interface UseTamagotchiReturn {
  gameState: TamagotchiState | null;
  isLoading: boolean;
  performAction: (actionType: 'feed' | 'sleep' | 'clean' | 'play') => void;
  startGame: () => void;
  stopGame: () => void;
  resetGame: () => void;
  saveGame: () => void;
  loadGame: () => void;
}

const STORAGE_KEY = 'tamagotchi-save';

export const useTamagotchi = (): UseTamagotchiReturn => {
  const [gameState, setGameState] = useState<TamagotchiState | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const workerRef = useRef<Worker | null>(null);

  // Inicializar el Web Worker
  useEffect(() => {
    // Crear el worker
    workerRef.current = new Worker(
      new URL('../../workers/tamagotchi.worker.ts', import.meta.url),
      { type: 'module' }
    );

    // Configurar el listener para mensajes del worker
    workerRef.current.onmessage = (event) => {
      const { type, state } = event.data;
      
      if (type === 'gameStateUpdate') {
        setGameState(state);
        setIsLoading(false);
        
        // Auto-guardar el estado cada vez que se actualiza
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      }
    };

    // Manejar errores del worker
    workerRef.current.onerror = (error) => {
      console.error('Error en el Web Worker:', error);
      setIsLoading(false);
    };

    // Cleanup al desmontar
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
      }
    };
  }, []);

  // Función para realizar acciones
  const performAction = useCallback((actionType: 'feed' | 'sleep' | 'clean' | 'play') => {
    if (!workerRef.current) return;

    const action: TamagotchiAction = {
      type: actionType,
      timestamp: Date.now()
    };

    workerRef.current.postMessage({
      type: 'performAction',
      data: { action }
    });
  }, []);

  // Función para iniciar el juego
  const startGame = useCallback(() => {
    if (!workerRef.current) return;

    // Intentar cargar estado guardado
    const savedState = loadSavedState();
    
    workerRef.current.postMessage({
      type: 'startGame',
      data: { savedState }
    });
  }, []);

  // Función para detener el juego
  const stopGame = useCallback(() => {
    if (!workerRef.current) return;

    workerRef.current.postMessage({
      type: 'stopGame'
    });
  }, []);

  // Función para reiniciar el juego
  const resetGame = useCallback(() => {
    if (!workerRef.current) return;

    // Limpiar estado guardado
    localStorage.removeItem(STORAGE_KEY);
    
    workerRef.current.postMessage({
      type: 'resetGame'
    });
  }, []);

  // Función para guardar el juego
  const saveGame = useCallback(() => {
    if (gameState) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
    }
  }, [gameState]);

  // Función para cargar el juego
  const loadGame = useCallback(() => {
    const savedState = loadSavedState();
    if (savedState && workerRef.current) {
      workerRef.current.postMessage({
        type: 'startGame',
        data: { savedState }
      });
    }
  }, []);

  // Función auxiliar para cargar estado guardado
  const loadSavedState = (): TamagotchiState | null => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsedState = JSON.parse(saved) as TamagotchiState;
        
        // Validar que el estado guardado no sea muy antiguo (más de 24 horas)
        const now = Date.now();
        const timeDiff = now - parsedState.lastUpdate;
        const hoursDiff = timeDiff / (1000 * 60 * 60);
        
        if (hoursDiff > 24) {
          // Si han pasado más de 24 horas, el Tamagotchi probablemente esté muerto
          console.log('Estado guardado muy antiguo, iniciando nuevo juego');
          localStorage.removeItem(STORAGE_KEY);
          return null;
        }
        
        return parsedState;
      }
    } catch (error) {
      console.error('Error al cargar estado guardado:', error);
      localStorage.removeItem(STORAGE_KEY);
    }
    
    return null;
  };

  // Auto-iniciar el juego cuando el worker esté listo
  useEffect(() => {
    if (workerRef.current && isLoading) {
      startGame();
    }
  }, [startGame, isLoading]);

  return {
    gameState,
    isLoading,
    performAction,
    startGame,
    stopGame,
    resetGame,
    saveGame,
    loadGame
  };
};