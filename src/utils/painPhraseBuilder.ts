import { PainIntensity } from '../types';
import { COLORS } from '../constants';

const INTENSITY_LABELS: Record<PainIntensity, { arabic: string; english: string; color: string; icon: string }> = {
  light: { arabic: 'خفيف', english: 'light', color: COLORS.painLight, icon: '😐' },
  moderate: { arabic: 'متوسط', english: 'moderate', color: COLORS.painModerate, icon: '😣' },
  severe: { arabic: 'شديد', english: 'severe', color: COLORS.painSevere, icon: '😫' },
};

export const buildPainPhrase = (
  bodyPartArabic: string,
  intensity?: PainIntensity,
): string => {
  const basePart = 'عندي وجع';

  if (!intensity) {
    return `${basePart} ${bodyPartArabic}`;
  }

  const label = INTENSITY_LABELS[intensity]?.arabic;
  if (!label) {
    return `${basePart} ${bodyPartArabic}`;
  }

  return `${basePart} ${label} ${bodyPartArabic}`;
};

export const buildPainPhraseEnglish = (
  bodyPartEnglish: string,
  intensity?: PainIntensity,
): string => {
  const basePart = 'I have';

  if (!intensity) {
    return `${basePart} pain in my ${bodyPartEnglish.toLowerCase()}`;
  }

  const label = INTENSITY_LABELS[intensity]?.english;
  if (!label) {
    return `${basePart} pain in my ${bodyPartEnglish.toLowerCase()}`;
  }

  return `${basePart} ${label} pain in my ${bodyPartEnglish.toLowerCase()}`;
};

export const getPainIntensityColor = (intensity?: PainIntensity): string => {
  if (!intensity) {
    return COLORS.painSevere;
  }

  return INTENSITY_LABELS[intensity]?.color || COLORS.painSevere;
};

export const getPainIntensityIcon = (intensity?: PainIntensity): string => {
  if (!intensity) {
    return '😐';
  }

  return INTENSITY_LABELS[intensity]?.icon || '😐';
};
