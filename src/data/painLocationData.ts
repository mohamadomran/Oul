import { Phrase, PainIntensity } from '../types';
import type { PainIntensityOption } from '../types/utility.types';

export const PAIN_INTENSITY_OPTIONS: PainIntensityOption[] = [
  {
    level: 'light',
    arabicLabel: 'خفيف',
    englishLabel: 'Light',
    color: '#F1C40F', // Yellow
    icon: '😐',
  },
  {
    level: 'moderate',
    arabicLabel: 'متوسط',
    englishLabel: 'Moderate',
    color: '#E67E22', // Orange
    icon: '😣',
  },
  {
    level: 'severe',
    arabicLabel: 'قوي',
    englishLabel: 'Severe',
    color: '#C9594C', // Coral-red
    icon: '😖',
  },
];

/**
 * Pain intensity phrases with audio files
 * Used for playing intensity audio before body part audio
 */
export const PAIN_INTENSITY_PHRASES: Phrase[] = [
  {
    id: 'pain_intensity_light',
    arabicText: 'خفيف',
    englishText: 'Light',
    category: 'Pain',
    audioFile: 'pain_intensity_light',
    icon: '😐',
    color: '#F1C40F',
    language: 'ar',
  },
  {
    id: 'pain_intensity_moderate',
    arabicText: 'متوسط',
    englishText: 'Moderate',
    category: 'Pain',
    audioFile: 'pain_intensity_moderate',
    icon: '😣',
    color: '#E67E22',
    language: 'ar',
  },
  {
    id: 'pain_intensity_severe',
    arabicText: 'قوي',
    englishText: 'Severe',
    category: 'Pain',
    audioFile: 'pain_intensity_severe',
    icon: '😖',
    color: '#C9594C',
    language: 'ar',
  },
];

/**
 * Body part phrases for pain location
 * Organized by category for better UX
 */
export const PAIN_BODY_PARTS: Phrase[] = [
  // Head/Face (4 items)
  {
    id: 'pain_head',
    arabicText: 'راسي',
    englishText: 'Head',
    category: 'Pain',
    audioFile: 'pain_head',
    icon: '🤕',
    color: '#C9594C',
    language: 'ar',
    subcategory: 'Head/Face',
  },
  {
    id: 'pain_eye',
    arabicText: 'عيني',
    englishText: 'Eye',
    category: 'Pain',
    audioFile: 'pain_eye',
    icon: '👁️',
    color: '#C9594C',
    language: 'ar',
    subcategory: 'Head/Face',
  },
  {
    id: 'pain_ear',
    arabicText: 'أذني',
    englishText: 'Ear',
    category: 'Pain',
    audioFile: 'pain_ear',
    icon: '👂',
    color: '#C9594C',
    language: 'ar',
    subcategory: 'Head/Face',
  },
  {
    id: 'pain_tooth',
    arabicText: 'سني',
    englishText: 'Tooth',
    category: 'Pain',
    audioFile: 'pain_tooth',
    icon: '🦷',
    color: '#C9594C',
    language: 'ar',
    subcategory: 'Head/Face',
  },

  // Upper Body (4 items)
  {
    id: 'pain_neck',
    arabicText: 'رقبتي',
    englishText: 'Neck',
    category: 'Pain',
    audioFile: 'pain_neck',
    icon: '🩹',
    color: '#C9594C',
    language: 'ar',
    subcategory: 'Upper Body',
  },
  {
    id: 'pain_shoulder',
    arabicText: 'كتفي',
    englishText: 'Shoulder',
    category: 'Pain',
    audioFile: 'pain_shoulder',
    icon: '💪',
    color: '#C9594C',
    language: 'ar',
    subcategory: 'Upper Body',
  },
  {
    id: 'pain_arm',
    arabicText: 'إيدي',
    englishText: 'Arm',
    category: 'Pain',
    audioFile: 'pain_arm',
    icon: '💪',
    color: '#C9594C',
    language: 'ar',
    subcategory: 'Upper Body',
  },
  {
    id: 'pain_chest',
    arabicText: 'صدري',
    englishText: 'Chest',
    category: 'Pain',
    audioFile: 'pain_chest',
    icon: '🫀',
    color: '#C9594C',
    language: 'ar',
    subcategory: 'Upper Body',
  },

  // Core (3 items)
  {
    id: 'pain_stomach',
    arabicText: 'معدتي',
    englishText: 'Stomach',
    category: 'Pain',
    audioFile: 'pain_stomach',
    icon: '🤰',
    color: '#C9594C',
    language: 'ar',
    subcategory: 'Core',
  },
  {
    id: 'pain_back',
    arabicText: 'ظهري',
    englishText: 'Back',
    category: 'Pain',
    audioFile: 'pain_back',
    icon: '🩹',
    color: '#C9594C',
    language: 'ar',
    subcategory: 'Core',
  },
  {
    id: 'pain_waist',
    arabicText: 'خصري',
    englishText: 'Waist',
    category: 'Pain',
    audioFile: 'pain_waist',
    icon: '🩹',
    color: '#C9594C',
    language: 'ar',
    subcategory: 'Core',
  },

  // Lower Body (3 items)
  {
    id: 'pain_leg',
    arabicText: 'رجلي',
    englishText: 'Leg',
    category: 'Pain',
    audioFile: 'pain_leg',
    icon: '🦵',
    color: '#C9594C',
    language: 'ar',
    subcategory: 'Lower Body',
  },
  {
    id: 'pain_knee',
    arabicText: 'ركبتي',
    englishText: 'Knee',
    category: 'Pain',
    audioFile: 'pain_knee',
    icon: '🦵',
    color: '#C9594C',
    language: 'ar',
    subcategory: 'Lower Body',
  },
  {
    id: 'pain_foot',
    arabicText: 'قدمي',
    englishText: 'Foot',
    category: 'Pain',
    audioFile: 'pain_foot',
    icon: '🦶',
    color: '#C9594C',
    language: 'ar',
    subcategory: 'Lower Body',
  },

  // General (2 items)
  {
    id: 'pain_whole_body',
    arabicText: 'كل جسمي',
    englishText: 'Whole body',
    category: 'Pain',
    audioFile: 'pain_whole_body',
    icon: '🤕',
    color: '#C9594C',
    language: 'ar',
    subcategory: 'General',
  },
  {
    id: 'pain_no_pain',
    arabicText: 'ما في وجع',
    englishText: 'No pain',
    category: 'Pain',
    audioFile: 'pain_no_pain',
    icon: '✅',
    color: '#27AE60', // Green for "no pain"
    language: 'ar',
    subcategory: 'General',
  },
];

/**
 * Emergency pain phrases for quick access
 */
export const PAIN_EMERGENCY_PHRASES: Phrase[] = [
  {
    id: 'pain_emergency_severe',
    arabicText: 'عندي وجع كتير',
    englishText: "I'm in a lot of pain",
    category: 'Pain',
    audioFile: 'pain_emergency_severe',
    icon: '😫',
    color: '#C0392B', // Dark red for emergency
    language: 'ar',
    subcategory: 'Emergency',
  },
  {
    id: 'pain_emergency_medicine',
    arabicText: 'بدي دوا',
    englishText: 'I need medicine',
    category: 'Pain',
    audioFile: 'pain_emergency_medicine',
    icon: '💉',
    color: '#E74C3C', // Red
    language: 'ar',
    subcategory: 'Emergency',
  },
  {
    id: 'pain_emergency_doctor',
    arabicText: 'بدي دكتور',
    englishText: 'I need a doctor',
    category: 'Pain',
    audioFile: 'pain_emergency_doctor',
    icon: '⚕️',
    color: '#E74C3C', // Red
    language: 'ar',
    subcategory: 'Emergency',
  },
];

/**
 * Get body parts grouped by subcategory
 */
export const getBodyPartsByCategory = (): Record<string, Phrase[]> => {
  const grouped: Record<string, Phrase[]> = {};

  PAIN_BODY_PARTS.forEach(part => {
    const category = part.subcategory || 'Other';
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push(part);
  });

  return grouped;
};

/**
 * Category order for display
 */
export const BODY_PART_CATEGORY_ORDER = [
  'Head/Face',
  'Upper Body',
  'Core',
  'Lower Body',
  'General',
];
