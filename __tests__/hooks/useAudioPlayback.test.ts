/**
 * @format
 * Tests for useAudioPlayback hook
 */

import { renderHook, act } from '@testing-library/react-native';
import { useAudioPlayback } from '../../src/hooks/useAudioPlayback';

// Store callbacks for testing
let mockPlaybackCallback: ((isPlaying: boolean) => void) | null = null;
let mockErrorCallback: ((error: any) => void) | null = null;

// Mock JsonAudioService
jest.mock('../../src/services/JsonAudioService', () => ({
  __esModule: true,
  default: {
    initialize: jest.fn().mockResolvedValue(undefined),
    play: jest.fn().mockResolvedValue(undefined),
    stop: jest.fn(),
    onPlaybackStateChange: jest.fn((callback) => {
      mockPlaybackCallback = callback;
      return jest.fn(); // unsubscribe function
    }),
    onError: jest.fn((callback) => {
      mockErrorCallback = callback;
      return jest.fn();
    }),
  },
}));

// Mock Alert
jest.mock('react-native', () => ({
  Alert: {
    alert: jest.fn(),
  },
}));

// Import after mock
import JsonAudioService from '../../src/services/JsonAudioService';

describe('useAudioPlayback', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with isPlaying false', () => {
    const { result } = renderHook(() => useAudioPlayback('basic_needs'));

    expect(result.current.isPlaying).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should subscribe to playback state changes on mount', () => {
    renderHook(() => useAudioPlayback('basic_needs'));

    expect(JsonAudioService.onPlaybackStateChange).toHaveBeenCalled();
    expect(JsonAudioService.onError).toHaveBeenCalled();
  });

  it('should call JsonAudioService.play when playPhrase is called', async () => {
    const { result } = renderHook(() => useAudioPlayback('basic_needs'));

    await act(async () => {
      await result.current.playPhrase('bn_water');
    });

    expect(JsonAudioService.play).toHaveBeenCalledWith('basic_needs', 'bn_water');
  });

  it('should call JsonAudioService.stop when stop is called', () => {
    const { result } = renderHook(() => useAudioPlayback('basic_needs'));

    act(() => {
      result.current.stop();
    });

    expect(JsonAudioService.stop).toHaveBeenCalled();
  });

  it('should clear error state when clearError is called', async () => {
    const { result } = renderHook(() => useAudioPlayback('basic_needs'));

    // Simulate an error using the stored callback
    act(() => {
      if (mockErrorCallback) {
        mockErrorCallback({
          type: 'load',
          message: 'Test error',
          category: 'basic_needs',
          phraseId: 'test',
        });
      }
    });

    // Clear the error
    act(() => {
      result.current.clearError();
    });

    expect(result.current.error).toBeNull();
  });
});
