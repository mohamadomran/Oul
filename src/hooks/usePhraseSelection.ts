import { useState, useRef, useCallback } from 'react';
import type { Phrase } from '../types';
import type { PhraseActionBottomSheetRef } from '../types/ui.types';

interface UsePhraseSelectionResult {
  /** Currently selected phrase, or null if none */
  selectedPhrase: Phrase | null;
  /** Ref to attach to PhraseActionBottomSheet */
  bottomSheetRef: React.RefObject<PhraseActionBottomSheetRef | null>;
  /** Handle phrase button press - selects phrase and opens bottom sheet */
  handlePhrasePress: (phrase: Phrase) => void;
  /** Clear the selected phrase */
  clearSelection: () => void;
}

/**
 * Hook for managing phrase selection state and bottom sheet interaction.
 *
 * @returns Object with selection state and handlers
 *
 * @example
 * ```tsx
 * const { selectedPhrase, bottomSheetRef, handlePhrasePress, clearSelection } = usePhraseSelection();
 *
 * return (
 *   <>
 *     <PhraseButton onPress={() => handlePhrasePress(phrase)} />
 *     <PhraseActionBottomSheet
 *       ref={bottomSheetRef}
 *       onClose={clearSelection}
 *     />
 *   </>
 * );
 * ```
 */
export function usePhraseSelection(): UsePhraseSelectionResult {
  const [selectedPhrase, setSelectedPhrase] = useState<Phrase | null>(null);
  const bottomSheetRef = useRef<PhraseActionBottomSheetRef>(null);

  const handlePhrasePress = useCallback((phrase: Phrase) => {
    setSelectedPhrase(phrase);
    bottomSheetRef.current?.snapToIndex(0);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedPhrase(null);
  }, []);

  return {
    selectedPhrase,
    bottomSheetRef,
    handlePhrasePress,
    clearSelection,
  };
}

export default usePhraseSelection;
