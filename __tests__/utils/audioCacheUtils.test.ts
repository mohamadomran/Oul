/**
 * @format
 * Tests for audioCacheUtils
 */

import { AudioCacheManager, audioCache } from '../../src/utils/audioCacheUtils';

// Mock Sound type
const mockSound = {
  play: jest.fn(),
  stop: jest.fn(),
  release: jest.fn(),
  setVolume: jest.fn(),
} as any;

describe('AudioCacheManager', () => {
  let cacheManager: AudioCacheManager;

  beforeEach(() => {
    cacheManager = new AudioCacheManager();
  });

  describe('set and get', () => {
    it('should store and retrieve a sound', () => {
      cacheManager.set('test.mp3', mockSound);
      expect(cacheManager.get('test.mp3')).toBe(mockSound);
    });

    it('should return undefined for non-existent keys', () => {
      expect(cacheManager.get('nonexistent.mp3')).toBeUndefined();
    });
  });

  describe('has', () => {
    it('should return true for existing keys', () => {
      cacheManager.set('test.mp3', mockSound);
      expect(cacheManager.has('test.mp3')).toBe(true);
    });

    it('should return false for non-existent keys', () => {
      expect(cacheManager.has('nonexistent.mp3')).toBe(false);
    });
  });

  describe('delete', () => {
    it('should remove an entry from the cache', () => {
      cacheManager.set('test.mp3', mockSound);
      expect(cacheManager.delete('test.mp3')).toBe(true);
      expect(cacheManager.has('test.mp3')).toBe(false);
    });

    it('should return false when deleting non-existent keys', () => {
      expect(cacheManager.delete('nonexistent.mp3')).toBe(false);
    });
  });

  describe('clear', () => {
    it('should remove all entries from the cache', () => {
      cacheManager.set('test1.mp3', mockSound);
      cacheManager.set('test2.mp3', mockSound);
      cacheManager.clear();
      expect(cacheManager.size()).toBe(0);
    });
  });

  describe('size', () => {
    it('should return the number of cached entries', () => {
      expect(cacheManager.size()).toBe(0);
      cacheManager.set('test1.mp3', mockSound);
      expect(cacheManager.size()).toBe(1);
      cacheManager.set('test2.mp3', mockSound);
      expect(cacheManager.size()).toBe(2);
    });
  });

  describe('releaseAll', () => {
    it('should clear all entries', () => {
      cacheManager.set('test1.mp3', mockSound);
      cacheManager.set('test2.mp3', mockSound);
      cacheManager.releaseAll();
      expect(cacheManager.size()).toBe(0);
    });
  });
});

describe('audioCache singleton', () => {
  it('should be an instance of AudioCacheManager', () => {
    expect(audioCache).toBeInstanceOf(AudioCacheManager);
  });
});
