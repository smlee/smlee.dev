import { AnalyticsEvent, AnalyticsProvider } from '../types';

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
    console.log(`[Analytics] INIT CHECK - Google Analytics with ID: ${this.measurementId}`);
    
    // Don't initialize twice
    if (document.querySelector(`script[src*="${this.measurementId}/gtag/js"]`)) {
      // console.log('[Analytics] Google Analytics script already loaded');
      return;
    }
    
    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args: unknown[]) {
      // console.log('[Analytics] gtag call:', args);
      window.dataLayer?.push(args);
    };
    
    // Initialize with timestamp
    window.gtag('js', new Date());
    
    // Configure with measurement ID
    window.gtag('config', this.measurementId, {
      send_page_view: false, // We'll handle page views manually for SPAs
      debug_mode: true
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
}
