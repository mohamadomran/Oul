import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { AppSettings, FontSize, ButtonSize } from '../types/settings.types';
import SettingsService from '../services/SettingsService';

interface SettingsContextType {
  settings: AppSettings;
  updateSetting: <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => Promise<void>;
  resetToDefaults: () => Promise<void>;
  isLoading: boolean;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

interface SettingsProviderProps {
  children: ReactNode;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<AppSettings>(SettingsService.getSettings());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setIsLoading(true);
      const loadedSettings = await SettingsService.loadSettings();
      setSettings(loadedSettings);
    } catch (error) {
      console.error('[SettingsContext] Error loading settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateSetting = async <K extends keyof AppSettings>(
    key: K,
    value: AppSettings[K]
  ) => {
    try {
      const newSettings = { ...settings, [key]: value };
      setSettings(newSettings);
      await SettingsService.saveSettings(newSettings);
    } catch (error) {
      console.error('[SettingsContext] Error updating setting:', error);
      throw error;
    }
  };

  const resetToDefaults = async () => {
    try {
      await SettingsService.resetToDefaults();
      const defaultSettings = SettingsService.getSettings();
      setSettings(defaultSettings);
    } catch (error) {
      console.error('[SettingsContext] Error resetting to defaults:', error);
      throw error;
    }
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSetting, resetToDefaults, isLoading }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

// Helper hooks for specific settings
export const useFontSize = (): FontSize => {
  const { settings } = useSettings();
  return settings.fontSize;
};

export const useButtonSize = (): ButtonSize => {
  const { settings } = useSettings();
  return settings.buttonSize;
};

export const useHighContrast = (): boolean => {
  const { settings } = useSettings();
  return settings.highContrast;
};
