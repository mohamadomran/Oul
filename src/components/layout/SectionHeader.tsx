import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZES, FONTS } from '../../constants';
import type { SectionHeaderProps } from '../../types/ui.types';

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: SPACING.lg,
    marginBottom: SPACING.md,
    paddingHorizontal: SPACING.xs,
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: FONT_SIZES.lg,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: SPACING.xxs,
  },
  subtitle: {
    fontFamily: FONTS.medium,
    fontSize: FONT_SIZES.sm,
    fontWeight: '500',
    color: COLORS.textSecondary,
  },
});

export default SectionHeader;
