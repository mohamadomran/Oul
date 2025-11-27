import { useCallback } from 'react';
import { shareViaWhatsApp } from '../services/ShareService';

interface UseSharePhraseResult {
  /** Share a phrase via WhatsApp */
  sharePhrase: (arabicText: string, englishText: string) => Promise<void>;
}

/**
 * Hook for sharing phrases via WhatsApp.
 *
 * @returns Object with sharePhrase function
 *
 * @example
 * ```tsx
 * const { sharePhrase } = useSharePhrase();
 *
 * const handleShare = () => {
 *   sharePhrase('مرحبا', 'Hello');
 * };
 * ```
 */
export function useSharePhrase(): UseSharePhraseResult {
  const sharePhrase = useCallback(
    async (arabicText: string, englishText: string): Promise<void> => {
      try {
        await shareViaWhatsApp(arabicText, englishText);
      } catch (error) {
        console.error('[useSharePhrase] Error sharing phrase:', error);
        throw error;
      }
    },
    [],
  );

  return { sharePhrase };
}

export default useSharePhrase;
