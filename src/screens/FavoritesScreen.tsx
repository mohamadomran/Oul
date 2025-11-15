import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, FONT_SIZES } from '../constants';
import { PhraseButton, BottomActionBar } from '../components';
import type { Phrase } from '../types/phrase.types';
import { useButtonSize, useHighContrast } from '../contexts/SettingsContext';

const FavoritesScreen: React.FC = () => {
  const [favorites, setFavorites] = useState<Phrase[]>([]);
  const [loading, setLoading] = useState(true);
  const buttonSize = useButtonSize();
  const highContrast = useHighContrast();

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      // TODO: Load favorites from AsyncStorage
      // For now, just show empty state
      setFavorites([]);
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setLoading(false);
    }
  };

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
          { paddingBottom: 100 }, // Space for bottom bar
        ]}
        showsVerticalScrollIndicator={false}
      >
        {favorites.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>⭐</Text>
            <Text style={styles.emptyTitle}>لا توجد عبارات مفضلة</Text>
            <Text style={styles.emptySubtitle}>
              No favorites yet{'\n'}
              Tap the star icon when viewing a phrase to add it here
            </Text>
          </View>
        ) : (
          <View style={styles.grid}>
            {favorites.map(phrase => (
              <PhraseButton
                key={phrase.id}
                phrase={phrase}
                size={buttonSize}
                highContrast={highContrast}
              />
            ))}
          </View>
        )}
      </ScrollView>

      <BottomActionBar currentScreen="Favorites" />
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
    justifyContent: 'center',
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
