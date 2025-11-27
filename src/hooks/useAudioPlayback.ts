import { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import JsonAudioService, {
  type JsonPhraseCategory,
  type AudioError,
} from '../services/JsonAudioService';

interface UseAudioPlaybackResult {
  /** Whether audio is currently playing */
  isPlaying: boolean;
  /** The last error that occurred, if any */
  error: AudioError | null;
  /** Play audio for a specific phrase ID */
  playPhrase: (phraseId: string) => Promise<void>;
  /** Stop any currently playing audio */
  stop: () => void;
  /** Clear the current error state */
  clearError: () => void;
}

/**
 * Hook for managing audio playback state and controls.
 * Automatically subscribes to playback state changes from JsonAudioService.
 * Shows user-friendly error alerts when audio playback fails.
 *
 * @param category - The phrase category to play audio from
 * @returns Object with isPlaying state, error state, and playPhrase function
 *
 * @example
 * ```tsx
 * const { isPlaying, playPhrase, error } = useAudioPlayback('basic_needs');
 *
 * const handlePlay = () => {
 *   playPhrase('bn_water');
 * };
 * ```
 */
export function useAudioPlayback(category: JsonPhraseCategory): UseAudioPlaybackResult {
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<AudioError | null>(null);

  // Subscribe to playback state changes
  useEffect(() => {
    const unsubscribe = JsonAudioService.onPlaybackStateChange(setIsPlaying);
    return unsubscribe;
  }, []);

  // Subscribe to error events and show user feedback
  useEffect(() => {
    const unsubscribe = JsonAudioService.onError((audioError: AudioError) => {
      setError(audioError);

      // Show user-friendly error message
      const errorMessages: Record<AudioError['type'], { title: string; message: string }> = {
        load: {
          title: 'خطأ في الصوت',
          message: 'تعذر تحميل الملف الصوتي.\nCould not load the audio file.',
        },
        playback: {
          title: 'خطأ في التشغيل',
          message: 'حدث خطأ أثناء تشغيل الصوت.\nAn error occurred while playing audio.',
        },
        not_found: {
          title: 'الصوت غير موجود',
          message: 'الملف الصوتي غير متوفر.\nAudio file not found.',
        },
      };

      const { title, message } = errorMessages[audioError.type];
      Alert.alert(title, message, [{ text: 'حسناً / OK', style: 'default' }]);
    });

    return unsubscribe;
  }, []);

  const playPhrase = useCallback(
    async (phraseId: string): Promise<void> => {
      // Clear previous error before attempting playback
      setError(null);
      try {
        await JsonAudioService.play(category, phraseId);
      } catch (err) {
        // Error already handled by the error listener
        console.error(`[useAudioPlayback] Error playing ${category}/${phraseId}:`, err);
      }
    },
    [category],
  );

  const stop = useCallback(() => {
    JsonAudioService.stop();
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return { isPlaying, error, playPhrase, stop, clearError };
}

export default useAudioPlayback;
