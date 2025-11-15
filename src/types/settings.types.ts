// Font size options
export type FontSize = 'small' | 'medium' | 'large' | 'xlarge';

// Button size options
export type ButtonSize = 'normal' | 'large' | 'xlarge';

// Audio playback speed
export type PlaybackSpeed = 'slow' | 'normal' | 'fast';

// Share method preferences
export type ShareMethod = 'whatsapp' | 'sms' | 'ask';

// Theme options
export type Theme = 'light' | 'dark' | 'auto';

// App settings interface
export interface AppSettings {
  // Accessibility
  fontSize: FontSize;
  buttonSize: ButtonSize;
  highContrast: boolean;

  // Communication
  defaultShareMethod: ShareMethod;
  includeEnglishInShares: boolean;
  quickShare: boolean; // Skip confirmation

  // Display
  theme: Theme;
}

// Default settings
export const DEFAULT_SETTINGS: AppSettings = {
  // Accessibility
  fontSize: 'large',
  buttonSize: 'large',
  highContrast: false,

  // Communication
  defaultShareMethod: 'ask',
  includeEnglishInShares: true,
  quickShare: false,

  // Display
  theme: 'light',
};

// Storage key for AsyncStorage
export const SETTINGS_STORAGE_KEY = '@oul_app_settings';

// Haptic types
export type HapticType = 'light' | 'medium' | 'heavy';
export type NotificationHapticType = 'success' | 'warning' | 'error';
