import React from "react";
import { View, Text } from "@tamagui/core";
import VirtualPet from "./VirtualPet";
import ActionControls from "./ActionControls";
import StatusIndicators from "./StatusIndicators";
import type { VirtualPetState } from "../../types/pet-types";

interface VirtualPetDeviceProps {
  gameState: VirtualPetState;
  onAction: (action: "feed" | "sleep" | "clean" | "play") => void;
  onReset: () => void;
  onNavigate: (page: "main" | "stats" | "settings") => void;
  currentPage: "main" | "stats" | "settings";
}

const VirtualPetDevice: React.FC<VirtualPetDeviceProps> = ({
  gameState,
  onAction,
  onReset,
  onNavigate,
  currentPage,
}) => {
  return (
    <View
      maxWidth={400}
      margin="auto"
      padding={20}
      backgroundColor="#e8e8e8"
      borderWidth={4}
      borderColor="#333"
      borderRadius={20}
      style={{
        boxShadow: `
          inset 0 0 0 2px #ccc,
          inset 0 0 0 4px #999,
          0 8px 16px rgba(0,0,0,0.3),
          0 4px 8px rgba(0,0,0,0.2)
        `,
      }}
    >
      <View alignItems="center" marginBottom={16}>
        <Text
          fontSize={16}
          fontFamily="monospace"
          color="#333"
          textTransform="uppercase"
          letterSpacing={2}
          marginBottom={4}
        >
          TamaWeb
        </Text>
        <Text fontSize={8} fontFamily="monospace" color="#666">
          Virtual Pet Simulator
        </Text>
      </View>

      <View
        backgroundColor="#f0f0f0"
        borderWidth={3}
        borderColor="#000"
        borderRadius={8}
        padding={12}
        marginBottom={16}
        style={{
          boxShadow: "inset 0 2px 4px rgba(0,0,0,0.3)",
        }}
      >
        <View
          flexDirection="row"
          justifyContent="center"
          gap={4}
          marginBottom={12}
        >
          <View
            paddingHorizontal={12}
            paddingVertical={6}
            backgroundColor={currentPage === "main" ? "#333" : "#ccc"}
            borderRadius={0}
            cursor="pointer"
            onPress={() => onNavigate("main")}
            pressStyle={{
              backgroundColor: currentPage === "main" ? "#555" : "#aaa",
            }}
          >
            <Text
              fontSize={8}
              fontFamily="monospace"
              color={currentPage === "main" ? "#fff" : "#333"}
            >
              MAIN
            </Text>
          </View>
          <View
            paddingHorizontal={12}
            paddingVertical={6}
            backgroundColor={currentPage === "stats" ? "#333" : "#ccc"}
            borderRadius={0}
            cursor="pointer"
            onPress={() => onNavigate("stats")}
            pressStyle={{
              backgroundColor: currentPage === "stats" ? "#555" : "#aaa",
            }}
          >
            <Text
              fontSize={8}
              fontFamily="monospace"
              color={currentPage === "stats" ? "#fff" : "#333"}
            >
              STATS
            </Text>
          </View>
          <View
            paddingHorizontal={12}
            paddingVertical={6}
            backgroundColor={currentPage === "settings" ? "#333" : "#ccc"}
            borderRadius={0}
            cursor="pointer"
            onPress={() => onNavigate("settings")}
            pressStyle={{
              backgroundColor: currentPage === "settings" ? "#555" : "#aaa",
            }}
          >
            <Text
              fontSize={8}
              fontFamily="monospace"
              color={currentPage === "settings" ? "#fff" : "#333"}
            >
              SET
            </Text>
          </View>
        </View>
        {currentPage === "main" && (
          <View alignItems="center">
            <VirtualPet gameState={gameState} />
          </View>
        )}

        {currentPage === "stats" && (
          <View alignItems="center">
            <Text
              fontSize={12}
              fontFamily="monospace"
              color="#333"
              textAlign="center"
              marginBottom={12}
              textTransform="uppercase"
            >
              Detailed Statistics
            </Text>
            <View
              backgroundColor="#fff"
              padding={12}
              borderWidth={1}
              borderColor="#ccc"
              borderRadius={4}
              width="100%"
            >
              <View
                flexDirection="row"
                justifyContent="space-between"
                marginBottom={4}
              >
                <Text fontSize={10} fontFamily="monospace" color="#666">
                  AGE:
                </Text>
                <Text fontSize={10} fontFamily="monospace" color="#333">
                  {Math.floor(gameState.stats.age)}h{" "}
                  {Math.floor((gameState.stats.age % 1) * 60)}m
                </Text>
              </View>
              <View
                flexDirection="row"
                justifyContent="space-between"
                marginBottom={4}
              >
                <Text fontSize={10} fontFamily="monospace" color="#666">
                  WEIGHT:
                </Text>
                <Text fontSize={10} fontFamily="monospace" color="#333">
                  {Math.round(gameState.stats.weight)}g
                </Text>
              </View>
              <View
                flexDirection="row"
                justifyContent="space-between"
                marginBottom={4}
              >
                <Text fontSize={10} fontFamily="monospace" color="#666">
                  STATUS:
                </Text>
                <Text
                  fontSize={10}
                  fontFamily="monospace"
                  color="#333"
                  textTransform="uppercase"
                >
                  {gameState.isAlive ? gameState.mood : "DEAD"}
                </Text>
              </View>
              <View flexDirection="row" justifyContent="space-between">
                <Text fontSize={10} fontFamily="monospace" color="#666">
                  ACTIVITY:
                </Text>
                <Text
                  fontSize={10}
                  fontFamily="monospace"
                  color="#333"
                  textTransform="uppercase"
                >
                  {gameState.animation}
                </Text>
              </View>
            </View>
          </View>
        )}

        {currentPage === "settings" && (
          <View alignItems="center">
            <Text
              fontSize={12}
              fontFamily="monospace"
              color="#333"
              textAlign="center"
              marginBottom={12}
              textTransform="uppercase"
            >
              Settings
            </Text>
            <View width="100%" gap={8}>
              <View
                padding={12}
                backgroundColor="#ff4444"
                borderRadius={0}
                cursor="pointer"
                alignItems="center"
                onPress={onReset}
                pressStyle={{
                  backgroundColor: "#cc3333",
                }}
              >
                <Text fontSize={10} fontFamily="monospace" color="#fff">
                  🔄 RESET PET
                </Text>
              </View>

              <View
                backgroundColor="#fff"
                padding={8}
                borderWidth={1}
                borderColor="#ccc"
                borderRadius={4}
              >
                <Text
                  fontSize={8}
                  fontFamily="monospace"
                  color="#666"
                  textAlign="center"
                >
                  Keyboard Controls:
                </Text>
                <Text
                  fontSize={8}
                  fontFamily="monospace"
                  color="#333"
                  textAlign="center"
                >
                  F = Feed | S = Sleep | C = Clean | P = Play
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
      <View flexDirection="row" gap={16}>
        <View flex={1}>
          <ActionControls gameState={gameState} onAction={onAction} />
        </View>
        <View flex={1}>
          <StatusIndicators gameState={gameState} />
        </View>
      </View>
    </View>
  );
};

export default VirtualPetDevice;
