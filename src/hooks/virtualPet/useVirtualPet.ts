import { useState, useEffect, useRef, useCallback } from 'react';
import type { VirtualPetState, VirtualPetAction, VirtualPetActionType } from '@/types/pet-types';

interface UseVirtualPetReturn {
  gameState: VirtualPetState | null;
  isLoading: boolean;
  performAction: (actionType: VirtualPetActionType) => void;
  startGame: () => void;
  stopGame: () => void;
  resetGame: () => void;
  saveGame: () => void;
  loadGame: () => void;
}

const STORAGE_KEY = 'virtualpet-save';

export const useVirtualPet = (): UseVirtualPetReturn => {
  const [gameState, setGameState] = useState<VirtualPetState | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    workerRef.current = new Worker(
      new URL('../../workers/virtualpet.worker.ts', import.meta.url),
      { type: 'module' }
    );

    workerRef.current.onmessage = (event) => {
      const { type, state } = event.data;
      
      if (type === 'gameStateUpdate') {
        setGameState(state);
        setIsLoading(false);
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      }
    };

    workerRef.current.onerror = (error) => {
      console.error('Error en el Web Worker:', error);
      setIsLoading(false);
    };

    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
      }
    };
  }, []);

  const performAction = useCallback((actionType: VirtualPetActionType) => {
    if (!workerRef.current) return;

    const action: VirtualPetAction = {
      type: actionType,
      timestamp: Date.now()
    };

    workerRef.current.postMessage({
      type: 'performAction',
      data: { action }
    });
  }, []);

  const startGame = useCallback(() => {
    if (!workerRef.current) return;

    const savedState = loadSavedState();
    
    workerRef.current.postMessage({
      type: 'startGame',
      data: { savedState }
    });
  }, []);

  const stopGame = useCallback(() => {
    if (!workerRef.current) return;

    workerRef.current.postMessage({
      type: 'stopGame'
    });
  }, []);

  const resetGame = useCallback(() => {
    if (!workerRef.current) return;

    localStorage.removeItem(STORAGE_KEY);
    
    workerRef.current.postMessage({
      type: 'resetGame'
    });
  }, []);

  const saveGame = useCallback(() => {
    if (gameState) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
    }
  }, [gameState]);

  const loadGame = useCallback(() => {
    const savedState = loadSavedState();
    if (savedState && workerRef.current) {
      workerRef.current.postMessage({
        type: 'startGame',
        data: { savedState }
      });
    }
  }, []);

  const loadSavedState = (): VirtualPetState | null => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsedState = JSON.parse(saved) as VirtualPetState;
        
        const now = Date.now();
        const timeDiff = now - parsedState.lastUpdate;
        const hoursDiff = timeDiff / (1000 * 60 * 60);
        
        if (hoursDiff > 24) {
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