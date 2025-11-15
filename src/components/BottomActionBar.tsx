import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type {
  RootStackNavigationProp,
  RootStackParamList,
} from '../types/navigation.types';
import { COLORS, SPACING, FONT_SIZES } from '../constants';
import HapticService from '../services/HapticService';
import type { BottomActionBarProps } from '../types/ui.types';

const BottomActionBar: React.FC<BottomActionBarProps> = ({
  currentScreen,
  showBack = true,
  showFavorites = true,
}) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const insets = useSafeAreaInsets();

  const handleBack = async () => {
    await HapticService.trigger('light');
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const handleHome = async () => {
    await HapticService.trigger('medium');
    navigation.navigate('Home');
  };

  const handleFavorites = async () => {
    await HapticService.trigger('light');
    navigation.navigate('Favorites');
  };

  const isHome = currentScreen === 'Home';

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: Math.max(insets.bottom, SPACING.md),
        },
      ]}
    >
      <View style={styles.content}>
        {/* Back Button */}
        {showBack && (
          <TouchableOpacity
            style={[
              styles.actionButton,
              !navigation.canGoBack() && styles.disabled,
            ]}
            onPress={handleBack}
            disabled={!navigation.canGoBack()}
            activeOpacity={0.7}
            accessibilityLabel="Go back"
            accessibilityRole="button"
            accessibilityHint="Navigate to previous screen"
          >
            <Text style={styles.icon}>⬅</Text>
            <Text style={styles.label}>رجوع</Text>
            <Text style={styles.sublabel}>Back</Text>
          </TouchableOpacity>
        )}

        {/* Home Button */}
        <TouchableOpacity
          style={[
            styles.actionButton,
            styles.homeButton,
            isHome && styles.disabled,
          ]}
          onPress={handleHome}
          disabled={isHome}
          activeOpacity={0.7}
          accessibilityLabel="Go to home screen"
          accessibilityRole="button"
          accessibilityHint="Navigate to main menu"
          accessibilityState={{ selected: isHome }}
        >
          <Text style={styles.icon}>🏠</Text>
          <Text style={styles.label}>الرئيسية</Text>
          <Text style={styles.sublabel}>Home</Text>
        </TouchableOpacity>

        {/* Favorites Button */}
        {showFavorites && (
          <TouchableOpacity
            style={[styles.actionButton]}
            onPress={handleFavorites}
            activeOpacity={0.7}
            accessibilityLabel="Go to favorites"
            accessibilityRole="button"
            accessibilityHint="View favorite phrases for quick access"
          >
            <Text style={styles.icon}>⭐</Text>
            <Text style={styles.label}>المفضلة</Text>
            <Text style={styles.sublabel}>Favorites</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    ...Platform.select({
      ios: {
        backdropFilter: 'blur(10px)',
      },
    }),
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
    minHeight: 80,
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.xs,
    borderRadius: 12,
    minHeight: 70,
  },
  homeButton: {
    backgroundColor: COLORS.primary,
    marginHorizontal: SPACING.sm,
  },
  disabled: {
    opacity: 0.4,
  },
  icon: {
    fontSize: 32,
    marginBottom: 4,
  },
  label: {
    fontSize: FONT_SIZES.md,
    fontWeight: '700',
    color: COLORS.text,
    textAlign: 'center',
  },
  sublabel: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '500',
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 2,
  },
});

export default BottomActionBar;
