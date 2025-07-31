import React from "react";
import { View, Text } from "@tamagui/core";
import VirtualPet from "./VirtualPet";
import { useTranslation } from "@/hooks/useTranslation";
import {
  NavigationPage,
  VirtualPetActionType,
  VirtualPetState,
} from "@/types/pet-types";

interface VirtualPetDeviceProps {
  gameState: VirtualPetState;
  onAction: (action: VirtualPetActionType) => void;
  onReset: () => void;
  onNavigate: (page: NavigationPage) => void;
  currentPage: NavigationPage;
}

const VirtualPetDevice: React.FC<VirtualPetDeviceProps> = ({
  gameState,
  onAction,
  onReset,
  onNavigate,
  currentPage,
}) => {
  const { t } = useTranslation();
  return (
    <View
      maxWidth={320}
      height={480}
      margin="auto"
      padding={0}
      backgroundColor="#FFE4B5"
      borderWidth={6}
      borderColor="#8B4513"
      borderRadius={60}
      style={{
        boxShadow: `
          inset 0 0 0 3px #DEB887,
          inset 0 0 0 6px #CD853F,
          0 12px 24px rgba(139, 69, 19, 0.4),
          0 6px 12px rgba(139, 69, 19, 0.3)
        `,
        background: "linear-gradient(145deg, #FFE4B5, #DEB887)",
      }}
    >
      <View alignItems="center" marginTop={15}>
        <Text
          fontSize={12}
          fontFamily="monospace"
          color="#8B4513"
          fontWeight="bold"
          letterSpacing={2}
        >
          TAMA WEB
        </Text>
        <View
          width={60}
          height={2}
          backgroundColor="#8B4513"
          marginTop={2}
          borderRadius={1}
        />
      </View>
      <View
        marginTop={15}
        marginHorizontal={20}
        backgroundColor="#2F4F2F"
        borderWidth={4}
        borderColor="#000"
        borderRadius={12}
        padding={16}
        marginBottom={20}
        height={200}
        style={{
          boxShadow: "inset 0 4px 8px rgba(0,0,0,0.6)",
          background: "linear-gradient(145deg, #2F4F2F, #1C3A1C)",
        }}
      >
        <View
          flexDirection="row"
          justifyContent="center"
          gap={8}
          marginBottom={8}
        >
          <View
            width={8}
            height={8}
            backgroundColor={
              currentPage === NavigationPage.MAIN ? "#00FF00" : "#004400"
            }
            borderRadius={4}
          />
          <View
            width={8}
            height={8}
            backgroundColor={
              currentPage === NavigationPage.STATS ? "#00FF00" : "#004400"
            }
            borderRadius={4}
          />
          <View
            width={8}
            height={8}
            backgroundColor={
              currentPage === NavigationPage.SETTINGS ? "#00FF00" : "#004400"
            }
            borderRadius={4}
          />
        </View>
        {currentPage === NavigationPage.MAIN && (
          <View alignItems="center" flex={1}>
            <View flex={1} justifyContent="center">
              <VirtualPet gameState={gameState} />
            </View>
            <View width="100%" marginTop={8}>
              <View
                flexDirection="row"
                justifyContent="space-between"
                marginBottom={4}
              >
                <View alignItems="center">
                  <Text fontSize={7} fontFamily="monospace" color="#00AA00">
                    {t("status.hungerShort")}
                  </Text>
                  <View
                    width={30}
                    height={4}
                    backgroundColor="#004400"
                    borderRadius={2}
                  >
                    <View
                      width={`${gameState.stats.hunger}%`}
                      height="100%"
                      backgroundColor={
                        gameState.stats.hunger > 30 ? "#00FF00" : "#FF0000"
                      }
                      borderRadius={2}
                    />
                  </View>
                </View>

                <View alignItems="center">
                  <Text fontSize={7} fontFamily="monospace" color="#00AA00">
                    {t("status.happyShort")}
                  </Text>
                  <View
                    width={30}
                    height={4}
                    backgroundColor="#004400"
                    borderRadius={2}
                  >
                    <View
                      width={`${gameState.stats.happiness}%`}
                      height="100%"
                      backgroundColor={
                        gameState.stats.happiness > 30 ? "#00FF00" : "#FF0000"
                      }
                      borderRadius={2}
                    />
                  </View>
                </View>

                <View alignItems="center">
                  <Text fontSize={7} fontFamily="monospace" color="#00AA00">
                    {t("status.healthShort")}
                  </Text>
                  <View
                    width={30}
                    height={4}
                    backgroundColor="#004400"
                    borderRadius={2}
                  >
                    <View
                      width={`${gameState.stats.health}%`}
                      height="100%"
                      backgroundColor={
                        gameState.stats.health > 30 ? "#00FF00" : "#FF0000"
                      }
                      borderRadius={2}
                    />
                  </View>
                </View>
              </View>

              <View flexDirection="row" justifyContent="space-between">
                <View alignItems="center">
                  <Text fontSize={7} fontFamily="monospace" color="#00AA00">
                    {t("status.energyShort")}
                  </Text>
                  <View
                    width={30}
                    height={4}
                    backgroundColor="#004400"
                    borderRadius={2}
                  >
                    <View
                      width={`${gameState.stats.energy}%`}
                      height="100%"
                      backgroundColor={
                        gameState.stats.energy > 30 ? "#00FF00" : "#FF0000"
                      }
                      borderRadius={2}
                    />
                  </View>
                </View>

                <View alignItems="center">
                  <Text fontSize={7} fontFamily="monospace" color="#00AA00">
                    {t("status.cleanShort")}
                  </Text>
                  <View
                    width={30}
                    height={4}
                    backgroundColor="#004400"
                    borderRadius={2}
                  >
                    <View
                      width={`${gameState.stats.cleanliness}%`}
                      height="100%"
                      backgroundColor={
                        gameState.stats.cleanliness > 30 ? "#00FF00" : "#FF0000"
                      }
                      borderRadius={2}
                    />
                  </View>
                </View>

                <View alignItems="center">
                  <Text fontSize={7} fontFamily="monospace" color="#00AA00">
                    {t("status.ageShort")}
                  </Text>
                  <Text fontSize={7} fontFamily="monospace" color="#00FF00">
                    {Math.floor(gameState.stats.age)}h
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {currentPage === NavigationPage.STATS && (
          <View alignItems="center" flex={1}>
            <Text
              fontSize={10}
              fontFamily="monospace"
              color="#00FF00"
              textAlign="center"
              marginBottom={8}
              textTransform="uppercase"
              letterSpacing={1}
            >
              DETAILED STATS
            </Text>
            <View
              backgroundColor="transparent"
              padding={8}
              width="100%"
              flex={1}
            >
              <View
                flexDirection="row"
                justifyContent="space-between"
                marginBottom={6}
              >
                <Text fontSize={9} fontFamily="monospace" color="#00AA00">
                  {t("status.ageLabel")}
                </Text>
                <Text fontSize={9} fontFamily="monospace" color="#00FF00">
                  {Math.floor(gameState.stats.age)}h{" "}
                  {Math.floor((gameState.stats.age % 1) * 60)}m
                </Text>
              </View>
              <View
                flexDirection="row"
                justifyContent="space-between"
                marginBottom={6}
              >
                <Text fontSize={9} fontFamily="monospace" color="#00AA00">
                  {t("status.weightLabel")}
                </Text>
                <Text fontSize={9} fontFamily="monospace" color="#00FF00">
                  {Math.round(gameState.stats.weight)}g
                </Text>
              </View>
              <View
                flexDirection="row"
                justifyContent="space-between"
                marginBottom={6}
              >
                <Text fontSize={9} fontFamily="monospace" color="#00AA00">
                  {t("status.statusLabel")}
                </Text>
                <Text
                  fontSize={9}
                  fontFamily="monospace"
                  color="#00FF00"
                  textTransform="uppercase"
                >
                  {gameState.isAlive ? gameState.mood : t("status.dead")}
                </Text>
              </View>
              <View flexDirection="row" justifyContent="space-between">
                <Text fontSize={9} fontFamily="monospace" color="#00AA00">
                  {t("status.activityLabel")}
                </Text>
                <Text
                  fontSize={9}
                  fontFamily="monospace"
                  color="#00FF00"
                  textTransform="uppercase"
                >
                  {gameState.animation}
                </Text>
              </View>
            </View>
          </View>
        )}

        {currentPage === NavigationPage.SETTINGS && (
          <View alignItems="center" flex={1}>
            <Text
              fontSize={10}
              fontFamily="monospace"
              color="#00FF00"
              textAlign="center"
              marginBottom={8}
              textTransform="uppercase"
              letterSpacing={1}
            >
              {t("status.settings")}
            </Text>
            <View width="100%" gap={8} flex={1} justifyContent="center">
              <View
                padding={8}
                backgroundColor="transparent"
                borderWidth={1}
                borderColor="#00AA00"
                cursor="pointer"
                alignItems="center"
                onPress={onReset}
                pressStyle={{
                  backgroundColor: "rgba(0, 255, 0, 0.1)",
                }}
              >
                <Text fontSize={9} fontFamily="monospace" color="#00FF00">
                  {t("actions.reset")}
                </Text>
              </View>

              <View backgroundColor="transparent" padding={6}>
                <Text
                  fontSize={8}
                  fontFamily="monospace"
                  color="#00AA00"
                  textAlign="center"
                  marginBottom={2}
                >
                  {t("instructions.keyboardControls")}
                </Text>
                <Text
                  fontSize={8}
                  fontFamily="monospace"
                  color="#00FF00"
                  textAlign="center"
                >
                  {t("instructions.controls")}
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>

      <View alignItems="center" marginTop={15}>
        <View
          flexDirection="row"
          justifyContent="center"
          gap={40}
          marginBottom={20}
        >
          <View
            width={50}
            height={50}
            backgroundColor="#8B4513"
            borderRadius={25}
            borderWidth={3}
            borderColor="#654321"
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
            onPress={() => onNavigate(NavigationPage.MAIN)}
            pressStyle={{
              backgroundColor: "#654321",
              transform: "scale(0.95)",
            }}
            style={{
              boxShadow:
                "0 4px 8px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.2)",
            }}
          >
            <Text
              fontSize={8}
              fontFamily="monospace"
              color="#FFE4B5"
              fontWeight="bold"
            >
              MAIN
            </Text>
          </View>

          <View
            width={50}
            height={50}
            backgroundColor="#8B4513"
            borderRadius={25}
            borderWidth={3}
            borderColor="#654321"
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
            onPress={() => onNavigate(NavigationPage.STATS)}
            pressStyle={{
              backgroundColor: "#654321",
              transform: "scale(0.95)",
            }}
            style={{
              boxShadow:
                "0 4px 8px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.2)",
            }}
          >
            <Text
              fontSize={8}
              fontFamily="monospace"
              color="#FFE4B5"
              fontWeight="bold"
            >
              {t("status.stat")}
            </Text>
          </View>

          <View
            width={50}
            height={50}
            backgroundColor="#8B4513"
            borderRadius={25}
            borderWidth={3}
            borderColor="#654321"
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
            onPress={() => onNavigate(NavigationPage.SETTINGS)}
            pressStyle={{
              backgroundColor: "#654321",
              transform: "scale(0.95)",
            }}
            style={{
              boxShadow:
                "0 4px 8px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.2)",
            }}
          >
            <Text
              fontSize={8}
              fontFamily="monospace"
              color="#FFE4B5"
              fontWeight="bold"
            >
              {t("actions.set")}
            </Text>
          </View>
        </View>
        <View flexDirection="row" justifyContent="center" gap={20}>
          <View
            width={60}
            height={40}
            backgroundColor={gameState.isAlive ? "#FF6B6B" : "#999"}
            borderRadius={20}
            borderWidth={3}
            borderColor={gameState.isAlive ? "#FF4444" : "#666"}
            alignItems="center"
            justifyContent="center"
            cursor={gameState.isAlive ? "pointer" : "not-allowed"}
            opacity={gameState.isAlive ? 1 : 0.5}
            onPress={
              gameState.isAlive
                ? () => onAction(VirtualPetActionType.FEED)
                : undefined
            }
            pressStyle={{
              backgroundColor: gameState.isAlive ? "#FF4444" : "#999",
              transform: "scale(0.95)",
            }}
            style={{
              boxShadow:
                "0 3px 6px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.2)",
            }}
          >
            <Text fontSize={16}>🍎</Text>
          </View>

          <View
            width={60}
            height={40}
            backgroundColor={gameState.isAlive ? "#4ECDC4" : "#999"}
            borderRadius={20}
            borderWidth={3}
            borderColor={gameState.isAlive ? "#26A69A" : "#666"}
            alignItems="center"
            justifyContent="center"
            cursor={gameState.isAlive ? "pointer" : "not-allowed"}
            opacity={gameState.isAlive ? 1 : 0.5}
            onPress={
              gameState.isAlive
                ? () => onAction(VirtualPetActionType.PLAY)
                : undefined
            }
            pressStyle={{
              backgroundColor: gameState.isAlive ? "#26A69A" : "#999",
              transform: "scale(0.95)",
            }}
            style={{
              boxShadow:
                "0 3px 6px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.2)",
            }}
          >
            <Text fontSize={16}>🎮</Text>
          </View>

          <View
            width={60}
            height={40}
            backgroundColor={gameState.isAlive ? "#45B7D1" : "#999"}
            borderRadius={20}
            borderWidth={3}
            borderColor={gameState.isAlive ? "#2196F3" : "#666"}
            alignItems="center"
            justifyContent="center"
            cursor={gameState.isAlive ? "pointer" : "not-allowed"}
            opacity={gameState.isAlive ? 1 : 0.5}
            onPress={
              gameState.isAlive
                ? () => onAction(VirtualPetActionType.CLEAN)
                : undefined
            }
            pressStyle={{
              backgroundColor: gameState.isAlive ? "#2196F3" : "#999",
              transform: "scale(0.95)",
            }}
            style={{
              boxShadow:
                "0 3px 6px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.2)",
            }}
          >
            <Text fontSize={16}>🧼</Text>
          </View>

          <View
            width={60}
            height={40}
            backgroundColor={gameState.isAlive ? "#96CEB4" : "#999"}
            borderRadius={20}
            borderWidth={3}
            borderColor={gameState.isAlive ? "#4CAF50" : "#666"}
            alignItems="center"
            justifyContent="center"
            cursor={gameState.isAlive ? "pointer" : "not-allowed"}
            opacity={gameState.isAlive ? 1 : 0.5}
            onPress={
              gameState.isAlive
                ? () => onAction(VirtualPetActionType.SLEEP)
                : undefined
            }
            pressStyle={{
              backgroundColor: gameState.isAlive ? "#4CAF50" : "#999",
              transform: "scale(0.95)",
            }}
            style={{
              boxShadow:
                "0 3px 6px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.2)",
            }}
          >
            <Text fontSize={16}>😴</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default VirtualPetDevice;
