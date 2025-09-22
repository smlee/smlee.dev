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
    
    // Don't initialize twice
    if (document.querySelector(`script[src*="${this.measurementId}/gtag/js"]`)) return;
    
    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };
    
    // Initialize with timestamp
    window.gtag('js', new Date());
    
    // Configure with measurement ID
    window.gtag('config', this.measurementId, {
      send_page_view: false, // We'll handle page views manually for SPAs
    });
    
    // Load the script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.measurementId}`;
    document.head.appendChild(script);
  }

  trackPageView(url: string): void {
    if (typeof window === 'undefined' || !window.gtag) return;
    
    window.gtag('event', 'page_view', {
      page_path: url,
      send_to: this.measurementId,
    });
  }

  trackEvent(event: AnalyticsEvent): void {
    if (typeof window === 'undefined' || !window.gtag) return;
    
    window.gtag('event', event.name, event.properties);
  }
}
