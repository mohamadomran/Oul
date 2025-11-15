import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { COLORS, SPACING, FONT_SIZES } from '../constants';
import { PainIntensity } from '../types';
import { PAIN_INTENSITY_OPTIONS } from '../data/painLocationData';
import HapticService from '../services/HapticService';
import type { PainIntensitySelectorProps } from '../types/ui.types';

const PainIntensitySelector: React.FC<PainIntensitySelectorProps> = ({
  selectedIntensity,
  onSelectIntensity,
}) => {
  const handleSelect = async (intensity: PainIntensity) => {
    await HapticService.trigger('medium');
    onSelectIntensity(intensity);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>اختر شدة الألم</Text>
      <Text style={styles.sublabel}>Select pain intensity</Text>

      <View style={styles.optionsContainer}>
        {PAIN_INTENSITY_OPTIONS.map(option => {
          const isSelected = selectedIntensity === option.level;

          const buttonStyle: ViewStyle = {
            backgroundColor: option.color,
            borderWidth: isSelected ? 4 : 2,
            borderColor: isSelected ? COLORS.text : 'rgba(0,0,0,0.1)',
            opacity: isSelected ? 1 : 0.85,
            transform: [{ scale: isSelected ? 1.05 : 1 }],
          };

          return (
            <TouchableOpacity
              key={option.level}
              style={[styles.optionButton, buttonStyle]}
              onPress={() => handleSelect(option.level)}
              activeOpacity={0.7}
              accessibilityLabel={`${option.arabicLabel} - ${option.englishLabel}`}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
            >
              <Text style={styles.optionIcon}>{option.icon}</Text>
              <Text style={styles.optionArabicText}>{option.arabicLabel}</Text>
              <Text style={styles.optionEnglishText}>
                {option.englishLabel}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.lg,
  },
  label: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '700',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  sublabel: {
    fontSize: FONT_SIZES.md,
    fontWeight: '500',
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.md,
  },
  optionButton: {
    flex: 1,
    minHeight: 120,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.md,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  optionIcon: {
    fontSize: 40,
    marginBottom: SPACING.xs,
  },
  optionArabicText: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: SPACING.xxs,
  },
  optionEnglishText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '500',
    color: COLORS.white,
    textAlign: 'center',
    opacity: 0.9,
  },
});

export default PainIntensitySelector;
