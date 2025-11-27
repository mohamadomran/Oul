import React, { useRef, useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  useWindowDimensions,
  StatusBar,
} from 'react-native';
import type { ListRenderItemInfo } from 'react-native';
import { COLORS, SPACING, FONT_SIZES } from '../constants';
import {
  PhraseButton,
  BottomActionBar,
  PhraseActionBottomSheet,
  AudioPlaybackIndicator,
} from '../components';
import type { Phrase, PhraseCategory } from '../types/phrase.types';
import type { PhraseActionBottomSheetRef } from '../types/ui.types';
import { useButtonSize, useHighContrast } from '../contexts/SettingsContext';
import {
  useFavorites,
  useSharePhrase,
  useAudioPlayback,
} from '../hooks';
import JsonAudioService from '../services/JsonAudioService';

/**
 * Map category to its color for icons
 */
const CATEGORY_COLOR_MAP: Record<PhraseCategory, string> = {
  basic_needs: COLORS.basicNeeds,
  pain: COLORS.pain,
  emotions: COLORS.emotions,
  conversation: COLORS.conversation,
  family: COLORS.family,
  custom: COLORS.custom,
};

const FavoritesScreen: React.FC = () => {
  const bottomSheetRef = useRef<PhraseActionBottomSheetRef>(null);
  const [selectedPhrase, setSelectedPhrase] = useState<Phrase | null>(null);
  const { width: screenWidth } = useWindowDimensions();

  const buttonSize = useButtonSize();
  const highContrast = useHighContrast();

  // Responsive grid calculations - always 2 columns
  const horizontalPadding = SPACING.md * 2;
  const gap = SPACING.sm;
  const numColumns = 2;
  const availableWidth = screenWidth - horizontalPadding;
  const itemWidth = (availableWidth - gap * (numColumns - 1)) / numColumns;

  const { loading, favorites, isFavorite, toggleFavorite } = useFavorites();
  const { sharePhrase } = useSharePhrase();
  const { isPlaying } = useAudioPlayback('basic_needs');

  const handlePhrasePress = useCallback((phrase: Phrase) => {
    setSelectedPhrase(phrase);
    bottomSheetRef.current?.snapToIndex(0);
  }, []);

  const handlePlay = useCallback(async () => {
    if (!selectedPhrase || !selectedPhrase.category) return;
    try {
      const category = selectedPhrase.category;
      if (category === 'custom') return;

      await JsonAudioService.play(
        category as Exclude<typeof category, 'custom'>,
        selectedPhrase.id,
      );
    } catch (error) {
      console.error('[FavoritesScreen] Error playing audio:', error);
    }
  }, [selectedPhrase]);

  const handleShare = useCallback(async () => {
    if (!selectedPhrase) return;
    await sharePhrase(selectedPhrase.arabicText, selectedPhrase.englishText);
  }, [selectedPhrase, sharePhrase]);

  const handleToggleFavorite = useCallback(async () => {
    if (!selectedPhrase || !selectedPhrase.category) return;
    await toggleFavorite(selectedPhrase.category, selectedPhrase.id);
  }, [selectedPhrase, toggleFavorite]);

  const handleClose = useCallback(() => {
    setSelectedPhrase(null);
  }, []);

  const isSelectedFavorite = useMemo(
    () =>
      selectedPhrase && selectedPhrase.category
        ? isFavorite(selectedPhrase.category, selectedPhrase.id)
        : false,
    [selectedPhrase, isFavorite],
  );

  // Render item for FlatList
  const renderItem = useCallback(
    ({ item: phrase }: ListRenderItemInfo<Phrase>) => {
      const categoryColor = phrase.category
        ? CATEGORY_COLOR_MAP[phrase.category]
        : COLORS.primary;

      return (
        <View style={{ width: itemWidth, marginBottom: gap }}>
          <PhraseButton
            phrase={phrase}
            size={buttonSize}
            highContrast={highContrast}
            categoryColor={categoryColor}
            onPress={() => handlePhrasePress(phrase)}
          />
        </View>
      );
    },
    [itemWidth, gap, buttonSize, highContrast, handlePhrasePress],
  );

  const keyExtractor = useCallback(
    (item: Phrase) => `${item.category}-${item.id}`,
    [],
  );

  // Empty state component
  const EmptyState = useMemo(
    () => (
      <View style={styles.emptyState}>
        <Text style={styles.emptyIcon}>⭐</Text>
        <Text style={styles.emptyTitle}>لا توجد عبارات مفضلة</Text>
        <Text style={styles.emptySubtitle}>
          No favorites yet{'\n'}
          Tap the star button when viewing a phrase to add it here
        </Text>
      </View>
    ),
    [],
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, highContrast && styles.containerHighContrast]}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.background}
      />

      {favorites.length === 0 ? (
        EmptyState
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          numColumns={numColumns}
          style={styles.flatList}
          contentContainerStyle={styles.flatListContent}
          columnWrapperStyle={styles.columnWrapper}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
          maxToRenderPerBatch={10}
          windowSize={5}
          initialNumToRender={8}
          accessibilityRole="list"
          accessibilityLabel="قائمة المفضلة - Favorites list"
        />
      )}

      <BottomActionBar currentScreen="Favorites" />

      <PhraseActionBottomSheet
        ref={bottomSheetRef}
        arabicText={selectedPhrase?.arabicText || ''}
        englishText={selectedPhrase?.englishText || ''}
        icon={selectedPhrase?.icon}
        onPlay={handlePlay}
        onShare={handleShare}
        onToggleFavorite={handleToggleFavorite}
        onClose={handleClose}
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
    paddingBottom: 160,
    paddingHorizontal: SPACING.md,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACING.xxl * 2,
  },
  emptyIcon: {
    fontSize: 96,
    marginBottom: SPACING.xl,
    opacity: 0.3,
  },
  emptyTitle: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '500',
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: FONT_SIZES.lg * 1.5,
  },
});

export default FavoritesScreen;
