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

export enum VirtualPetAnimation {
  IDLE = 'idle',
  WALKING = 'walking',
  EATING = 'eating',
  SLEEPING = 'sleeping',
  PLAYING = 'playing',
  SICK = 'sick',
  DEAD = 'dead'
}

export enum VirtualPetMood {
  HAPPY = 'happy',
  SAD = 'sad',
  ANGRY = 'angry',
  SICK = 'sick',
  SLEEPING = 'sleeping',
  HUNGRY = 'hungry',
  DIRTY = 'dirty'
}

export enum VirtualPetActionType {
  FEED = 'feed',
  SLEEP = 'sleep',
  CLEAN = 'clean',
  PLAY = 'play'
}

export enum NavigationPage {
  MAIN = 'main',
  STATS = 'stats',
  SETTINGS = 'settings'
}

export interface VirtualPetAction {
  type: VirtualPetActionType;
  timestamp: number;
}

export interface GameSettings {
  soundEnabled: boolean;
  animationSpeed: number; // 0.5 - 2.0
  updateInterval: number;
  keyBindings: {
    feed: string;
    sleep: string;
    clean: string;
    play: string;
  };
}

export interface CareHistory {
  actions: VirtualPetAction[];
  totalCareTime: number;
  birthTime: number; // timestamp
}