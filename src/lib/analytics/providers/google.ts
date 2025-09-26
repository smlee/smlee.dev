import { AnalyticsEvent, AnalyticsProvider } from '../types';
import { ConsentPreferences } from '../../consent/types';

// Diagnostic flag to aid troubleshooting in production temporarily.
// Enable by setting NEXT_PUBLIC_ANALYTICS_DEBUG to '1' or 'true' in the frontend env.
const DIAGNOSTIC =
  (typeof process !== 'undefined' &&
    (process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === '1' ||
     process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === 'true')) || false;

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
    if (DIAGNOSTIC) console.log(`[Analytics] INIT CHECK - Google Analytics with ID: ${this.measurementId}`);
    
    // Initialize dataLayer and gtag queue function BEFORE inserting script (per official snippet)
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function gtag(...args: unknown[]) {
      if (DIAGNOSTIC) console.log('[Analytics][gtag call]', args);
      window.dataLayer?.push(args);
    };

    // Consent Mode default: set signals before any config/events are queued
    try {
      const defaultConsent = {
        security_storage: 'granted',
        functionality_storage: 'denied',
        ad_storage: 'denied',
        analytics_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      } as Record<string, string>;
      if (DIAGNOSTIC) console.log('[Analytics][Consent default]', defaultConsent);
      window.gtag('consent', 'default', defaultConsent);
    } catch {
      // no-op if consent api unavailable
    }

    // Queue timestamp and initial config (will be processed once script loads)
    window.gtag('js', new Date());
    window.gtag('config', this.measurementId, {
      // For diagnosis, allow auto page_view when DIAGNOSTIC is on.
      send_page_view: DIAGNOSTIC ? true : false,
      debug_mode: DIAGNOSTIC,
    });

    // Finally, insert the GA script tag so it can drain the queue
    let scriptEl = document.querySelector('script[src*="www.googletagmanager.com/gtag/js?id="]') as HTMLScriptElement | null;
    if (!scriptEl) {
      try {
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${this.measurementId}`;
        document.head.appendChild(script);
        script.onload = () => { if (DIAGNOSTIC) console.log('[Analytics] Google Analytics script loaded successfully'); };
        script.onerror = (e) => console.error('[Analytics] Failed to load Google Analytics script:', e);
        scriptEl = script;
      } catch (error) {
        console.error('[Analytics] Error injecting Google Analytics script:', error);
      }
    } else if (DIAGNOSTIC) {
      console.log('[Analytics] Google Analytics script already present');
    }
  }

  trackPageView(url: string): void {
    if (typeof window === 'undefined' || !window.gtag) {
      // console.warn('[Analytics] Cannot track page view - gtag not available');
      return;
    }
    
    if (DIAGNOSTIC) console.log(`[Analytics] Tracking page view: ${url} to ${this.measurementId}`);
    
    try {
      // Provide explicit fields so GA4 Realtime/Reports have full context
      // even when we manually send page_view events.
      const payload = {
        page_path: url,
        page_location: typeof location !== 'undefined' ? location.href : undefined,
        page_title: typeof document !== 'undefined' ? document.title : undefined,
        // do not set send_to for GA4; measurement id is bound via config
        // include debug_mode to surface events in DebugView reliably
        debug_mode: DIAGNOSTIC || undefined,
      } as Record<string, unknown>;
      if (DIAGNOSTIC) console.log('[Analytics] page_view payload', payload);
      window.gtag('event', 'page_view', payload);
      if (DIAGNOSTIC) console.log('[Analytics] Page view event sent');
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
      const update = {
        // Map UI categories to Consent Mode signals
        // Necessary -> security_storage (always granted; cannot be disabled)
        security_storage: preferences.necessary ? 'granted' : 'granted',
        // Preferences -> functionality_storage
        functionality_storage: preferences.preferences ? 'granted' : 'denied',
        analytics_storage: preferences.analytics ? 'granted' : 'denied',
        ad_storage: preferences.marketing ? 'granted' : 'denied',
        ad_user_data: preferences.marketing ? 'granted' : 'denied',
        ad_personalization: preferences.marketing ? 'granted' : 'denied',
      } as Record<string, string>;
      if (DIAGNOSTIC) console.log('[Analytics][Consent update]', update);
      window.gtag('consent', 'update', update);
    } catch {
      // ignore
    }
  }
}
