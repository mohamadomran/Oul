/**
 * Share Utilities
 *
 * Functions for sharing phrases via various platforms
 */

import { Linking, Alert } from 'react-native';

/**
 * Share a message via WhatsApp
 *
 * @param arabicText - The Arabic text to share
 * @param englishText - The English translation (unused, kept for compatibility)
 * @returns Promise that resolves when sharing is complete
 */
export const shareViaWhatsApp = async (
  arabicText: string,
  _englishText?: string,
): Promise<void> => {
  try {
    // Only send Arabic text
    const message = arabicText;

    // URL encode the message
    const encodedMessage = encodeURIComponent(message);

    // WhatsApp URL scheme - opens WhatsApp with message, user selects contact
    const whatsappUrl = `whatsapp://send?text=${encodedMessage}`;

    // Check if WhatsApp is installed
    const canOpen = await Linking.canOpenURL(whatsappUrl);

    if (canOpen) {
      // Open WhatsApp with pre-filled message
      await Linking.openURL(whatsappUrl);
    } else {
      // WhatsApp not installed, show error
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
 * Share a message via SMS
 *
 * @param arabicText - The Arabic text to share
 * @param englishText - The English translation (optional)
 * @returns Promise that resolves when sharing is complete
 */
export const shareViaSMS = async (
  arabicText: string,
  englishText?: string,
): Promise<void> => {
  try {
    // Compose the message
    let message = arabicText;
    if (englishText) {
      message += `\n(${englishText})`;
    }

    // URL encode the message
    const encodedMessage = encodeURIComponent(message);

    // SMS URL scheme
    const smsUrl = `sms:?body=${encodedMessage}`;

    // Open SMS app with pre-filled message
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
 * Copy text to clipboard
 *
 * @param arabicText - The Arabic text to copy
 * @param englishText - The English translation (optional)
 */
export const copyToClipboard = async (
  arabicText: string,
  englishText?: string,
): Promise<void> => {
  try {
    const { default: Clipboard } = await import(
      '@react-native-clipboard/clipboard'
    );

    // Compose the message
    let message = arabicText;
    if (englishText) {
      message += `\n(${englishText})`;
    }

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
