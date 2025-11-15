import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types';
import {
  HomeScreen,
  BasicNeedsScreen,
  PainLocationScreen,
  EmotionsScreen,
  ConversationScreen,
  CustomPhrasesScreen,
  SettingsScreen,
  FavoritesScreen,
} from '../screens';
import { COLORS } from '../constants';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerTintColor: COLORS.background,
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'قول (Oul)',
            headerShown: true,
          }}
        />

        <Stack.Screen
          name="BasicNeeds"
          component={BasicNeedsScreen}
          options={{
            title: 'Basic Needs',
          }}
        />

        <Stack.Screen
          name="PainLocation"
          component={PainLocationScreen}
          options={{
            title: 'Pain Location',
          }}
        />

        <Stack.Screen
          name="Emotions"
          component={EmotionsScreen}
          options={{
            title: 'Emotions',
          }}
        />

        <Stack.Screen
          name="Conversation"
          component={ConversationScreen}
          options={{
            title: 'Conversation',
          }}
        />

        <Stack.Screen
          name="CustomPhrases"
          component={CustomPhrasesScreen}
          options={{
            title: 'Custom Phrases',
          }}
        />

        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            title: 'Settings',
          }}
        />

        <Stack.Screen
          name="Favorites"
          component={FavoritesScreen}
          options={{
            title: 'Favorites',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
