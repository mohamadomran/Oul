import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZES, FONTS, BORDER_RADIUS } from '../../constants';
import { useHighContrast } from '../../contexts/SettingsContext';

export interface CategoryInfo {
  arabicName: string;
  englishName: string;
  icon: string;
  color: string;
}

/**
 * Category metadata for headers
 */
export const CATEGORY_INFO: Record<string, CategoryInfo> = {
  BasicNeeds: {
    arabicName: 'احتياجات أساسية',
    englishName: 'Basic Needs',
    icon: '🍽️',
    color: COLORS.basicNeeds,
  },
  PainLocation: {
    arabicName: 'ألم',
    englishName: 'Pain',
    icon: '🩹',
    color: COLORS.pain,
  },
  Emotions: {
    arabicName: 'مشاعر',
    englishName: 'Emotions',
    icon: '😊',
    color: COLORS.emotions,
  },
  Conversation: {
    arabicName: 'محادثة',
    englishName: 'Conversation',
    icon: '💬',
    color: COLORS.conversation,
  },
  Family: {
    arabicName: 'عائلة',
    englishName: 'Family',
    icon: '❤️',
    color: COLORS.family,
  },
};

interface CategoryHeaderProps {
  /** Screen name to look up category info */
  screenName: keyof typeof CATEGORY_INFO;
}

/**
 * Header component for category screens.
 * Shows category icon, Arabic name, and English name.
 * Supports high contrast mode for accessibility.
 */
const CategoryHeader: React.FC<CategoryHeaderProps> = ({ screenName }) => {
  const highContrast = useHighContrast();
  const categoryInfo = CATEGORY_INFO[screenName];

  if (!categoryInfo) {
    return null;
  }

  const { arabicName, englishName, icon, color } = categoryInfo;

  return (
    <View
      style={[
        styles.container,
        highContrast && styles.containerHighContrast,
      ]}
      accessibilityRole="header"
      accessibilityLabel={`${arabicName} - ${englishName}`}
    >
      {/* Icon badge with category color */}
      <View
        style={[
          styles.iconBadge,
          { backgroundColor: highContrast ? COLORS.highContrastButton : color },
        ]}
      >
        <Text style={styles.icon}>{icon}</Text>
      </View>

      {/* Category names */}
      <Text
        style={[
          styles.arabicName,
          highContrast && styles.textHighContrast,
        ]}
      >
        {arabicName}
      </Text>
      <Text
        style={[
          styles.englishName,
          highContrast && styles.textSecondaryHighContrast,
        ]}
      >
        {englishName}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  containerHighContrast: {
    backgroundColor: COLORS.highContrastBackground,
    borderBottomColor: COLORS.highContrastBorder,
  },
  iconBadge: {
    width: 44,
    height: 44,
    borderRadius: BORDER_RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  icon: {
    fontSize: 22,
  },
  arabicName: {
    fontFamily: FONTS.bold,
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.xxs,
    textAlign: 'center',
  },
  englishName: {
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  textHighContrast: {
    color: COLORS.highContrastText,
  },
  textSecondaryHighContrast: {
    color: COLORS.highContrastText,
    opacity: 0.8,
  },
});

export default CategoryHeader;
