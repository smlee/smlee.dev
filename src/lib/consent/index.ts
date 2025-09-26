import { ConsentOptions, ConsentPreferences, DEFAULT_CONSENT_OPTIONS, DEFAULT_CONSENT_PREFERENCES } from './types';

class ConsentManager {
  private preferences: ConsentPreferences = { ...DEFAULT_CONSENT_PREFERENCES };
  private options: ConsentOptions = { ...DEFAULT_CONSENT_OPTIONS };
  private listeners: Array<(preferences: ConsentPreferences) => void> = [];

  /**
   * Initialize consent manager
   */
  init(options: ConsentOptions = {}): ConsentPreferences {
    if (typeof window === 'undefined') {
      return this.preferences;
    }

    // Merge options
    this.options = { ...DEFAULT_CONSENT_OPTIONS, ...options };
    
    // Load preferences from cookie
    const savedPreferences = this.loadPreferences();
    if (savedPreferences) {
      this.preferences = savedPreferences;
      // Notify listeners so providers (e.g., GA Consent Mode) receive the
      // correct state immediately on page load when a user has previously
      // made a choice. Without this, providers may remain in the default
      // denied state until the user interacts again in this session.
      this.notifyListeners();
    }

    return this.preferences;
  }

  /**
   * Get current consent preferences
   */
  getPreferences(): ConsentPreferences {
    return { ...this.preferences };
  }

  /**
   * Update consent preferences
   */
  updatePreferences(preferences: Partial<ConsentPreferences>): ConsentPreferences {
    // Update preferences
    this.preferences = {
      ...this.preferences,
      ...preferences,
      hasResponded: true,
      updatedAt: Date.now(),
    };

    // Save to cookie
    this.savePreferences();

    // Notify listeners
    this.notifyListeners();

    return this.preferences;
  }

  /**
   * Accept all cookies
   */
  acceptAll(): ConsentPreferences {
    return this.updatePreferences({
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    });
  }

  /**
   * Accept only necessary cookies
   */
  acceptNecessaryOnly(): ConsentPreferences {
    return this.updatePreferences({
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    });
  }

  /**
   * Check if a specific category is allowed
   */
  isAllowed(category: keyof Omit<ConsentPreferences, 'hasResponded' | 'updatedAt'>): boolean {
    return this.preferences[category];
  }

  /**
   * Subscribe to preference changes
   */
  subscribe(listener: (preferences: ConsentPreferences) => void): () => void {
    this.listeners.push(listener);
    
    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  /**
   * Load preferences from cookie
   */
  private loadPreferences(): ConsentPreferences | null {
    try {
      const cookieValue = this.getCookie(this.options.cookieName || DEFAULT_CONSENT_OPTIONS.cookieName!);
      if (!cookieValue) return null;
      
      return JSON.parse(cookieValue) as ConsentPreferences;
    } catch (error) {
      console.error('Error loading consent preferences:', error);
      return null;
    }
  }

  /**
   * Save preferences to cookie
   */
  private savePreferences(): void {
    try {
      const { cookieName, cookieExpires, cookieDomain } = this.options;
      const value = JSON.stringify(this.preferences);
      
      // Calculate expiration date
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + (cookieExpires || DEFAULT_CONSENT_OPTIONS.cookieExpires!));
      
      // Set cookie
      document.cookie = `${cookieName || DEFAULT_CONSENT_OPTIONS.cookieName!}=${encodeURIComponent(value)}; expires=${expirationDate.toUTCString()}; path=/; ${cookieDomain ? `domain=${cookieDomain};` : ''} SameSite=Lax`;
    } catch (error) {
      console.error('Error saving consent preferences:', error);
    }
  }

  /**
   * Get cookie value by name
   */
  private getCookie(name: string): string | null {
    if (typeof document === 'undefined') return null;
    
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + '=')) {
        return decodeURIComponent(cookie.substring(name.length + 1));
      }
    }
    return null;
  }

  /**
   * Notify all listeners of preference changes
   */
  private notifyListeners(): void {
    this.listeners.forEach(listener => {
      try {
        listener(this.getPreferences());
      } catch (error) {
        console.error('Error notifying consent listener:', error);
      }
    });
  }
}

// Export singleton instance
export const consentManager = new ConsentManager();

// Re-export types
export * from './types';
