import audioPhrasesData from '../data/audioPhrases.json';
import { Platform } from 'react-native';
import Sound from 'react-native-sound';
import type { Phrase, PhraseCategory } from '../types';

/**
 * Categories available in the JSON audio phrases file.
 * Excludes 'custom' as custom phrases are user-generated and not in the JSON.
 */
export type JsonPhraseCategory = Exclude<PhraseCategory, 'custom'>;

/**
 * Structure of the audioPhrases.json file
 */
interface AudioPhrasesData {
  audioPhrases: Record<JsonPhraseCategory, Phrase[]>;
}

/**
 * Type-safe cast of the imported JSON data
 */
const typedAudioData = audioPhrasesData as unknown as AudioPhrasesData;

class JsonAudioService {
  private initialized: boolean = false;
  private currentSound: Sound | null = null;
  private isPlayingState: boolean = false;
  private playbackStateListeners: Set<(isPlaying: boolean) => void> =
    new Set();

  async initialize(): Promise<void> {
    if (this.initialized) {
      return;
    }

    try {
      // Enable playback in silence mode and mix with other audio
      Sound.setCategory('Playback');
      this.initialized = true;
    } catch (error) {
      console.error('[JsonAudioService] Initialization error:', error);
      throw error;
    }
  }

  private getAudioPath(category: string, audioFile: string): string {
    if (Platform.OS === 'android') {
      // For Android: files are in res/raw/ with category prefixes
      const fileNameWithoutExt = audioFile.replace('.mp3', '');
      return `${category}_${fileNameWithoutExt}`;
    } else {
      return `${category}/${audioFile}`;
    }
  }

  async play(category: JsonPhraseCategory, phraseId: string): Promise<void> {
    if (!this.initialized) {
      await this.initialize();
    }

    try {
      // Stop current playback if any
      this.stop();

      const categoryPhrases = typedAudioData.audioPhrases[category];
      if (!categoryPhrases) {
        throw new Error(`Category ${category} not found`);
      }

      const phrase = categoryPhrases.find((p: Phrase) => p.id === phraseId);
      if (!phrase) {
        throw new Error(`Phrase ${phraseId} not found in category ${category}`);
      }

      const audioPath = this.getAudioPath(category, phrase.audioFile);

      // Create and play sound
      this.currentSound = new Sound(audioPath, Sound.MAIN_BUNDLE, error => {
        if (error) {
          console.error('[JsonAudioService] Failed to load sound:', error);
          this.setPlayingState(false);
          return;
        }

        // Set volume to maximum
        this.currentSound?.setVolume(1.0);
        this.setPlayingState(true);

        // Play sound
        this.currentSound?.play(success => {
          if (!success) {
            console.error('[JsonAudioService] Playback failed');
          }
          this.setPlayingState(false);
        });
      });
    } catch (error) {
      console.error('[JsonAudioService] Error playing audio:', error);
      this.setPlayingState(false);
      throw error;
    }
  }

  stop(): void {
    if (this.currentSound) {
      this.currentSound.stop();
      this.currentSound.release();
      this.currentSound = null;
    }
    this.setPlayingState(false);
  }

  isAvailable(): boolean {
    return this.initialized;
  }

  isPlaying(): boolean {
    return this.isPlayingState;
  }

  private setPlayingState(isPlaying: boolean): void {
    this.isPlayingState = isPlaying;
    // Notify all listeners
    this.playbackStateListeners.forEach(listener => {
      try {
        listener(isPlaying);
      } catch (error) {
        console.error(
          '[JsonAudioService] Error in playback state listener:',
          error,
        );
      }
    });
  }

  onPlaybackStateChange(listener: (isPlaying: boolean) => void): () => void {
    this.playbackStateListeners.add(listener);
    return () => {
      this.playbackStateListeners.delete(listener);
    };
  }

  /**
   * Get all phrases for a category
   */
  getPhrasesByCategory(category: JsonPhraseCategory): Phrase[] {
    return typedAudioData.audioPhrases[category] || [];
  }

  /**
   * Get a specific phrase by ID
   */
  getPhrase(category: JsonPhraseCategory, phraseId: string): Phrase | null {
    const categoryPhrases = this.getPhrasesByCategory(category);
    return categoryPhrases.find((p: Phrase) => p.id === phraseId) || null;
  }

  /**
   * Clear cache (compatibility method - react-native-sound handles caching)
   */
  clearCache(): void {
    // react-native-sound handles caching automatically
  }

  /**
   * Get cache size (compatibility method)
   */
  getCacheSize(): number {
    return 0;
  }
}

export default new JsonAudioService();
