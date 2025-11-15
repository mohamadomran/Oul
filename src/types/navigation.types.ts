/**
 * Navigation Types
 *
 * Type-safe navigation with React Navigation
 */

import type { NativeStackScreenProps } from '@react-navigation/native-stack';

/**
 * Root Stack Parameter List
 * Defines all screens and their required parameters
 */
export type RootStackParamList = {
  Home: undefined;
  BasicNeeds: undefined;
  PainLocation: undefined;
  Emotions: undefined;
  Conversation: undefined;
  CustomPhrases: undefined;
  Settings: undefined;
};

/**
 * Screen prop types for each screen
 */
export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type BasicNeedsScreenProps = NativeStackScreenProps<RootStackParamList, 'BasicNeeds'>;
export type PainLocationScreenProps = NativeStackScreenProps<RootStackParamList, 'PainLocation'>;
export type EmotionsScreenProps = NativeStackScreenProps<RootStackParamList, 'Emotions'>;
export type ConversationScreenProps = NativeStackScreenProps<RootStackParamList, 'Conversation'>;
export type CustomPhrasesScreenProps = NativeStackScreenProps<RootStackParamList, 'CustomPhrases'>;
export type SettingsScreenProps = NativeStackScreenProps<RootStackParamList, 'Settings'>;

/**
 * Navigation prop type helper
 */
export type RootStackNavigationProp = NativeStackScreenProps<RootStackParamList>['navigation'];
