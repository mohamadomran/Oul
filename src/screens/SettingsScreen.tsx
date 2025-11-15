import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { SettingsScreenProps } from '../types';
import { COLORS, SPACING, FONT_SIZES } from '../constants';

const SettingsScreen: React.FC<SettingsScreenProps> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.subtitle}>Placeholder</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  subtitle: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.textSecondary,
    marginTop: SPACING.sm,
  },
});

export default SettingsScreen;
