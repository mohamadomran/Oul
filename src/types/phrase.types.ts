export type Language = 'ar' | 'en' | 'fr';

export type PhraseCategory =
  | 'BasicNeeds'
  | 'Pain'
  | 'Emotions'
  | 'Conversation'
  | 'Custom';

export type PainIntensity = 'light' | 'moderate' | 'severe';

export interface Phrase {
  id: string;
  arabicText: string;
  englishText?: string;
  icon: string;
  color: string;
  audioFile: string;
  language: Language;
  category: PhraseCategory;
  subcategory?: string;
}

export interface PainReport {
  location?: string;
  intensity?: PainIntensity;
  timestamp: number;
}
