/**
 * Font Family Constants
 *
 * IBM Plex Sans Arabic - Professional, modern font with excellent Arabic and Latin support
 * https://fonts.google.com/specimen/IBM+Plex+Sans+Arabic
 */

export const FONTS = {
  // Primary font family - IBM Plex Sans Arabic
  regular: 'IBMPlexSansArabic-Regular',
  medium: 'IBMPlexSansArabic-Medium',
  semiBold: 'IBMPlexSansArabic-SemiBold',
  bold: 'IBMPlexSansArabic-Bold',
} as const;

// Font family name for fontFamily property
export const FONT_FAMILY = 'IBMPlexSansArabic';

/**
 * Font weight mapping for IBM Plex Sans Arabic font
 * Use these weights with the IBM Plex Sans Arabic fontFamily
 */
export const FONT_WEIGHTS = {
  regular: '400' as const,
  medium: '500' as const,
  semiBold: '600' as const,
  bold: '700' as const,
} as const;

/**
 * Helper function to get font style
 * @param weight - Font weight ('regular' | 'medium' | 'semiBold' | 'bold')
 * @returns Font style object with fontFamily and fontWeight
 */
export const getFontStyle = (weight: keyof typeof FONTS = 'regular') => ({
  fontFamily: FONT_FAMILY,
  fontWeight: FONT_WEIGHTS[weight],
});
