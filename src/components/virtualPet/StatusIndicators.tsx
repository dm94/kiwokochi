import React from "react";
import { View, Text } from "@tamagui/core";
import type { VirtualPetState } from "../../types/pet-types";

interface StatusIndicatorsProps {
  gameState: VirtualPetState;
}

const StatusIndicators: React.FC<StatusIndicatorsProps> = ({ gameState }) => {
  const { stats } = gameState;

  // Función para obtener el color según el valor
  const getStatusColor = (value: number): string => {
    if (value >= 70) return "#00ff00"; // Verde
    if (value >= 40) return "#ffff00"; // Amarillo
    if (value >= 20) return "#ff8800"; // Naranja
    return "#ff0000"; // Rojo
  };

  // Función para obtener el color de fondo de la barra
  const getBarBackground = (value: number): string => {
    if (value >= 70) return "#004400";
    if (value >= 40) return "#444400";
    if (value >= 20) return "#442200";
    return "#440000";
  };

  const renderStatBar = (
    label: string,
    value: number,
    maxValue: number = 100,
    color: string
  ) => {
    const percentage = Math.max(0, Math.min(100, (value / maxValue) * 100));

    return (
      <View key={label} flexDirection="row" alignItems="center" gap={8}>
        <Text
          fontSize={8}
          fontFamily="monospace"
          color="$color"
          width={50}
          textAlign="left"
        >
          {label}:
        </Text>
        <View flex={1} height={8} backgroundColor="#ddd" borderRadius={0}>
          <View
            height="100%"
            width={`${percentage}%`}
            backgroundColor={color}
            borderRadius={0}
          />
        </View>
        <Text
          fontSize={8}
          fontFamily="monospace"
          color="$color"
          width={30}
          textAlign="right"
        >
          {Math.round(value)}
        </Text>
      </View>
    );
  };

  return (
    <View>
      {/* Título */}
      <Text
        fontSize={12}
        fontFamily="monospace"
        color="#333"
        textAlign="center"
        marginBottom={12}
        textTransform="uppercase"
        letterSpacing={1}
      >
        STATUS
      </Text>

      {/* Grid de indicadores */}
      <View gap={4}>
        {renderStatBar(
          "Hunger",
          gameState.stats.hunger,
          100,
          getStatusColor((gameState.stats.hunger / 100) * 100)
        )}
        {renderStatBar(
          "Happiness",
          gameState.stats.happiness,
          100,
          getStatusColor((gameState.stats.happiness / 100) * 100)
        )}
        {renderStatBar(
          "Health",
          gameState.stats.health,
          100,
          getStatusColor((gameState.stats.health / 100) * 100)
        )}
        {renderStatBar(
          "Energy",
          gameState.stats.energy,
          100,
          getStatusColor((gameState.stats.energy / 100) * 100)
        )}
        {renderStatBar(
          "Cleanliness",
          gameState.stats.cleanliness,
          100,
          getStatusColor((gameState.stats.cleanliness / 100) * 100)
        )}
      </View>

      {/* Información adicional */}
      <View
        marginTop={12}
        padding={6}
        backgroundColor="#f8f8f8"
        borderWidth={1}
        borderColor="#ccc"
        borderRadius={2}
      >
        <View
          flexDirection="row"
          justifyContent="space-between"
          marginBottom={2}
        >
          <Text fontSize={8} fontFamily="monospace" color="#666">
            AGE:
          </Text>
          <Text fontSize={8} fontFamily="monospace" color="#333">
            {Math.round(stats.age)}h
          </Text>
        </View>

        <View
          flexDirection="row"
          justifyContent="space-between"
          marginBottom={2}
        >
          <Text fontSize={8} fontFamily="monospace" color="#666">
            WEIGHT:
          </Text>
          <Text fontSize={8} fontFamily="monospace" color="#333">
            {Math.round(stats.weight)}g
          </Text>
        </View>

        <View flexDirection="row" justifyContent="space-between">
          <Text fontSize={8} fontFamily="monospace" color="#666">
            MOOD:
          </Text>
          <Text
            fontSize={8}
            fontFamily="monospace"
            color="#333"
            textTransform="uppercase"
          >
            {gameState.mood}
          </Text>
        </View>
      </View>

      {/* Alertas críticas */}
      {gameState.isAlive && (
        <View marginTop={8}>
          {stats.health < 20 && (
            <View
              padding={4}
              backgroundColor="#ffeeee"
              borderWidth={1}
              borderColor="#ff0000"
              borderRadius={2}
              marginBottom={4}
            >
              <Text
                fontSize={8}
                fontFamily="monospace"
                color="#ff0000"
                textAlign="center"
                className="animate-pulse"
              >
                ⚠️ CRITICAL HEALTH!
              </Text>
            </View>
          )}

          {stats.hunger < 10 && (
            <View
              padding={4}
              backgroundColor="#fff8ee"
              borderWidth={1}
              borderColor="#ff8800"
              borderRadius={2}
              marginBottom={4}
            >
              <Text
                fontSize={8}
                fontFamily="monospace"
                color="#ff8800"
                textAlign="center"
                className="animate-bounce"
              >
                🍎 STARVING!
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default StatusIndicators;
