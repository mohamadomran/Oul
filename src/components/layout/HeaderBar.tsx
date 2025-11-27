import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, SPACING, FONT_SIZES, FONTS, BORDER_RADIUS } from '../../constants';
import { useHighContrast } from '../../contexts/SettingsContext';
import HapticService from '../../services/HapticService';

interface HeaderBarProps {
  /** Primary title (usually Arabic) */
  title: string;
  /** Secondary subtitle (usually English) */
  subtitle?: string;
  /** Show back button (default: true) */
  showBack?: boolean;
  /** Show settings button */
  showSettings?: boolean;
  /** Custom back button handler */
  onBack?: () => void;
  /** Settings button handler */
  onSettings?: () => void;
  /** Custom right action component */
  rightAction?: React.ReactNode;
}

/**
 * Reusable header bar component with consistent styling.
 * Supports high contrast mode for accessibility.
 *
 * @example
 * ```tsx
 * <HeaderBar
 *   title="الإعدادات"
 *   subtitle="Settings"
 *   showBack={true}
 * />
 * ```
 */
const HeaderBar: React.FC<HeaderBarProps> = ({
  title,
  subtitle,
  showBack = true,
  showSettings = false,
  onBack,
  onSettings,
  rightAction,
}) => {
  const navigation = useNavigation();
  const highContrast = useHighContrast();

  const handleBack = async () => {
    await HapticService.trigger('light');
    if (onBack) {
      onBack();
    } else if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const handleSettings = async () => {
    await HapticService.trigger('light');
    if (onSettings) {
      onSettings();
    }
  };

  const iconColor = highContrast ? COLORS.highContrastText : COLORS.primary;
  const textColor = highContrast ? COLORS.highContrastText : COLORS.text;
  const subtitleColor = highContrast ? COLORS.highContrastText : COLORS.textSecondary;

  return (
    <View
      style={[
        styles.container,
        highContrast && styles.containerHighContrast,
      ]}
      accessibilityRole="header"
    >
      {/* Left Section - Back Button */}
      <View style={styles.leftSection}>
        {showBack && (
          <TouchableOpacity
            onPress={handleBack}
            style={styles.iconButton}
            accessibilityLabel="رجوع - Go back"
            accessibilityRole="button"
            accessibilityHint="اضغط للعودة للشاشة السابقة - Tap to go back"
          >
            <Ionicons name="chevron-back" size={28} color={iconColor} />
          </TouchableOpacity>
        )}
      </View>

      {/* Center Section - Title & Subtitle */}
      <View style={styles.centerSection}>
        <Text
          style={[styles.title, { color: textColor }]}
          accessibilityRole="header"
        >
          {title}
        </Text>
        {subtitle && (
          <Text style={[styles.subtitle, { color: subtitleColor }]}>
            {subtitle}
          </Text>
        )}
      </View>

      {/* Right Section - Settings or Custom Action */}
      <View style={styles.rightSection}>
        {rightAction ? (
          rightAction
        ) : showSettings ? (
          <TouchableOpacity
            onPress={handleSettings}
            style={styles.iconButton}
            accessibilityLabel="الإعدادات - Settings"
            accessibilityRole="button"
          >
            <Ionicons name="settings-outline" size={26} color={iconColor} />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  containerHighContrast: {
    backgroundColor: COLORS.highContrastBackground,
    borderBottomColor: COLORS.highContrastBorder,
  },
  leftSection: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  centerSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightSection: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  iconButton: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: FONT_SIZES.xl,
    fontWeight: '700',
  },
  subtitle: {
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZES.sm,
    marginTop: SPACING.xxs,
  },
});

export default HeaderBar;
