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
  id: string; // Unique identifier (maps to audio filename)
  arabicText: string; // Arabic text to display
  englishText?: string; // Optional English translation
  icon: string; // Emoji icon
  color: string; // Hex color for button
  audioFile: string; // Path to pre-recorded audio: 'ar/basic-needs/hungry'
  language: Language; // Primary language
  category: PhraseCategory; // Category for organization
  subcategory?: string; // Optional subcategory (for Conversation)
}

/**
 * Pain report data structure
 */
export interface PainReport {
  location?: string; // Body part (head, chest, stomach, etc.)
  intensity?: PainIntensity; // Pain level
  timestamp: number; // When reported
}

/**
 * Button size variants
 */
export type ButtonSize = 'normal' | 'large' | 'xlarge';
