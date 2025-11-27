export const SPACING = {
  xxs: 2,
  xs: 4,
  sm: 12, // Increased from 8
  md: 20, // Increased from 16
  lg: 32, // Increased from 24
  xl: 48, // Increased from 32
  xxl: 64, // Increased from 48
} as const;

/**
 * Button sizes (optimized for elderly users with reduced dexterity)
 * All sizes exceed minimum 48x48dp recommendation (WCAG 2.5.5)
 * Heights are compact to fit more content on screen while remaining accessible
 */
export const BUTTON_SIZES = {
  // Compact phrase buttons - fits more on screen
  normal: {
    height: 90, // Reduced from 120 for better fit
    minWidth: 100,
    fontSize: 18, // Arabic text
    iconSize: 32, // Icon size
    padding: 10,
  },
  // Standard phrase buttons
  large: {
    height: 110,
    minWidth: 120,
    fontSize: 20,
    iconSize: 40,
    padding: 12,
  },
  // Extra large for critical actions
  xlarge: {
    height: 130,
    minWidth: 140,
    fontSize: 22,
    iconSize: 48,
    padding: 14,
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
  columns: 2, // For grid layouts (Custom Phrases)
  gap: SPACING.md, // Gap between grid items
} as const;
