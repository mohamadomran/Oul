import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AppSettings } from '../types/settings.types';
import { DEFAULT_SETTINGS, SETTINGS_STORAGE_KEY } from '../types/settings.types';

class SettingsService {
  private settings: AppSettings = DEFAULT_SETTINGS;
  private initialized: boolean = false;

  /**
   * Initialize the settings service by loading saved settings
   */
  async initialize(): Promise<void> {
    if (this.initialized) {
      return;
    }

    try {
      await this.loadSettings();
      this.initialized = true;
    } catch (error) {
      console.error('[SettingsService] Initialization error:', error);
      this.settings = DEFAULT_SETTINGS;
      this.initialized = true;
    }
  }

  /**
   * Load settings from AsyncStorage
   */
  async loadSettings(): Promise<AppSettings> {
    try {
      const savedSettings = await AsyncStorage.getItem(SETTINGS_STORAGE_KEY);

      if (savedSettings) {
        const parsed = JSON.parse(savedSettings);
        // Merge with defaults to handle new settings added in updates
        this.settings = { ...DEFAULT_SETTINGS, ...parsed };
      } else {
        this.settings = DEFAULT_SETTINGS;
      }

      return this.settings;
    } catch (error) {
      console.error('[SettingsService] Error loading settings:', error);
      this.settings = DEFAULT_SETTINGS;
      return this.settings;
    }
  }

  /**
   * Save settings to AsyncStorage
   */
  async saveSettings(settings: AppSettings): Promise<void> {
    try {
      this.settings = settings;
      await AsyncStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error('[SettingsService] Error saving settings:', error);
      throw error;
    }
  }

  /**
   * Update a single setting
   */
  async updateSetting<K extends keyof AppSettings>(
    key: K,
    value: AppSettings[K]
  ): Promise<void> {
    const updatedSettings = { ...this.settings, [key]: value };
    await this.saveSettings(updatedSettings);
  }

  /**
   * Get current settings
   */
  getSettings(): AppSettings {
    return this.settings;
  }

  /**
   * Get a specific setting value
   */
  getSetting<K extends keyof AppSettings>(key: K): AppSettings[K] {
    return this.settings[key];
  }

  /**
   * Reset to default settings
   */
  async resetToDefaults(): Promise<void> {
    try {
      await this.saveSettings(DEFAULT_SETTINGS);
    } catch (error) {
      console.error('[SettingsService] Error resetting settings:', error);
      throw error;
    }
  }

  /**
   * Clear all settings
   */
  async clearSettings(): Promise<void> {
    try {
      await AsyncStorage.removeItem(SETTINGS_STORAGE_KEY);
      this.settings = DEFAULT_SETTINGS;
    } catch (error) {
      console.error('[SettingsService] Error clearing settings:', error);
      throw error;
    }
  }

  /**
   * Check if service is initialized
   */
  isInitialized(): boolean {
    return this.initialized;
  }
}

export default new SettingsService();
