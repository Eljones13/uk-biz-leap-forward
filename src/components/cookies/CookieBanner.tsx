
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { CookiePreferencesModal } from "./CookiePreferencesModal";

interface CookieConsent {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
}

export const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const existingConsent = localStorage.getItem('cookie-consent');
    const doNotTrack = navigator.doNotTrack === "1";
    
    if (!existingConsent && !doNotTrack) {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const consent: CookieConsent = {
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: Date.now()
    };
    
    localStorage.setItem('cookie-consent', JSON.stringify(consent));
    setIsVisible(false);
    
    // Load analytics/marketing scripts
    loadConsentScripts(consent);
  };

  const handleRejectNonEssential = () => {
    const consent: CookieConsent = {
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: Date.now()
    };
    
    localStorage.setItem('cookie-consent', JSON.stringify(consent));
    setIsVisible(false);
  };

  const loadConsentScripts = (consent: CookieConsent) => {
    // Load analytics scripts if consent given
    if (consent.analytics) {
      // Example: Load Google Analytics
      console.log('Loading analytics scripts...');
    }
    
    // Load marketing scripts if consent given
    if (consent.marketing) {
      // Example: Load marketing pixels
      console.log('Loading marketing scripts...');
    }
  };

  const handlePreferencesSaved = (consent: CookieConsent) => {
    setIsVisible(false);
    setShowPreferences(false);
    loadConsentScripts(consent);
  };

  if (!isVisible) return null;

  return (
    <>
      <div 
        className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t shadow-lg p-4 md:p-6"
        role="banner"
        aria-label="Cookie consent banner"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex-1">
              <p className="text-sm text-foreground mb-2">
                <strong>We use cookies to improve your experience.</strong>
              </p>
              <p className="text-xs text-muted-foreground">
                You can accept all cookies or manage your preferences. See our{" "}
                <Link to="/privacy" className="underline hover:no-underline text-primary">
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link to="/cookies" className="underline hover:no-underline text-primary">
                  Cookie Policy
                </Link>{" "}
                for details.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 min-w-fit">
              <Button
                onClick={handleAcceptAll}
                size="sm"
                className="whitespace-nowrap"
              >
                Accept All
              </Button>
              <Button
                onClick={() => setShowPreferences(true)}
                variant="outline"
                size="sm"
                className="whitespace-nowrap"
              >
                Manage Preferences
              </Button>
              <button
                onClick={handleRejectNonEssential}
                className="text-xs text-muted-foreground hover:text-foreground underline hover:no-underline whitespace-nowrap"
              >
                Reject Non-Essential
              </button>
            </div>
          </div>
        </div>
      </div>

      <CookiePreferencesModal
        isOpen={showPreferences}
        onClose={() => setShowPreferences(false)}
        onSave={handlePreferencesSaved}
      />
    </>
  );
};
