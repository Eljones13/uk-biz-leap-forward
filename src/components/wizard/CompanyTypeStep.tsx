
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Building2, Users, Handshake } from "lucide-react";

interface CompanyRegistrationData {
  companyName: string;
  companyType: 'limited' | 'cic' | 'partnership' | '';
  sicCodes: string[];
  registeredOffice: {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    county?: string;
    postcode: string;
    country: string;
  };
  directors: Array<{
    id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    nationality: string;
    occupation: string;
    address: {
      addressLine1: string;
      addressLine2?: string;
      city: string;
      county?: string;
      postcode: string;
      country: string;
    };
  }>;
  shareholders: Array<{
    id: string;
    name: string;
    shares: number;
    shareClass: string;
    address: {
      addressLine1: string;
      addressLine2?: string;
      city: string;
      county?: string;
      postcode: string;
      country: string;
    };
  }>;
  shareCapital: {
    totalShares: number;
    shareValue: number;
    currency: string;
  };
}

export interface CompanyTypeStepProps {
  formData: CompanyRegistrationData;
  onUpdate: (data: Partial<CompanyRegistrationData>) => void;
  onNext: () => void;
  canGoNext: boolean;
}

export const CompanyTypeStep = ({ formData, onUpdate, onNext, canGoNext }: CompanyTypeStepProps) => {
  const companyTypes = [
    {
      id: 'limited',
      title: 'Private Limited Company',
      description: 'Most common structure for small businesses. Limited liability protection.',
      icon: Building2,
      recommended: true
    },
    {
      id: 'cic',
      title: 'Community Interest Company (CIC)',
      description: 'For social enterprises that want to use profits for public good.',
      icon: Users,
      recommended: false
    },
    {
      id: 'partnership',
      title: 'Limited Liability Partnership',
      description: 'For professional services where partners want limited liability.',
      icon: Handshake,
      recommended: false
    }
  ];

  const handleTypeChange = (value: string) => {
    onUpdate({ companyType: value as 'limited' | 'cic' | 'partnership' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Choose Your Company Structure</h3>
        <p className="text-sm text-muted-foreground">
          This determines your legal obligations, tax treatment, and liability protection.
        </p>
      </div>

      <RadioGroup value={formData.companyType} onValueChange={handleTypeChange}>
        <div className="space-y-4">
          {companyTypes.map((type) => {
            const Icon = type.icon;
            return (
              <div key={type.id} className="relative">
                <RadioGroupItem
                  value={type.id}
                  id={type.id}
                  className="peer sr-only"
                />
                <Label
                  htmlFor={type.id}
                  className="flex items-start space-x-4 p-4 border-2 rounded-lg cursor-pointer hover:bg-accent peer-checked:border-primary peer-checked:bg-primary/5"
                >
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium">{type.title}</h4>
                      {type.recommended && (
                        <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                          Recommended
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {type.description}
                    </p>
                  </div>
                </Label>
              </div>
            );
          })}
        </div>
      </RadioGroup>

      <div className="flex justify-end pt-6 border-t">
        <Button onClick={onNext} disabled={!canGoNext || !formData.companyType}>
          Next: Company Details
        </Button>
      </div>
    </div>
  );
};
