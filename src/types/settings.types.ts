/**
 * Settings Types
 *
 * App configuration and user preferences
 */

/**
 * App Settings
 */
export interface AppSettings {
  // Accessibility Settings
  hapticFeedback: boolean; // Haptic feedback on button press (default: true)
  highContrast: boolean; // High contrast mode (default: false)
  buttonSize: 'normal' | 'large' | 'xlarge'; // Button size (default: 'normal')

  // Future Settings (not implemented yet)
  volume?: number; // 0.0 - 1.0 (default: 1.0)
  fontSize?: 'normal' | 'large'; // Text size
}

/**
 * Default settings
 */
export const DEFAULT_SETTINGS: AppSettings = {
  hapticFeedback: true,
  highContrast: false,
  buttonSize: 'normal',
};

/**
 * Haptic feedback types
 */
export type HapticType = 'light' | 'medium' | 'heavy';

/**
 * Notification haptic types
 */
export type NotificationHapticType = 'success' | 'warning' | 'error';
