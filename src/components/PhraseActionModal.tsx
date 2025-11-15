import React, { forwardRef, useImperativeHandle, useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { COLORS, SPACING, FONT_SIZES } from '../constants';
import type {
  PhraseActionModalProps,
  PhraseActionModalRef,
} from '../types/ui.types';

const PhraseActionModal = forwardRef<
  PhraseActionModalRef,
  PhraseActionModalProps
>(
  (
    {
      arabicText,
      englishText,
      icon,
      onPlay,
      onShare,
      onShareSMS,
      onCopy,
      onClose,
      isPlaying = false,
    },
    ref,
  ) => {
    const [visible, setVisible] = useState(false);

    const snapToIndex = React.useCallback((index: number) => {
      if (index >= 0) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    }, []);

    const close = React.useCallback(() => {
      setVisible(false);
      onClose();
    }, [onClose]);

    useImperativeHandle(ref, () => ({
      snapToIndex,
      close,
    }));

    const handleBackdropPress = React.useCallback(() => {
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
              <Text style={styles.arabicText}>{arabicText}</Text>
              <Text style={styles.englishText}>{englishText}</Text>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionsContainer}>
              {/* Play Audio Button */}
              <TouchableOpacity
                style={[styles.actionButton, styles.playButton]}
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
                  <>
                    <Text style={styles.actionIcon}>🔊</Text>
                    <Text style={styles.actionButtonArabic}>تشغيل الصوت</Text>
                    <Text style={styles.actionButtonEnglish}>Play Audio</Text>
                  </>
                )}
              </TouchableOpacity>

              {/* Share via WhatsApp Button */}
              <TouchableOpacity
                style={[styles.actionButton, styles.shareButton]}
                onPress={onShare}
                activeOpacity={0.7}
                accessibilityLabel="Share via WhatsApp"
                accessibilityRole="button"
                accessibilityHint="Opens WhatsApp to share this message"
              >
                <Text style={styles.actionIcon}>📤</Text>
                <Text style={styles.actionButtonArabic}>إرسال واتساب</Text>
                <Text style={styles.actionButtonEnglish}>Send WhatsApp</Text>
              </TouchableOpacity>

              {/* Share via SMS Button (if provided) */}
              {onShareSMS && (
                <TouchableOpacity
                  style={[styles.actionButton, styles.smsButton]}
                  onPress={onShareSMS}
                  activeOpacity={0.7}
                  accessibilityLabel="Share via SMS"
                  accessibilityRole="button"
                  accessibilityHint="Opens SMS to share this message"
                >
                  <Text style={styles.actionIcon}>💬</Text>
                  <Text style={styles.actionButtonArabic}>إرسال رسالة</Text>
                  <Text style={styles.actionButtonEnglish}>Send SMS</Text>
                </TouchableOpacity>
              )}

              {/* Copy to Clipboard Button (if provided) */}
              {onCopy && (
                <TouchableOpacity
                  style={[styles.actionButton, styles.copyButton]}
                  onPress={onCopy}
                  activeOpacity={0.7}
                  accessibilityLabel="Copy to clipboard"
                  accessibilityRole="button"
                  accessibilityHint="Copies the message to clipboard"
                >
                  <Text style={styles.actionIcon}>📋</Text>
                  <Text style={styles.actionButtonArabic}>نسخ النص</Text>
                  <Text style={styles.actionButtonEnglish}>Copy Text</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Close Button */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={close}
              activeOpacity={0.7}
              accessibilityLabel="Close"
              accessibilityRole="button"
              accessibilityHint="Closes the action menu"
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    );
  },
);

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
    marginBottom: SPACING.xs,
  },
  englishText: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '500',
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  actionsContainer: {
    gap: SPACING.md,
  },
  actionButton: {
    minHeight: 120,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
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
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: FONT_SIZES.xl,
    color: COLORS.text,
    fontWeight: '600',
  },
});

export default PhraseActionModal;
