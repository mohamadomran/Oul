// Audio service interface - currently using JsonAudioService
// export interface AudioServiceInterface {
//   initialize(): Promise<void>;
//   play(audioFile: string): Promise<void>;
//   playSequence(audioFiles: string[]): Promise<void>;
//   stop(): Promise<void>;
//   preloadAudio(audioFiles: string[]): Promise<void>;
//   releaseAudio(audioFile: string): void;
//   releaseAll(): void;
//   isAvailable(): boolean;
//   getCacheSize(): number;
// }

export interface HapticServiceInterface {
  trigger(type: 'light' | 'medium' | 'heavy'): Promise<void>;
  triggerNotification(type: 'success' | 'warning' | 'error'): Promise<void>;
  setEnabled(enabled: boolean): void;
  isEnabled(): boolean;
}

export interface StorageServiceInterface {
  getSettings(): Promise<any>;
  saveSettings(settings: any): Promise<void>;
  updateSetting<K extends keyof any>(key: K, value: any[K]): Promise<void>;
  clearAll(): Promise<void>;
}

export interface ShareServiceInterface {
  shareViaWhatsApp(arabicText: string, englishText?: string): Promise<void>;
  shareViaSMS(arabicText: string, englishText?: string): Promise<void>;
  copyToClipboard(arabicText: string, englishText?: string): Promise<void>;
}
