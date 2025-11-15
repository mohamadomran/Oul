import Sound from 'react-native-sound';
import { convertAudioPath } from '../utils/audioPathUtils';
import { audioCache } from '../utils/audioCacheUtils';

class AudioService {
  private initialized: boolean = false;
  private currentSound: Sound | null = null;

  async initialize(): Promise<void> {
    if (this.initialized) {
      return;
    }

    try {
      Sound.setCategory('Playback');
      this.initialized = true;
      console.log('[AudioService] Initialized successfully');
    } catch (error) {
      console.error('[AudioService] Initialization error:', error);
    }
  }

  private async loadAudio(audioFile: string): Promise<Sound> {
    const cached = audioCache.get(audioFile);
    if (cached) {
      return cached;
    }

    const filePath = convertAudioPath(audioFile);
    const basePath = Sound.MAIN_BUNDLE;

    return new Promise((resolve, reject) => {
      const sound = new Sound(filePath, basePath, error => {
        if (error) {
          console.error(
            '[AudioService] Failed to load audio:',
            audioFile,
            'as',
            filePath,
            error,
          );
          reject(error);
          return;
        }

        audioCache.set(audioFile, sound);
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

  async play(audioFile: string): Promise<void> {
    if (!this.initialized) {
      await this.initialize();
    }

    try {
      if (this.currentSound) {
        await this.stop();
      }

      const sound = await this.loadAudio(audioFile);
      this.currentSound = sound;

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
      }
    }
  }

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

  async preloadAudio(audioFiles: string[]): Promise<void> {
    if (!this.initialized) {
      await this.initialize();
    }

    try {
      const loadPromises = audioFiles
        .filter(file => !audioCache.has(file))
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

  releaseAudio(audioFile: string): void {
    audioCache.delete(audioFile);
  }

  releaseAll(): void {
    audioCache.releaseAll();
    if (this.currentSound) {
      this.currentSound.release();
      this.currentSound = null;
    }
  }

  isAvailable(): boolean {
    return this.initialized;
  }

  getCacheSize(): number {
    return audioCache.size();
  }
}

export default new AudioService();
