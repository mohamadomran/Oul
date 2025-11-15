import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  BasicNeeds: undefined;
  PainLocation: undefined;
  Emotions: undefined;
  Conversation: undefined;
  CustomPhrases: undefined;
  Settings: undefined;
  Favorites: undefined;
};

export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Home'
>;
export type BasicNeedsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'BasicNeeds'
>;
export type PainLocationScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'PainLocation'
>;
export type EmotionsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Emotions'
>;
export type ConversationScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Conversation'
>;
export type CustomPhrasesScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'CustomPhrases'
>;
export type SettingsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Settings'
>;
export type FavoritesScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Favorites'
>;

export type RootStackNavigationProp =
  NativeStackScreenProps<RootStackParamList>['navigation'];
