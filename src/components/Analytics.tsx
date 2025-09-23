/**
 * Analytics component that initializes analytics providers
 * and tracks page views automatically
 */
'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { analytics } from '@/lib/analytics';

export interface AnalyticsProps {
  /** Whether analytics is enabled */
  enabled?: boolean;
  /** Which analytics providers to enable */
  providers?: {
    google?: boolean;
    plausible?: boolean;
  };
}

export function Analytics({
  enabled = process.env.NODE_ENV === 'production',
  providers = { google: true, plausible: false },
}: AnalyticsProps) {
  // Debug check for production mode
  console.log('[Analytics Component] Environment check:', { 
    NODE_ENV: process.env.NODE_ENV,
    isProduction: process.env.NODE_ENV === 'production',
    enabled
  });
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize analytics on mount
  useEffect(() => {
    console.log('[Analytics Component] Initializing with:', { enabled, providers });
    analytics.init({
      enabled,
      providers,
    });
  }, [enabled, providers]);

  // Track page views when the route changes
  useEffect(() => {
    if (!enabled) return;
    
    // Get the full URL with search params
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    
    // Track the page view
    analytics.trackPageView(url);
  }, [pathname, searchParams, enabled]);

  return null;
}
