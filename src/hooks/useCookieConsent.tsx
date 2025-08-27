
import { useState, useEffect } from "react";

interface CookieConsent {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
}

export const useCookieConsent = () => {
  const [hasConsent, setHasConsent] = useState<boolean>(false);
  const [consent, setConsent] = useState<CookieConsent | null>(null);

  useEffect(() => {
    const existingConsent = localStorage.getItem('cookie-consent');
    if (existingConsent) {
      try {
        const parsedConsent: CookieConsent = JSON.parse(existingConsent);
        setConsent(parsedConsent);
        setHasConsent(true);
      } catch (error) {
        console.error('Failed to parse cookie consent:', error);
      }
    }
  }, []);

  const updateConsent = (newConsent: CookieConsent) => {
    localStorage.setItem('cookie-consent', JSON.stringify(newConsent));
    setConsent(newConsent);
    setHasConsent(true);
  };

  const clearConsent = () => {
    localStorage.removeItem('cookie-consent');
    setConsent(null);
    setHasConsent(false);
  };

  return {
    hasConsent,
    consent,
    updateConsent,
    clearConsent
  };
};
