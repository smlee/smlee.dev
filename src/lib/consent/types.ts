/**
 * Cookie consent types
 */

export interface ConsentPreferences {
  /** Whether the user has made a choice */
  hasResponded: boolean;
  /** Whether necessary cookies are accepted (always true) */
  necessary: boolean;
  /** Whether analytics/statistics cookies are accepted */
  analytics: boolean;
  /** Whether marketing cookies are accepted */
  marketing: boolean;
  /** Whether preference cookies are accepted */
  preferences: boolean;
  /** Timestamp when consent was last updated */
  updatedAt: number;
}

export interface ConsentOptions {
  /** Cookie name to store consent preferences */
  cookieName?: string;
  /** Cookie expiration in days */
  cookieExpires?: number;
  /** Domain for the cookie */
  cookieDomain?: string;
  /** Whether to show the consent banner */
  showBanner?: boolean;
}

export const DEFAULT_CONSENT_PREFERENCES: ConsentPreferences = {
  hasResponded: false,
  necessary: true, // Always required
  analytics: false,
  marketing: false,
  preferences: false,
  updatedAt: 0,
};

export const DEFAULT_CONSENT_OPTIONS: ConsentOptions = {
  cookieName: 'smlee_cookie_consent',
  cookieExpires: 365, // 1 year
  cookieDomain: '',
  showBanner: true,
};
