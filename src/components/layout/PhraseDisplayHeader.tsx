import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../../constants';
import { DynamicIcon } from '../ui/DynamicIcon';
import type { IconDefinition } from '../../types/phrase.types';

interface PhraseDisplayHeaderProps {
  icon?: IconDefinition | string; // Support both new and legacy format during migration
}

const PhraseDisplayHeader: React.FC<PhraseDisplayHeaderProps> = ({ icon }) => {
  return (
    <View style={styles.header}>
      {icon && (
        typeof icon === 'string' ? (
          // Legacy emoji fallback
          <DynamicIcon
            library="MaterialCommunityIcons"
            name="emoticon"
            size={64}
            color={COLORS.text}
            fallback={icon}
          />
        ) : (
          // New icon library format
          <DynamicIcon
            library={icon.library}
            name={icon.name}
            size={64}
            color={COLORS.text}
            fallback={icon.fallback}
          />
        )
      )}
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
