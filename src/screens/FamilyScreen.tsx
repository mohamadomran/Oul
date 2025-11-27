import React from 'react';
import type { FamilyScreenProps } from '../types';
import { CategoryScreenTemplate } from '../components';

const FamilyScreen: React.FC<FamilyScreenProps> = () => {
  return <CategoryScreenTemplate category="family" screenName="Family" />;
};

export default FamilyScreen;
