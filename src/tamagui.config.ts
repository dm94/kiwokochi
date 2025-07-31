import { createTamagui } from '@tamagui/core'
import { config } from '@tamagui/config/v3'

const tamaguiConfig = createTamagui({
  ...config,
  themes: {
    ...config.themes,
    retro: {
      background: '#f0f0f0',
      backgroundHover: '#e0e0e0',
      backgroundPress: '#d0d0d0',
      backgroundFocus: '#e8e8e8',
      color: '#000000',
      colorHover: '#333333',
      colorPress: '#666666',
      colorFocus: '#000000',
      borderColor: '#333333',
      borderColorHover: '#000000',
      borderColorPress: '#666666',
      borderColorFocus: '#000000',
      placeholderColor: '#999999',
    },
    retro_dark: {
      background: '#333333',
      backgroundHover: '#444444',
      backgroundPress: '#555555',
      backgroundFocus: '#404040',
      color: '#ffffff',
      colorHover: '#cccccc',
      colorPress: '#999999',
      colorFocus: '#ffffff',
      borderColor: '#cccccc',
      borderColorHover: '#ffffff',
      borderColorPress: '#999999',
      borderColorFocus: '#ffffff',
      placeholderColor: '#666666',
    },
  },
})

export default tamaguiConfig

export type Conf = typeof tamaguiConfig

declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends Conf {}
}