import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AppSettings } from '../types';
import { DEFAULT_SETTINGS } from '../types';

/**
 * Storage Keys
 */
const STORAGE_KEYS = {
  APP_SETTINGS: '@oul_app_settings',
  USAGE_STATS: '@oul_usage_stats', // Future
} as const;

/**
 * Storage Service Class
 */
class StorageService {
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
        JSON.stringify(settings),
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
    value: AppSettings[K],
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
