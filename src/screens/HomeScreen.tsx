/**
 * Home Screen
 *
 * Main screen with 4 category buttons + Settings
 * Categories: Basic Needs, Pain, Emotions, Conversation
 */

import React from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import type { HomeScreenProps } from '../types';
import { COLORS, SPACING, FONT_SIZES } from '../constants';
import { BigButton } from '../components';

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <Text style={styles.title}>قول (Oul)</Text>
      <Text style={styles.subtitle}>Your Communication Assistant</Text>

      <View style={styles.content}>
        <View style={styles.buttonGrid}>
          <View style={styles.buttonRow}>
            <BigButton
              title="احتياجات أساسية"
              icon="🍽️"
              color={COLORS.basicNeeds}
              onPress={() => navigation.navigate('BasicNeeds')}
              size="large"
            />
            <BigButton
              title="ألم"
              icon="🩹"
              color={COLORS.pain}
              onPress={() => navigation.navigate('PainLocation')}
              size="large"
            />
          </View>

          <View style={styles.buttonRow}>
            <BigButton
              title="مشاعر"
              icon="😊"
              color={COLORS.emotions}
              onPress={() => navigation.navigate('Emotions')}
              size="large"
            />
            <BigButton
              title="محادثة"
              icon="💬"
              color={COLORS.conversation}
              onPress={() => navigation.navigate('Conversation')}
              size="large"
            />
          </View>
        </View>

        <View style={styles.bottomButtons}>
          <TouchableOpacity
            style={styles.customButton}
            onPress={() => navigation.navigate('CustomPhrases')}
          >
            <Text style={styles.customButtonText}>عبارات مخصصة ✨</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() => navigation.navigate('Settings')}
          >
            <Text style={styles.settingsButtonText}>⚙️ الإعدادات</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.lg,  // Increased padding for breathing room
  },
  title: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: '700',
    color: COLORS.text,
    textAlign: 'center',
    marginTop: SPACING.md,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.lg,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  buttonGrid: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    maxWidth: 500,  // Prevent buttons from becoming too wide on tablets
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginVertical: SPACING.md,  // More vertical spacing
    gap: SPACING.md,             // Consistent gap between buttons
  },
  bottomButtons: {
    width: '100%',
    maxWidth: 500,
    paddingBottom: SPACING.md,
  },
  customButton: {
    backgroundColor: COLORS.custom,
    paddingVertical: SPACING.lg,   // Larger touch target
    paddingHorizontal: SPACING.xl,
    borderRadius: 12,
    marginBottom: SPACING.md,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
    minHeight: 64,                // Minimum touch target (WCAG)
    justifyContent: 'center',
  },
  customButtonText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.xl,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: FONT_SIZES.xl * 1.3,
  },
  settingsButton: {
    backgroundColor: COLORS.surface,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.xl,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.border,
    minHeight: 64,
    justifyContent: 'center',
  },
  settingsButtonText: {
    color: COLORS.text,
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: FONT_SIZES.lg * 1.3,
  },
});

export default HomeScreen;
