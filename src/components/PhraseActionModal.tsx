/**
 * Phrase Action Modal
 *
 * Shows two action options when a phrase is tapped:
 * 1. Play the audio/TTS
 * 2. Share via WhatsApp
 */

import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { COLORS, SPACING, FONT_SIZES } from '../constants';

interface PhraseActionModalProps {
  visible: boolean;
  arabicText: string;
  englishText: string;
  icon?: string;
  onPlay: () => void;
  onShare: () => void;
  onClose: () => void;
  isPlaying?: boolean;
}

const PhraseActionModal: React.FC<PhraseActionModalProps> = ({
  visible,
  arabicText,
  englishText,
  icon,
  onPlay,
  onShare,
  onClose,
  isPlaying = false,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      {/* Backdrop */}
      <Pressable style={styles.backdrop} onPress={onClose}>
        {/* Modal Content */}
        <Pressable style={styles.modalContainer} onPress={(e) => e.stopPropagation()}>
          <View style={styles.modal}>
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
                accessibilityLabel="Play audio"
                accessibilityRole="button"
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
              >
                <Text style={styles.actionIcon}>📤</Text>
                <Text style={styles.actionButtonArabic}>إرسال واتساب</Text>
                <Text style={styles.actionButtonEnglish}>Send WhatsApp</Text>
              </TouchableOpacity>
            </View>

            {/* Close Button */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={onClose}
              activeOpacity={0.7}
              accessibilityLabel="Close"
              accessibilityRole="button"
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    maxWidth: 500,
  },
  modal: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: SPACING.xl,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
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
    backgroundColor: '#3498DB',  // Blue
  },
  shareButton: {
    backgroundColor: '#25D366',  // WhatsApp green
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
