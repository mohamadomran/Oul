import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../../constants';

interface PhraseDisplayHeaderProps {
  icon?: string;
}

const PhraseDisplayHeader: React.FC<PhraseDisplayHeaderProps> = ({ icon }) => {
  return (
    <View style={styles.header}>
      {icon && <Text style={styles.icon}>{icon}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default PhraseDisplayHeader;
