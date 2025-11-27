import { useState, useEffect, useCallback } from 'react';
import FavoritesService, { type FavoriteRef } from '../services/FavoritesService';
import JsonAudioService from '../services/JsonAudioService';
import type { Phrase, PhraseCategory } from '../types';

interface UseFavoritesResult {
  /** Whether the service is still loading */
  loading: boolean;
  /** All favorite phrases with full data */
  favorites: Phrase[];
  /** Check if a specific phrase is favorited */
  isFavorite: (category: PhraseCategory, phraseId: string) => boolean;
  /** Toggle favorite status for a phrase */
  toggleFavorite: (category: PhraseCategory, phraseId: string) => Promise<boolean>;
  /** Number of favorites */
  count: number;
}

/**
 * Hook for managing favorite phrases.
 * Automatically syncs with FavoritesService and provides full phrase data.
 *
 * @example
 * ```tsx
 * const { favorites, isFavorite, toggleFavorite } = useFavorites();
 *
 * const handleToggle = async () => {
 *   const isNowFavorite = await toggleFavorite('basic_needs', 'bn_water');
 * };
 * ```
 */
export function useFavorites(): UseFavoritesResult {
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<Phrase[]>([]);
  const [, forceUpdate] = useState(0);

  // Load favorites on mount
  useEffect(() => {
    const loadFavorites = async () => {
      await FavoritesService.initialize();
      updateFavorites();
      setLoading(false);
    };

    loadFavorites();

    // Subscribe to changes
    const unsubscribe = FavoritesService.subscribe(() => {
      forceUpdate(n => n + 1);
      updateFavorites();
    });

    return unsubscribe;
  }, []);

  // Convert favorite refs to full phrase objects
  const updateFavorites = useCallback(() => {
    const refs = FavoritesService.getFavoriteRefs();
    const phrases: Phrase[] = [];

    for (const ref of refs) {
      // Skip 'custom' category as it's not in JsonAudioService
      if (ref.category === 'custom') continue;

      const phrase = JsonAudioService.getPhrase(
        ref.category as Exclude<PhraseCategory, 'custom'>,
        ref.phraseId,
      );
      if (phrase) {
        // Add category to phrase for display purposes
        phrases.push({ ...phrase, category: ref.category });
      }
    }

    setFavorites(phrases);
  }, []);

  const isFavorite = useCallback(
    (category: PhraseCategory, phraseId: string): boolean => {
      return FavoritesService.isFavorite(category, phraseId);
    },
    [],
  );

  const toggleFavorite = useCallback(
    async (category: PhraseCategory, phraseId: string): Promise<boolean> => {
      return await FavoritesService.toggleFavorite(category, phraseId);
    },
    [],
  );

  return {
    loading,
    favorites,
    isFavorite,
    toggleFavorite,
    count: FavoritesService.getCount(),
  };
}

/**
 * Hook for checking/toggling a single phrase's favorite status.
 * More efficient than useFavorites when you only need to check one phrase.
 *
 * @example
 * ```tsx
 * const { isFavorite, toggle } = usePhraseIsFavorite('basic_needs', 'bn_water');
 * ```
 */
export function usePhraseIsFavorite(
  category: PhraseCategory,
  phraseId: string,
): { isFavorite: boolean; toggle: () => Promise<boolean> } {
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const init = async () => {
      await FavoritesService.initialize();
      setIsFav(FavoritesService.isFavorite(category, phraseId));
    };
    init();

    const unsubscribe = FavoritesService.subscribe(() => {
      setIsFav(FavoritesService.isFavorite(category, phraseId));
    });

    return unsubscribe;
  }, [category, phraseId]);

  const toggle = useCallback(async (): Promise<boolean> => {
    const newState = await FavoritesService.toggleFavorite(category, phraseId);
    return newState;
  }, [category, phraseId]);

  return { isFavorite: isFav, toggle };
}

export default useFavorites;
