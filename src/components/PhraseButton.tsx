import React, { useState } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  View,
} from 'react-native';
import { COLORS, CATEGORY_COLORS } from '../constants/colors';
import { BUTTON_SIZES } from '../constants/sizes';
import HapticService from '../services/HapticService';
import AudioService from '../services/AudioService';
import TTSService from '../services/TTSService';
import { shareViaWhatsApp } from '../utils/shareUtils';
import PhraseActionModal from './PhraseActionModal';
import type { Phrase, CustomPhrase, Language } from '../types/phrase.types';

interface PhraseButtonProps {
  phrase: Phrase | CustomPhrase;
  onPress?: () => void;
  size?: 'normal' | 'large' | 'xlarge';
  highContrast?: boolean;
  disabled?: boolean;
  showEnglish?: boolean;
}

const PhraseButton: React.FC<PhraseButtonProps> = ({
  phrase,
  onPress,
  size = 'normal',
  highContrast = false,
  disabled = false,
  showEnglish = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handlePress = async () => {
    if (disabled) return;

    await HapticService.trigger('medium');
    setShowModal(true);
    onPress?.();
  };

  const handlePlayAudio = async () => {
    if (isPlaying) return;

    try {
      setIsPlaying(true);

      // Check if this is a custom phrase (uses TTS) or static phrase (uses audio file)
      if ('useTTS' in phrase && phrase.useTTS) {
        // Custom phrase - use TTS
        await TTSService.speak(phrase.arabicText, phrase.language);
      } else {
        // Static phrase - use pre-recorded audio
        await AudioService.play((phrase as Phrase).audioFile);
      }
    } catch (error) {
      console.error('Error playing phrase:', error);
    } finally {
      setIsPlaying(false);
    }
  };

  const handleShare = async () => {
    setShowModal(false);
    // Small delay to let modal close first
    setTimeout(async () => {
      await shareViaWhatsApp(phrase.arabicText, phrase.englishText);
    }, 300);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const buttonSize = BUTTON_SIZES[size];

  // Get button color - use phrase.color if available, otherwise category color
  const buttonColor = 'color' in phrase && phrase.color
    ? phrase.color
    : (CATEGORY_COLORS[phrase.category] || COLORS.primary);

  const buttonStyle: ViewStyle = {
    backgroundColor: disabled
      ? COLORS.disabled
      : highContrast
      ? COLORS.highContrastButton
      : buttonColor,
    height: buttonSize.height,
    width: buttonSize.minWidth,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: buttonSize.padding,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: disabled ? 0.05 : 0.2,
    shadowRadius: 8,
    elevation: disabled ? 1 : 6,
    ...(highContrast && {
      borderWidth: 2,
      borderColor: COLORS.highContrastBorder,
    }),
    ...(isPressed && !disabled && {
      opacity: 0.8,
    }),
  };

  const arabicTextStyle: TextStyle = {
    color: disabled
      ? COLORS.disabledText
      : highContrast
      ? COLORS.highContrastText
      : COLORS.white,
    fontSize: buttonSize.fontSize,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: buttonSize.fontSize * 1.3,
  };

  const englishTextStyle: TextStyle = {
    color: COLORS.white,
    fontSize: buttonSize.fontSize * 0.7,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 4,
    opacity: 0.9,
  };

  const iconStyle: TextStyle = {
    fontSize: buttonSize.iconSize,
    textAlign: 'center',
  };

  return (
    <>
      <TouchableOpacity
        style={[styles.button, buttonStyle]}
        onPress={handlePress}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        disabled={disabled}
        activeOpacity={1}
        accessibilityLabel={`${phrase.icon} ${phrase.arabicText}`}
        accessibilityRole="button"
        accessibilityState={{ disabled }}
        accessibilityHint={disabled ? 'Button is disabled' : `Select action for: ${phrase.arabicText}`}
      >
        <View style={styles.content}>
          {phrase.icon && <Text style={iconStyle}>{phrase.icon}</Text>}
          <Text style={arabicTextStyle} numberOfLines={2} adjustsFontSizeToFit>
            {phrase.arabicText}
          </Text>
          {showEnglish && phrase.englishText && (
            <Text style={englishTextStyle} numberOfLines={1}>
              {phrase.englishText}
            </Text>
          )}
        </View>
      </TouchableOpacity>

      <PhraseActionModal
        visible={showModal}
        arabicText={phrase.arabicText}
        englishText={phrase.englishText}
        icon={phrase.icon}
        onPlay={handlePlayAudio}
        onShare={handleShare}
        onClose={handleCloseModal}
        isPlaying={isPlaying}
      />
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    // Base styles are dynamic
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

export default PhraseButton;
