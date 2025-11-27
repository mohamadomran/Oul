/**
 * @format
 * Tests for audioPathUtils
 */

import { convertAudioPath } from '../../src/utils/audioPathUtils';

describe('convertAudioPath', () => {
  describe('basic_needs category', () => {
    it('should convert basic_needs_ prefix to basic_needs/ directory', () => {
      expect(convertAudioPath('basic_needs_water')).toBe('basic_needs/water.mp3');
    });

    it('should handle .mp3 extension in input', () => {
      expect(convertAudioPath('basic_needs_water.mp3')).toBe('basic_needs/water.mp3');
    });
  });

  describe('emotions category', () => {
    it('should convert emotions_ prefix to emotions/ directory', () => {
      expect(convertAudioPath('emotions_happy')).toBe('emotions/happy.mp3');
    });

    it('should handle .mp3 extension in input', () => {
      expect(convertAudioPath('emotions_sad.mp3')).toBe('emotions/sad.mp3');
    });
  });

  describe('conversation category', () => {
    it('should convert conversation_ prefix to conversation/ directory', () => {
      expect(convertAudioPath('conversation_hello')).toBe('conversation/hello.mp3');
    });

    it('should handle .mp3 extension in input', () => {
      expect(convertAudioPath('conversation_goodbye.mp3')).toBe('conversation/goodbye.mp3');
    });
  });

  describe('pain category', () => {
    it('should convert pain_ prefix to pain/ directory', () => {
      expect(convertAudioPath('pain_head')).toBe('pain/head.mp3');
    });

    it('should handle .mp3 extension in input', () => {
      expect(convertAudioPath('pain_stomach.mp3')).toBe('pain/stomach.mp3');
    });
  });

  describe('unmatched prefixes', () => {
    it('should return filename with .mp3 extension if no prefix matches', () => {
      expect(convertAudioPath('unknown_audio')).toBe('unknown_audio.mp3');
    });

    it('should not double the .mp3 extension', () => {
      expect(convertAudioPath('unknown_audio.mp3')).toBe('unknown_audio.mp3');
    });
  });
});
