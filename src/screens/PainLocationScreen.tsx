import React from 'react';
import type { PainLocationScreenProps } from '../types';
import { CategoryScreenTemplate } from '../components';

const PainLocationScreen: React.FC<PainLocationScreenProps> = () => {
  return <CategoryScreenTemplate category="pain" screenName="PainLocation" />;
};

export default PainLocationScreen;
