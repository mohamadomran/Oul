import Sound from 'react-native-sound';
import { Platform } from 'react-native';

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
   * Convert audio file reference to actual file path
   *
   * @param audioFile - Audio file reference (e.g., 'basic_needs_water')
   * @returns Actual file path for assets (e.g., 'audio/basic_needs/water.mp3')
   */
  private convertAudioPath(audioFile: string): string {
    // Convert audio file reference to actual path in assets/audio/
    // Examples:
    // 'basic_needs_water' → 'audio/basic_needs/water.mp3'
    // 'conversation_hello' → 'audio/conversation/hello.mp3'
    // 'emotions_happy' → 'audio/emotions/happy.mp3'
    // 'pain_head' → 'audio/pain/head.mp3'

    if (audioFile.startsWith('basic_needs_')) {
      const filename = audioFile.replace('basic_needs_', '');
      return `audio/basic_needs/${filename}.mp3`;
    } else if (audioFile.startsWith('conversation_')) {
      const filename = audioFile.replace('conversation_', '');
      return `audio/conversation/${filename}.mp3`;
    } else if (audioFile.startsWith('emotions_')) {
      const filename = audioFile.replace('emotions_', '');
      return `audio/emotions/${filename}.mp3`;
    } else if (audioFile.startsWith('pain_')) {
      const filename = audioFile.replace('pain_', '');
      return `audio/pain/${filename}.mp3`;
    } else {
      // Fallback - assume it's already a full path
      console.warn('[AudioService] Unknown audio file pattern:', audioFile);
      return audioFile.endsWith('.mp3') ? audioFile : `${audioFile}.mp3`;
    }
  }

  /**
   * Load audio file
   *
   * @param audioFile - Audio file reference (e.g., 'basic_needs_water')
   * @returns Promise that resolves when audio is loaded
   */
  private loadAudio(audioFile: string): Promise<Sound> {
    return new Promise((resolve, reject) => {
      // Check cache first
      const cached = this.audioCache.get(audioFile);
      if (cached) {
        resolve(cached);
        return;
      }

      // Convert audio file reference to actual path
      const filePath = this.convertAudioPath(audioFile);

      // Load from assets
      // On Android: use 'asset:' prefix (no trailing slash to avoid double slash)
      // react-native-sound adds '/' between basePath and filename
      // On iOS: files in bundle use Sound.MAIN_BUNDLE
      const basePath = Platform.OS === 'android' ? 'asset:' : Sound.MAIN_BUNDLE;

      const sound = new Sound(filePath, basePath, error => {
        if (error) {
          console.error(
            '[AudioService] Failed to load audio:',
            audioFile,
            'as',
            filePath,
            'with basePath:',
            basePath,
            error,
          );
          reject(error);
          return;
        }

        // Cache the loaded audio using the original audioFile as key
        this.audioCache.set(audioFile, sound);
        console.log(
          '[AudioService] Successfully loaded:',
          audioFile,
          '→',
          filePath,
        );
        resolve(sound);
      });
    });
  }

  /**
   * Play audio file
   *
   * @param audioFile - Audio file reference (e.g., 'basic_needs_water')
   */
  async play(audioFile: string): Promise<void> {
    if (!this.initialized) {
      await this.initialize();
    }

    try {
      // Stop current audio if playing
      if (this.currentSound) {
        await this.stop();
      }

      // Load audio
      const sound = await this.loadAudio(audioFile);
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
   * Play multiple audio files sequentially
   *
   * @param audioFiles - Array of audio file references to play in sequence
   */
  async playSequence(audioFiles: string[]): Promise<void> {
    if (!this.initialized) {
      await this.initialize();
    }

    for (const audioFile of audioFiles) {
      try {
        await this.play(audioFile);
      } catch (error) {
        console.error(
          '[AudioService] Error in sequence playback:',
          audioFile,
          error,
        );
        // Continue with next file even if one fails
      }
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
   * @param audioFiles - Array of audio file references to preload
   */
  async preloadAudio(audioFiles: string[]): Promise<void> {
    if (!this.initialized) {
      await this.initialize();
    }

    try {
      const loadPromises = audioFiles
        .filter(file => !this.audioCache.has(file))
        .map(file =>
          this.loadAudio(file).catch(err => {
            console.warn('[AudioService] Failed to preload:', file, err);
          }),
        );

      await Promise.all(loadPromises);
      console.log('[AudioService] Preloaded', audioFiles.length, 'audio files');
    } catch (error) {
      console.error('[AudioService] Error preloading audio:', error);
    }
  }

  /**
   * Release a specific audio file from cache
   */
  releaseAudio(audioFile: string): void {
    const sound = this.audioCache.get(audioFile);
    if (sound) {
      sound.release();
      this.audioCache.delete(audioFile);
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
