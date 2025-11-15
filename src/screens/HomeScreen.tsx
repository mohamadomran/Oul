/**
 * Home Screen
 *
 * Main screen with 4 category buttons + Settings
 * Categories: Basic Needs, Pain, Emotions, Conversation
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import type { HomeScreenProps } from '../types';
import { COLORS, SPACING, FONT_SIZES } from '../constants';
import { BigButton } from '../components';
import HapticService from '../services/HapticService';

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const handleCustomPhrasesPress = async () => {
    await HapticService.trigger('medium');
    navigation.navigate('CustomPhrases');
  };

  const handleSettingsPress = async () => {
    await HapticService.trigger('light');
    navigation.navigate('Settings');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <View style={styles.titleContainer}>
        <Text style={styles.primaryTitle}>قول</Text>
        <Text style={styles.secondaryTitle}>Oul</Text>
      </View>

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
            onPress={handleCustomPhrasesPress}
            activeOpacity={0.8}
            accessibilityLabel="Custom Phrases"
            accessibilityHint="Create and manage your own custom phrases"
            accessibilityRole="button"
          >
            <Text style={styles.customButtonText}>عبارات مخصصة ✨</Text>
            <Text style={styles.customButtonSubtext}>Custom Phrases</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingsButton}
            onPress={handleSettingsPress}
            activeOpacity={0.8}
            accessibilityLabel="Settings"
            accessibilityHint="Adjust app settings and preferences"
            accessibilityRole="button"
          >
            <Text style={styles.settingsButtonText}>⚙️ الإعدادات</Text>
            <Text style={styles.settingsButtonSubtext}>Settings</Text>
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
    padding: SPACING.lg, // Increased padding for breathing room
  },
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
  content: {
    flex: 1,
    justifyContent: 'flex-start', // Changed from space-between
    alignItems: 'center',
    width: '100%',
    paddingTop: SPACING.lg, // Add top padding
    paddingBottom: SPACING.xl, // Reduced bottom padding
  },
  buttonGrid: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    maxWidth: 500, // Prevent buttons from becoming too wide on tablets
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginVertical: SPACING.md, // More vertical spacing
    gap: SPACING.lg, // Increased gap between buttons
  },
  bottomButtons: {
    width: '100%',
    maxWidth: 500,
    paddingBottom: SPACING.md, // Reduced bottom padding
    marginTop: SPACING.md, // Reduced top margin
  },
  customButton: {
    backgroundColor: COLORS.custom,
    paddingVertical: SPACING.md, // Reduced padding
    paddingHorizontal: SPACING.lg,
    borderRadius: 12,
    marginBottom: SPACING.sm,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
    minHeight: 60, // Reduced height
    justifyContent: 'center',
  },
  customButtonText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: SPACING.xxs,
  },
  customButtonSubtext: {
    color: COLORS.white,
    fontSize: FONT_SIZES.sm,
    fontWeight: '500',
    textAlign: 'center',
    opacity: 0.9,
  },
  settingsButton: {
    backgroundColor: COLORS.surface,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.border,
    minHeight: 60, // Reduced height
    justifyContent: 'center',
  },
  settingsButtonText: {
    color: COLORS.text,
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: SPACING.xxs,
  },
  settingsButtonSubtext: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.sm,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default HomeScreen;
