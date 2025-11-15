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
import { PhraseButton, SectionHeader } from '../components';
import {
  PAIN_EMERGENCY_PHRASES,
  getBodyPartsByCategory,
  BODY_PART_CATEGORY_ORDER,
} from '../data/painLocationData';
import { Phrase } from '../types';
import AudioService from '../services/AudioService';
import HapticService from '../services/HapticService';

const PainLocationScreen: React.FC<PainLocationScreenProps> = () => {
  const [selectedBodyPart, setSelectedBodyPart] = useState<Phrase | undefined>(
    undefined,
  );
  const [isPlaying, setIsPlaying] = useState(false);

  // Get body parts grouped by category
  const bodyPartsByCategory = getBodyPartsByCategory();

  // Handle body part selection
  const handleBodyPartSelect = async (bodyPart: Phrase) => {
    setSelectedBodyPart(bodyPart);
    await HapticService.trigger('medium');

    // Play body part audio
    await playPainAudio(bodyPart);
  };

  // Play pain audio
  const playPainAudio = async (bodyPart: Phrase) => {
    if (isPlaying) return;

    try {
      setIsPlaying(true);
      await AudioService.play(bodyPart.audioFile);
    } catch (error) {
      console.error('Error playing pain audio:', error);
    } finally {
      setIsPlaying(false);
    }
  };

  // Handle re-play button
  const handleReplay = async () => {
    if (!selectedBodyPart) return;
    await playPainAudio(selectedBodyPart);
  };

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
        {/* Emergency Phrases Section */}
        <SectionHeader title="حالات طارئة" subtitle="Emergency Phrases" />
        <View style={styles.emergencyGrid}>
          {PAIN_EMERGENCY_PHRASES.map(phrase => (
            <PhraseButton
              key={phrase.id}
              phrase={phrase}
              size="large"
              showEnglish={false}
            />
          ))}
        </View>

        {/* Body Parts by Category */}
        {BODY_PART_CATEGORY_ORDER.map(category => {
          const parts = bodyPartsByCategory[category];
          if (!parts || parts.length === 0) return null;

          return (
            <View key={category}>
              <SectionHeader title={category} />
              <View style={styles.bodyPartsGrid}>
                {parts.map(part => (
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
      {selectedBodyPart && (
        <View style={styles.selectedPhraseContainer}>
          <View style={styles.selectedPhraseContent}>
            <View style={styles.phraseTextContainer}>
              <Text style={styles.selectedPhraseArabic}>
                {selectedBodyPart.arabicText}
              </Text>
              <Text style={styles.selectedPhraseEnglish}>
                {selectedBodyPart.englishText}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.replayButton}
              onPress={handleReplay}
              disabled={isPlaying}
              activeOpacity={0.7}
            >
              {isPlaying ? (
                <ActivityIndicator size="small" color={COLORS.white} />
              ) : (
                <Text style={styles.replayIcon}>🔊</Text>
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
    paddingBottom: 120, // Space for selected phrase bar
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
    backgroundColor: COLORS.primary,
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
  replayButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  replayIcon: {
    fontSize: 28,
  },
});

export default PainLocationScreen;
