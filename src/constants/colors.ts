export const COLORS = {
  // Primary Colors
  primary: '#4A90E2', // Blue
  primaryDark: '#357ABD',
  primaryLight: '#7AB8F5',

  // Category Colors (optimized for elderly users)
  basicNeeds: '#4A90E2', // Blue - calm, trustworthy
  pain: '#C9594C', // Soft coral-red - easier on eyes
  emotions: '#F39C12', // Orange - warm, friendly
  conversation: '#27AE60', // Green - positive, encouraging
  custom: '#9B59B6', // Purple - creative
  settings: '#34495E', // Dark gray - neutral

  // Pain Intensity Colors (softer, easier on eyes)
  painLight: '#F1C40F', // Yellow - mild discomfort
  painModerate: '#E67E22', // Orange - moderate pain
  painSevere: '#C9594C', // Soft coral-red - severe pain

  // UI Colors
  background: '#FFFFFF',
  surface: '#F5F5F5',
  border: '#E0E0E0',
  text: '#2C3E50', // Dark text (WCAG AAA on white)
  textSecondary: '#5A6C7D', // Darker for better contrast
  textLight: '#95A5A6',
  white: '#FFFFFF',
  black: '#000000',

  // Button states
  disabled: '#BDC3C7',
  disabledText: '#7F8C8D',
  pressed: 'rgba(0, 0, 0, 0.1)',

  // Status Colors
  success: '#27AE60',
  warning: '#F39C12',
  error: '#E74C3C',
  info: '#3498DB',

  // High Contrast Mode (for accessibility)
  highContrastBackground: '#000000',
  highContrastButton: '#1A1A1A',
  highContrastText: '#FFFFFF',
  highContrastBorder: '#FFFFFF',
  highContrastPressed: 'rgba(255, 255, 255, 0.2)',

  // Transparent overlays
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayLight: 'rgba(0, 0, 0, 0.3)',
} as const;

/**
 * Category color map
 */
export const CATEGORY_COLORS = {
  BasicNeeds: COLORS.basicNeeds,
  Pain: COLORS.pain,
  Emotions: COLORS.emotions,
  Conversation: COLORS.conversation,
  Custom: COLORS.custom,
} as const;

/**
 * Pain intensity color map
 */
export const PAIN_INTENSITY_COLORS = {
  light: COLORS.painLight,
  moderate: COLORS.painModerate,
  severe: COLORS.painSevere,
} as const;
