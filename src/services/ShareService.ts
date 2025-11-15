import { Linking, Alert } from 'react-native';
import type { Phrase } from '../types/phrase.types';
import type { ShareContext } from '../types/utility.types';

export const shareViaWhatsApp = async (
  arabicText: string,
  englishText?: string,
): Promise<void> => {
  try {
    // Include both Arabic and English text if available
    let message = arabicText;
    if (englishText) {
      message += `\n(${englishText})`;
    }

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `whatsapp://send?text=${encodedMessage}`;

    // Check if WhatsApp is installed
    const canOpen = await Linking.canOpenURL(whatsappUrl);

    if (canOpen) {
      await Linking.openURL(whatsappUrl);
      console.log('[ShareService] WhatsApp opened successfully');
    } else {
      Alert.alert(
        'WhatsApp Not Found',
        'Please install WhatsApp to share messages',
        [{ text: 'OK' }]
      );
    }
  } catch (error) {
    console.error('[ShareService] WhatsApp share error:', error);
    Alert.alert(
      'Share Error',
      'Could not open WhatsApp. Please make sure WhatsApp is installed.',
      [{ text: 'OK' }]
    );
  }
};

export const shareViaSMS = async (
  arabicText: string,
  englishText?: string,
): Promise<void> => {
  try {
    let message = arabicText;
    if (englishText) {
      message += `\n(${englishText})`;
    }
    const encodedMessage = encodeURIComponent(message);
    const smsUrl = `sms:?body=${encodedMessage}`;
    const canOpen = await Linking.canOpenURL(smsUrl);

    if (canOpen) {
      await Linking.openURL(smsUrl);
    }
  } catch (error) {
    console.error('[ShareService] SMS share error:', error);
    Alert.alert('Share Error', 'Could not open Messages');
  }
};

export const copyToClipboard = async (
  arabicText: string,
  englishText?: string,
): Promise<void> => {
  try {
    const { default: Clipboard } = await import(
      '@react-native-clipboard/clipboard'
    );

    let message = arabicText;
    if (englishText) {
      message += `\n(${englishText})`;
    }

    Clipboard.setString(message);
    Alert.alert('Copied', 'Text copied to clipboard');
  } catch (error) {
    console.error('[ShareService] Clipboard error:', error);
    Alert.alert('Copy Error', 'Could not copy text to clipboard');
  }
};

export const createShareContext = (
  phrase: Phrase,
  intensity?: 'light' | 'moderate' | 'severe',
  location?: string,
): ShareContext => {
  const context: ShareContext = {
    phrase,
    intensity,
    location,
  };

  return context;
};
