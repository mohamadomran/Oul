import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Phrase, PhraseCategory } from '../types';

const FAVORITES_KEY = '@oul_favorites';

/**
 * Stored favorite reference - stores category and ID to reconstruct phrase
 */
interface FavoriteRef {
  category: PhraseCategory;
  phraseId: string;
}

/**
 * Service for managing favorite phrases using AsyncStorage
 */
class FavoritesService {
  private favorites: Set<string> = new Set();
  private initialized: boolean = false;
  private listeners: Set<() => void> = new Set();

  /**
   * Initialize the service by loading favorites from storage
   */
  async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      const stored = await AsyncStorage.getItem(FAVORITES_KEY);
      if (stored) {
        const refs: FavoriteRef[] = JSON.parse(stored);
        this.favorites = new Set(refs.map(ref => this.getKey(ref.category, ref.phraseId)));
      }
      this.initialized = true;
    } catch (error) {
      console.error('[FavoritesService] Error loading favorites:', error);
      this.favorites = new Set();
      this.initialized = true;
    }
  }

  /**
   * Create a unique key for a phrase
   */
  private getKey(category: PhraseCategory, phraseId: string): string {
    return `${category}:${phraseId}`;
  }

  /**
   * Parse a key back into category and phraseId
   */
  private parseKey(key: string): FavoriteRef {
    const [category, phraseId] = key.split(':');
    return { category: category as PhraseCategory, phraseId };
  }

  /**
   * Save favorites to AsyncStorage
   */
  private async save(): Promise<void> {
    try {
      const refs: FavoriteRef[] = Array.from(this.favorites).map(key => this.parseKey(key));
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(refs));
    } catch (error) {
      console.error('[FavoritesService] Error saving favorites:', error);
    }
  }

  /**
   * Notify all listeners of a change
   */
  private notifyListeners(): void {
    this.listeners.forEach(listener => {
      try {
        listener();
      } catch (error) {
        console.error('[FavoritesService] Error in listener:', error);
      }
    });
  }

  /**
   * Check if a phrase is a favorite
   */
  isFavorite(category: PhraseCategory, phraseId: string): boolean {
    return this.favorites.has(this.getKey(category, phraseId));
  }

  /**
   * Add a phrase to favorites
   */
  async addFavorite(category: PhraseCategory, phraseId: string): Promise<void> {
    if (!this.initialized) await this.initialize();

    const key = this.getKey(category, phraseId);
    if (!this.favorites.has(key)) {
      this.favorites.add(key);
      await this.save();
      this.notifyListeners();
    }
  }

  /**
   * Remove a phrase from favorites
   */
  async removeFavorite(category: PhraseCategory, phraseId: string): Promise<void> {
    if (!this.initialized) await this.initialize();

    const key = this.getKey(category, phraseId);
    if (this.favorites.has(key)) {
      this.favorites.delete(key);
      await this.save();
      this.notifyListeners();
    }
  }

  /**
   * Toggle a phrase's favorite status
   */
  async toggleFavorite(category: PhraseCategory, phraseId: string): Promise<boolean> {
    if (!this.initialized) await this.initialize();

    const isFav = this.isFavorite(category, phraseId);
    if (isFav) {
      await this.removeFavorite(category, phraseId);
    } else {
      await this.addFavorite(category, phraseId);
    }
    return !isFav;
  }

  /**
   * Get all favorite references
   */
  getFavoriteRefs(): FavoriteRef[] {
    return Array.from(this.favorites).map(key => this.parseKey(key));
  }

  /**
   * Get count of favorites
   */
  getCount(): number {
    return this.favorites.size;
  }

  /**
   * Subscribe to changes
   */
  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Clear all favorites
   */
  async clearAll(): Promise<void> {
    this.favorites.clear();
    await this.save();
    this.notifyListeners();
  }
}

export default new FavoritesService();
export type { FavoriteRef };
