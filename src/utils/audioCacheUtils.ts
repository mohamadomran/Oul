export class AudioCacheManager {
  private cache: Map<string, any> = new Map();

  get(audioFile: string): any | undefined {
    return this.cache.get(audioFile);
  }

  set(audioFile: string, track: any): void {
    this.cache.set(audioFile, track);
  }

  has(audioFile: string): boolean {
    return this.cache.has(audioFile);
  }

  delete(audioFile: string): boolean {
    return this.cache.delete(audioFile);
  }

  clear(): void {
    this.cache.clear();
    // TrackPlayer handles caching automatically
  }

  size(): number {
    return this.cache.size;
  }

  releaseAll(): void {
    this.cache.clear();
    // TrackPlayer handles caching automatically
  }
}

export const audioCache = new AudioCacheManager();
