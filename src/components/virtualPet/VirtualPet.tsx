import React from "react";
import { View, Text } from "@tamagui/core";
import type { VirtualPetState } from "../../types/pet-types";

interface VirtualPetProps {
  gameState: VirtualPetState;
}

const VirtualPet: React.FC<VirtualPetProps> = ({ gameState }) => {
  const { position, animation, mood, isAlive } = gameState;

  // Función para obtener el emoji según el estado
  const getPetEmoji = () => {
    if (!isAlive) return "💀";

    switch (animation) {
      case "eating":
        return "🍽️";
      case "sleeping":
        return "😴";
      case "playing":
        return "🎮";
      case "sick":
        return "🤒";
      case "dead":
        return "💀";
      default:
        switch (mood) {
          case "happy":
            return "😊";
          case "sad":
            return "😢";
          case "angry":
            return "😠";
          case "hungry":
            return "🤤";
          case "dirty":
            return "🤢";
          default:
            return "🙂";
        }
    }
  };

  // Función para obtener la clase de animación
  const getAnimationClass = () => {
    switch (animation) {
      case "walking":
        return "animate-bounce";
      case "eating":
        return "animate-pulse";
      case "playing":
        return "animate-spin";
      default:
        return "";
    }
  };

  return (
    <View
      position="relative"
      width={200}
      height={150}
      backgroundColor="#f0f0f0"
      borderWidth={2}
      borderColor="#333"
      borderRadius={4}
      overflow="hidden"
    >
      {/* Fondo pixelado */}
      <View
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, #ddd 1px, transparent 0),
            radial-gradient(circle at 3px 3px, #eee 1px, transparent 0)
          `,
          backgroundSize: "4px 4px",
          backgroundPosition: "0 0, 2px 2px",
        }}
      />

      {/* Mascota */}
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
        <Text
          fontSize={24}
          style={{
            textShadow: "1px 1px 0px #000",
            filter: "drop-shadow(0 0 2px rgba(0,0,0,0.5))",
          }}
        >
          {getPetEmoji()}
        </Text>
      </View>

      {/* Indicador de estado en la esquina */}
      {!isAlive && (
        <View
          position="absolute"
          top={5}
          right={5}
          backgroundColor="#ff0000"
          paddingHorizontal={6}
          paddingVertical={2}
          borderRadius={2}
        >
          <Text fontSize={8} color="white" fontFamily="monospace">
            RIP
          </Text>
        </View>
      )}

      {/* Indicadores de necesidades urgentes */}
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
