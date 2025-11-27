import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  COLORS,
  SPACING,
  FONT_SIZES,
  FONTS,
  BORDER_RADIUS,
} from '../../constants';
import { useHighContrast } from '../../contexts/SettingsContext';

/**
 * Enhanced home screen header with rich visual design.
 * Shows app branding, tagline, and user guidance.
 * Supports high contrast mode for accessibility.
 */
const HomeHeader: React.FC = () => {
  const highContrast = useHighContrast();

  return (
    <View
      style={[styles.container, highContrast && styles.containerHighContrast]}
      accessibilityRole="header"
      accessibilityLabel="قول - Oul - اختر احتياجاتك"
    >
      {/* App Title Section */}
      <View style={styles.titleSection}>
        <Text
          style={[styles.arabicTitle, highContrast && styles.textHighContrast]}
        >
          قول
        </Text>
        <Text
          style={[
            styles.englishTitle,
            highContrast && styles.textSecondaryHighContrast,
          ]}
        >
          Oul
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: SPACING.md,
    paddingBottom: SPACING.sm,
    alignItems: 'center',
  },
  containerHighContrast: {
    backgroundColor: COLORS.highContrastBackground,
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  arabicTitle: {
    fontFamily: FONTS.bold,
    fontSize: FONT_SIZES.xxl, // 32px - smaller but still prominent
    fontWeight: '700',
    color: COLORS.primary,
    letterSpacing: 1,
  },
  englishTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: COLORS.textSecondary,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginTop: SPACING.xxs,
  },
  taglineCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.sm,
  },
  taglineCardHighContrast: {
    backgroundColor: COLORS.highContrastButton,
    borderColor: COLORS.highContrastBorder,
  },
  taglineIcon: {
    fontSize: 20,
    marginRight: SPACING.sm,
  },
  taglineTextContainer: {
    alignItems: 'flex-start',
  },
  taglineArabic: {
    fontFamily: FONTS.semiBold,
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.text,
  },
  taglineEnglish: {
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
  },
  guidanceText: {
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
    textAlign: 'center',
    opacity: 0.8,
  },
  textHighContrast: {
    color: COLORS.highContrastText,
  },
  textSecondaryHighContrast: {
    color: COLORS.highContrastText,
    opacity: 0.85,
  },
});

export default HomeHeader;
