/**
 * Phrase Types
 *
 * Core data structures for phrases (both static and custom)
 */

export type Language = 'ar' | 'en' | 'fr';

export type PhraseCategory =
  | 'BasicNeeds'
  | 'Pain'
  | 'Emotions'
  | 'Conversation'
  | 'Custom';

export type PainIntensity = 'light' | 'moderate' | 'severe';

/**
 * Static Phrase (pre-recorded audio)
 */
export interface Phrase {
  id: string;                    // Unique identifier (maps to audio filename)
  arabicText: string;            // Arabic text to display
  englishText?: string;          // Optional English translation
  icon: string;                  // Emoji icon
  color: string;                 // Hex color for button
  audioFile: string;             // Path to pre-recorded audio: 'ar/basic-needs/hungry'
  language: Language;            // Primary language
  category: PhraseCategory;      // Category for organization
  subcategory?: string;          // Optional subcategory (for Conversation)
}

/**
 * Custom Phrase (user-created, uses TTS)
 */
export interface CustomPhrase {
  id: string;                    // UUID
  arabicText: string;            // Arabic text
  englishText?: string;          // Optional English translation
  icon: string;                  // User-selected emoji
  color: string;                 // User-selected color
  language: Language;            // TTS language
  useTTS: true;                  // Flag to indicate TTS usage (not pre-recorded)
  createdAt: number;             // Timestamp
  lastUsed?: number;             // Last usage timestamp
  usageCount: number;            // Usage counter
}

/**
 * Pain report data structure
 */
export interface PainReport {
  location?: string;             // Body part (head, chest, stomach, etc.)
  intensity?: PainIntensity;     // Pain level
  timestamp: number;             // When reported
}

/**
 * Button size variants
 */
export type ButtonSize = 'normal' | 'large' | 'xlarge';

/**
 * Type guard to check if phrase is custom
 */
export function isCustomPhrase(phrase: Phrase | CustomPhrase): phrase is CustomPhrase {
  return 'useTTS' in phrase && phrase.useTTS === true;
}
