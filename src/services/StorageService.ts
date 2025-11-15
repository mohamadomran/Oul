/**
 * Storage Service
 *
 * Handles all AsyncStorage operations for the app
 * - Custom phrases CRUD
 * - App settings persistence
 * - Usage statistics (future)
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import type { CustomPhrase, AppSettings } from '../types';
import { DEFAULT_SETTINGS } from '../types';

/**
 * Storage Keys
 */
const STORAGE_KEYS = {
  CUSTOM_PHRASES: '@oul_custom_phrases',
  APP_SETTINGS: '@oul_app_settings',
  USAGE_STATS: '@oul_usage_stats', // Future
} as const;

/**
 * Storage Service Class
 */
class StorageService {
  // ========================================
  // Custom Phrases
  // ========================================

  /**
   * Get all custom phrases
   */
  async getCustomPhrases(): Promise<CustomPhrase[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.CUSTOM_PHRASES);
      if (!data) {
        return [];
      }
      return JSON.parse(data) as CustomPhrase[];
    } catch (error) {
      console.error('[StorageService] Error getting custom phrases:', error);
      return [];
    }
  }

  /**
   * Save all custom phrases
   */
  async saveCustomPhrases(phrases: CustomPhrase[]): Promise<void> {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEYS.CUSTOM_PHRASES,
        JSON.stringify(phrases)
      );
    } catch (error) {
      console.error('[StorageService] Error saving custom phrases:', error);
      throw error;
    }
  }

  /**
   * Add a new custom phrase
   */
  async addCustomPhrase(phrase: CustomPhrase): Promise<void> {
    try {
      const phrases = await this.getCustomPhrases();
      phrases.push(phrase);
      await this.saveCustomPhrases(phrases);
    } catch (error) {
      console.error('[StorageService] Error adding custom phrase:', error);
      throw error;
    }
  }

  /**
   * Update an existing custom phrase
   */
  async updateCustomPhrase(
    id: string,
    updates: Partial<CustomPhrase>
  ): Promise<void> {
    try {
      const phrases = await this.getCustomPhrases();
      const index = phrases.findIndex(p => p.id === id);

      if (index === -1) {
        throw new Error(`Phrase with id ${id} not found`);
      }

      phrases[index] = { ...phrases[index], ...updates };
      await this.saveCustomPhrases(phrases);
    } catch (error) {
      console.error('[StorageService] Error updating custom phrase:', error);
      throw error;
    }
  }

  /**
   * Delete a custom phrase
   */
  async deleteCustomPhrase(id: string): Promise<void> {
    try {
      const phrases = await this.getCustomPhrases();
      const filtered = phrases.filter(p => p.id !== id);
      await this.saveCustomPhrases(filtered);
    } catch (error) {
      console.error('[StorageService] Error deleting custom phrase:', error);
      throw error;
    }
  }

  /**
   * Increment usage count for a phrase
   */
  async incrementPhraseUsage(id: string): Promise<void> {
    try {
      const phrases = await this.getCustomPhrases();
      const index = phrases.findIndex(p => p.id === id);

      if (index !== -1) {
        phrases[index].usageCount = (phrases[index].usageCount || 0) + 1;
        phrases[index].lastUsed = Date.now();
        await this.saveCustomPhrases(phrases);
      }
    } catch (error) {
      console.error('[StorageService] Error incrementing usage:', error);
      // Don't throw - usage tracking is not critical
    }
  }

  // ========================================
  // App Settings
  // ========================================

  /**
   * Get app settings
   */
  async getSettings(): Promise<AppSettings> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.APP_SETTINGS);
      if (!data) {
        return DEFAULT_SETTINGS;
      }
      return { ...DEFAULT_SETTINGS, ...JSON.parse(data) };
    } catch (error) {
      console.error('[StorageService] Error getting settings:', error);
      return DEFAULT_SETTINGS;
    }
  }

  /**
   * Save app settings
   */
  async saveSettings(settings: AppSettings): Promise<void> {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEYS.APP_SETTINGS,
        JSON.stringify(settings)
      );
    } catch (error) {
      console.error('[StorageService] Error saving settings:', error);
      throw error;
    }
  }

  /**
   * Update a specific setting
   */
  async updateSetting<K extends keyof AppSettings>(
    key: K,
    value: AppSettings[K]
  ): Promise<void> {
    try {
      const settings = await this.getSettings();
      settings[key] = value;
      await this.saveSettings(settings);
    } catch (error) {
      console.error('[StorageService] Error updating setting:', error);
      throw error;
    }
  }

  // ========================================
  // Utility
  // ========================================

  /**
   * Clear all app data (for testing/reset)
   */
  async clearAll(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.CUSTOM_PHRASES,
        STORAGE_KEYS.APP_SETTINGS,
        STORAGE_KEYS.USAGE_STATS,
      ]);
    } catch (error) {
      console.error('[StorageService] Error clearing all data:', error);
      throw error;
    }
  }
}

// Export singleton instance
export default new StorageService();
