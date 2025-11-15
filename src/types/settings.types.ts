export interface AppSettings {
  hapticFeedback: boolean;
  highContrast: boolean;
  buttonSize: 'normal' | 'large' | 'xlarge';
  volume?: number;
  fontSize?: 'normal' | 'large';
}

export const DEFAULT_SETTINGS: AppSettings = {
  hapticFeedback: true,
  highContrast: false,
  buttonSize: 'normal',
};

export type HapticType = 'light' | 'medium' | 'heavy';
export type NotificationHapticType = 'success' | 'warning' | 'error';
