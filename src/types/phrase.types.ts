export type Language = 'ar' | 'en' | 'fr';

export type PhraseCategory =
  | 'basic_needs'
  | 'pain'
  | 'emotions'
  | 'conversation'
  | 'family'
  | 'custom';

export type PainIntensity = 'light' | 'moderate' | 'severe';

export interface IconDefinition {
  library: 'Ionicons' | 'MaterialCommunityIcons' | 'FontAwesome5' | 'MaterialIcons';
  name: string;
  fallback: string;
}

export interface Phrase {
  id: string;
  arabicText: string;
  englishText: string;
  icon: IconDefinition;
  color: string;
  audioFile: string;
  category?: PhraseCategory;
  language?: Language;
  subcategory?: string;
}

export interface PainReport {
  location?: string;
  intensity?: PainIntensity;
  timestamp: number;
}
