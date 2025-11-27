import { useState, useEffect, useCallback } from 'react';
import JsonAudioService, {
  type JsonPhraseCategory,
} from '../services/JsonAudioService';

interface UseAudioPlaybackResult {
  /** Whether audio is currently playing */
  isPlaying: boolean;
  /** Play audio for a specific phrase ID */
  playPhrase: (phraseId: string) => Promise<void>;
  /** Stop any currently playing audio */
  stop: () => void;
}

/**
 * Hook for managing audio playback state and controls.
 * Automatically subscribes to playback state changes from JsonAudioService.
 *
 * @param category - The phrase category to play audio from
 * @returns Object with isPlaying state and playPhrase function
 *
 * @example
 * ```tsx
 * const { isPlaying, playPhrase } = useAudioPlayback('basic_needs');
 *
 * const handlePlay = () => {
 *   playPhrase('bn_water');
 * };
 * ```
 */
export function useAudioPlayback(category: JsonPhraseCategory): UseAudioPlaybackResult {
  const [isPlaying, setIsPlaying] = useState(false);

  // Subscribe to playback state changes
  useEffect(() => {
    const unsubscribe = JsonAudioService.onPlaybackStateChange(setIsPlaying);
    return unsubscribe;
  }, []);

  const playPhrase = useCallback(
    async (phraseId: string): Promise<void> => {
      try {
        await JsonAudioService.play(category, phraseId);
      } catch (error) {
        console.error(`[useAudioPlayback] Error playing ${category}/${phraseId}:`, error);
        throw error;
      }
    },
    [category],
  );

  const stop = useCallback(() => {
    JsonAudioService.stop();
  }, []);

  return { isPlaying, playPhrase, stop };
}

export default useAudioPlayback;
