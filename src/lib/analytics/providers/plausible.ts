import { AnalyticsEvent, AnalyticsProvider } from '../types';

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string | number | boolean | null | undefined>, callback?: () => void }) => void;
  }
}

export class PlausibleProvider implements AnalyticsProvider {
  private domain: string;
  private scriptSrc: string;

  constructor(domain: string, customScriptSrc?: string) {
    this.domain = domain;
    this.scriptSrc = customScriptSrc || 'https://plausible.io/js/script.js';
  }

  init(): void {
    if (typeof window === 'undefined') return;
    
    // Don't initialize twice
    if (document.querySelector(`script[src="${this.scriptSrc}"]`)) return;
    
    const script = document.createElement('script');
    script.defer = true;
    script.setAttribute('data-domain', this.domain);
    script.src = this.scriptSrc;
    document.head.appendChild(script);
  }

  trackPageView(url: string): void {
    if (typeof window === 'undefined' || !window.plausible) return;
    
    // Plausible automatically tracks page views in default mode,
    // but we can manually track them for SPAs
    window.plausible('pageview', { props: { path: url } });
  }

  trackEvent(event: AnalyticsEvent): void {
    if (typeof window === 'undefined' || !window.plausible) return;
    
    window.plausible(event.name, { 
      props: event.properties 
    });
  }
}
