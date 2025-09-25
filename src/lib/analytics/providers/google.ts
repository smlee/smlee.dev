import { AnalyticsEvent, AnalyticsProvider } from '../types';
import { ConsentPreferences } from '../../consent/types';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export class GoogleAnalyticsProvider implements AnalyticsProvider {
  private measurementId: string;
  
  constructor(measurementId: string) {
    this.measurementId = measurementId;
  }

  init(): void {
    if (typeof window === 'undefined') return;
    
    // Debug logging
    // console.log(`[Analytics] INIT CHECK - Google Analytics with ID: ${this.measurementId}`);
    
    // Don't initialize twice
    if (document.querySelector('script[src*="www.googletagmanager.com/gtag/js?id="]')) {
      // console.log('[Analytics] Google Analytics script already loaded');
      return;
    }
    
    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args: unknown[]) {
      // console.log('[Analytics] gtag call:', args);
      window.dataLayer?.push(args);
    };
    
    // Consent Mode default: deny analytics/ad storage until user consents
    try {
      window.gtag('consent', 'default', {
        ad_storage: 'denied',
        analytics_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      } as Record<string, string>);
    } catch {
      // no-op if consent api unavailable
    }
    
    // Initialize with timestamp
    window.gtag('js', new Date());
    
    // Configure with measurement ID
    window.gtag('config', this.measurementId, {
      send_page_view: false, // We'll handle page views manually for SPAs
      debug_mode: false
    });
    
    // Load the script
    try {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${this.measurementId}`;
      document.head.appendChild(script);
      // console.log('[Analytics] Google Analytics script added to DOM');
      
      // Verify script loads
      script.onload = () => { /* console.log('[Analytics] Google Analytics script loaded successfully') */ };
      script.onerror = (e) => console.error('[Analytics] Failed to load Google Analytics script:', e);
    } catch (error) {
      console.error('[Analytics] Error initializing Google Analytics:', error);
    }
  }

  trackPageView(url: string): void {
    if (typeof window === 'undefined' || !window.gtag) {
      // console.warn('[Analytics] Cannot track page view - gtag not available');
      return;
    }
    
    // console.log(`[Analytics] Tracking page view: ${url} to ${this.measurementId}`);
    
    try {
      window.gtag('event', 'page_view', {
        page_path: url,
        send_to: this.measurementId,
      });
      // console.log('[Analytics] Page view event sent');
    } catch (error) {
      console.error('[Analytics] Error tracking page view:', error);
    }
  }

  trackEvent(event: AnalyticsEvent): void {
    if (typeof window === 'undefined' || !window.gtag) return;
    
    window.gtag('event', event.name, event.properties);
  }

  /**
   * Update Google Consent Mode based on app consent preferences
   */
  updateConsent(preferences: ConsentPreferences): void {
    if (typeof window === 'undefined' || !window.gtag) return;
    try {
      window.gtag('consent', 'update', {
        analytics_storage: preferences.analytics ? 'granted' : 'denied',
        ad_storage: preferences.marketing ? 'granted' : 'denied',
        ad_user_data: preferences.marketing ? 'granted' : 'denied',
        ad_personalization: preferences.marketing ? 'granted' : 'denied',
      } as Record<string, string>);
    } catch {
      // ignore
    }
  }
}
