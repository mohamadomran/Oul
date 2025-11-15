import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { COLORS, CATEGORY_COLORS, FONTS } from '../../constants';
import { BUTTON_SIZES } from '../../constants';
import HapticService from '../../services/HapticService';
import type { PhraseButtonProps } from '../../types/ui.types';

const PhraseButton: React.FC<PhraseButtonProps> = ({
  phrase,
  onPress,
  size = 'normal',
  highContrast = false,
  disabled = false,
}) => {
  const handlePress = async () => {
    if (disabled) return;

    await HapticService.trigger('medium');
    onPress?.();
  };

  const buttonSize = BUTTON_SIZES[size];
  const buttonColor = phrase.color
    ? phrase.color
    : (phrase.category &&
        CATEGORY_COLORS[phrase.category as keyof typeof CATEGORY_COLORS]) ||
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
  };

  const textStyle: TextStyle = {
    fontFamily: FONTS.bold,
    color: disabled
      ? COLORS.disabledText
      : highContrast
      ? COLORS.highContrastText
      : COLORS.white,
    fontSize: buttonSize.fontSize,
    fontWeight: '800',
    textAlign: 'center',
    lineHeight: buttonSize.fontSize * 1.4,
  };

  const iconStyle: TextStyle = {
    fontSize: buttonSize.iconSize,
    marginBottom: 8,
    textAlign: 'center',
  };

  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle]}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={1}
      accessibilityLabel={`${phrase.icon ? phrase.icon + ' ' : ''}${
        phrase.arabicText
      }`}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      accessibilityHint={
        disabled ? 'Button is disabled' : `Play ${phrase.arabicText}`
      }
    >
      <Text style={iconStyle}>{phrase.icon}</Text>
      <Text style={textStyle} numberOfLines={2} adjustsFontSizeToFit>
        {phrase.arabicText}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {},
});

export default PhraseButton;
