import React from 'react';
import type { EmotionsScreenProps } from '../types';
import { CategoryScreenTemplate } from '../components';

const EmotionsScreen: React.FC<EmotionsScreenProps> = () => {
  return <CategoryScreenTemplate category="emotions" screenName="Emotions" />;
};

export default EmotionsScreen;
