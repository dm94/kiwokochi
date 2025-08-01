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
  
  gameState.stats.hunger = Math.max(0, gameState.stats.hunger - (hoursPassed * 10));
  gameState.stats.happiness = Math.max(0, gameState.stats.happiness - (hoursPassed * 5));
  gameState.stats.energy = Math.max(0, gameState.stats.energy - (hoursPassed * 8));
  gameState.stats.cleanliness = Math.max(0, gameState.stats.cleanliness - (hoursPassed * 3));
  
  gameState.stats.age += hoursPassed;
  
  const avgStats = (gameState.stats.hunger + gameState.stats.happiness + gameState.stats.energy + gameState.stats.cleanliness) / 4;
  gameState.stats.health = Math.min(100, Math.max(0, avgStats));
  
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
  
  if (gameState.stats.health <= 0) {
    gameState.isAlive = false;
    gameState.animation = VirtualPetAnimation.DEAD;
  }
  
  gameState.lastUpdate = Date.now();
};

const updatePosition = (): void => {
  if (gameState.animation === VirtualPetAnimation.SLEEPING || gameState.animation === VirtualPetAnimation.DEAD) {return;}
  
  const actionChance = Math.random();
  
  // Increased chance for movement and idle animations
  if (actionChance < 0.6) {
    const randomAction = Math.random();
    
    if (randomAction < 0.4) {
      // Movement
      const newX = Math.max(16, Math.min(184, gameState.position.x + (Math.random() - 0.5) * 50));
      const newY = Math.max(16, Math.min(134, gameState.position.y + (Math.random() - 0.5) * 50));
      
      gameState.position = { x: newX, y: newY };
      gameState.animation = VirtualPetAnimation.WALKING;
      
      setTimeout(() => {
        if (gameState.animation === VirtualPetAnimation.WALKING) {
          gameState.animation = VirtualPetAnimation.IDLE;
        }
      }, 1200);
    } else if (randomAction < 0.55) {
      // Bouncing in place
      gameState.animation = VirtualPetAnimation.BOUNCING;
      setTimeout(() => {
        if (gameState.animation === VirtualPetAnimation.BOUNCING) {
          gameState.animation = VirtualPetAnimation.IDLE;
        }
      }, 1500);
    } else if (randomAction < 0.7) {
      // Wiggling
      gameState.animation = VirtualPetAnimation.WIGGLING;
      setTimeout(() => {
        if (gameState.animation === VirtualPetAnimation.WIGGLING) {
          gameState.animation = VirtualPetAnimation.IDLE;
        }
      }, 1800);
    } else if (randomAction < 0.8) {
      // Stretching
      gameState.animation = VirtualPetAnimation.STRETCHING;
      setTimeout(() => {
        if (gameState.animation === VirtualPetAnimation.STRETCHING) {
          gameState.animation = VirtualPetAnimation.IDLE;
        }
      }, 2000);
    } else if (randomAction < 0.9) {
      // Looking around
      gameState.animation = VirtualPetAnimation.LOOKING_AROUND;
      setTimeout(() => {
        if (gameState.animation === VirtualPetAnimation.LOOKING_AROUND) {
          gameState.animation = VirtualPetAnimation.IDLE;
        }
      }, 2500);
    } else {
      // Yawning
      gameState.animation = VirtualPetAnimation.YAWNING;
      setTimeout(() => {
        if (gameState.animation === VirtualPetAnimation.YAWNING) {
          gameState.animation = VirtualPetAnimation.IDLE;
        }
      }, 2200);
    }
  }
};

const processAction = (action: VirtualPetAction): void => {
  if (!gameState.isAlive) {return;}
  
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
  
  setTimeout(() => {
    if (gameState.animation !== VirtualPetAnimation.SLEEPING && gameState.animation !== VirtualPetAnimation.DEAD) {
      gameState.animation = VirtualPetAnimation.IDLE;
    }
  }, 2000);
};

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
      gameInterval = setInterval(gameLoop, 8000); // Reduced from 30s to 8s for more frequent animations
      
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