import type { ReactNode } from 'react';
import type { ViewStyle } from 'react-native';
import type { ButtonSize } from './phrase.types';

export interface BigButtonProps {
  title: string;
  icon?: string;
  color: string;
  onPress: () => void;
  size?: ButtonSize;
  highContrast?: boolean;
  disabled?: boolean;
}

export interface PhraseActionBottomSheetProps {
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

export interface PhraseActionBottomSheetRef {
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
  currentScreen?: keyof any; // Will be typed as RootStackParamList
  showBack?: boolean;
  showFavorites?: boolean;
}

export interface PhraseButtonProps {
  phrase: any; // Will be typed as Phrase after TTS removal
  onPress?: () => void;
  size?: ButtonSize;
  highContrast?: boolean;
  disabled?: boolean;
  showEnglish?: boolean;
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
