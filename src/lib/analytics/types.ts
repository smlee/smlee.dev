/**
 * Core analytics types for the application
 */

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
}

export interface AnalyticsConfig {
  enabled: boolean;
  providers: Record<string, boolean>;
}
