import { useState } from "react";
import { View, Text } from "@tamagui/core";
import { useVirtualPet } from "@/hooks/virtualPet/useVirtualPet";
import VirtualPetDevice from "@/components/virtualPet/VirtualPetDevice";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import GitHubButton from "@/components/GitHubButton";
import Seo from "@/components/SEO";
import { useTranslation } from "@/hooks/useTranslation";
import { NavigationPage } from "@/types/pet-types";

export default function Home() {
  const { gameState, isLoading, performAction, resetGame } = useVirtualPet();
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState<NavigationPage>(
    NavigationPage.MAIN
  );

  if (isLoading || !gameState) {
    return (
      <View
        flex={1}
        justifyContent="center"
        alignItems="center"
        backgroundColor="var(--bg-primary)"
        minHeight="100vh"
      >
        <View alignItems="center" gap={16}>
          <View
            width={40}
            height={40}
            borderWidth={4}
            borderColor="var(--border-primary)"
            borderTopColor="transparent"
            borderRadius={20}
          />
          <Text
            fontSize={16}
            fontFamily="var(--font-monospace)"
            color="var(--text-primary)"
            textTransform="uppercase"
            letterSpacing={2}
          >
            {t("loading.pet")}
          </Text>
          <Text
            fontSize={12}
            fontFamily="var(--font-monospace)"
            color="var(--text-secondary)"
            textAlign="center"
          >
            {t("loading.initializing")}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <>
      <Seo
        description={t("app.subtitle") + " - " + t("instructions.description")}
        keywords="virtual pet, digital pet, pet game, browser game, virtual companion, pet simulator, online pet, retro game, nostalgic game, mascota virtual, juego de mascotas"
      />
      <View
        flex={1}
        backgroundColor="var(--bg-primary)"
        minHeight="100vh"
        padding={10}
        gap={10}
        style={{
          backgroundImage: `
            radial-gradient(circle at 20px 20px, var(--bg-pattern-1) 2px, transparent 0),
            radial-gradient(circle at 40px 40px, var(--bg-pattern-2) 1px, transparent 0)
          `,
          backgroundSize: "60px 60px",
          backgroundPosition: "0 0, 30px 30px",
        }}
      >
        <VirtualPetDevice
          gameState={gameState}
          onAction={performAction}
          onReset={resetGame}
          onNavigate={setCurrentPage}
          currentPage={currentPage}
        />
        <View
          padding={16}
          backgroundColor="var(--bg-overlay)"
          borderWidth={1}
          borderColor="var(--border-secondary)"
          borderRadius={8}
          maxWidth={400}
          margin="auto"
        >
          <Text
            fontSize={12}
            fontFamily="var(--font-monospace)"
            color="var(--text-primary)"
            textAlign="center"
            marginBottom={8}
            textTransform="uppercase"
          >
            {t("instructions.title")}
          </Text>
          <Text
            fontSize={10}
            fontFamily="var(--font-monospace)"
            color="var(--text-secondary)"
            textAlign="center"
            lineHeight={14}
          >
            {t("instructions.description")}
          </Text>
        </View>

        <View alignItems="center">
          <LanguageSwitcher />
        </View>
        
        <GitHubButton repositoryUrl="https://github.com/dm94/kiwokochi" />
      </View>
    </>
  );
}
