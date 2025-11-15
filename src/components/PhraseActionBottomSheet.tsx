import React, {
  useCallback,
  forwardRef,
  useImperativeHandle,
  useState,
} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Modal,
  Dimensions,
  Pressable,
} from 'react-native';
import { COLORS, SPACING, FONT_SIZES } from '../constants';
import type {
  PhraseActionBottomSheetProps,
  PhraseActionBottomSheetRef,
} from '../types/ui.types';

const PhraseActionBottomSheet = forwardRef<
  PhraseActionBottomSheetRef,
  PhraseActionBottomSheetProps
>(({ arabicText, icon, onPlay, onShare, onClose, isPlaying = false }, ref) => {
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
      {/* Backdrop */}
      <Pressable style={styles.backdrop} onPress={handleBackdropPress}>
        {/* Modal Content */}
        <Pressable
          style={[styles.modalContainer, { maxHeight: height * 0.7 }]}
          onPress={e => e.stopPropagation()}
        >
          {/* Header with phrase */}
          <View style={styles.header}>
            {icon && <Text style={styles.icon}>{icon}</Text>}
          </View>

          {/* Action Buttons - Two Side by Side */}
          <View style={styles.twoButtonContainer}>
            {/* Play Audio Button */}
            <TouchableOpacity
              style={[styles.actionButton, styles.playButton, styles.halfWidth]}
              onPress={onPlay}
              disabled={isPlaying}
              activeOpacity={0.7}
              accessibilityLabel={`Play audio: ${arabicText}`}
              accessibilityRole="button"
              accessibilityHint="Plays the audio message"
            >
              {isPlaying ? (
                <ActivityIndicator size="large" color={COLORS.white} />
              ) : (
                <Text style={styles.actionButtonText}>تشغيل الصوت</Text>
              )}
            </TouchableOpacity>

            {/* Share via WhatsApp Button */}
            <TouchableOpacity
              style={[
                styles.actionButton,
                styles.shareButton,
                styles.halfWidth,
              ]}
              onPress={onShare}
              activeOpacity={0.7}
              accessibilityLabel="Share via WhatsApp"
              accessibilityRole="button"
              accessibilityHint="Opens WhatsApp to share this message"
            >
              <Text style={styles.actionButtonText}>إرسال واتساب</Text>
            </TouchableOpacity>
          </View>
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
  header: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
    paddingBottom: SPACING.lg,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.border,
  },
  icon: {
    fontSize: 64,
    marginBottom: SPACING.md,
  },
  arabicText: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: '700',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SPACING.xxs,
  },
  englishText: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '500',
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  twoButtonContainer: {
    flexDirection: 'row',
    gap: SPACING.md,
    justifyContent: 'space-between',
  },
  halfWidth: {
    flex: 1,
  },
  fullWidth: {
    width: '80%', // Slightly smaller than full width
    maxWidth: 300, // Reasonable max width
  },
  actionButton: {
    minHeight: 100, // Reduced from 120
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.md, // Reduced from lg
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  actionButtonText: {
    fontSize: FONT_SIZES.lg, // Smaller than xl
    fontWeight: '700',
    color: COLORS.white,
    textAlign: 'center',
  },
  playButton: {
    backgroundColor: '#3498DB', // Blue
  },
  shareButton: {
    backgroundColor: '#25D366', // WhatsApp green
  },
  smsButton: {
    backgroundColor: '#0084FF', // Messenger blue
  },
  copyButton: {
    backgroundColor: '#7C3AED', // Purple
  },
  actionIcon: {
    fontSize: 48,
    marginBottom: SPACING.sm,
  },
  actionButtonArabic: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '700',
    color: COLORS.white,
    marginBottom: SPACING.xxs,
  },
  actionButtonEnglish: {
    fontSize: FONT_SIZES.md,
    fontWeight: '500',
    color: COLORS.white,
    opacity: 0.9,
  },
  closeButton: {
    position: 'absolute',
    top: SPACING.md,
    right: SPACING.md,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: FONT_SIZES.xxl,
    color: COLORS.text,
    fontWeight: '600',
  },
});

export default PhraseActionBottomSheet;
