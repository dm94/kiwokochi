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
      backgroundColor="var(--device-bg)"
      borderWidth={6}
      borderColor="var(--device-border)"
      borderRadius={60}
      style={{
        boxShadow: `
          inset 0 0 0 3px var(--device-border-inner),
          inset 0 0 0 6px var(--device-border-inner-2),
          0 12px 24px var(--shadow-device),
          0 6px 12px var(--shadow-device-light)
        `,
        background: "linear-gradient(145deg, var(--device-gradient-start), var(--device-gradient-end))",
      }}
    >
      <View alignItems="center" marginTop={10}>
        <Text
          fontSize={12}
          fontFamily="var(--font-monospace)"
          color="var(--device-text)"
          fontWeight="bold"
          letterSpacing={2}
        >
          Kiwokochi
        </Text>
        <View
          width={60}
          height={2}
          backgroundColor="var(--device-text)"
          marginTop={2}
          borderRadius={1}
        />
      </View>
      <View
        marginTop={10}
        marginHorizontal={20}
        backgroundColor="var(--screen-bg)"
        borderWidth={4}
        borderColor="var(--screen-border)"
        borderRadius={12}
        padding={10}
        marginBottom={10}
        height={240}
        style={{
          boxShadow: "inset 0 4px 8px var(--shadow-inset)",
          background: "linear-gradient(145deg, var(--screen-bg), var(--screen-bg-dark))",
        }}
      >
        <View
          flexDirection="row"
          justifyContent="center"
          gap={8}
          marginBottom={20}
        >
          <View
            width={8}
            height={8}
            backgroundColor={
              currentPage === NavigationPage.MAIN ? "var(--nav-active)" : "var(--nav-inactive)"
            }
            borderRadius={4}
          />
          <View
            width={8}
            height={8}
            backgroundColor={
              currentPage === NavigationPage.STATS ? "var(--nav-active)" : "var(--nav-inactive)"
            }
            borderRadius={4}
          />
          <View
            width={8}
            height={8}
            backgroundColor={
              currentPage === NavigationPage.SETTINGS ? "var(--nav-active)" : "var(--nav-inactive)"
            }
            borderRadius={4}
          />
        </View>
        {currentPage === NavigationPage.MAIN && (
          <View alignItems="center" flex={1}>
            <View flex={1} justifyContent="center">
              <VirtualPet gameState={gameState} />
            </View>
            <View width="100%" marginTop={25} gap={3}>
              <View
                flexDirection="row"
                justifyContent="space-between"
                paddingHorizontal={12}
                gap={3}
              >
                <View alignItems="center" flex={1}>
                  <Text
                    fontSize={6}
                    fontFamily="var(--font-monospace)"
                    color="var(--status-text)"
                    marginBottom={1}
                  >
                    {t("status.hungerShort")}
                  </Text>
                  <View
                    width="100%"
                    height={4}
                    backgroundColor="var(--status-bg)"
                    borderRadius={2}
                    borderWidth={1}
                    borderColor="var(--status-border)"
                  >
                    <View
                      width={`${gameState.stats.hunger}%`}
                      height="100%"
                      backgroundColor={
                        gameState.stats.hunger > 50
                          ? "var(--status-good)"
                          : gameState.stats.hunger > 25
                          ? "var(--status-medium)"
                          : "var(--status-bad)"
                      }
                      borderRadius={1}
                    />
                  </View>
                  <Text
                    fontSize={5}
                    fontFamily="var(--font-monospace)"
                    color="var(--status-text-bright)"
                    marginTop={1}
                  >
                    {Math.round(gameState.stats.hunger)}%
                  </Text>
                </View>

                <View alignItems="center" flex={1}>
                  <Text
                    fontSize={6}
                    fontFamily="var(--font-monospace)"
                    color="var(--status-text)"
                    marginBottom={1}
                  >
                    {t("status.happyShort")}
                  </Text>
                  <View
                    width="100%"
                    height={4}
                    backgroundColor="var(--status-bg)"
                    borderRadius={2}
                    borderWidth={1}
                    borderColor="var(--status-border)"
                  >
                    <View
                      width={`${gameState.stats.happiness}%`}
                      height="100%"
                      backgroundColor={
                        gameState.stats.happiness > 50
                          ? "var(--status-good)"
                          : gameState.stats.happiness > 25
                          ? "var(--status-medium)"
                          : "var(--status-bad)"
                      }
                      borderRadius={1}
                    />
                  </View>
                  <Text
                      fontSize={5}
                      fontFamily="var(--font-monospace)"
                      color="var(--status-text-bright)"
                      marginTop={1}
                    >
                      {Math.round(gameState.stats.health)}%
                    </Text>
                </View>

                <View alignItems="center" flex={1}>
                  <Text
                    fontSize={6}
                    fontFamily="var(--font-monospace)"
                    color="var(--status-text)"
                    marginBottom={1}
                  >
                    {t("status.healthShort")}
                  </Text>
                  <View
                    width="100%"
                    height={4}
                    backgroundColor="var(--status-bg)"
                    borderRadius={2}
                    borderWidth={1}
                    borderColor="var(--status-border)"
                  >
                    <View
                      width={`${gameState.stats.health}%`}
                      height="100%"
                      backgroundColor={
                        gameState.stats.health > 50
                          ? "var(--status-good)"
                          : gameState.stats.health > 25
                          ? "var(--status-medium)"
                          : "var(--status-bad)"
                      }
                      borderRadius={1}
                    />
                  </View>
                  <Text
                      fontSize={5}
                      fontFamily="var(--font-monospace)"
                      color="var(--status-text-bright)"
                      marginTop={1}
                    >
                      {Math.round(gameState.stats.happiness)}%
                    </Text>
                </View>
              </View>
              <View
                flexDirection="row"
                justifyContent="space-between"
                paddingHorizontal={12}
                gap={3}
              >
                <View alignItems="center" flex={1}>
                  <Text
                     fontSize={6}
                     fontFamily="var(--font-monospace)"
                     color="var(--status-text)"
                     marginBottom={1}
                   >
                     {t("status.energyShort")}
                   </Text>
                  <View
                    width="100%"
                    height={4}
                    backgroundColor="#004400"
                    borderRadius={2}
                    borderWidth={1}
                    borderColor="#002200"
                  >
                    <View
                      width={`${gameState.stats.energy}%`}
                      height="100%"
                      backgroundColor={
                        gameState.stats.energy > 50
                          ? "var(--status-good)"
                          : gameState.stats.energy > 25
                          ? "var(--status-medium)"
                          : "var(--status-bad)"
                      }
                      borderRadius={1}
                    />
                  </View>
                  <Text
                     fontSize={5}
                     fontFamily="var(--font-monospace)"
                     color="var(--status-text-bright)"
                     marginTop={1}
                   >
                     {Math.round(gameState.stats.energy)}%
                   </Text>
                </View>

                <View alignItems="center" flex={1}>
                  <Text
                    fontSize={6}
                    fontFamily="var(--font-monospace)"
                    color="var(--status-text)"
                    marginBottom={1}
                  >
                    {t("status.cleanShort")}
                  </Text>
                  <View
                    width="100%"
                    height={4}
                    backgroundColor="#004400"
                    borderRadius={2}
                    borderWidth={1}
                    borderColor="#002200"
                  >
                    <View
                      width={`${gameState.stats.cleanliness}%`}
                      height="100%"
                      backgroundColor={
                        gameState.stats.cleanliness > 50
                          ? "var(--status-good)"
                          : gameState.stats.cleanliness > 25
                          ? "var(--status-medium)"
                          : "var(--status-bad)"
                      }
                      borderRadius={1}
                    />
                  </View>
                  <Text
                    fontSize={5}
                    fontFamily="var(--font-monospace)"
                    color="var(--status-text-bright)"
                    marginTop={1}
                  >
                    {Math.round(gameState.stats.cleanliness)}%
                  </Text>
                </View>

                <View alignItems="center" flex={1}>
                  <Text
                    fontSize={6}
                    fontFamily="var(--font-monospace)"
                    color="var(--status-text)"
                    marginBottom={1}
                  >
                    {t("status.ageShort")}
                  </Text>
                  <View
                    width="100%"
                    height={4}
                    backgroundColor="#004400"
                    borderRadius={2}
                    borderWidth={1}
                    borderColor="#002200"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Text fontSize={5} fontFamily="var(--font-monospace)" color="var(--status-text-bright)">
                      {Math.floor(gameState.stats.age)}h
                    </Text>
                  </View>
                  <Text
                    fontSize={5}
                    fontFamily="var(--font-monospace)"
                    color="var(--status-text)"
                    marginTop={1}
                  >
                    AGE
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
              fontFamily="var(--font-monospace)"
              color="var(--status-text-bright)"
              textAlign="center"
              marginBottom={8}
              textTransform="uppercase"
              letterSpacing={1}
            >
              {t("status.detailedStats")}
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
                <Text fontSize={9} fontFamily="var(--font-monospace)" color="var(--status-text)">
                  {t("status.ageLabel")}
                </Text>
                <Text fontSize={9} fontFamily="var(--font-monospace)" color="var(--status-text-bright)">
                  {Math.floor(gameState.stats.age)}h{" "}
                  {Math.floor((gameState.stats.age % 1) * 60)}m
                </Text>
              </View>
              <View
                flexDirection="row"
                justifyContent="space-between"
                marginBottom={6}
              >
                <Text fontSize={9} fontFamily="var(--font-monospace)" color="var(--status-text)">
                  {t("status.weightLabel")}
                </Text>
                <Text fontSize={9} fontFamily="var(--font-monospace)" color="var(--status-text-bright)">
                  {Math.round(gameState.stats.weight)}g
                </Text>
              </View>
              <View
                flexDirection="row"
                justifyContent="space-between"
                marginBottom={6}
              >
                <Text fontSize={9} fontFamily="var(--font-monospace)" color="var(--status-text)">
                  {t("status.statusLabel")}
                </Text>
                <Text
                  fontSize={9}
                  fontFamily="var(--font-monospace)"
                  color="var(--status-text-bright)"
                  textTransform="uppercase"
                >
                  {gameState.isAlive ? gameState.mood : t("status.dead")}
                </Text>
              </View>
              <View flexDirection="row" justifyContent="space-between">
                <Text fontSize={9} fontFamily="var(--font-monospace)" color="var(--status-text)">
                  {t("status.activityLabel")}
                </Text>
                <Text
                  fontSize={9}
                  fontFamily="var(--font-monospace)"
                  color="var(--status-text-bright)"
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
              fontFamily="var(--font-monospace)"
              color="var(--status-text-bright)"
              textAlign="center"
              marginBottom={8}
              textTransform="uppercase"
              letterSpacing={1}
            >
              {t("status.settings")}
            </Text>
            <View width="100%" gap={8}>
              <View
                padding={8}
                backgroundColor="transparent"
                borderWidth={1}
                borderColor="var(--status-text)"
                cursor="pointer"
                alignItems="center"
                onPress={onReset}
                pressStyle={{
                  backgroundColor: "var(--hover-green)",
                }}
              >
                <Text fontSize={9} fontFamily="var(--font-monospace)" color="var(--status-text-bright)">
                  {t("actions.reset")}
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>

      <View alignItems="center" marginTop={15}>
        <View
          flexDirection="row"
          justifyContent="space-evenly"
          paddingHorizontal={30}
          marginBottom={20}
          width="100%"
        >
          <View
            width={50}
            height={50}
            backgroundColor="var(--btn-primary)"
            borderRadius={25}
            borderWidth={3}
            borderColor="var(--btn-primary-hover)"
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
            onPress={() => onNavigate(NavigationPage.MAIN)}
            pressStyle={{
              backgroundColor: "var(--btn-primary-hover)",
              transform: "scale(0.95)",
            }}
            style={{
              boxShadow:
                "0 4px 8px var(--shadow-dark), inset 0 2px 4px var(--shadow-light)",
            }}
          >
            <Text
              fontSize={8}
              fontFamily="var(--font-monospace)"
              color="var(--btn-text)"
              fontWeight="bold"
            >
              {t('actions.main')}
            </Text>
          </View>

          <View
            width={50}
            height={50}
            backgroundColor="var(--btn-primary)"
            borderRadius={25}
            borderWidth={3}
            borderColor="var(--btn-primary-hover)"
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
            onPress={() => onNavigate(NavigationPage.STATS)}
            pressStyle={{
              backgroundColor: "var(--btn-primary-hover)",
              transform: "scale(0.95)",
            }}
            style={{
              boxShadow:
                "0 4px 8px var(--shadow-dark), inset 0 2px 4px var(--shadow-light)",
            }}
          >
            <Text
              fontSize={8}
              fontFamily="var(--font-monospace)"
              color="var(--btn-text)"
              fontWeight="bold"
            >
              {t("status.stat")}
            </Text>
          </View>

          <View
            width={50}
            height={50}
            backgroundColor="var(--btn-primary)"
            borderRadius={25}
            borderWidth={3}
            borderColor="var(--btn-primary-hover)"
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
            onPress={() => onNavigate(NavigationPage.SETTINGS)}
            pressStyle={{
              backgroundColor: "var(--btn-primary-hover)",
              transform: "scale(0.95)",
            }}
            style={{
              boxShadow:
                "0 4px 8px var(--shadow-dark), inset 0 2px 4px var(--shadow-light)",
            }}
          >
            <Text
              fontSize={8}
              fontFamily="var(--font-monospace)"
              color="var(--btn-text)"
              fontWeight="bold"
            >
              {t("actions.set")}
            </Text>
          </View>
        </View>
        <View
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="space-between"
          paddingHorizontal={10}
          gap={2}
          width="100%"
        >
          <View
            width={60}
            height={40}
            backgroundColor={gameState.isAlive ? "var(--btn-feed)" : "var(--btn-disabled)"}
            borderRadius={20}
            borderWidth={3}
            borderColor={gameState.isAlive ? "var(--btn-feed-border)" : "var(--btn-disabled-border)"}
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
              backgroundColor: gameState.isAlive ? "var(--btn-feed-hover)" : "var(--btn-disabled)",
              transform: "scale(0.95)",
            }}
            style={{
              boxShadow:
                "0 3px 6px var(--shadow-dark), inset 0 1px 2px var(--shadow-light)",
            }}
          >
            <Text fontSize={16}>🍎</Text>
          </View>

          <View
            width={60}
            height={40}
            backgroundColor={gameState.isAlive ? "var(--btn-play)" : "var(--btn-disabled)"}
            borderRadius={20}
            borderWidth={3}
            borderColor={gameState.isAlive ? "var(--btn-play-border)" : "var(--btn-disabled-border)"}
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
              backgroundColor: gameState.isAlive ? "var(--btn-play-hover)" : "var(--btn-disabled)",
              transform: "scale(0.95)",
            }}
            style={{
              boxShadow:
                "0 3px 6px var(--shadow-dark), inset 0 1px 2px var(--shadow-light)",
            }}
          >
            <Text fontSize={16}>🎮</Text>
          </View>

          <View
            width={60}
            height={40}
            backgroundColor={gameState.isAlive ? "var(--btn-clean)" : "var(--btn-disabled)"}
            borderRadius={20}
            borderWidth={3}
            borderColor={gameState.isAlive ? "var(--btn-clean-border)" : "var(--btn-disabled-border)"}
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
              backgroundColor: gameState.isAlive ? "var(--btn-clean-hover)" : "var(--btn-disabled)",
              transform: "scale(0.95)",
            }}
            style={{
              boxShadow:
                "0 3px 6px var(--shadow-dark), inset 0 1px 2px var(--shadow-light)",
            }}
          >
            <Text fontSize={16}>🧼</Text>
          </View>

          <View
            width={60}
            height={40}
            backgroundColor={gameState.isAlive ? "var(--btn-sleep)" : "var(--btn-disabled)"}
            borderRadius={20}
            borderWidth={3}
            borderColor={gameState.isAlive ? "var(--btn-sleep-border)" : "var(--btn-disabled-border)"}
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
              backgroundColor: gameState.isAlive ? "var(--btn-sleep-hover)" : "var(--btn-disabled)",
              transform: "scale(0.95)",
            }}
            style={{
              boxShadow:
                "0 3px 6px var(--shadow-dark), inset 0 1px 2px var(--shadow-light)",
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
