import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZES } from '../constants';

const HomeHeader: React.FC = () => {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.primaryTitle}>قول</Text>
      <Text style={styles.secondaryTitle}>Oul</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  primaryTitle: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: '700',
    color: COLORS.text,
    textAlign: 'center',
  },
  secondaryTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '500',
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: SPACING.xs,
  },
});

export default HomeHeader;
