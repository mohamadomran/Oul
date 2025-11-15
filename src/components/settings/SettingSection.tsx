import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZES, FONTS } from '../../constants';

interface SettingSectionProps {
  title: string;
  icon?: string;
}

const SettingSection: React.FC<SettingSectionProps> = ({ title, icon }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {icon && <Text style={styles.icon}>{icon} </Text>}
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: SPACING.xl,
    marginBottom: SPACING.md,
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: FONT_SIZES.xl,
    fontWeight: '700',
    color: COLORS.text,
  },
  icon: {
    fontSize: FONT_SIZES.xl,
  },
});

export default SettingSection;
