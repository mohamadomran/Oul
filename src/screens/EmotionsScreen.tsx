/**
 * Emotions Screen
 *
 * 18 common emotional states and feelings
 * Grid layout with 2 columns for optimal accessibility
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar } from 'react-native';
import type { EmotionsScreenProps } from '../types';
import { COLORS, SPACING, FONT_SIZES } from '../constants';
import { PhraseButton } from '../components';
import { EMOTIONS_PHRASES } from '../data/emotionsData';

const EmotionsScreen: React.FC<EmotionsScreenProps> = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>مشاعر</Text>
        <Text style={styles.subtitle}>Emotions • {EMOTIONS_PHRASES.length} phrases</Text>
      </View>

      {/* Phrase Grid */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.grid}>
          {EMOTIONS_PHRASES.map((phrase) => (
            <PhraseButton
              key={phrase.id}
              phrase={phrase}
              size="large"
              showEnglish={false}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.sm,
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: '700',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: SPACING.md,
  },
});

export default EmotionsScreen;
