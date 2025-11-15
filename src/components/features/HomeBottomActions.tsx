import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { RootStackNavigationProp } from '../../types/navigation.types';
import { COLORS, SPACING, FONT_SIZES, FONTS } from '../../constants';
import HapticService from '../../services/HapticService';

const HomeBottomActions: React.FC = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const handleSettingsPress = async () => {
    await HapticService.trigger('light');
    navigation.navigate('Settings');
  };

  return (
    <View style={styles.actionsContainer}>
      <TouchableOpacity
        style={styles.actionButton}
        onPress={handleSettingsPress}
        activeOpacity={0.7}
        accessibilityLabel="Settings"
        accessibilityHint="Adjust app settings and preferences"
        accessibilityRole="button"
      >
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>⚙️</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.buttonTitle}>الإعدادات</Text>
          <Text style={styles.buttonSubtitle}>Settings</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  actionsContainer: {
    width: '100%',
    maxWidth: 500,
    paddingVertical: SPACING.lg,
    gap: SPACING.md,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    minHeight: 72,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  icon: {
    fontSize: 24,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.xxs,
    lineHeight: FONT_SIZES.lg * 1.3,
  },
  buttonSubtitle: {
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZES.sm,
    fontWeight: '400',
    color: COLORS.textSecondary,
    lineHeight: FONT_SIZES.sm * 1.3,
  },
});

export default HomeBottomActions;
