import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZES, FONTS } from '../../constants';

const HomeHeader: React.FC = () => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.titleRow}>
        <Text style={styles.arabicTitle}>قول</Text>
        <View style={styles.divider} />
        <Text style={styles.englishTitle}>Oul</Text>
      </View>
      <Text style={styles.tagline}>Say what you need</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.md,
    alignItems: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  arabicTitle: {
    fontFamily: FONTS.bold,
    fontSize: FONT_SIZES.xxl,
    fontWeight: '700',
    color: COLORS.text,
  },
  divider: {
    width: 1,
    height: FONT_SIZES.xxl * 0.6,
    backgroundColor: COLORS.border,
    marginHorizontal: SPACING.md,
  },
  englishTitle: {
    fontFamily: FONTS.bold,
    fontSize: FONT_SIZES.xxl,
    fontWeight: '700',
    color: COLORS.text,
  },
  tagline: {
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZES.sm,
    fontWeight: '400',
    color: COLORS.textSecondary,
    letterSpacing: 0.5,
  },
});

export default HomeHeader;
