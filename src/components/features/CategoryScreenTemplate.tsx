import React, { useCallback, useMemo } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  StatusBar,
  useWindowDimensions,
} from 'react-native';
import type { ListRenderItemInfo } from 'react-native';
import type { Phrase } from '../../types';
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
 * Map category to its color
 */
const CATEGORY_COLOR_MAP: Record<JsonPhraseCategory, string> = {
  basic_needs: COLORS.basicNeeds,
  pain: COLORS.pain,
  emotions: COLORS.emotions,
  conversation: COLORS.conversation,
  family: COLORS.family,
};

/**
 * A reusable template for category screens that display phrase grids.
 * Handles phrase selection, audio playback, sharing, and favorites.
 */
const CategoryScreenTemplate: React.FC<CategoryScreenTemplateProps> = ({
  category,
  screenName,
}) => {
  const { width: screenWidth } = useWindowDimensions();
  const buttonSize = useButtonSize();
  const highContrast = useHighContrast();

  // Responsive grid calculations - always 2 columns minimum
  const horizontalPadding = SPACING.md * 2; // padding on both sides
  const gap = SPACING.sm; // smaller gap for better fit
  const numColumns = 2;
  const availableWidth = screenWidth - horizontalPadding;
  const itemWidth = (availableWidth - gap * (numColumns - 1)) / numColumns;

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

  // Get the category color for all buttons on this screen
  const categoryColor = CATEGORY_COLOR_MAP[category];

  // Memoized render function for FlatList items
  const renderItem = useCallback(
    ({ item: phrase }: ListRenderItemInfo<Phrase>) => (
      <View style={{ width: itemWidth, marginBottom: gap }}>
        <PhraseButton
          phrase={phrase}
          size={buttonSize}
          highContrast={highContrast}
          categoryColor={categoryColor}
          onPress={() => handlePhrasePress(phrase)}
        />
      </View>
    ),
    [itemWidth, gap, buttonSize, highContrast, categoryColor, handlePhrasePress],
  );

  // Key extractor for FlatList
  const keyExtractor = useCallback((item: Phrase) => item.id, []);

  return (
    <View style={[styles.container, highContrast && styles.containerHighContrast]}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.background}
      />

      <FlatList
        data={phrases}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={numColumns}
        style={styles.flatList}
        contentContainerStyle={styles.flatListContent}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
        // Performance optimizations
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={5}
        initialNumToRender={8}
        // Accessibility
        accessibilityRole="list"
        accessibilityLabel="قائمة العبارات - Phrases list"
      />

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
  containerHighContrast: {
    backgroundColor: COLORS.highContrastBackground,
  },
  flatList: {
    flex: 1,
  },
  flatListContent: {
    paddingTop: SPACING.md,
    paddingBottom: 160, // Space for BottomActionBar + safe area
    paddingHorizontal: SPACING.md,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});

export default CategoryScreenTemplate;
