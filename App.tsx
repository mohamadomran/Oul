/**
 * قول (Oul) - Communication App
 *
 * Main application entry point
 */

import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-gesture-handler';
import RootNavigator from './src/navigation/RootNavigator';
import SettingsService from './src/services/SettingsService';
import { SettingsProvider } from './src/contexts/SettingsContext';

const App: React.FC = () => {
  useEffect(() => {
    // Initialize settings service on app startup
    SettingsService.initialize().catch(error => {
      console.error('Failed to initialize SettingsService:', error);
    });
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <SettingsProvider>
          <RootNavigator />
        </SettingsProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
