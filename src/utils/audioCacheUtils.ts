import Sound from 'react-native-sound';

export class AudioCacheManager {
  private cache: Map<string, Sound> = new Map();

  get(audioFile: string): Sound | undefined {
    return this.cache.get(audioFile);
  }

  set(audioFile: string, sound: Sound): void {
    this.cache.set(audioFile, sound);
  }

  has(audioFile: string): boolean {
    return this.cache.has(audioFile);
  }

  delete(audioFile: string): boolean {
    return this.cache.delete(audioFile);
  }

  clear(): void {
    this.cache.forEach(sound => {
      sound.release();
    });
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }

  releaseAll(): void {
    this.cache.forEach(sound => {
      sound.release();
    });
    this.cache.clear();
  }
}

export const audioCache = new AudioCacheManager();
