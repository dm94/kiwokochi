import React, { useEffect } from "react";
import { View, Text } from "@tamagui/core";
import { VirtualPetActionType, VirtualPetState } from "../../types/pet-types";

interface ActionControlsProps {
  gameState: VirtualPetState;
  onAction: (action: VirtualPetActionType) => void;
}

const ActionControls: React.FC<ActionControlsProps> = ({
  gameState,
  onAction,
}) => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!gameState.isAlive) return;

      const key = event.key.toLowerCase();

      switch (key) {
        case "f":
          onAction(VirtualPetActionType.FEED);
          break;
        case "s":
          onAction(VirtualPetActionType.SLEEP);
          break;
        case "c":
          onAction(VirtualPetActionType.CLEAN);
          break;
        case "p":
          onAction(VirtualPetActionType.PLAY);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [gameState.isAlive, onAction]);

  return (
    <View>
      <Text
        fontSize={12}
        fontFamily="monospace"
        color="#333"
        textAlign="center"
        marginBottom={8}
        textTransform="uppercase"
        letterSpacing={1}
      >
        CONTROLS
      </Text>
      <View flexDirection="row" gap={8} justifyContent="center">
        <View alignItems="center">
          <View
            width={60}
            height={40}
            backgroundColor={gameState.isAlive ? "#333" : "#666"}
            borderWidth={2}
            borderColor="#000"
            alignItems="center"
            justifyContent="center"
            opacity={gameState.isAlive ? 1 : 0.5}
            cursor={gameState.isAlive ? "pointer" : "not-allowed"}
            onPress={
              gameState.isAlive
                ? () => onAction(VirtualPetActionType.FEED)
                : undefined
            }
            pressStyle={{
              backgroundColor: "#555",
              transform: "translateY(1px)",
            }}
            hoverStyle={{
              backgroundColor: gameState.isAlive ? "#444" : "#666",
            }}
          >
            <Text fontSize={16} marginBottom={-2}>
              🍎
            </Text>
            <Text fontSize={8} color="#fff">
              FEED
            </Text>
          </View>
          <Text fontSize={8} fontFamily="monospace" color="#666" marginTop={2}>
            (F)
          </Text>
        </View>

        <View alignItems="center">
          <View
            width={60}
            height={40}
            backgroundColor={gameState.isAlive ? "#333" : "#666"}
            borderWidth={2}
            borderColor="#000"
            alignItems="center"
            justifyContent="center"
            opacity={gameState.isAlive ? 1 : 0.5}
            cursor={gameState.isAlive ? "pointer" : "not-allowed"}
            onPress={
              gameState.isAlive
                ? () => onAction(VirtualPetActionType.SLEEP)
                : undefined
            }
            pressStyle={{
              backgroundColor: "#555",
              transform: "translateY(1px)",
            }}
            hoverStyle={{
              backgroundColor: gameState.isAlive ? "#444" : "#666",
            }}
          >
            <Text fontSize={16} marginBottom={-2}>
              😴
            </Text>
            <Text fontSize={8} color="#fff">
              SLEEP
            </Text>
          </View>
          <Text fontSize={8} fontFamily="monospace" color="#666" marginTop={2}>
            (S)
          </Text>
        </View>

        <View alignItems="center">
          <View
            width={60}
            height={40}
            backgroundColor={gameState.isAlive ? "#333" : "#666"}
            borderWidth={2}
            borderColor="#000"
            alignItems="center"
            justifyContent="center"
            opacity={gameState.isAlive ? 1 : 0.5}
            cursor={gameState.isAlive ? "pointer" : "not-allowed"}
            onPress={
              gameState.isAlive
                ? () => onAction(VirtualPetActionType.CLEAN)
                : undefined
            }
            pressStyle={{
              backgroundColor: "#555",
              transform: "translateY(1px)",
            }}
            hoverStyle={{
              backgroundColor: gameState.isAlive ? "#444" : "#666",
            }}
          >
            <Text fontSize={16} marginBottom={-2}>
              🧽
            </Text>
            <Text fontSize={8} color="#fff">
              CLEAN
            </Text>
          </View>
          <Text fontSize={8} fontFamily="monospace" color="#666" marginTop={2}>
            (C)
          </Text>
        </View>

        <View alignItems="center">
          <View
            width={60}
            height={40}
            backgroundColor={gameState.isAlive ? "#333" : "#666"}
            borderWidth={2}
            borderColor="#000"
            alignItems="center"
            justifyContent="center"
            opacity={gameState.isAlive ? 1 : 0.5}
            cursor={gameState.isAlive ? "pointer" : "not-allowed"}
            onPress={
              gameState.isAlive
                ? () => onAction(VirtualPetActionType.PLAY)
                : undefined
            }
            pressStyle={{
              backgroundColor: "#555",
              transform: "translateY(1px)",
            }}
            hoverStyle={{
              backgroundColor: gameState.isAlive ? "#444" : "#666",
            }}
          >
            <Text fontSize={16} marginBottom={-2}>
              🎮
            </Text>
            <Text fontSize={8} color="#fff">
              PLAY
            </Text>
          </View>
          <Text fontSize={8} fontFamily="monospace" color="#666" marginTop={2}>
            (P)
          </Text>
        </View>
      </View>

      <Text
        fontSize={8}
        fontFamily="monospace"
        color="#666"
        textAlign="center"
        marginTop={8}
        lineHeight={12}
      >
        Use keyboard shortcuts or click buttons
      </Text>

      {!gameState.isAlive && (
        <View
          marginTop={8}
          padding={8}
          backgroundColor="#ffeeee"
          borderWidth={1}
          borderColor="#ff0000"
          borderRadius={4}
        >
          <Text
            fontSize={10}
            fontFamily="monospace"
            color="#ff0000"
            textAlign="center"
            textTransform="uppercase"
          >
            Your Pet has died!
          </Text>
        </View>
      )}
    </View>
  );
};

export default ActionControls;
