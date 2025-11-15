import { Linking, Alert } from 'react-native';
import { COLORS } from '../constants/colors';
import type { Phrase } from '../types/phrase.types';
import type { ShareContext } from '../types/utility.types';

// Category names in Arabic and English
const CATEGORY_NAMES: Record<string, { arabic: string; english: string }> = {
  basic_needs: { arabic: 'احتياج أساسي', english: 'Basic Need' },
  pain: { arabic: 'ألم', english: 'Pain' },
  emotions: { arabic: 'شعور', english: 'Emotion' },
  conversation: { arabic: 'محادثة', english: 'Conversation' },
  emergency: { arabic: 'طوارئ', english: 'Emergency' },
};

/**
 * Build a contextual message for sharing
 */
const buildContextualMessage = (context: ShareContext): string => {
  const {
    phrase,
    intensity,
    includeCategory = true,
    includeTimestamp = false,
  } = context;

  let message = '';

  // Add category prefix if requested
  if (includeCategory && phrase.category) {
    const categoryInfo = CATEGORY_NAMES[phrase.category];
    if (categoryInfo) {
      message += `${categoryInfo.arabic} (${categoryInfo.english}):\n`;
    }
  }

  // Add main phrase text
  message += `${phrase.arabicText}`;
  if (phrase.englishText) {
    message += ` (${phrase.englishText})`;
  }

  // Add intensity for pain messages
  if (intensity) {
    const intensityLabels: Record<string, { arabic: string; english: string }> =
      {
        light: { arabic: 'خفيف', english: 'Light' },
        medium: { arabic: 'متوسط', english: 'Medium' },
        severe: { arabic: 'شديد', english: 'Severe' },
      };
    const intensityLabel = intensityLabels[intensity];
    if (intensityLabel) {
      message += `\nالشدة: ${intensityLabel.arabic} (Intensity: ${intensityLabel.english})`;
    }
  }

  // Add timestamp if requested
  if (includeTimestamp) {
    const now = new Date();
    const timeString = now.toLocaleTimeString('ar-SA', {
      hour: '2-digit',
      minute: '2-digit',
    });
    const dateString = now.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    message += `\n\nالوقت: ${timeString}\nالتاريخ: ${dateString}`;
  }

  // Add app signature
  message += `\n\n📱 Sent from Oul (قول)`;

  return message;
};

/**
 * Share phrase via WhatsApp with context
 */
export const shareViaWhatsApp = async (
  context: ShareContext,
): Promise<void> => {
  try {
    const message = buildContextualMessage(context);
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `whatsapp://send?text=${encodedMessage}`;

    const canOpen = await Linking.canOpenURL(whatsappUrl);

    if (canOpen) {
      await Linking.openURL(whatsappUrl);
    } else {
      Alert.alert(
        'واتساب غير متاح',
        'تطبيق واتساب غير مثبت على هذا الجهاز.\nWhatsApp is not installed on this device.',
        [{ text: 'حسناً / OK', style: 'default' }],
      );
    }
  } catch (error) {
    console.error('Error sharing via WhatsApp:', error);
    Alert.alert(
      'خطأ',
      'حدث خطأ أثناء فتح واتساب.\nAn error occurred while opening WhatsApp.',
      [{ text: 'حسناً / OK', style: 'default' }],
    );
  }
};

/**
 * Share phrase via SMS with context
 */
export const shareViaSMS = async (context: ShareContext): Promise<void> => {
  try {
    const message = buildContextualMessage(context);
    const encodedMessage = encodeURIComponent(message);
    const smsUrl = `sms:?body=${encodedMessage}`;

    const canOpen = await Linking.canOpenURL(smsUrl);

    if (canOpen) {
      await Linking.openURL(smsUrl);
    } else {
      Alert.alert('خطأ', 'لا يمكن فتح تطبيق الرسائل.\nCannot open SMS app.', [
        { text: 'حسناً / OK', style: 'default' },
      ]);
    }
  } catch (error) {
    console.error('Error sharing via SMS:', error);
    Alert.alert(
      'خطأ',
      'حدث خطأ أثناء فتح تطبيق الرسائل.\nAn error occurred while opening SMS app.',
      [{ text: 'حسناً / OK', style: 'default' }],
    );
  }
};

/**
 * Copy phrase to clipboard with context
 */
export const copyToClipboard = async (context: ShareContext): Promise<void> => {
  try {
    const { default: Clipboard } = await import(
      '@react-native-clipboard/clipboard'
    );

    const message = buildContextualMessage(context);
    Clipboard.setString(message);

    Alert.alert(
      'تم النسخ',
      'تم نسخ النص إلى الحافظة.\nText copied to clipboard.',
      [{ text: 'حسناً / OK', style: 'default' }],
    );
  } catch (error) {
    console.error('Error copying to clipboard:', error);
    Alert.alert(
      'خطأ',
      'حدث خطأ أثناء النسخ.\nAn error occurred while copying.',
      [{ text: 'حسناً / OK', style: 'default' }],
    );
  }
};

/**
 * Legacy compatibility: Share basic text via WhatsApp
 * @deprecated Use shareViaWhatsApp with ShareContext instead
 */
export const shareViaWhatsAppLegacy = async (
  arabicText: string,
  englishText?: string,
): Promise<void> => {
  const phrase: Phrase = {
    id: 'legacy',
    arabicText,
    englishText: englishText || '',
    icon: '',
    color: COLORS.conversation,
    audioFile: '',
    language: 'ar',
    category: 'Conversation',
  };

  await shareViaWhatsApp({
    phrase,
    includeCategory: false,
    includeTimestamp: false,
  });
};

export default {
  shareViaWhatsApp,
  shareViaSMS,
  copyToClipboard,
  buildContextualMessage,
};
