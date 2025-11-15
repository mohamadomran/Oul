import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS, SPACING, FONT_SIZES, FONTS } from '../../constants';
import HapticService from '../../services/HapticService';

interface SettingButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  loading?: boolean;
}

const SettingButton: React.FC<SettingButtonProps> = ({
  label,
  onPress,
  variant = 'secondary',
  disabled = false,
  loading = false,
}) => {
  const handlePress = async () => {
    await HapticService.trigger('medium');
    onPress();
  };

  const getBackgroundColor = () => {
    if (disabled) return COLORS.disabled;
    switch (variant) {
      case 'primary':
        return COLORS.primary;
      case 'danger':
        return '#E74C3C';
      default:
        return COLORS.white;
    }
  };

  const getTextColor = () => {
    if (disabled) return COLORS.disabledText;
    switch (variant) {
      case 'primary':
      case 'danger':
        return COLORS.white;
      default:
        return COLORS.text;
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: getBackgroundColor() }]}
      onPress={handlePress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'secondary' ? COLORS.primary : COLORS.white}
        />
      ) : (
        <Text style={[styles.label, { color: getTextColor() }]}>{label}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
    minHeight: 56,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontFamily: FONTS.semiBold,
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
  },
});

export default SettingButton;
