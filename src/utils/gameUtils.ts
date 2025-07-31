import type { VirtualPetStats, VirtualPetMood, VirtualPetState } from '../types/pet-types';

// Function to determine the color of a stat bar
export const getStatColor = (value: number): string => {
  if (value >= 70) return '#4ade80';
  if (value >= 40) return '#fbbf24';
  if (value >= 20) return '#fb923c';
  return '#ef4444';
};

// Function to get the emoji corresponding to each stat
export const getStatEmoji = (statType: keyof VirtualPetStats): string => {
  const emojiMap = {
    hunger: '🍎',
    happiness: '😊',
    health: '❤️',
    energy: '⚡',
    cleanliness: '🧽',
    age: '⏰',
    weight: '⚖️'
  };
  
  return emojiMap[statType] || '❓';
};

// Function to get mood emoji
export const getMoodEmoji = (mood: VirtualPetMood): string => {
  const moodMap = {
    happy: '😊',
    sad: '😢',
    angry: '😠',
    sick: '🤒',
    sleeping: '😴',
    hungry: '🍽️',
    dirty: '💩'
  };
  
  return moodMap[mood] || '😐';
};

// Function to format age time
export const formatAge = (ageInHours: number): string => {
  if (ageInHours < 1) {
    const minutes = Math.floor(ageInHours * 60);
    return `${minutes}m`;
  } else if (ageInHours < 24) {
    const hours = Math.floor(ageInHours);
    const minutes = Math.floor((ageInHours - hours) * 60);
    return `${hours}h ${minutes}m`;
  } else {
    const days = Math.floor(ageInHours / 24);
    const hours = Math.floor(ageInHours % 24);
    return `${days}d ${hours}h`;
  }
};

// Function to format weight
export const formatWeight = (weightInGrams: number): string => {
  if (weightInGrams >= 1000) {
    return `${(weightInGrams / 1000).toFixed(1)}kg`;
  }
  return `${Math.round(weightInGrams)}g`;
};

// Function to calculate overall care level
export const calculateCareLevel = (stats: VirtualPetStats): number => {
  const { hunger, happiness, health, energy, cleanliness } = stats;
  return Math.round((hunger + happiness + health + energy + cleanliness) / 5);
};

export const needsUrgentCare = (stats: VirtualPetStats): boolean => {
  return stats.hunger < 20 || stats.health < 20 || stats.cleanliness < 20;
};

// Function to get status messages
export const getStatusMessage = (state: VirtualPetState): string => {
  if (!state.isAlive) {
    return '💀 Tu Pet ha muerto...';
  }
  
  const { stats, mood } = state;
  
  if (stats.health < 20) {
    return '🚨 ¡Tu Pet está muy enfermo!';
  }
  
  if (stats.hunger < 20) {
    return '🍽️ ¡Tu Pet tiene mucha hambre!';
  }
  
  if (stats.cleanliness < 20) {
    return '🧽 ¡Tu Pet necesita ser limpiado!';
  }
  
  if (stats.energy < 20) {
    return '😴 Tu Pet está muy cansado';
  }
  
  if (mood === 'happy' && stats.happiness > 80) {
    return '🎉 ¡Tu Pet está muy feliz!';
  }
  
  if (mood === 'sad') {
    return '😢 Tu Pet está triste';
  }
  
  return '😊 Tu Pet está bien';
};

// Function to generate random position within bounds
export const generateRandomPosition = (maxX: number = 200, maxY: number = 150): { x: number; y: number } => {
  const margin = 16; // Margen para evitar que el sprite se salga
  return {
    x: Math.random() * (maxX - margin * 2) + margin,
    y: Math.random() * (maxY - margin * 2) + margin
  };
};

// Function to calculate distance between two points
export const calculateDistance = (pos1: { x: number; y: number }, pos2: { x: number; y: number }): number => {
  const dx = pos1.x - pos2.x;
  const dy = pos1.y - pos2.y;
  return Math.sqrt(dx * dx + dy * dy);
};

// Function to interpolate between two positions (for smooth animations)
export const interpolatePosition = (
  from: { x: number; y: number },
  to: { x: number; y: number },
  progress: number
): { x: number; y: number } => {
  return {
    x: from.x + (to.x - from.x) * progress,
    y: from.y + (to.y - from.y) * progress
  };
};