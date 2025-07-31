import React from 'react';
import { View, Text } from '@tamagui/core';
import { useTranslation } from '../hooks/useTranslation';

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
      backgroundColor="rgba(255,255,255,0.9)"
      borderRadius={8}
      borderWidth={1}
      borderColor="#ccc"
    >
      <Text
        fontSize={10}
        fontFamily="monospace"
        color="#666"
        textTransform="uppercase"
        marginRight={4}
      >
        Language:
      </Text>
      <View
        onPress={() => handleLanguageChange('en')}
        padding={4}
        paddingHorizontal={8}
        backgroundColor={currentLanguage === 'en' ? '#333' : 'transparent'}
        borderRadius={4}
        cursor="pointer"
      >
        <Text
          fontSize={10}
          fontFamily="monospace"
          color={currentLanguage === 'en' ? '#fff' : '#333'}
          textTransform="uppercase"
        >
          EN
        </Text>
      </View>
      <View
        onPress={() => handleLanguageChange('es')}
        padding={4}
        paddingHorizontal={8}
        backgroundColor={currentLanguage === 'es' ? '#333' : 'transparent'}
        borderRadius={4}
        cursor="pointer"
      >
        <Text
          fontSize={10}
          fontFamily="monospace"
          color={currentLanguage === 'es' ? '#fff' : '#333'}
          textTransform="uppercase"
        >
          ES
        </Text>
      </View>
    </View>
  );
};

export default LanguageSwitcher;