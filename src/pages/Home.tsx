import React, { useState } from "react";
import { View, Text } from "@tamagui/core";
import { useVirtualPet } from "../hooks/virtualPet/useVirtualPet";
import VirtualPetDevice from "../components/virtualPet/VirtualPetDevice";

export default function Home() {
  const { gameState, isLoading, performAction, resetGame } = useVirtualPet();
  const [currentPage, setCurrentPage] = useState<"main" | "stats" | "settings">(
    "main"
  );

  if (isLoading || !gameState) {
    return (
      <View
        flex={1}
        justifyContent="center"
        alignItems="center"
        backgroundColor="#f0f0f0"
        minHeight="100vh"
      >
        <View alignItems="center" gap={16}>
          <View
            width={40}
            height={40}
            borderWidth={4}
            borderColor="#333"
            borderTopColor="transparent"
            borderRadius={20}
          />
          <Text
            fontSize={16}
            fontFamily="monospace"
            color="#333"
            textTransform="uppercase"
            letterSpacing={2}
          >
            Loading Pet...
          </Text>
          <Text
            fontSize={12}
            fontFamily="monospace"
            color="#666"
            textAlign="center"
          >
            Initializing virtual pet system
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View
      flex={1}
      backgroundColor="#f0f0f0"
      minHeight="100vh"
      padding={20}
      style={{
        backgroundImage: `
          radial-gradient(circle at 20px 20px, #e8e8e8 2px, transparent 0),
          radial-gradient(circle at 40px 40px, #e0e0e0 1px, transparent 0)
        `,
        backgroundSize: "60px 60px",
        backgroundPosition: "0 0, 30px 30px",
      }}
    >
      {/* Header */}
      <View alignItems="center" marginBottom={20}>
        <Text
          fontSize={24}
          fontFamily="monospace"
          color="#333"
          textTransform="uppercase"
          letterSpacing={3}
          marginBottom={8}
          style={{
            textShadow: "2px 2px 0px #ccc",
          }}
        >
          TAMA WEB
        </Text>
        <Text
          fontSize={12}
          fontFamily="monospace"
          color="#666"
          textAlign="center"
        >
          Your Virtual Pet Companion
        </Text>
      </View>

      <VirtualPetDevice
        gameState={gameState}
        onAction={performAction}
        onReset={resetGame}
        onNavigate={setCurrentPage}
        currentPage={currentPage}
      />

      {/* Instrucciones */}
      <View
        marginTop={20}
        padding={16}
        backgroundColor="rgba(255,255,255,0.8)"
        borderWidth={1}
        borderColor="#ccc"
        borderRadius={8}
        maxWidth={400}
        margin="auto"
      >
        <Text
          fontSize={12}
          fontFamily="monospace"
          color="#333"
          textAlign="center"
          marginBottom={8}
          textTransform="uppercase"
        >
          How to Play
        </Text>
        <Text
          fontSize={10}
          fontFamily="monospace"
          color="#666"
          textAlign="center"
          lineHeight={14}
        >
          Take care of your virtual pet by feeding, cleaning, and playing with
          it. Use keyboard shortcuts (F, S, C, P) or click the buttons. Watch
          the status bars and respond to your pet's needs!
        </Text>
      </View>
    </View>
  );
}
