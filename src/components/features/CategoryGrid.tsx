import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { RootStackNavigationProp } from '../../types/navigation.types';
import { COLORS, SPACING } from '../../constants';
import { BigButton } from '../index';
import { useButtonSize, useHighContrast } from '../../contexts/SettingsContext';

const CategoryGrid: React.FC = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const { width: screenWidth } = useWindowDimensions();
  const buttonSize = useButtonSize();
  const highContrast = useHighContrast();

  // Responsive button sizing - 2 buttons per row with gap
  const horizontalPadding = SPACING.xl * 2; // Account for HomeScreen padding
  const gap = SPACING.md;
  const availableWidth = screenWidth - horizontalPadding;
  const buttonWidth = (availableWidth - gap) / 2;

  return (
    <View style={styles.gridContainer}>
      <View style={[styles.buttonRow, { gap }]}>
        <BigButton
          title="احتياجات أساسية"
          icon="🍽️"
          color={COLORS.basicNeeds}
          onPress={() => navigation.navigate('BasicNeeds')}
          size={buttonSize}
          highContrast={highContrast}
          width={buttonWidth}
        />
        <BigButton
          title="ألم"
          icon="🩹"
          color={COLORS.pain}
          onPress={() => navigation.navigate('PainLocation')}
          size={buttonSize}
          highContrast={highContrast}
          width={buttonWidth}
        />
      </View>

      <View style={[styles.buttonRow, { gap }]}>
        <BigButton
          title="مشاعر"
          icon="😊"
          color={COLORS.emotions}
          onPress={() => navigation.navigate('Emotions')}
          size={buttonSize}
          highContrast={highContrast}
          width={buttonWidth}
        />
        <BigButton
          title="محادثة"
          icon="💬"
          color={COLORS.conversation}
          onPress={() => navigation.navigate('Conversation')}
          size={buttonSize}
          highContrast={highContrast}
          width={buttonWidth}
        />
      </View>

      <View style={styles.buttonRowCentered}>
        <BigButton
          title="عائلة"
          icon="❤️"
          color={COLORS.family}
          onPress={() => navigation.navigate('Family')}
          size={buttonSize}
          highContrast={highContrast}
          width={buttonWidth}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    width: '100%',
    gap: SPACING.md,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  buttonRowCentered: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});

export default CategoryGrid;
