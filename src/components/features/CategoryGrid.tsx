import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { RootStackNavigationProp } from '../../types/navigation.types';
import { COLORS, SPACING } from '../../constants';
import { BigButton } from '../index';

const CategoryGrid: React.FC = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  return (
    <View style={styles.gridContainer}>
      <View style={styles.buttonRow}>
        <BigButton
          title="احتياجات أساسية"
          icon="🍽️"
          color={COLORS.basicNeeds}
          onPress={() => navigation.navigate('BasicNeeds')}
          size="large"
        />
        <BigButton
          title="ألم"
          icon="🩹"
          color={COLORS.pain}
          onPress={() => navigation.navigate('PainLocation')}
          size="large"
        />
      </View>

      <View style={styles.buttonRow}>
        <BigButton
          title="مشاعر"
          icon="😊"
          color={COLORS.emotions}
          onPress={() => navigation.navigate('Emotions')}
          size="large"
        />
        <BigButton
          title="محادثة"
          icon="💬"
          color={COLORS.conversation}
          onPress={() => navigation.navigate('Conversation')}
          size="large"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    width: '100%',
    maxWidth: 500,
    gap: SPACING.lg,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    gap: SPACING.lg,
  },
});

export default CategoryGrid;
