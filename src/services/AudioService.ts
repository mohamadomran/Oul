/**
 * Audio Service
 *
 * Handles playback of pre-recorded audio files (Daniel's voice)
 * For static phrases only. Custom phrases use TTS Service.
 */

import Sound from 'react-native-sound';

/**
 * Audio Service Class
 */
class AudioService {
  private initialized: boolean = false;
  private currentSound: Sound | null = null;
  private audioCache: Map<string, Sound> = new Map();

  /**
   * Initialize audio service
   */
  async initialize(): Promise<void> {
    if (this.initialized) {
      return;
    }

    try {
      // Enable playback in silence mode
      Sound.setCategory('Playback');
      this.initialized = true;
      console.log('[AudioService] Initialized successfully');
    } catch (error) {
      console.error('[AudioService] Initialization error:', error);
    }
  }

  /**
   * Load audio file
   *
   * @param audioPath - Path to audio file (e.g., 'hungry_ar.mp3')
   * @returns Promise that resolves when audio is loaded
   */
  private loadAudio(audioPath: string): Promise<Sound> {
    return new Promise((resolve, reject) => {
      // Check cache first
      const cached = this.audioCache.get(audioPath);
      if (cached) {
        resolve(cached);
        return;
      }

      // Load from assets
      // Note: Audio files are in android/app/src/main/assets/
      // Paths should be relative to assets directory (e.g., 'audio/basic_needs/water.mp3')
      const sound = new Sound(audioPath, Sound.MAIN_BUNDLE, error => {
        if (error) {
          console.error('[AudioService] Failed to load audio:', audioPath, error);
          reject(error);
          return;
        }

        // Cache the loaded audio
        this.audioCache.set(audioPath, sound);
        resolve(sound);
      });
    });
  }

  /**
   * Play audio file
   *
   * @param audioPath - Path to audio file (e.g., 'hungry_ar.mp3')
   */
  async play(audioPath: string): Promise<void> {
    if (!this.initialized) {
      await this.initialize();
    }

    try {
      // Stop current audio if playing
      if (this.currentSound) {
        await this.stop();
      }

      // Load audio
      const sound = await this.loadAudio(audioPath);
      this.currentSound = sound;

      // Play audio
      return new Promise((resolve, reject) => {
        sound.play(success => {
          if (success) {
            resolve();
          } else {
            reject(new Error('Playback failed'));
          }
          this.currentSound = null;
        });
      });
    } catch (error) {
      console.error('[AudioService] Error playing audio:', error);
      throw error;
    }
  }

  /**
   * Stop current audio playback
   */
  async stop(): Promise<void> {
    if (!this.currentSound) {
      return;
    }

    try {
      this.currentSound.stop(() => {
        this.currentSound = null;
      });
    } catch (error) {
      console.error('[AudioService] Error stopping audio:', error);
    }
  }

  /**
   * Preload audio files for faster playback
   *
   * @param audioPaths - Array of audio paths to preload
   */
  async preloadAudio(audioPaths: string[]): Promise<void> {
    if (!this.initialized) {
      await this.initialize();
    }

    try {
      const loadPromises = audioPaths
        .filter(path => !this.audioCache.has(path))
        .map(path => this.loadAudio(path).catch(err => {
          console.warn('[AudioService] Failed to preload:', path, err);
        }));

      await Promise.all(loadPromises);
      console.log('[AudioService] Preloaded', audioPaths.length, 'audio files');
    } catch (error) {
      console.error('[AudioService] Error preloading audio:', error);
    }
  }

  /**
   * Release a specific audio file from cache
   */
  releaseAudio(audioPath: string): void {
    const sound = this.audioCache.get(audioPath);
    if (sound) {
      sound.release();
      this.audioCache.delete(audioPath);
    }
  }

  /**
   * Release all cached audio
   */
  releaseAll(): void {
    this.audioCache.forEach(sound => {
      sound.release();
    });
    this.audioCache.clear();

    if (this.currentSound) {
      this.currentSound.release();
      this.currentSound = null;
    }
  }

  /**
   * Check if audio service is available
   */
  isAvailable(): boolean {
    return this.initialized;
  }

  /**
   * Get cache size
   */
  getCacheSize(): number {
    return this.audioCache.size;
  }
}

// Export singleton instance
export default new AudioService();
