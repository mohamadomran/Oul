/**
 * Emotions Category Data
 *
 * 18 common emotional states and feelings
 */

import { Phrase } from '../types';

export const EMOTIONS_PHRASES: Phrase[] = [
  // Positive Emotions (Green/Blue tones)
  {
    id: 'em_happy',
    arabicText: 'أنا سعيد',
    englishText: 'I am happy',
    category: 'Emotions',
    audioFile: 'emotions_happy',
    icon: '😊',
    color: '#27AE60',  // Green - happy, positive
    language: 'ar',
  },
  {
    id: 'em_excited',
    arabicText: 'أنا متحمس',
    englishText: 'I am excited',
    category: 'Emotions',
    audioFile: 'emotions_excited',
    icon: '🤗',
    color: '#F39C12',  // Orange - energetic
    language: 'ar',
  },
  {
    id: 'em_grateful',
    arabicText: 'أنا ممتن',
    englishText: 'I am grateful',
    category: 'Emotions',
    audioFile: 'emotions_grateful',
    icon: '🙏',
    color: '#9B59B6',  // Purple - spiritual, grateful
    language: 'ar',
  },
  {
    id: 'em_proud',
    arabicText: 'أنا فخور',
    englishText: 'I am proud',
    category: 'Emotions',
    audioFile: 'emotions_proud',
    icon: '😌',
    color: '#3498DB',  // Blue - calm confidence
    language: 'ar',
  },
  {
    id: 'em_relaxed',
    arabicText: 'أنا مرتاح',
    englishText: 'I am relaxed',
    category: 'Emotions',
    audioFile: 'emotions_relaxed',
    icon: '😌',
    color: '#16A085',  // Teal - peaceful
    language: 'ar',
  },
  {
    id: 'em_loved',
    arabicText: 'أشعر بالحب',
    englishText: 'I feel loved',
    category: 'Emotions',
    audioFile: 'emotions_loved',
    icon: '❤️',
    color: '#E91E63',  // Pink - love
    language: 'ar',
  },

  // Negative Emotions (Red/Purple tones)
  {
    id: 'em_sad',
    arabicText: 'أنا حزين',
    englishText: 'I am sad',
    category: 'Emotions',
    audioFile: 'emotions_sad',
    icon: '😢',
    color: '#5DADE2',  // Light blue - sadness
    language: 'ar',
  },
  {
    id: 'em_angry',
    arabicText: 'أنا غاضب',
    englishText: 'I am angry',
    category: 'Emotions',
    audioFile: 'emotions_angry',
    icon: '😠',
    color: '#E74C3C',  // Red - anger
    language: 'ar',
  },
  {
    id: 'em_frustrated',
    arabicText: 'أنا محبط',
    englishText: 'I am frustrated',
    category: 'Emotions',
    audioFile: 'emotions_frustrated',
    icon: '😤',
    color: '#E67E22',  // Dark orange - frustration
    language: 'ar',
  },
  {
    id: 'em_worried',
    arabicText: 'أنا قلق',
    englishText: 'I am worried',
    category: 'Emotions',
    audioFile: 'emotions_worried',
    icon: '😟',
    color: '#8E44AD',  // Purple - worry
    language: 'ar',
  },
  {
    id: 'em_scared',
    arabicText: 'أنا خائف',
    englishText: 'I am scared',
    category: 'Emotions',
    audioFile: 'emotions_scared',
    icon: '😨',
    color: '#C0392B',  // Dark red - fear
    language: 'ar',
  },
  {
    id: 'em_lonely',
    arabicText: 'أشعر بالوحدة',
    englishText: 'I feel lonely',
    category: 'Emotions',
    audioFile: 'emotions_lonely',
    icon: '😔',
    color: '#7F8C8D',  // Gray - loneliness
    language: 'ar',
  },

  // Neutral/Complex Emotions (Gray/Yellow tones)
  {
    id: 'em_tired',
    arabicText: 'أنا متعب',
    englishText: 'I am tired',
    category: 'Emotions',
    audioFile: 'emotions_tired',
    icon: '😫',
    color: '#95A5A6',  // Light gray - tired
    language: 'ar',
  },
  {
    id: 'em_bored',
    arabicText: 'أشعر بالملل',
    englishText: 'I am bored',
    category: 'Emotions',
    audioFile: 'emotions_bored',
    icon: '😐',
    color: '#BDC3C7',  // Silver - bored
    language: 'ar',
  },
  {
    id: 'em_confused',
    arabicText: 'أنا مرتبك',
    englishText: 'I am confused',
    category: 'Emotions',
    audioFile: 'emotions_confused',
    icon: '😕',
    color: '#F4B350',  // Yellow-orange - confused
    language: 'ar',
  },
  {
    id: 'em_surprised',
    arabicText: 'أنا متفاجئ',
    englishText: 'I am surprised',
    category: 'Emotions',
    audioFile: 'emotions_surprised',
    icon: '😲',
    color: '#F1C40F',  // Bright yellow - surprised
    language: 'ar',
  },
  {
    id: 'em_uncomfortable',
    arabicText: 'أشعر بعدم الراحة',
    englishText: 'I feel uncomfortable',
    category: 'Emotions',
    audioFile: 'emotions_uncomfortable',
    icon: '😣',
    color: '#D35400',  // Brown-orange - uncomfortable
    language: 'ar',
  },
  {
    id: 'em_overwhelmed',
    arabicText: 'أشعر بالإرهاق',
    englishText: 'I feel overwhelmed',
    category: 'Emotions',
    audioFile: 'emotions_overwhelmed',
    icon: '😵',
    color: '#34495E',  // Dark gray-blue - overwhelmed
    language: 'ar',
  },
];
