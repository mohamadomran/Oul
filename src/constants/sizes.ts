/**
 * Size Constants
 *
 * Consistent spacing, sizing, and typography
 */

/**
 * Spacing scale (generous spacing for accessibility)
 * Based on 8px grid with larger values for easier touch
 */
export const SPACING = {
  xs: 4,
  sm: 12,    // Increased from 8
  md: 20,    // Increased from 16
  lg: 32,    // Increased from 24
  xl: 48,    // Increased from 32
  xxl: 64,   // Increased from 48
} as const;

/**
 * Button sizes (optimized for elderly users with reduced dexterity)
 * All sizes exceed minimum 48x48dp recommendation (WCAG 2.5.5)
 */
export const BUTTON_SIZES = {
  // Standard phrase buttons
  normal: {
    height: 100,
    minWidth: 100,
    fontSize: 18,      // Arabic text
    iconSize: 36,
    padding: 12,
  },
  // Home screen category buttons (PRIMARY SIZE)
  large: {
    height: 160,
    minWidth: 160,
    fontSize: 22,      // Arabic text (optimized readability)
    iconSize: 56,      // Large emoji icons
    padding: 16,
  },
  // Extra large for critical actions
  xlarge: {
    height: 180,
    minWidth: 180,
    fontSize: 26,
    iconSize: 64,
    padding: 20,
  },
} as const;

/**
 * Font sizes
 */
export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 40,
} as const;

/**
 * Border radius
 */
export const BORDER_RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  round: 999,
} as const;

/**
 * Screen padding (safe area)
 */
export const SCREEN_PADDING = SPACING.md;

/**
 * Grid layout
 */
export const GRID = {
  columns: 2,              // For grid layouts (Custom Phrases)
  gap: SPACING.md,         // Gap between grid items
} as const;
