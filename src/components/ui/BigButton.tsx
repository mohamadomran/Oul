import React, { useState } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS } from '../../constants';
import { BUTTON_SIZES, BORDER_RADIUS } from '../../constants';
import HapticService from '../../services/HapticService';
import type { BigButtonProps } from '../../types/ui.types';

const BigButton: React.FC<BigButtonProps> = ({
  title,
  icon,
  iconName,
  iconColor,
  color,
  onPress,
  size = 'normal',
  highContrast = false,
  disabled = false,
  width,
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = async () => {
    if (disabled) return;

    await HapticService.trigger('medium');
    onPress();
  };

  const buttonSize = BUTTON_SIZES[size];

  // Determine if background is light (needs border)
  const isLightBg = color === COLORS.surface || color === COLORS.white || color === COLORS.background;

  const buttonStyle: ViewStyle = {
    backgroundColor: disabled
      ? COLORS.disabled
      : highContrast
      ? COLORS.highContrastButton
      : color,
    height: buttonSize.height,
    width: width ?? buttonSize.minWidth, // Use responsive width if provided
    borderRadius: BORDER_RADIUS.lg,
    justifyContent: 'center',
    alignItems: 'center',
    padding: buttonSize.padding,
    // Enhanced shadow for depth perception
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: disabled ? 0.05 : 0.15,
    shadowRadius: 8,
    elevation: disabled ? 1 : 4,
    // Border for light backgrounds or high contrast
    borderWidth: highContrast ? 2 : isLightBg ? 1 : 0,
    borderColor: highContrast ? COLORS.highContrastBorder : COLORS.border,
    // Pressed state overlay
    ...(isPressed &&
      !disabled && {
        opacity: 0.8,
      }),
  };

  const textStyle: TextStyle = {
    fontFamily: FONTS.bold,
    color: disabled
      ? COLORS.disabledText
      : highContrast
      ? COLORS.highContrastText
      : isLightBg
      ? COLORS.text
      : COLORS.white,
    fontSize: buttonSize.fontSize,
    fontWeight: '800',
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

  // Determine the icon color for vector icons
  const vectorIconColor = disabled
    ? COLORS.disabledText
    : iconColor || COLORS.white;

  // Render icon (vector icon takes priority over emoji)
  const renderIcon = () => {
    if (iconName) {
      return (
        <View style={styles.iconContainer}>
          <Ionicons
            name={iconName}
            size={buttonSize.iconSize}
            color={vectorIconColor}
          />
        </View>
      );
    }
    if (icon) {
      return <Text style={iconStyle}>{icon}</Text>;
    }
    return null;
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
      accessibilityHint={
        disabled ? 'الزر معطل - Button is disabled' : `انتقل إلى ${title} - Navigate to ${title}`
      }
    >
      {renderIcon()}
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
  iconContainer: {
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BigButton;
