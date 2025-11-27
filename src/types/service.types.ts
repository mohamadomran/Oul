import type { AppSettings } from './settings.types';

export interface HapticServiceInterface {
  trigger(type: 'light' | 'medium' | 'heavy'): Promise<void>;
  triggerNotification(type: 'success' | 'warning' | 'error'): Promise<void>;
  setEnabled(enabled: boolean): void;
  isEnabled(): boolean;
}

export interface StorageServiceInterface {
  getSettings(): Promise<AppSettings>;
  saveSettings(settings: AppSettings): Promise<void>;
  updateSetting<K extends keyof AppSettings>(key: K, value: AppSettings[K]): Promise<void>;
  clearAll(): Promise<void>;
}

export interface ShareServiceInterface {
  shareViaWhatsApp(arabicText: string, englishText?: string): Promise<void>;
  shareViaSMS(arabicText: string, englishText?: string): Promise<void>;
  copyToClipboard(arabicText: string, englishText?: string): Promise<void>;
}
