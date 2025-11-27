import React from 'react';
import type { BasicNeedsScreenProps } from '../types';
import { CategoryScreenTemplate } from '../components';

const BasicNeedsScreen: React.FC<BasicNeedsScreenProps> = () => {
  return (
    <CategoryScreenTemplate category="basic_needs" screenName="BasicNeeds" />
  );
};

export default BasicNeedsScreen;
