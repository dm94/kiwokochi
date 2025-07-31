import { useEffect, useCallback } from 'react';
import type { GameSettings } from '../types/pet-types';

// Configuración por defecto de las teclas
export const DEFAULT_KEY_BINDINGS = {
  feed: 'f',
  sleep: 's',
  clean: 'c',
  play: 'p'
};

// Hook para manejar los controles de teclado
export const useKeyboardControls = (
  onFeed: () => void,
  onSleep: () => void,
  onClean: () => void,
  onPlay: () => void,
  keyBindings: GameSettings['keyBindings'] = DEFAULT_KEY_BINDINGS
) => {
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    // Prevenir acciones si el usuario está escribiendo en un input
    if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
      return;
    }

    const key = event.key.toLowerCase();
    
    switch (key) {
      case keyBindings.feed.toLowerCase():
        event.preventDefault();
        onFeed();
        break;
      case keyBindings.sleep.toLowerCase():
        event.preventDefault();
        onSleep();
        break;
      case keyBindings.clean.toLowerCase():
        event.preventDefault();
        onClean();
        break;
      case keyBindings.play.toLowerCase():
        event.preventDefault();
        onPlay();
        break;
    }
  }, [onFeed, onSleep, onClean, onPlay, keyBindings]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);
};

// Función para validar si una tecla es válida
export const isValidKey = (key: string): boolean => {
  return /^[a-zA-Z0-9]$/.test(key);
};

// Función para formatear el nombre de la tecla para mostrar
export const formatKeyName = (key: string): string => {
  return key.toUpperCase();
};