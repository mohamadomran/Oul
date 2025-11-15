import { PainIntensity } from '../types';
import { PAIN_INTENSITY_OPTIONS } from '../data';

export const buildPainPhrase = (
  bodyPartArabic: string,
  intensity?: PainIntensity,
): string => {
  const basePart = 'عندي وجع';

  if (!intensity) {
    return `${basePart} ${bodyPartArabic}`;
  }

  const intensityOption = PAIN_INTENSITY_OPTIONS.find(
    option => option.level === intensity,
  );

  if (!intensityOption) {
    return `${basePart} ${bodyPartArabic}`;
  }

  return `${basePart} ${intensityOption.arabicLabel} ${bodyPartArabic}`;
};

export const buildPainPhraseEnglish = (
  bodyPartEnglish: string,
  intensity?: PainIntensity,
): string => {
  const basePart = 'I have';

  if (!intensity) {
    return `${basePart} pain in my ${bodyPartEnglish.toLowerCase()}`;
  }

  const intensityOption = PAIN_INTENSITY_OPTIONS.find(
    option => option.level === intensity,
  );

  if (!intensityOption) {
    return `${basePart} pain in my ${bodyPartEnglish.toLowerCase()}`;
  }

  return `${basePart} ${intensityOption.englishLabel.toLowerCase()} pain in my ${bodyPartEnglish.toLowerCase()}`;
};

export const getPainIntensityColor = (intensity?: PainIntensity): string => {
  if (!intensity) {
    return '#C9594C';
  }

  const intensityOption = PAIN_INTENSITY_OPTIONS.find(
    option => option.level === intensity,
  );

  return intensityOption?.color || '#C9594C';
};

export const getPainIntensityIcon = (intensity?: PainIntensity): string => {
  if (!intensity) {
    return '😐';
  }

  const intensityOption = PAIN_INTENSITY_OPTIONS.find(
    option => option.level === intensity,
  );

  return intensityOption?.icon || '😐';
};
