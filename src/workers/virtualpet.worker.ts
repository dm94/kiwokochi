import type { VirtualPetState, VirtualPetAction } from '../types/pet-types';
import { VirtualPetAnimation, VirtualPetMood, VirtualPetActionType } from '../types/pet-types';

const createInitialState = (): VirtualPetState => ({
  stats: {
    hunger: 80,
    happiness: 80,
    health: 100,
    energy: 80,
    cleanliness: 100,
    age: 0,
    weight: 50
  },
  position: { x: 100, y: 75 },
  animation: VirtualPetAnimation.IDLE,
  mood: VirtualPetMood.HAPPY,
  isAlive: true,
  lastUpdate: Date.now()
});

let gameState: VirtualPetState = createInitialState();
let gameInterval: ReturnType<typeof setInterval> | null = null;

const updateStats = (deltaTime: number): void => {
  const hoursPassed = deltaTime / (1000 * 60 * 60);
  
  // Decrease stats over time
  gameState.stats.hunger = Math.max(0, gameState.stats.hunger - (hoursPassed * 10));
  gameState.stats.happiness = Math.max(0, gameState.stats.happiness - (hoursPassed * 5));
  gameState.stats.energy = Math.max(0, gameState.stats.energy - (hoursPassed * 8));
  gameState.stats.cleanliness = Math.max(0, gameState.stats.cleanliness - (hoursPassed * 3));
  
  gameState.stats.age += hoursPassed;
  
  // Update health based on other stats
  const avgStats = (gameState.stats.hunger + gameState.stats.happiness + gameState.stats.energy + gameState.stats.cleanliness) / 4;
  gameState.stats.health = Math.min(100, Math.max(0, avgStats));
  
  // Determine mood state
  if (gameState.stats.health < 20) {
    gameState.mood = VirtualPetMood.SICK;
    gameState.animation = VirtualPetAnimation.SICK;
  } else if (gameState.stats.hunger < 30) {
    gameState.mood = VirtualPetMood.HUNGRY;
  } else if (gameState.stats.cleanliness < 30) {
    gameState.mood = VirtualPetMood.DIRTY;
  } else if (gameState.stats.energy < 30) {
    gameState.mood = VirtualPetMood.SLEEPING;
    gameState.animation = VirtualPetAnimation.SLEEPING;
  } else if (gameState.stats.happiness > 70) {
    gameState.mood = VirtualPetMood.HAPPY;
    gameState.animation = VirtualPetAnimation.IDLE;
  } else {
    gameState.mood = VirtualPetMood.SAD;
  }
  
  // Check if alive
  if (gameState.stats.health <= 0) {
    gameState.isAlive = false;
    gameState.animation = VirtualPetAnimation.DEAD;
  }
  
  gameState.lastUpdate = Date.now();
};

const updatePosition = (): void => {
  if (gameState.animation === VirtualPetAnimation.SLEEPING || gameState.animation === VirtualPetAnimation.DEAD) return;
  
  // Random movement within bounds (200x150px)
  const moveChance = Math.random();
  if (moveChance < 0.3) { // 30% de probabilidad de moverse
    const newX = Math.max(16, Math.min(184, gameState.position.x + (Math.random() - 0.5) * 40));
    const newY = Math.max(16, Math.min(134, gameState.position.y + (Math.random() - 0.5) * 40));
    
    gameState.position = { x: newX, y: newY };
    gameState.animation = VirtualPetAnimation.WALKING;
    
    // Return to idle after some time
    setTimeout(() => {
      if (gameState.animation === VirtualPetAnimation.WALKING) {
        gameState.animation = VirtualPetAnimation.IDLE;
      }
    }, 1000);
  }
};

// Function to process user actions
const processAction = (action: VirtualPetAction): void => {
  if (!gameState.isAlive) return;
  
  switch (action.type) {
    case VirtualPetActionType.FEED:
      gameState.stats.hunger = Math.min(100, gameState.stats.hunger + 30);
      gameState.stats.happiness = Math.min(100, gameState.stats.happiness + 10);
      gameState.stats.weight += 2;
      gameState.animation = VirtualPetAnimation.EATING;
      break;
      
    case VirtualPetActionType.SLEEP:
      gameState.stats.energy = Math.min(100, gameState.stats.energy + 40);
      gameState.stats.happiness = Math.min(100, gameState.stats.happiness + 5);
      gameState.animation = VirtualPetAnimation.SLEEPING;
      break;
      
    case VirtualPetActionType.CLEAN:
      gameState.stats.cleanliness = 100;
      gameState.stats.happiness = Math.min(100, gameState.stats.happiness + 15);
      gameState.animation = VirtualPetAnimation.IDLE;
      break;
      
    case VirtualPetActionType.PLAY:
      gameState.stats.happiness = Math.min(100, gameState.stats.happiness + 25);
      gameState.stats.energy = Math.max(0, gameState.stats.energy - 10);
      gameState.animation = VirtualPetAnimation.PLAYING;
      break;
  }
  
  // Return to idle after action
  setTimeout(() => {
    if (gameState.animation !== VirtualPetAnimation.SLEEPING && gameState.animation !== VirtualPetAnimation.DEAD) {
      gameState.animation = VirtualPetAnimation.IDLE;
    }
  }, 2000);
};

// Main game loop function
const gameLoop = (): void => {
  const now = Date.now();
  const deltaTime = now - gameState.lastUpdate;
  
  updateStats(deltaTime);
  updatePosition();
  
  self.postMessage({
    type: 'gameStateUpdate',
    state: gameState
  });
};

self.onmessage = (event) => {
  const { type, data } = event.data;
  
  switch (type) {
    case 'startGame':
      if (data?.savedState) {
        gameState = data.savedState;
      }
      
      if (gameInterval) clearInterval(gameInterval);
      gameInterval = setInterval(gameLoop, 30000);
      
      self.postMessage({
        type: 'gameStateUpdate',
        state: gameState
      });
      break;
      
    case 'stopGame':
      if (gameInterval) {
        clearInterval(gameInterval);
        gameInterval = null;
      }
      break;
      
    case 'performAction':
      processAction(data.action);

      self.postMessage({
        type: 'gameStateUpdate',
        state: gameState
      });
      break;
      
    case 'getState':
      self.postMessage({
        type: 'gameStateUpdate',
        state: gameState
      });
      break;
      
    case 'resetGame':
      gameState = createInitialState();
      self.postMessage({
        type: 'gameStateUpdate',
        state: gameState
      });
      break;
  }
};

export {};