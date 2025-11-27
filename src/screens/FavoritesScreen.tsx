import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, FONT_SIZES } from '../constants';
import {
  PhraseButton,
  BottomActionBar,
  PhraseActionBottomSheet,
  AudioPlaybackIndicator,
} from '../components';
import type { Phrase } from '../types/phrase.types';
import type { PhraseActionBottomSheetRef } from '../types/ui.types';
import { useButtonSize, useHighContrast } from '../contexts/SettingsContext';
import {
  useFavorites,
  useSharePhrase,
  useAudioPlayback,
} from '../hooks';
import JsonAudioService from '../services/JsonAudioService';

const FavoritesScreen: React.FC = () => {
  const bottomSheetRef = useRef<PhraseActionBottomSheetRef>(null);
  const [selectedPhrase, setSelectedPhrase] = useState<Phrase | null>(null);

  const buttonSize = useButtonSize();
  const highContrast = useHighContrast();

  const { loading, favorites, isFavorite, toggleFavorite } = useFavorites();
  const { sharePhrase } = useSharePhrase();
  // Use basic_needs as default category for audio - actual category stored in phrase
  const { isPlaying } = useAudioPlayback('basic_needs');

  const handlePhrasePress = (phrase: Phrase) => {
    setSelectedPhrase(phrase);
    bottomSheetRef.current?.snapToIndex(0);
  };

  const handlePlay = async () => {
    if (!selectedPhrase || !selectedPhrase.category) return;
    try {
      // Get the category from the phrase (added by useFavorites hook)
      const category = selectedPhrase.category;
      if (category === 'custom') return; // Skip custom phrases for now

      await JsonAudioService.play(
        category as Exclude<typeof category, 'custom'>,
        selectedPhrase.id,
      );
    } catch (error) {
      console.error('[FavoritesScreen] Error playing audio:', error);
    }
  };

  const handleShare = async () => {
    if (!selectedPhrase) return;
    await sharePhrase(selectedPhrase.arabicText, selectedPhrase.englishText);
  };

  const handleToggleFavorite = async () => {
    if (!selectedPhrase || !selectedPhrase.category) return;
    await toggleFavorite(selectedPhrase.category, selectedPhrase.id);
  };

  const handleClose = () => {
    setSelectedPhrase(null);
  };

  const isSelectedFavorite =
    selectedPhrase && selectedPhrase.category
      ? isFavorite(selectedPhrase.category, selectedPhrase.id)
      : false;

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <Text style={styles.title}>المفضلة</Text>
        <Text style={styles.subtitle}>
          Favorites • {favorites.length} phrase
          {favorites.length !== 1 ? 's' : ''}
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: 100 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {favorites.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>⭐</Text>
            <Text style={styles.emptyTitle}>لا توجد عبارات مفضلة</Text>
            <Text style={styles.emptySubtitle}>
              No favorites yet{'\n'}
              Tap the star button when viewing a phrase to add it here
            </Text>
          </View>
        ) : (
          <View style={styles.grid}>
            {favorites.map(phrase => (
              <View key={`${phrase.category}-${phrase.id}`} style={styles.gridItem}>
                <PhraseButton
                  phrase={phrase}
                  size={buttonSize}
                  highContrast={highContrast}
                  onPress={() => handlePhrasePress(phrase)}
                />
              </View>
            ))}
          </View>
        )}
      </ScrollView>

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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: SPACING.xl,
    paddingBottom: SPACING.lg,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.border,
  },
  title: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: '800',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '500',
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: SPACING.xl,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
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
