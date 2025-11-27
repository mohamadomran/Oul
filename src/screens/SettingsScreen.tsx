import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Alert, StatusBar } from 'react-native';
import type { SettingsScreenProps } from '../types';
import { COLORS, SPACING } from '../constants';
import type { FontSize, ButtonSize, ShareMethod } from '../types/settings.types';
import JsonAudioService from '../services/JsonAudioService';
import { useSettings, useHighContrast } from '../contexts/SettingsContext';
import { HeaderBar } from '../components';
import {
  SettingSection,
  SettingToggle,
  SettingPicker,
  SettingButton,
} from '../components/settings';

const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation: _navigation }) => {
  const { settings, updateSetting, resetToDefaults } = useSettings();
  const highContrast = useHighContrast();
  const [loading, setLoading] = useState(false);

  const handleResetToDefaults = () => {
    Alert.alert(
      'Reset Settings',
      'Are you sure you want to reset all settings to default values?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            try {
              setLoading(true);
              await resetToDefaults();
              Alert.alert('Success', 'Settings reset to defaults');
            } catch (error) {
              console.error('Error resetting settings:', error);
              Alert.alert('Error', 'Failed to reset settings');
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  const handleClearAudioCache = () => {
    const cacheSize = JsonAudioService.getCacheSize();

    Alert.alert(
      'Audio Cache Info',
      `Currently caching ${cacheSize} audio file${cacheSize !== 1 ? 's' : ''}. Cache is managed automatically and cleared when app restarts.`,
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={[styles.container, highContrast && styles.containerHighContrast]}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.background}
      />

      <HeaderBar
        title="الإعدادات"
        subtitle="Settings"
        showBack={true}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Accessibility Settings */}
        <SettingSection title="إمكانية الوصول" />

        <SettingPicker
          label="Font Size"
          description="حجم الخط • Text size throughout the app"
          value={settings.fontSize}
          options={[
            { label: 'Small', value: 'small' },
            { label: 'Medium', value: 'medium' },
            { label: 'Large', value: 'large' },
            { label: 'Extra Large', value: 'xlarge' },
          ]}
          onValueChange={(value) => updateSetting('fontSize', value as FontSize)}
        />

        <SettingPicker
          label="Button Size"
          description="حجم الأزرار • Size of phrase buttons"
          value={settings.buttonSize}
          options={[
            { label: 'Normal', value: 'normal' },
            { label: 'Large', value: 'large' },
            { label: 'Extra Large', value: 'xlarge' },
          ]}
          onValueChange={(value) => updateSetting('buttonSize', value as ButtonSize)}
        />

        <SettingToggle
          label="High Contrast"
          description="تباين عالي • Increase contrast for better visibility"
          value={settings.highContrast}
          onValueChange={(value) => updateSetting('highContrast', value)}
        />

        {/* Audio Settings */}
        <SettingSection title="الصوت" />

        <SettingButton
          label="Clear Audio Cache"
          onPress={handleClearAudioCache}
          variant="secondary"
        />

        {/* Communication Settings */}
        <SettingSection title="التواصل" />

        <SettingPicker
          label="Default Share Method"
          description="طريقة المشاركة • How to share messages by default"
          value={settings.defaultShareMethod}
          options={[
            { label: 'WhatsApp', value: 'whatsapp' },
            { label: 'SMS', value: 'sms' },
            { label: 'Ask Every Time', value: 'ask' },
          ]}
          onValueChange={(value) => updateSetting('defaultShareMethod', value as ShareMethod)}
        />

        <SettingToggle
          label="Include English in Shares"
          description="تضمين الإنجليزية • Include English translation when sharing"
          value={settings.includeEnglishInShares}
          onValueChange={(value) => updateSetting('includeEnglishInShares', value)}
        />

        <SettingToggle
          label="Quick Share"
          description="مشاركة سريعة • Skip confirmation dialog"
          value={settings.quickShare}
          onValueChange={(value) => updateSetting('quickShare', value)}
        />

        {/* About Section */}
        <SettingSection title="حول" />

        <SettingButton
          label="Reset to Defaults"
          onPress={handleResetToDefaults}
          variant="danger"
          loading={loading}
        />

        <View style={styles.version}>
          {/* Version info would go here */}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  containerHighContrast: {
    backgroundColor: COLORS.highContrastBackground,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },
  version: {
    marginTop: SPACING.xl,
    marginBottom: SPACING.lg,
  },
});

export default SettingsScreen;
