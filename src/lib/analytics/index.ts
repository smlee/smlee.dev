import { AnalyticsConfig, AnalyticsEvent, AnalyticsProvider } from './types';
import { PlausibleProvider } from './providers/plausible';
import { GoogleAnalyticsProvider } from './providers/google';
import { consentManager } from '../consent';

class Analytics {
  private providers: AnalyticsProvider[] = [];
  private initialized = false;
  private config: AnalyticsConfig = {
    enabled: false,
    providers: {
      google: true,
      plausible: false
    }
  };

  /**
   * Initialize analytics with configuration
   */
  init(config: AnalyticsConfig): void {
    if (this.initialized) return;
    
    this.config = config;
    
    // Skip initialization if analytics is disabled
    if (!config.enabled) return;
    
    // Skip analytics if user hasn't consented
    const preferences = consentManager.getPreferences();
    if (preferences.hasResponded && !preferences.analytics) {
      console.info('Analytics disabled due to user consent preferences');
      return;
    }
    
    // Initialize Google Analytics if enabled
    if (config.providers.google) {
      const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
      
      if (measurementId) {
        const google = new GoogleAnalyticsProvider(measurementId);
        this.providers.push(google);
        google.init();
      } else {
        console.warn('Google Analytics measurement ID not provided. GA tracking disabled.');
      }
    }
    
    // Initialize Plausible if enabled
    if (config.providers.plausible) {
      const domain = process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN || 'smlee.dev';
      const scriptSrc = process.env.NEXT_PUBLIC_PLAUSIBLE_SCRIPT || 'https://plausible.io/js/script.js';
      
      const plausible = new PlausibleProvider(domain, scriptSrc);
      this.providers.push(plausible);
      plausible.init();
    }
    
    this.initialized = true;
  }

  /**
   * Track a page view
   */
  trackPageView(url: string): void {
    if (!this.config.enabled) return;
    
    // Check consent before tracking
    if (!consentManager.isAllowed('analytics')) return;
    
    this.providers.forEach(provider => {
      try {
        provider.trackPageView(url);
      } catch (error) {
        console.error('Error tracking page view:', error);
      }
    });
  }

  /**
   * Track a custom event
   */
  trackEvent(event: AnalyticsEvent): void {
    if (!this.config.enabled) return;
    
    // Check consent before tracking
    if (!consentManager.isAllowed('analytics')) return;
    
    this.providers.forEach(provider => {
      try {
        provider.trackEvent(event);
      } catch (error) {
        console.error('Error tracking event:', error);
      }
    });
  }
}

// Export a singleton instance
export const analytics = new Analytics();

// Re-export types
export * from './types';
