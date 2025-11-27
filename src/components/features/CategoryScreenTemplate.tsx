import React, { useCallback, useMemo } from 'react';
import { View, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { COLORS, SPACING } from '../../constants';
import {
  PhraseButton,
  BottomActionBar,
  PhraseActionBottomSheet,
  AudioPlaybackIndicator,
} from '../../components';
import JsonAudioService, {
  type JsonPhraseCategory,
} from '../../services/JsonAudioService';
import { useButtonSize, useHighContrast } from '../../contexts/SettingsContext';
import {
  useAudioPlayback,
  useSharePhrase,
  usePhraseSelection,
  useFavorites,
} from '../../hooks';

/**
 * Screen names used by BottomActionBar for navigation highlighting
 */
export type ScreenName =
  | 'BasicNeeds'
  | 'Emotions'
  | 'Conversation'
  | 'Family'
  | 'PainLocation';

interface CategoryScreenTemplateProps {
  /** The phrase category for fetching data from JsonAudioService */
  category: JsonPhraseCategory;
  /** The screen name for BottomActionBar navigation state */
  screenName: ScreenName;
}

/**
 * A reusable template for category screens that display phrase grids.
 * Handles phrase selection, audio playback, sharing, and favorites.
 */
const CategoryScreenTemplate: React.FC<CategoryScreenTemplateProps> = ({
  category,
  screenName,
}) => {
  const buttonSize = useButtonSize();
  const highContrast = useHighContrast();

  // Custom hooks for audio, sharing, selection, and favorites
  const { isPlaying, playPhrase } = useAudioPlayback(category);
  const { sharePhrase } = useSharePhrase();
  const { selectedPhrase, bottomSheetRef, handlePhrasePress, clearSelection } =
    usePhraseSelection();
  const { isFavorite, toggleFavorite } = useFavorites();

  // Memoize phrases to prevent re-fetching on every render
  const phrases = useMemo(
    () => JsonAudioService.getPhrasesByCategory(category),
    [category],
  );

  // Memoize handlers to prevent unnecessary re-renders of child components
  const handlePlay = useCallback(async () => {
    if (!selectedPhrase) return;
    try {
      await playPhrase(selectedPhrase.id);
    } catch (error) {
      console.error(`[${screenName}] Error playing audio:`, error);
    }
  }, [selectedPhrase, playPhrase, screenName]);

  const handleShare = useCallback(async () => {
    if (!selectedPhrase) return;
    await sharePhrase(selectedPhrase.arabicText, selectedPhrase.englishText);
  }, [selectedPhrase, sharePhrase]);

  const handleToggleFavorite = useCallback(async () => {
    if (!selectedPhrase) return;
    await toggleFavorite(category, selectedPhrase.id);
  }, [selectedPhrase, category, toggleFavorite]);

  // Memoize favorite check
  const isSelectedFavorite = useMemo(
    () => (selectedPhrase ? isFavorite(category, selectedPhrase.id) : false),
    [selectedPhrase, category, isFavorite],
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.grid}>
          {phrases.map(phrase => (
            <View key={phrase.id} style={styles.gridItem}>
              <PhraseButton
                phrase={phrase}
                size={buttonSize}
                highContrast={highContrast}
                onPress={() => handlePhrasePress(phrase)}
              />
            </View>
          ))}
        </View>
      </ScrollView>

      <BottomActionBar currentScreen={screenName} />

      <PhraseActionBottomSheet
        ref={bottomSheetRef}
        arabicText={selectedPhrase?.arabicText || ''}
        englishText={selectedPhrase?.englishText || ''}
        icon={selectedPhrase?.icon}
        onPlay={handlePlay}
        onShare={handleShare}
        onToggleFavorite={handleToggleFavorite}
        onClose={clearSelection}
        isPlaying={isPlaying}
        isFavorite={isSelectedFavorite}
      />

      <AudioPlaybackIndicator isPlaying={isPlaying} />
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
    paddingTop: SPACING.xl,
    paddingBottom: 180,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: SPACING.md,
  },
  gridItem: {
    width: '48%',
  },
});

export default CategoryScreenTemplate;
