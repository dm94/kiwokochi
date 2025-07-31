// Tipos para el estado del Tamagotchi
export interface VirtualPetStats {
  hunger: number; // 0-100
  happiness: number; // 0-100
  health: number; // 0-100
  energy: number; // 0-100
  cleanliness: number; // 0-100
  age: number; // en horas
  weight: number; // en gramos
}

export interface VirtualPetState {
  stats: VirtualPetStats;
  position: { x: number; y: number };
  animation: VirtualPetAnimation;
  mood: VirtualPetMood;
  isAlive: boolean;
  lastUpdate: number; // timestamp
}

export type VirtualPetAnimation = 
  | 'idle'
  | 'walking'
  | 'eating'
  | 'sleeping'
  | 'playing'
  | 'sick'
  | 'dead';

export type VirtualPetMood = 
  | 'happy'
  | 'sad'
  | 'angry'
  | 'sick'
  | 'sleeping'
  | 'hungry'
  | 'dirty';

export interface VirtualPetAction {
  type: 'feed' | 'sleep' | 'clean' | 'play';
  timestamp: number;
}

export interface GameSettings {
  soundEnabled: boolean;
  animationSpeed: number; // 0.5 - 2.0
  updateInterval: number; // en segundos
  keyBindings: {
    feed: string;
    sleep: string;
    clean: string;
    play: string;
  };
}

export interface CareHistory {
  actions: VirtualPetAction[];
  totalCareTime: number; // en minutos
  birthTime: number; // timestamp
}