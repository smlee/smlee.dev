/**
 * React hooks for analytics
 */
'use client';

import { useCallback } from 'react';
import { analytics, AnalyticsEvent } from './index';

/**
 * Hook to track custom events
 */
export function useAnalytics() {
  /**
   * Track a custom event
   */
  const trackEvent = useCallback((event: AnalyticsEvent) => {
    analytics.trackEvent(event);
  }, []);

  /**
   * Track an outbound link click
   */
  const trackOutboundLink = useCallback((url: string, label?: string) => {
    analytics.trackEvent({
      name: 'outbound_link',
      properties: {
        url,
        label: label || url,
      },
    });
  }, []);

  /**
   * Track a download
   */
  const trackDownload = useCallback((filename: string, label?: string) => {
    analytics.trackEvent({
      name: 'download',
      properties: {
        filename,
        label: label || filename,
      },
    });
  }, []);

  /**
   * Track a form submission
   */
  const trackFormSubmission = useCallback((formName: string) => {
    analytics.trackEvent({
      name: 'form_submission',
      properties: {
        form: formName,
      },
    });
  }, []);

  return {
    trackEvent,
    trackOutboundLink,
    trackDownload,
    trackFormSubmission,
  };
}
