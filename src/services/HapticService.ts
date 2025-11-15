import ReactNativeHapticFeedback, {
  HapticFeedbackTypes,
} from 'react-native-haptic-feedback';
import type { HapticType, NotificationHapticType } from '../types';

/**
 * Haptic feedback options
 */
const HAPTIC_OPTIONS = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
  // Add debug logging to troubleshoot issues
  debug: false,
};

/**
 * Haptic Service Class
 */
class HapticService {
  private enabled: boolean = true;

  /**
   * Enable haptic feedback
   */
  enable(): void {
    this.enabled = true;
  }

  /**
   * Disable haptic feedback
   */
  disable(): void {
    this.enabled = false;
  }

  /**
   * Check if haptics are enabled
   */
  isEnabled(): boolean {
    return this.enabled;
  }

  /**
   * Trigger impact haptic feedback
   *
   * @param type - light, medium, or heavy
   */
  async trigger(type: HapticType = 'medium'): Promise<void> {
    if (!this.enabled) {
      return;
    }

    try {
      let method: keyof typeof HapticFeedbackTypes;

      switch (type) {
        case 'light':
          method = 'impactLight';
          break;
        case 'medium':
          method = 'impactMedium';
          break;
        case 'heavy':
          method = 'impactHeavy';
          break;
      }

      ReactNativeHapticFeedback.trigger(method, HAPTIC_OPTIONS);
    } catch (error) {
      console.warn('[HapticService] Error triggering haptic:', error);
      // Don't throw - Haptic feedback is not critical
    }
  }

  /**
   * Trigger notification haptic feedback
   *
   * @param type - success, warning, or error
   */
  async triggerNotification(type: NotificationHapticType): Promise<void> {
    if (!this.enabled) {
      return;
    }

    try {
      let method:
        | 'notificationSuccess'
        | 'notificationWarning'
        | 'notificationError';

      switch (type) {
        case 'success':
          method = 'notificationSuccess';
          break;
        case 'warning':
          method = 'notificationWarning';
          break;
        case 'error':
          method = 'notificationError';
          break;
      }

      ReactNativeHapticFeedback.trigger(method, HAPTIC_OPTIONS);
    } catch (error) {
      console.warn(
        '[HapticService] Error triggering notification haptic:',
        error,
      );
      // Don't throw - haptic feedback is not critical
    }
  }

  /**
   * Trigger selection haptic (for toggles, pickers)
   */
  async triggerSelection(): Promise<void> {
    if (!this.enabled) {
      return;
    }

    try {
      ReactNativeHapticFeedback.trigger('selection', HAPTIC_OPTIONS);
    } catch (error) {
      console.warn('[HapticService] Error triggering selection haptic:', error);
    }
  }
}

// Export singleton instance
export default new HapticService();
