/**
 * Pain Location Screen
 *
 * Advanced pain reporting with:
 * - Intensity selection (light, moderate, severe)
 * - 16 body part locations organized by category
 * - 3 emergency phrases for quick access
 * - Dynamic phrase composition with TTS
 *
 * Flow: Select intensity → Select body part → Phrase is composed & spoken
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import type { PainLocationScreenProps } from '../types';
import { COLORS, SPACING, FONT_SIZES } from '../constants';
import { PhraseButton, PainIntensitySelector, SectionHeader } from '../components';
import {
  PAIN_BODY_PARTS,
  PAIN_EMERGENCY_PHRASES,
  getBodyPartsByCategory,
  BODY_PART_CATEGORY_ORDER,
} from '../data/painLocationData';
import {
  buildPainPhrase,
  buildPainPhraseEnglish,
  getPainIntensityColor,
} from '../utils/painPhraseBuilder';
import { PainIntensity, Phrase } from '../types';
import TTSService from '../services/TTSService';
import HapticService from '../services/HapticService';

const PainLocationScreen: React.FC<PainLocationScreenProps> = () => {
  const [selectedIntensity, setSelectedIntensity] = useState<PainIntensity | undefined>(
    undefined
  );
  const [selectedBodyPart, setSelectedBodyPart] = useState<Phrase | undefined>(undefined);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Get body parts grouped by category
  const bodyPartsByCategory = getBodyPartsByCategory();

  // Handle body part selection
  const handleBodyPartSelect = async (bodyPart: Phrase) => {
    setSelectedBodyPart(bodyPart);
    await HapticService.trigger('medium');

    // Immediately speak the composed phrase
    const arabicPhrase = buildPainPhrase(bodyPart.arabicText, selectedIntensity);
    await speakPhrase(arabicPhrase);
  };

  // Handle intensity selection
  const handleIntensitySelect = (intensity: PainIntensity) => {
    setSelectedIntensity(intensity);
  };

  // Speak composed phrase
  const speakPhrase = async (phrase: string) => {
    if (isSpeaking) return;

    try {
      setIsSpeaking(true);
      await TTSService.speak(phrase, 'ar');
    } catch (error) {
      console.error('Error speaking phrase:', error);
    } finally {
      setIsSpeaking(false);
    }
  };

  // Handle re-speak button
  const handleRespeak = async () => {
    if (!selectedBodyPart) return;
    const arabicPhrase = buildPainPhrase(selectedBodyPart.arabicText, selectedIntensity);
    await speakPhrase(arabicPhrase);
  };

  // Get the composed phrase text
  const getComposedPhrase = () => {
    if (!selectedBodyPart) return null;

    return {
      arabic: buildPainPhrase(selectedBodyPart.arabicText, selectedIntensity),
      english: buildPainPhraseEnglish(selectedBodyPart.englishText, selectedIntensity),
    };
  };

  const composedPhrase = getComposedPhrase();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>ألم</Text>
        <Text style={styles.subtitle}>Pain Location • Report your pain</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Intensity Selector */}
        <PainIntensitySelector
          selectedIntensity={selectedIntensity}
          onSelectIntensity={handleIntensitySelect}
        />

        {/* Emergency Phrases Section */}
        <SectionHeader title="حالات طارئة" subtitle="Emergency Phrases" />
        <View style={styles.emergencyGrid}>
          {PAIN_EMERGENCY_PHRASES.map((phrase) => (
            <PhraseButton
              key={phrase.id}
              phrase={phrase}
              size="large"
              showEnglish={false}
            />
          ))}
        </View>

        {/* Body Parts by Category */}
        {BODY_PART_CATEGORY_ORDER.map((category) => {
          const parts = bodyPartsByCategory[category];
          if (!parts || parts.length === 0) return null;

          return (
            <View key={category}>
              <SectionHeader title={category} />
              <View style={styles.bodyPartsGrid}>
                {parts.map((part) => (
                  <PhraseButton
                    key={part.id}
                    phrase={part}
                    size="large"
                    showEnglish={false}
                    onPress={() => handleBodyPartSelect(part)}
                  />
                ))}
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* Selected Phrase Display */}
      {composedPhrase && (
        <View
          style={[
            styles.selectedPhraseContainer,
            {
              backgroundColor: getPainIntensityColor(selectedIntensity),
            },
          ]}
        >
          <View style={styles.selectedPhraseContent}>
            <View style={styles.phraseTextContainer}>
              <Text style={styles.selectedPhraseArabic}>{composedPhrase.arabic}</Text>
              <Text style={styles.selectedPhraseEnglish}>{composedPhrase.english}</Text>
            </View>

            <TouchableOpacity
              style={styles.respeakButton}
              onPress={handleRespeak}
              disabled={isSpeaking}
              activeOpacity={0.7}
            >
              {isSpeaking ? (
                <ActivityIndicator size="small" color={COLORS.white} />
              ) : (
                <Text style={styles.respeakIcon}>🔊</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      )}
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
  emergencyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: SPACING.md,
    marginBottom: SPACING.md,
  },
  bodyPartsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: SPACING.md,
  },
  selectedPhraseContainer: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 10,
  },
  selectedPhraseContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  phraseTextContainer: {
    flex: 1,
    marginRight: SPACING.md,
  },
  selectedPhraseArabic: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '700',
    color: COLORS.white,
    marginBottom: SPACING.xxs,
  },
  selectedPhraseEnglish: {
    fontSize: FONT_SIZES.md,
    fontWeight: '500',
    color: COLORS.white,
    opacity: 0.9,
  },
  respeakButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  respeakIcon: {
    fontSize: 28,
  },
});

export default PainLocationScreen;
