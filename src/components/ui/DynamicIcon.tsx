import React from 'react';
import { Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export interface DynamicIconProps {
  library: 'Ionicons' | 'MaterialCommunityIcons' | 'FontAwesome5' | 'MaterialIcons';
  name: string;
  size: number;
  color: string;
  fallback?: string;
}

/**
 * DynamicIcon Component
 *
 * Renders icons from react-native-vector-icons with dynamic library selection.
 * Falls back to emoji if icon not found or library unavailable.
 *
 * @param library - Icon library name
 * @param name - Icon name within the library
 * @param size - Icon size in pixels
 * @param color - Icon color
 * @param fallback - Emoji fallback if icon fails to render
 */
export const DynamicIcon: React.FC<DynamicIconProps> = ({
  library,
  name,
  size,
  color,
  fallback = '🔵',
}) => {
  try {
    // Select the appropriate icon library
    switch (library) {
      case 'Ionicons':
        return <Ionicons name={name} size={size} color={color} />;
      case 'MaterialCommunityIcons':
        return <MaterialCommunityIcons name={name} size={size} color={color} />;
      case 'FontAwesome5':
        return <FontAwesome5 name={name} size={size} color={color} />;
      case 'MaterialIcons':
        return <MaterialIcons name={name} size={size} color={color} />;
      default:
        // Fallback to emoji if library not recognized
        return (
          <Text style={{ fontSize: size, color, textAlign: 'center' }}>
            {fallback}
          </Text>
        );
    }
  } catch (error) {
    // If icon fails to render, fall back to emoji
    console.warn(`Icon ${library}:${name} failed to render, using fallback emoji`, error);
    return (
      <Text style={{ fontSize: size, color, textAlign: 'center' }}>
        {fallback}
      </Text>
    );
  }
};
