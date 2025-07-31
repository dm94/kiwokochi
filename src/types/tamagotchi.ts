// Tipos para el estado del Tamagotchi
export interface TamagotchiStats {
  hunger: number; // 0-100
  happiness: number; // 0-100
  health: number; // 0-100
  energy: number; // 0-100
  cleanliness: number; // 0-100
  age: number; // en horas
  weight: number; // en gramos
}

export interface TamagotchiState {
  stats: TamagotchiStats;
  position: { x: number; y: number };
  animation: TamagotchiAnimation;
  mood: TamagotchiMood;
  isAlive: boolean;
  lastUpdate: number; // timestamp
}

export type TamagotchiAnimation = 
  | 'idle'
  | 'walking'
  | 'eating'
  | 'sleeping'
  | 'playing'
  | 'sick'
  | 'dead';

export type TamagotchiMood = 
  | 'happy'
  | 'sad'
  | 'angry'
  | 'sick'
  | 'sleeping'
  | 'hungry'
  | 'dirty';

export interface TamagotchiAction {
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
  actions: TamagotchiAction[];
  totalCareTime: number; // en minutos
  birthTime: number; // timestamp
}