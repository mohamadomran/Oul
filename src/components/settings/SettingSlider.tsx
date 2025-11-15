import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { COLORS, SPACING, FONT_SIZES, FONTS } from '../../constants';

interface SettingSliderProps {
  label: string;
  description?: string;
  value: number;
  onValueChange: (value: number) => void;
  minimumValue?: number;
  maximumValue?: number;
  step?: number;
  unit?: string;
  disabled?: boolean;
}

const SettingSlider: React.FC<SettingSliderProps> = ({
  label,
  description,
  value,
  onValueChange,
  minimumValue = 0,
  maximumValue = 100,
  step = 1,
  unit = '%',
  disabled = false,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>
          {Math.round(value)}
          {unit}
        </Text>
      </View>
      {description && <Text style={styles.description}>{description}</Text>}
      <Slider
        style={styles.slider}
        value={value}
        onValueChange={onValueChange}
        minimumValue={minimumValue}
        maximumValue={maximumValue}
        step={step}
        minimumTrackTintColor={COLORS.primary}
        maximumTrackTintColor={COLORS.disabled}
        thumbTintColor={COLORS.primary}
        disabled={disabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.md,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginBottom: SPACING.sm,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  label: {
    fontFamily: FONTS.semiBold,
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text,
  },
  value: {
    fontFamily: FONTS.bold,
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
    color: COLORS.primary,
  },
  description: {
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  slider: {
    width: '100%',
    height: 40,
  },
});

export default SettingSlider;
