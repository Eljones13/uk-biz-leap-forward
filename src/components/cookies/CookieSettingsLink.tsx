
import { useState } from "react";
import { CookiePreferencesModal } from "./CookiePreferencesModal";

interface CookieConsent {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
}

export const CookieSettingsLink = () => {
  const [showPreferences, setShowPreferences] = useState(false);

  const handlePreferencesSaved = (consent: CookieConsent) => {
    setShowPreferences(false);
    // Reload consent scripts if needed
    console.log('Cookie preferences updated:', consent);
  };

  return (
    <>
      <button
        onClick={() => setShowPreferences(true)}
        className="text-[#94A3B8] hover:text-white transition-colors text-sm"
      >
        Cookie Settings
      </button>

      <CookiePreferencesModal
        isOpen={showPreferences}
        onClose={() => setShowPreferences(false)}
        onSave={handlePreferencesSaved}
      />
    </>
  );
};
