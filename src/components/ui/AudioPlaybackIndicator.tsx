import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { COLORS, FONT_SIZES } from '../../constants';

interface AudioPlaybackIndicatorProps {
  isPlaying: boolean;
}

const AudioPlaybackIndicator: React.FC<AudioPlaybackIndicatorProps> = ({
  isPlaying,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isPlaying) {
      // Fade in
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Start pulsing
      const pulseAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
        ]),
      );
      pulseAnimation.start();

      return () => {
        pulseAnimation.stop();
      };
    } else {
      // Fade out
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isPlaying, fadeAnim, pulseAnim]);

  if (!isPlaying) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ scale: pulseAnim }],
        },
      ]}
      testID="audio-playback-indicator"
    >
      <View style={styles.indicator}>
        <View style={styles.iconContainer}>
          <View style={styles.speakerIcon}>
            <View style={styles.speakerBody} />
            <View style={styles.soundWave1} />
            <View style={styles.soundWave2} />
          </View>
        </View>
        <Text style={styles.text}>Playing...</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: Dimensions.get('window').height > 800 ? 120 : 80,
    right: 20,
    zIndex: 1000,
  },
  indicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 152, 219, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  iconContainer: {
    marginRight: 8,
  },
  speakerIcon: {
    width: 20,
    height: 16,
    position: 'relative',
  },
  speakerBody: {
    position: 'absolute',
    left: 0,
    top: 4,
    width: 12,
    height: 8,
    backgroundColor: COLORS.white,
    borderRadius: 1,
  },
  soundWave1: {
    position: 'absolute',
    left: 10,
    top: 2,
    width: 2,
    height: 12,
    backgroundColor: COLORS.white,
    borderRadius: 1,
    opacity: 0.8,
  },
  soundWave2: {
    position: 'absolute',
    left: 14,
    top: 0,
    width: 2,
    height: 16,
    backgroundColor: COLORS.white,
    borderRadius: 1,
    opacity: 0.6,
  },
  text: {
    color: COLORS.white,
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
  },
});

export default AudioPlaybackIndicator;
