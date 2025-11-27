import React, { memo, useCallback } from 'react';
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
import { DynamicIcon } from './DynamicIcon';
import type { PhraseButtonProps } from '../../types/ui.types';

const PhraseButton: React.FC<PhraseButtonProps> = ({
  phrase,
  onPress,
  size = 'normal',
  highContrast = false,
  disabled = false,
}) => {
  const handlePress = useCallback(async () => {
    if (disabled) return;

    await HapticService.trigger('medium');
    onPress?.();
  }, [disabled, onPress]);

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
    width: '100%', // Full width of grid container
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

  const iconColor = disabled
    ? COLORS.disabledText
    : highContrast
    ? COLORS.highContrastText
    : COLORS.white;

  // Get icon accessibility label
  const iconLabel = typeof phrase.icon === 'string'
    ? phrase.icon
    : phrase.icon?.fallback || '';

  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle]}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={1}
      accessibilityLabel={`${iconLabel ? iconLabel + ' ' : ''}${
        phrase.arabicText
      }`}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      accessibilityHint={
        disabled ? 'Button is disabled' : `Play ${phrase.arabicText}`
      }
    >
      {phrase.icon && (
        typeof phrase.icon === 'string' ? (
          // Legacy emoji format
          <DynamicIcon
            library="MaterialCommunityIcons"
            name="emoticon"
            size={buttonSize.iconSize}
            color={iconColor}
            fallback={phrase.icon}
          />
        ) : (
          // New icon library format
          <DynamicIcon
            library={phrase.icon.library}
            name={phrase.icon.name}
            size={buttonSize.iconSize}
            color={iconColor}
            fallback={phrase.icon.fallback}
          />
        )
      )}
      <Text style={textStyle} numberOfLines={2} adjustsFontSizeToFit>
        {phrase.arabicText}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {},
});

// Memoize component to prevent re-renders when props haven't changed
export default memo(PhraseButton);
