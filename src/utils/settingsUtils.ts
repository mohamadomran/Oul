import type { FontSize, ButtonSize } from '../types/settings.types';
import { FONT_SIZES } from '../constants';

// Font size multipliers based on setting
export const getFontSizeMultiplier = (fontSize: FontSize): number => {
  switch (fontSize) {
    case 'small':
      return 0.85;
    case 'medium':
      return 1.0;
    case 'large':
      return 1.15;
    case 'xlarge':
      return 1.3;
    default:
      return 1.0;
  }
};

// Get scaled font size
export const getScaledFontSize = (baseFontSize: number, fontSize: FontSize): number => {
  const multiplier = getFontSizeMultiplier(fontSize);
  return Math.round(baseFontSize * multiplier);
};

// Button height based on button size setting
export const getButtonHeight = (buttonSize: ButtonSize): number => {
  switch (buttonSize) {
    case 'normal':
      return 60;
    case 'large':
      return 80;
    case 'xlarge':
      return 100;
    default:
      return 80;
  }
};

// Button padding based on button size setting
export const getButtonPadding = (buttonSize: ButtonSize): number => {
  switch (buttonSize) {
    case 'normal':
      return 12;
    case 'large':
      return 16;
    case 'xlarge':
      return 20;
    default:
      return 16;
  }
};

// Get high contrast colors
export const getHighContrastColors = (highContrast: boolean) => {
  if (!highContrast) {
    return null;
  }

  return {
    text: '#000000',
    textSecondary: '#333333',
    background: '#FFFFFF',
    primary: '#0066CC',
    border: '#000000',
    shadow: '#000000',
  };
};

// Get accessible text color based on background
export const getAccessibleTextColor = (backgroundColor: string, highContrast: boolean): string => {
  if (highContrast) {
    // For high contrast, use black or white based on background luminance
    const rgb = parseInt(backgroundColor.replace('#', ''), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    return luminance > 0.5 ? '#000000' : '#FFFFFF';
  }

  return '#FFFFFF';
};
