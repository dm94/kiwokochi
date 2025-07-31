import type { VirtualPetStats, VirtualPetMood, VirtualPetState } from '../types/pet-types';

// Función para determinar el color de una barra de estadística
export const getStatColor = (value: number): string => {
  if (value >= 70) return '#4ade80'; // Verde
  if (value >= 40) return '#fbbf24'; // Amarillo
  if (value >= 20) return '#fb923c'; // Naranja
  return '#ef4444'; // Rojo
};

// Función para obtener el emoji correspondiente a cada estadística
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

// Función para obtener el emoji del estado de ánimo
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

// Función para formatear el tiempo de edad
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

// Función para formatear el peso
export const formatWeight = (weightInGrams: number): string => {
  if (weightInGrams >= 1000) {
    return `${(weightInGrams / 1000).toFixed(1)}kg`;
  }
  return `${Math.round(weightInGrams)}g`;
};

// Función para calcular el nivel de cuidado general
export const calculateCareLevel = (stats: VirtualPetStats): number => {
  const { hunger, happiness, health, energy, cleanliness } = stats;
  return Math.round((hunger + happiness + health + energy + cleanliness) / 5);
};

export const needsUrgentCare = (stats: VirtualPetStats): boolean => {
  return stats.hunger < 20 || stats.health < 20 || stats.cleanliness < 20;
};

// Función para obtener mensajes de estado
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

// Función para generar posición aleatoria dentro de los límites
export const generateRandomPosition = (maxX: number = 200, maxY: number = 150): { x: number; y: number } => {
  const margin = 16; // Margen para evitar que el sprite se salga
  return {
    x: Math.random() * (maxX - margin * 2) + margin,
    y: Math.random() * (maxY - margin * 2) + margin
  };
};

// Función para calcular la distancia entre dos puntos
export const calculateDistance = (pos1: { x: number; y: number }, pos2: { x: number; y: number }): number => {
  const dx = pos1.x - pos2.x;
  const dy = pos1.y - pos2.y;
  return Math.sqrt(dx * dx + dy * dy);
};

// Función para interpolar entre dos posiciones (para animaciones suaves)
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