import React from 'react';
import type { ConversationScreenProps } from '../types';
import { CategoryScreenTemplate } from '../components';

const ConversationScreen: React.FC<ConversationScreenProps> = () => {
  return (
    <CategoryScreenTemplate category="conversation" screenName="Conversation" />
  );
};

export default ConversationScreen;
