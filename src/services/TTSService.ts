/**
 * TTS Service
 *
 * Text-to-Speech service for custom user-created phrases
 * NOTE: Static phrases use pre-recorded audio (Audio Service)
 */

import Tts from 'react-native-tts';
import type { Language } from '../types';

/**
 * Language mapping for TTS
 */
const TTS_LANGUAGE_MAP: Record<Language, string> = {
  ar: 'ar-SA', // Saudi Arabic (closest to Lebanese)
  en: 'en-US', // US English
  fr: 'fr-FR', // French
};

/**
 * TTS Service Class
 */
class TTSService {
  private initialized: boolean = false;
  private currentRate: number = 0.7;
  private isSpeaking: boolean = false;

  /**
   * Initialize TTS engine
   */
  async initialize(): Promise<void> {
    if (this.initialized) {
      return;
    }

    try {
      // Initialize TTS
      await Tts.getInitStatus();

      // Set default rate
      await Tts.setDefaultRate(this.currentRate);

      // Set up event listeners
      this.setupEventListeners();

      this.initialized = true;
      console.log('[TTSService] Initialized successfully');
    } catch (error) {
      console.error('[TTSService] Initialization error:', error);
      // Don't throw - app should work without TTS
    }
  }

  /**
   * Set up TTS event listeners
   */
  private setupEventListeners(): void {
    Tts.addEventListener('tts-start', () => {
      this.isSpeaking = true;
    });

    Tts.addEventListener('tts-finish', () => {
      this.isSpeaking = false;
    });

    Tts.addEventListener('tts-cancel', () => {
      this.isSpeaking = false;
    });
  }

  /**
   * Speak text
   *
   * @param text - Text to speak
   * @param language - Language code
   */
  async speak(text: string, language: Language = 'ar'): Promise<void> {
    if (!this.initialized) {
      await this.initialize();
    }

    try {
      // Stop any current speech
      if (this.isSpeaking) {
        await this.stop();
      }

      // Set language
      const ttsLanguage = TTS_LANGUAGE_MAP[language];
      await Tts.setDefaultLanguage(ttsLanguage);

      // Speak
      await Tts.speak(text);
    } catch (error) {
      console.error('[TTSService] Error speaking:', error);
      throw error;
    }
  }

  /**
   * Stop current speech
   */
  async stop(): Promise<void> {
    try {
      await Tts.stop();
      this.isSpeaking = false;
    } catch (error) {
      console.error('[TTSService] Error stopping speech:', error);
    }
  }

  /**
   * Set speech rate
   *
   * @param rate - Speech rate (0.3 - 1.5)
   */
  async setRate(rate: number): Promise<void> {
    try {
      // Clamp rate between 0.3 and 1.5
      const clampedRate = Math.max(0.3, Math.min(1.5, rate));
      await Tts.setDefaultRate(clampedRate);
      this.currentRate = clampedRate;
    } catch (error) {
      console.error('[TTSService] Error setting rate:', error);
      throw error;
    }
  }

  /**
   * Get current speech rate
   */
  getRate(): number {
    return this.currentRate;
  }

  /**
   * Check if currently speaking
   */
  getIsSpeaking(): boolean {
    return this.isSpeaking;
  }

  /**
   * Get available voices for a language
   */
  async getVoices(language?: Language): Promise<any[]> {
    try {
      const voices = await Tts.voices();

      if (language) {
        const ttsLanguage = TTS_LANGUAGE_MAP[language];
        return voices.filter((v: any) =>
          v.language.startsWith(ttsLanguage.split('-')[0])
        );
      }

      return voices;
    } catch (error) {
      console.error('[TTSService] Error getting voices:', error);
      return [];
    }
  }

  /**
   * Check if TTS is available
   */
  isAvailable(): boolean {
    return this.initialized;
  }

  /**
   * Cleanup (remove event listeners)
   */
  cleanup(): void {
    try {
      Tts.removeAllListeners('tts-start');
      Tts.removeAllListeners('tts-finish');
      Tts.removeAllListeners('tts-cancel');
      this.initialized = false;
    } catch (error) {
      console.error('[TTSService] Error during cleanup:', error);
    }
  }
}

// Export singleton instance
export default new TTSService();
