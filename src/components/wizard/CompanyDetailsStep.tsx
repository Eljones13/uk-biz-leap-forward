
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";

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

export interface CompanyDetailsStepProps {
  formData: CompanyRegistrationData;
  onUpdate: (data: Partial<CompanyRegistrationData>) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

export const CompanyDetailsStep = ({ 
  formData, 
  onUpdate, 
  onNext, 
  onPrevious, 
  canGoNext, 
  canGoPrevious 
}: CompanyDetailsStepProps) => {
  const [sicInput, setSicInput] = useState('');

  const handleCompanyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ companyName: e.target.value });
  };

  const addSicCode = () => {
    if (sicInput.trim() && !formData.sicCodes.includes(sicInput.trim())) {
      onUpdate({ sicCodes: [...formData.sicCodes, sicInput.trim()] });
      setSicInput('');
    }
  };

  const removeSicCode = (code: string) => {
    onUpdate({ sicCodes: formData.sicCodes.filter(c => c !== code) });
  };

  const isValid = formData.companyName.length >= 3 && formData.sicCodes.length > 0;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Company Details</h3>
        <p className="text-sm text-muted-foreground">
          Provide basic information about your company.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="companyName">Company Name *</Label>
          <Input
            id="companyName"
            value={formData.companyName}
            onChange={handleCompanyNameChange}
            placeholder="Enter your company name"
          />
          <p className="text-xs text-muted-foreground">
            Must be unique and end with "Limited" or "Ltd"
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="sicCodes">Standard Industrial Classification (SIC) Codes *</Label>
          <div className="flex space-x-2">
            <Input
              id="sicCodes"
              value={sicInput}
              onChange={(e) => setSicInput(e.target.value)}
              placeholder="e.g., 62012 - Business and domestic software development"
              onKeyPress={(e) => e.key === 'Enter' && addSicCode()}
            />
            <Button type="button" onClick={addSicCode} variant="outline">
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.sicCodes.map((code) => (
              <Badge key={code} variant="secondary" className="cursor-pointer" onClick={() => removeSicCode(code)}>
                {code} ✕
              </Badge>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            Describe what your company will do. You can add multiple activities.
          </p>
        </div>
      </div>

      <div className="flex justify-between pt-6 border-t">
        <Button onClick={onPrevious} variant="outline" disabled={!canGoPrevious}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        <Button onClick={onNext} disabled={!canGoNext || !isValid}>
          Next: Registered Address
        </Button>
      </div>
    </div>
  );
};
