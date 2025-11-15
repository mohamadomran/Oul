import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar } from 'react-native';
import type { BasicNeedsScreenProps } from '../types';
import { COLORS, SPACING, FONT_SIZES, FONTS } from '../constants';
import { PhraseButton, BottomActionBar, PhraseActionBottomSheet } from '../components';
import { BASIC_NEEDS_PHRASES } from '../data';
import AudioService from '../services/AudioService';
import { shareViaWhatsApp } from '../services/ShareService';
import type { Phrase } from '../types';
import type { PhraseActionBottomSheetRef } from '../types/ui.types';

const BasicNeedsScreen: React.FC<BasicNeedsScreenProps> = () => {
  const bottomSheetRef = useRef<PhraseActionBottomSheetRef>(null);
  const [selectedPhrase, setSelectedPhrase] = useState<Phrase | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePhrasePress = (phrase: Phrase) => {
    setSelectedPhrase(phrase);
    bottomSheetRef.current?.snapToIndex(0);
  };

  const handlePlay = async () => {
    if (!selectedPhrase?.audioFile) return;

    try {
      setIsPlaying(true);
      await AudioService.play(selectedPhrase.audioFile);
    } catch (error) {
      console.error('Error playing audio:', error);
    } finally {
      setIsPlaying(false);
    }
  };

  const handleShare = async () => {
    if (!selectedPhrase) return;
    await shareViaWhatsApp(selectedPhrase.arabicText, selectedPhrase.englishText);
  };

  const handleClose = () => {
    setSelectedPhrase(null);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Phrase Grid */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.grid}>
          {BASIC_NEEDS_PHRASES.map(phrase => (
            <PhraseButton
              key={phrase.id}
              phrase={phrase}
              size="large"
              showEnglish={false}
              onPress={() => handlePhrasePress(phrase)}
            />
          ))}
        </View>
      </ScrollView>

      <BottomActionBar currentScreen="BasicNeeds" />

      <PhraseActionBottomSheet
        ref={bottomSheetRef}
        arabicText={selectedPhrase?.arabicText || ''}
        englishText={selectedPhrase?.englishText || ''}
        icon={selectedPhrase?.icon || ''}
        onPlay={handlePlay}
        onShare={handleShare}
        onClose={handleClose}
        isPlaying={isPlaying}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.lg,
    paddingTop: SPACING.xl, // Extra top padding since header is removed
    paddingBottom: 180, // Extra space for bottom action bar
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: SPACING.md,
  },
});

export default BasicNeedsScreen;
