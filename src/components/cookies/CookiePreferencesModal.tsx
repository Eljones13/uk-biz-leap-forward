
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface CookieConsent {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
}

interface CookiePreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (consent: CookieConsent) => void;
}

export const CookiePreferencesModal = ({ isOpen, onClose, onSave }: CookiePreferencesModalProps) => {
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false
  });

  useEffect(() => {
    // Load existing preferences if available
    const existingConsent = localStorage.getItem('cookie-consent');
    if (existingConsent) {
      try {
        const consent: CookieConsent = JSON.parse(existingConsent);
        setPreferences({
          necessary: consent.necessary,
          analytics: consent.analytics,
          marketing: consent.marketing
        });
      } catch (error) {
        console.error('Failed to parse existing cookie consent:', error);
      }
    }
  }, [isOpen]);

  const handleSave = () => {
    const consent: CookieConsent = {
      ...preferences,
      timestamp: Date.now()
    };
    
    localStorage.setItem('cookie-consent', JSON.stringify(consent));
    onSave(consent);
  };

  const handleAcceptAll = () => {
    const consent: CookieConsent = {
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: Date.now()
    };
    
    setPreferences({
      necessary: true,
      analytics: true,
      marketing: true
    });
    
    localStorage.setItem('cookie-consent', JSON.stringify(consent));
    onSave(consent);
  };

  const cookieCategories = [
    {
      id: 'necessary',
      title: 'Necessary Cookies',
      description: 'These cookies are essential for the website to function properly. They enable core functionality such as security, network management, and accessibility.',
      examples: ['Authentication', 'Security', 'Load balancing'],
      required: true
    },
    {
      id: 'analytics',
      title: 'Analytics Cookies',
      description: 'These cookies help us understand how visitors use our website by collecting and reporting information anonymously.',
      examples: ['Google Analytics', 'Usage statistics', 'Performance metrics'],
      required: false
    },
    {
      id: 'marketing',
      title: 'Marketing Cookies',
      description: 'These cookies are used to track visitors across websites to display relevant advertisements and marketing content.',
      examples: ['Advertising pixels', 'Retargeting', 'Social media tracking'],
      required: false
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto rounded-2xl">
        <DialogHeader>
          <DialogTitle>Cookie Preferences</DialogTitle>
          <DialogDescription>
            Manage your cookie preferences. You can enable or disable different types of cookies below.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {cookieCategories.map((category, index) => (
            <div key={category.id} className="space-y-3">
              {index > 0 && <Separator />}
              
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{category.title}</h3>
                    {category.required && (
                      <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">
                        Required
                      </span>
                    )}
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                  
                  <div className="text-xs text-muted-foreground">
                    <strong>Examples:</strong> {category.examples.join(', ')}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id={category.id}
                    checked={preferences[category.id as keyof typeof preferences]}
                    onCheckedChange={(checked) => {
                      if (!category.required) {
                        setPreferences(prev => ({
                          ...prev,
                          [category.id]: checked
                        }));
                      }
                    }}
                    disabled={category.required}
                  />
                  <Label 
                    htmlFor={category.id} 
                    className={`text-sm ${category.required ? 'text-muted-foreground' : 'cursor-pointer'}`}
                  >
                    {preferences[category.id as keyof typeof preferences] ? 'Enabled' : 'Disabled'}
                  </Label>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Separator className="my-6" />

        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Preferences
          </Button>
          <Button onClick={handleAcceptAll}>
            Accept All
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
