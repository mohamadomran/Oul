/**
 * Pain Phrase Builder Utility
 *
 * Dynamically composes Arabic pain phrases combining:
 * - Body part location (e.g., "راسي" = my head)
 * - Intensity level (e.g., "خفيف", "متوسط", "قوي")
 *
 * Examples:
 * - buildPainPhrase("راسي") → "عندي وجع راسي" (I have pain in my head)
 * - buildPainPhrase("راسي", "severe") → "عندي وجع قوي راسي" (I have severe pain in my head)
 */

import { PainIntensity } from '../types';
import { PAIN_INTENSITY_OPTIONS } from '../data/painLocationData';

/**
 * Build a complete pain phrase in Arabic
 *
 * @param bodyPartArabic - The Arabic text for the body part (e.g., "راسي")
 * @param intensity - Optional intensity level (light, moderate, severe)
 * @returns Complete Arabic phrase
 */
export const buildPainPhrase = (
  bodyPartArabic: string,
  intensity?: PainIntensity
): string => {
  // Base phrase: "I have pain"
  const basePart = 'عندي وجع';

  // If no intensity specified, return simple phrase
  if (!intensity) {
    return `${basePart} ${bodyPartArabic}`;
  }

  // Find the intensity label
  const intensityOption = PAIN_INTENSITY_OPTIONS.find(
    (option) => option.level === intensity
  );

  if (!intensityOption) {
    // Fallback if intensity not found
    return `${basePart} ${bodyPartArabic}`;
  }

  // Complete phrase: "I have [intensity] pain in [body part]"
  // Arabic structure: "عندي وجع [intensity] [bodyPart]"
  return `${basePart} ${intensityOption.arabicLabel} ${bodyPartArabic}`;
};

/**
 * Build an English translation of the pain phrase
 *
 * @param bodyPartEnglish - The English text for the body part (e.g., "Head")
 * @param intensity - Optional intensity level (light, moderate, severe)
 * @returns Complete English phrase
 */
export const buildPainPhraseEnglish = (
  bodyPartEnglish: string,
  intensity?: PainIntensity
): string => {
  // Base phrase
  const basePart = 'I have';

  // If no intensity specified
  if (!intensity) {
    return `${basePart} pain in my ${bodyPartEnglish.toLowerCase()}`;
  }

  // Find the intensity label
  const intensityOption = PAIN_INTENSITY_OPTIONS.find(
    (option) => option.level === intensity
  );

  if (!intensityOption) {
    return `${basePart} pain in my ${bodyPartEnglish.toLowerCase()}`;
  }

  // Complete phrase
  return `${basePart} ${intensityOption.englishLabel.toLowerCase()} pain in my ${bodyPartEnglish.toLowerCase()}`;
};

/**
 * Get the color for a pain intensity level
 *
 * @param intensity - Intensity level
 * @returns Hex color code
 */
export const getPainIntensityColor = (intensity?: PainIntensity): string => {
  if (!intensity) {
    return '#C9594C'; // Default pain color
  }

  const intensityOption = PAIN_INTENSITY_OPTIONS.find(
    (option) => option.level === intensity
  );

  return intensityOption?.color || '#C9594C';
};

/**
 * Get the emoji icon for a pain intensity level
 *
 * @param intensity - Intensity level
 * @returns Emoji string
 */
export const getPainIntensityIcon = (intensity?: PainIntensity): string => {
  if (!intensity) {
    return '😐'; // Default neutral face
  }

  const intensityOption = PAIN_INTENSITY_OPTIONS.find(
    (option) => option.level === intensity
  );

  return intensityOption?.icon || '😐';
};
