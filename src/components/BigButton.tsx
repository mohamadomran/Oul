import React, { useState } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import { COLORS } from '../constants/colors';
import { BUTTON_SIZES, BORDER_RADIUS } from '../constants/sizes';
import HapticService from '../services/HapticService';

interface BigButtonProps {
  title: string;
  icon?: string; // Emoji icon
  color: string;
  onPress: () => void;
  size?: 'normal' | 'large' | 'xlarge';
  highContrast?: boolean;
  disabled?: boolean;
}

const BigButton: React.FC<BigButtonProps> = ({
  title,
  icon,
  color,
  onPress,
  size = 'normal',
  highContrast = false,
  disabled = false,
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = async () => {
    if (disabled) return;

    await HapticService.trigger('medium');
    onPress();
  };

  const buttonSize = BUTTON_SIZES[size];

  const buttonStyle: ViewStyle = {
    backgroundColor: disabled
      ? COLORS.disabled
      : highContrast
      ? COLORS.highContrastButton
      : color,
    height: buttonSize.height,
    width: buttonSize.minWidth,   // Fixed width (was minWidth)
    borderRadius: BORDER_RADIUS.lg,
    justifyContent: 'center',
    alignItems: 'center',
    padding: buttonSize.padding,
    // Enhanced shadow for depth perception
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: disabled ? 0.05 : 0.2,
    shadowRadius: 8,
    elevation: disabled ? 1 : 6,
    // High contrast border
    ...(highContrast && {
      borderWidth: 2,
      borderColor: COLORS.highContrastBorder,
    }),
    // Pressed state overlay
    ...(isPressed && !disabled && {
      opacity: 0.8,
    }),
  };

  const textStyle: TextStyle = {
    color: disabled
      ? COLORS.disabledText
      : highContrast
      ? COLORS.highContrastText
      : COLORS.white,
    fontSize: buttonSize.fontSize,
    fontWeight: '700',
    textAlign: 'center',
    // Improve Arabic text rendering
    lineHeight: buttonSize.fontSize * 1.4,
  };

  const iconStyle: TextStyle = {
    fontSize: buttonSize.iconSize,
    marginBottom: 8,
    // Ensure emoji visibility
    textAlign: 'center',
  };

  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle]}
      onPress={handlePress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      disabled={disabled}
      activeOpacity={1}
      accessibilityLabel={`${icon ? icon + ' ' : ''}${title}`}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      accessibilityHint={disabled ? 'Button is disabled' : `Navigate to ${title}`}
    >
      {icon && <Text style={iconStyle}>{icon}</Text>}
      <Text style={textStyle} numberOfLines={2} adjustsFontSizeToFit>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    // Base styles are dynamic
  },
});

export default BigButton;
