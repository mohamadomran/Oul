import React, { useState, useRef } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import { COLORS, CATEGORY_COLORS } from '../constants/colors';
import { BUTTON_SIZES } from '../constants/sizes';
import HapticService from '../services/HapticService';
import AudioService from '../services/AudioService';
import * as ShareService from '../services/ShareService';
import PhraseActionBottomSheet from './PhraseActionBottomSheet';
import type {
  PhraseActionBottomSheetRef,
  PhraseButtonProps,
} from '../types/ui.types';
import type { Phrase } from '../types/phrase.types';

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
  const bottomSheetRef = useRef<PhraseActionBottomSheetRef | null>(null);

  const handlePress = async () => {
    if (disabled) return;

    await HapticService.trigger('medium');
    // Add a small delay to ensure the bottom sheet is mounted
    setTimeout(() => {
      if (
        bottomSheetRef.current &&
        typeof bottomSheetRef.current.snapToIndex === 'function'
      ) {
        bottomSheetRef.current.snapToIndex(0);
      }
    }, 100);
    onPress?.();
  };

  const handlePlayAudio = async () => {
    if (isPlaying) return;

    try {
      setIsPlaying(true);

      // Static phrase - use pre-recorded audio
      await AudioService.play(phrase.audioFile);
    } catch (error) {
      console.error('Error playing phrase:', error);
    } finally {
      setIsPlaying(false);
    }
  };

  const handleShare = async () => {
    if (
      bottomSheetRef.current &&
      typeof bottomSheetRef.current.close === 'function'
    ) {
      bottomSheetRef.current.close();
    }
    // Small delay to let bottom sheet close first
    setTimeout(async () => {
      await ShareService.shareViaWhatsApp({
        phrase: phrase as Phrase,
        includeCategory: true,
        includeTimestamp: false,
      });
    }, 300);
  };

  const handleShareSMS = async () => {
    if (
      bottomSheetRef.current &&
      typeof bottomSheetRef.current.close === 'function'
    ) {
      bottomSheetRef.current.close();
    }
    setTimeout(async () => {
      await ShareService.shareViaSMS({
        phrase: phrase as Phrase,
        includeCategory: true,
        includeTimestamp: false,
      });
    }, 300);
  };

  const handleCopy = async () => {
    if (
      bottomSheetRef.current &&
      typeof bottomSheetRef.current.close === 'function'
    ) {
      bottomSheetRef.current.close();
    }
    setTimeout(async () => {
      await ShareService.copyToClipboard({
        phrase: phrase as Phrase,
        includeCategory: true,
        includeTimestamp: false,
      });
    }, 300);
  };

  const handleCloseBottomSheet = () => {
    // The modal's close function already handles calling onClose
    // No need to call close() here to avoid infinite loop
  };

  const buttonSize = BUTTON_SIZES[size];

  // Get button color - use phrase.color if available, otherwise category color
  const buttonColor =
    'color' in phrase && phrase.color
      ? phrase.color
      : ('category' in phrase ? CATEGORY_COLORS[phrase.category] : null) ||
        COLORS.primary;

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
    ...(isPressed &&
      !disabled && {
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
        accessibilityHint={
          disabled
            ? 'Button is disabled'
            : `Select action for: ${phrase.arabicText}`
        }
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

      <PhraseActionBottomSheet
        ref={bottomSheetRef}
        arabicText={phrase.arabicText}
        englishText={phrase.englishText || ''}
        icon={phrase.icon}
        onPlay={handlePlayAudio}
        onShare={handleShare}
        onShareSMS={handleShareSMS}
        onCopy={handleCopy}
        onClose={handleCloseBottomSheet}
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
