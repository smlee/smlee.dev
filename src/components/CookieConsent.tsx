'use client';

import { useState, useEffect } from 'react';
import { consentManager, ConsentPreferences } from '@/lib/consent';

export interface CookieConsentProps {
  privacyPolicyUrl?: string;
}

export function CookieConsent({ 
  privacyPolicyUrl = '/privacy-policy' 
}: CookieConsentProps) {
  const [preferences, setPreferences] = useState<ConsentPreferences>(consentManager.getPreferences());
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  // Initialize consent manager and set up state
  useEffect(() => {
    // Initialize consent manager
    const initialPreferences = consentManager.init();
    setPreferences(initialPreferences);
    
    // Show banner if user hasn't responded
    setShowBanner(!initialPreferences.hasResponded);
    
    // Subscribe to preference changes
    const unsubscribe = consentManager.subscribe((newPreferences) => {
      setPreferences(newPreferences);
      setShowBanner(!newPreferences.hasResponded);
    });
    
    return () => {
      unsubscribe();
    };
  }, []);

  // Accept all cookies
  const handleAcceptAll = () => {
    consentManager.acceptAll();
    setShowBanner(false);
    setShowPreferences(false);
  };

  // Accept only necessary cookies
  const handleNecessaryOnly = () => {
    consentManager.acceptNecessaryOnly();
    setShowBanner(false);
    setShowPreferences(false);
  };

  // Save custom preferences
  const handleSavePreferences = () => {
    consentManager.updatePreferences(preferences);
    setShowBanner(false);
    setShowPreferences(false);
  };

  // Toggle a specific preference
  const handleTogglePreference = (category: keyof Omit<ConsentPreferences, 'hasResponded' | 'updatedAt'>) => {
    if (category === 'necessary') return; // Can't toggle necessary cookies
    
    setPreferences(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // Open preferences panel
  const handleOpenPreferences = () => {
    setShowPreferences(true);
  };

  // Show cookie settings button
  const handleShowSettings = () => {
    setShowBanner(true);
    setShowPreferences(true);
  };

  if (!showBanner && preferences.hasResponded) {
    return (
      <button
        onClick={handleShowSettings}
        className="fixed bottom-4 left-4 z-50 bg-primary text-primary-foreground px-3 py-1 text-xs rounded-full shadow-md hover:bg-primary/90 transition-all"
        aria-label="Cookie Settings"
      >
        Cookie Settings
      </button>
    );
  }

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border p-4 shadow-lg">
      <div className="container mx-auto">
        {!showPreferences ? (
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex-1">
              <h2 className="text-lg font-semibold mb-2">Cookie Consent</h2>
              <p className="text-sm text-muted-foreground mb-2">
                This website uses cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
                By clicking &quot;Accept All&quot;, you consent to our use of cookies.
              </p>
              <p className="text-sm text-muted-foreground">
                <a href={privacyPolicyUrl} className="underline hover:text-primary">
                  Read our Privacy Policy
                </a> for more information.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 whitespace-nowrap">
              <button
                onClick={handleOpenPreferences}
                className="px-4 py-2 border border-border rounded-md hover:bg-secondary transition-colors"
              >
                Preferences
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white rounded-md transition-colors"
              >
                Accept All
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Cookie Preferences</h2>
              <button
                onClick={() => setShowPreferences(false)}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Back
              </button>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="p-3 border border-border rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-medium">Necessary Cookies</h3>
                    <p className="text-sm text-muted-foreground">Required for the website to function properly</p>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={preferences.necessary}
                      disabled
                      className="sr-only"
                      id="necessary-cookies"
                    />
                    <label
                      htmlFor="necessary-cookies"
                      className="block w-10 h-6 bg-green-600 dark:bg-green-500 rounded-full cursor-not-allowed"
                    >
                      <span className="block w-4 h-4 absolute top-1/2 right-1 transform -translate-y-1/2 bg-white rounded-full"></span>
                    </label>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  These cookies are essential for the website to function properly and cannot be disabled.
                </p>
              </div>
              
              <div className="p-3 border border-border rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-medium">Analytics Cookies</h3>
                    <p className="text-sm text-muted-foreground">Help us improve our website by collecting anonymous data</p>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={() => handleTogglePreference('analytics')}
                      className="sr-only"
                      id="analytics-cookies"
                    />
                    <label
                      htmlFor="analytics-cookies"
                      className={`block w-10 h-6 rounded-full cursor-pointer transition-colors ${
                        preferences.analytics ? 'bg-green-600 dark:bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    >
                      <span 
                        className={`block w-4 h-4 absolute top-1/2 transform -translate-y-1/2 bg-white rounded-full transition-transform ${
                          preferences.analytics ? 'right-1' : 'left-1'
                        }`}
                      ></span>
                    </label>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site.
                  They help us know which pages are the most and least popular and see how visitors move around the site.
                </p>
              </div>
              
              <div className="p-3 border border-border rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-medium">Marketing Cookies</h3>
                    <p className="text-sm text-muted-foreground">Used to track visitors across websites</p>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={() => handleTogglePreference('marketing')}
                      className="sr-only"
                      id="marketing-cookies"
                    />
                    <label
                      htmlFor="marketing-cookies"
                      className={`block w-10 h-6 rounded-full cursor-pointer transition-colors ${
                        preferences.marketing ? 'bg-green-600 dark:bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    >
                      <span 
                        className={`block w-4 h-4 absolute top-1/2 transform -translate-y-1/2 bg-white rounded-full transition-transform ${
                          preferences.marketing ? 'right-1' : 'left-1'
                        }`}
                      ></span>
                    </label>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  These cookies may be set through our site by our advertising partners.
                  They may be used by those companies to build a profile of your interests and show you relevant ads on other sites.
                </p>
              </div>
              
              <div className="p-3 border border-border rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-medium">Preferences Cookies</h3>
                    <p className="text-sm text-muted-foreground">Remember your settings and preferences</p>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={preferences.preferences}
                      onChange={() => handleTogglePreference('preferences')}
                      className="sr-only"
                      id="preferences-cookies"
                    />
                    <label
                      htmlFor="preferences-cookies"
                      className={`block w-10 h-6 rounded-full cursor-pointer transition-colors ${
                        preferences.preferences ? 'bg-green-600 dark:bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    >
                      <span 
                        className={`block w-4 h-4 absolute top-1/2 transform -translate-y-1/2 bg-white rounded-full transition-transform ${
                          preferences.preferences ? 'right-1' : 'left-1'
                        }`}
                      ></span>
                    </label>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  These cookies enable the website to remember choices you make (such as your username, language or the region you are in)
                  and provide enhanced, more personal features.
                </p>
              </div>
            </div>
            
            <div className="flex justify-end gap-2">
              <button
                onClick={handleNecessaryOnly}
                className="px-4 py-2 border border-border rounded-md hover:bg-secondary transition-colors"
              >
                Necessary Only
              </button>
              <button
                onClick={handleSavePreferences}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Save Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
