import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { COLORS, SPACING, FONT_SIZES } from '../../constants';

interface PhraseActionButtonsProps {
  onPlay: () => void;
  onShare: () => void;
  isPlaying?: boolean;
}

const PhraseActionButtons: React.FC<PhraseActionButtonsProps> = ({
  onPlay,
  onShare,
  isPlaying = false,
}) => {
  return (
    <View style={styles.twoButtonContainer}>
      <TouchableOpacity
        style={[styles.actionButton, styles.playButton, styles.halfWidth]}
        onPress={onPlay}
        disabled={isPlaying}
        activeOpacity={0.7}
        accessibilityLabel="Play audio"
        accessibilityRole="button"
        accessibilityHint="Plays the audio message"
      >
        {isPlaying ? (
          <ActivityIndicator size="large" color={COLORS.white} />
        ) : (
          <Text style={styles.actionButtonText}>تشغيل الصوت</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.actionButton, styles.shareButton, styles.halfWidth]}
        onPress={onShare}
        activeOpacity={0.7}
        accessibilityLabel="Share via WhatsApp"
        accessibilityRole="button"
        accessibilityHint="Opens WhatsApp to share this message"
      >
        <Text style={styles.actionButtonText}>إرسال واتساب</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  twoButtonContainer: {
    flexDirection: 'row',
    gap: SPACING.md,
    justifyContent: 'space-between',
  },
  halfWidth: {
    flex: 1,
  },
  actionButton: {
    minHeight: 100,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.md,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  actionButtonText: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
    color: COLORS.white,
    textAlign: 'center',
  },
  playButton: {
    backgroundColor: '#3498DB',
  },
  shareButton: {
    backgroundColor: '#25D366',
  },
});

export default PhraseActionButtons;
