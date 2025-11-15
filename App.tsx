/**
 * قول (Oul) - Communication App
 *
 * Main application entry point
 */

import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import RootNavigator from './src/navigation/RootNavigator';

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <RootNavigator />
    </SafeAreaProvider>
  );
};

export default App;
