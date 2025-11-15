/**
 * Settings Types
 *
 * App configuration and user preferences
 */

/**
 * App Settings
 */
export interface AppSettings {
  // TTS Settings (for custom phrases only, static phrases use pre-recorded audio)
  speechRate: number;            // 0.3 - 1.5 (default: 0.7)

  // Accessibility Settings
  hapticFeedback: boolean;       // Haptic feedback on button press (default: true)
  highContrast: boolean;         // High contrast mode (default: false)
  buttonSize: 'normal' | 'large' | 'xlarge';  // Button size (default: 'normal')

  // Future Settings (not implemented yet)
  volume?: number;               // 0.0 - 1.0 (default: 1.0)
  fontSize?: 'normal' | 'large'; // Text size
}

/**
 * Default settings
 */
export const DEFAULT_SETTINGS: AppSettings = {
  speechRate: 0.7,
  hapticFeedback: true,
  highContrast: false,
  buttonSize: 'normal',
};

/**
 * Speech rate presets
 */
export const SPEECH_RATE_PRESETS = {
  VERY_SLOW: 0.3,
  SLOW: 0.5,
  NORMAL: 0.7,
  FAST: 0.9,
  VERY_FAST: 1.2,
} as const;

/**
 * Haptic feedback types
 */
export type HapticType = 'light' | 'medium' | 'heavy';

/**
 * Notification haptic types
 */
export type NotificationHapticType = 'success' | 'warning' | 'error';
