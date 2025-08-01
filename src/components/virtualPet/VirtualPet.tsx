import React from "react";
import { View, Text } from "@tamagui/core";
import {
  VirtualPetAnimation,
  type VirtualPetState,
} from "../../types/pet-types";
import PetSVG from "./PetSVG";

interface VirtualPetProps {
  gameState: VirtualPetState;
}

const VirtualPet: React.FC<VirtualPetProps> = ({ gameState }) => {
  const { position, animation, mood, isAlive } = gameState;

  const getAnimationClass = () => {
    switch (animation) {
      case VirtualPetAnimation.WALKING:
        return "animate-bounce";
      case VirtualPetAnimation.EATING:
        return "animate-pulse";
      case VirtualPetAnimation.PLAYING:
        return "animate-spin";
      case VirtualPetAnimation.BOUNCING:
        return "animate-bounce";
      case VirtualPetAnimation.WIGGLING:
        return "animate-pulse";
      case VirtualPetAnimation.STRETCHING:
        return "animate-pulse";
      case VirtualPetAnimation.LOOKING_AROUND:
        return "";
      case VirtualPetAnimation.YAWNING:
        return "animate-pulse";
      default:
        return "";
    }
  };

  return (
    <View
      position="relative"
      width={200}
      height={150}
      backgroundColor="var(--bg-primary)"
      borderWidth={2}
      borderColor="var(--border-primary)"
      borderRadius={4}
      overflow="hidden"
    >
      <View
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, var(--bg-pattern-3) 1px, transparent 0),
            radial-gradient(circle at 3px 3px, var(--bg-pattern-4) 1px, transparent 0)
          `,
          backgroundSize: "4px 4px",
          backgroundPosition: "0 0, 2px 2px",
        }}
      />

      <View
        position="absolute"
        left={position.x - 16}
        top={position.y - 16}
        width={32}
        height={32}
        alignItems="center"
        justifyContent="center"
        className={getAnimationClass()}
        style={{
          transition: "left 0.5s ease-in-out, top 0.5s ease-in-out",
          filter: isAlive ? "none" : "grayscale(100%)",
        }}
      >
        <PetSVG animation={animation} mood={mood} isAlive={isAlive} size={32} />
      </View>

      {!isAlive && (
        <View
          position="absolute"
          top={5}
          right={5}
          backgroundColor="var(--dead-indicator)"
          paddingHorizontal={6}
          paddingVertical={2}
          borderRadius={2}
        >
          <Text fontSize={8} color="var(--text-white)" fontFamily="var(--font-monospace)">
            RIP
          </Text>
        </View>
      )}

      {isAlive && (
        <View position="absolute" top={5} left={5} flexDirection="row" gap={2}>
          {gameState.stats.hunger < 30 && (
            <Text fontSize={12} className="animate-bounce">
              🍎
            </Text>
          )}
          {gameState.stats.energy < 30 && (
            <Text fontSize={12} className="animate-pulse">
              😴
            </Text>
          )}
          {gameState.stats.cleanliness < 30 && (
            <Text fontSize={12} className="animate-bounce">
              🧽
            </Text>
          )}
        </View>
      )}
    </View>
  );
};

export default VirtualPet;
