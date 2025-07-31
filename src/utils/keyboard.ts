import { useEffect, useCallback } from 'react';
import type { GameSettings } from '../types/pet-types';

// Default key configuration
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
    // Prevent actions if user is typing in an input
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

// Function to validate if a key is valid
export const isValidKey = (key: string): boolean => {
  return /^[a-zA-Z0-9]$/.test(key);
};

// Function to format key name for display
export const formatKeyName = (key: string): string => {
  return key.toUpperCase();
};