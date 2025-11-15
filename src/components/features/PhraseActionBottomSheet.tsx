import React, {
  useCallback,
  forwardRef,
  useImperativeHandle,
  useState,
} from 'react';
import { Modal, StyleSheet, Dimensions, Pressable } from 'react-native';
import { COLORS, SPACING } from '../../constants';
import type {
  PhraseActionBottomSheetProps,
  PhraseActionBottomSheetRef,
} from '../../types/ui.types';
import { PhraseActionButtons, PhraseDisplayHeader } from '../index';

const PhraseActionBottomSheet = forwardRef<
  PhraseActionBottomSheetRef,
  PhraseActionBottomSheetProps
>(({ icon, onPlay, onShare, onClose, isPlaying = false }, ref) => {
  const [visible, setVisible] = useState(false);

  const snapToIndex = useCallback((index: number) => {
    if (index >= 0) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, []);

  const close = useCallback(() => {
    setVisible(false);
    onClose();
  }, [onClose]);

  useImperativeHandle(ref, () => ({
    snapToIndex,
    close,
  }));

  const handleBackdropPress = useCallback(() => {
    close();
  }, [close]);

  const { height } = Dimensions.get('window');

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={close}
    >
      <Pressable style={styles.backdrop} onPress={handleBackdropPress}>
        <Pressable
          style={[styles.modalContainer, { maxHeight: height * 0.7 }]}
          onPress={e => e.stopPropagation()}
        >
          <PhraseDisplayHeader icon={icon} />
          <PhraseActionButtons
            onPlay={onPlay}
            onShare={onShare}
            isPlaying={isPlaying}
          />
        </Pressable>
      </Pressable>
    </Modal>
  );
});

PhraseActionBottomSheet.displayName = 'PhraseActionBottomSheet';

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    width: '100%',
    padding: SPACING.xl,
    paddingBottom: SPACING.xxl,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
});

export default PhraseActionBottomSheet;
