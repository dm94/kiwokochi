import React from 'react';
import { View, Text } from '@tamagui/core';
import { useTranslation } from '@/hooks/useTranslation';

const LanguageSwitcher: React.FC = () => {
  const { changeLanguage, currentLanguage } = useTranslation();

  const handleLanguageChange = (language: string) => {
    changeLanguage(language);
  };

  return (
    <View
      flexDirection="row"
      gap={8}
      alignItems="center"
      padding={8}
      backgroundColor="var(--bg-overlay)"
      borderRadius={8}
      borderWidth={1}
      borderColor="var(--border-secondary)"
    >
      <Text
        fontSize={10}
        fontFamily="var(--font-monospace)"
        color="var(--text-secondary)"
        textTransform="uppercase"
        marginRight={4}
      >
        Language:
      </Text>
      <View
        onPress={() => handleLanguageChange('en')}
        padding={4}
        paddingHorizontal={8}
        backgroundColor={currentLanguage === 'en' ? 'var(--text-primary)' : 'transparent'}
        borderRadius={4}
        cursor="pointer"
      >
        <Text
          fontSize={10}
          fontFamily="var(--font-monospace)"
          color={currentLanguage === 'en' ? 'var(--text-white)' : 'var(--text-primary)'}
          textTransform="uppercase"
        >
          EN
        </Text>
      </View>
      <View
        onPress={() => handleLanguageChange('es')}
        padding={4}
        paddingHorizontal={8}
        backgroundColor={currentLanguage === 'es' ? 'var(--text-primary)' : 'transparent'}
        borderRadius={4}
        cursor="pointer"
      >
        <Text
          fontSize={10}
          fontFamily="var(--font-monospace)"
          color={currentLanguage === 'es' ? 'var(--text-white)' : 'var(--text-primary)'}
          textTransform="uppercase"
        >
          ES
        </Text>
      </View>
    </View>
  );
};

export default LanguageSwitcher;