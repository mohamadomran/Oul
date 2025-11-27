import type { ReactNode } from 'react';
import type { ViewStyle } from 'react-native';
import type { ButtonSize } from './settings.types';
import type { IconDefinition, Phrase } from './phrase.types';
import type { RootStackParamList } from './navigation.types';

export interface BigButtonProps {
  title: string;
  icon?: string; // Emoji icon (deprecated, use iconName)
  iconName?: string; // Ionicons icon name (e.g., 'restaurant', 'heart')
  iconColor?: string; // Color for vector icon
  color: string;
  onPress: () => void;
  size?: ButtonSize;
  highContrast?: boolean;
  disabled?: boolean;
  width?: number; // Optional responsive width override
}

export interface PhraseActionBottomSheetProps {
  arabicText: string;
  englishText: string;
  icon?: IconDefinition | string;
  onPlay: () => void;
  onShare: () => void;
  onToggleFavorite?: () => void;
  onShareSMS?: () => void;
  onCopy?: () => void;
  onClose: () => void;
  isPlaying?: boolean;
  isFavorite?: boolean;
}

export interface PhraseActionBottomSheetRef {
  snapToIndex: (index: number) => void;
  close: () => void;
}

export interface PhraseActionModalProps {
  arabicText: string;
  englishText: string;
  icon?: string;
  onPlay: () => void;
  onShare: () => void;
  onShareSMS?: () => void;
  onCopy?: () => void;
  onClose: () => void;
  isPlaying?: boolean;
}

export interface PhraseActionModalRef {
  snapToIndex: (index: number) => void;
  close: () => void;
}

export interface PainIntensitySelectorProps {
  selectedIntensity?: 'light' | 'moderate' | 'severe';
  onSelectIntensity: (intensity: 'light' | 'moderate' | 'severe') => void;
}

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export interface BottomActionBarProps {
  children?: ReactNode;
  style?: ViewStyle;
  currentScreen?: keyof RootStackParamList;
  showBack?: boolean;
  showFavorites?: boolean;
}

export interface PhraseButtonProps {
  phrase: Phrase;
  onPress?: () => void;
  size?: ButtonSize;
  highContrast?: boolean;
  disabled?: boolean;
  categoryColor?: string; // Override icon color with category color
}
