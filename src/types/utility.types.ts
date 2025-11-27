import type { Phrase } from './phrase.types';
import type Sound from 'react-native-sound';

export interface ShareContext {
  phrase: Phrase;
  intensity?: 'light' | 'moderate' | 'severe';
  location?: string;
  includeCategory?: boolean;
  includeTimestamp?: boolean;
}

export interface PainIntensityOption {
  level: 'light' | 'moderate' | 'severe';
  arabicLabel: string;
  englishLabel: string;
  color: string;
  icon: string;
}

export interface AudioPathMapping {
  [key: string]: string;
}

export interface CacheEntry {
  sound: Sound;
  lastAccessed: number;
}
