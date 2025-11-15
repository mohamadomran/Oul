export interface ShareContext {
  phrase: any;
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
  sound: any;
  lastAccessed: number;
}
