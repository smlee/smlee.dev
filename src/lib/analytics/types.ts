/**
 * Core analytics types for the application
 */
import type { ConsentPreferences } from '../consent/types';

export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, string | number | boolean | null | undefined>;
}

export interface AnalyticsProvider {
  /**
   * Initialize the analytics provider
   */
  init: () => void;
  
  /**
   * Track a page view
   */
  trackPageView: (url: string) => void;
  
  /**
   * Track a custom event
   */
  trackEvent: (event: AnalyticsEvent) => void;

  /**
   * Optionally update consent state for providers that support Consent Mode
   */
  updateConsent?: (preferences: ConsentPreferences) => void;
}

export interface AnalyticsConfig {
  enabled: boolean;
  providers: Record<string, boolean>;
}
