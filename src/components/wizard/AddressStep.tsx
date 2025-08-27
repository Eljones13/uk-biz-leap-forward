
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

export interface AddressStepProps {
  formData: CompanyRegistrationData;
  onUpdate: (data: Partial<CompanyRegistrationData>) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

export const AddressStep = ({ 
  formData, 
  onUpdate, 
  onNext, 
  onPrevious, 
  canGoNext, 
  canGoPrevious 
}: AddressStepProps) => {
  const handleAddressChange = (field: string, value: string) => {
    onUpdate({
      registeredOffice: {
        ...formData.registeredOffice,
        [field]: value
      }
    });
  };

  const isValid = 
    formData.registeredOffice.addressLine1.length > 0 &&
    formData.registeredOffice.city.length > 0 &&
    formData.registeredOffice.postcode.length > 0;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Registered Office Address</h3>
        <p className="text-sm text-muted-foreground">
          This is your company's official address for legal correspondence.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="addressLine1">Address Line 1 *</Label>
          <Input
            id="addressLine1"
            value={formData.registeredOffice.addressLine1}
            onChange={(e) => handleAddressChange('addressLine1', e.target.value)}
            placeholder="Enter street address"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="addressLine2">Address Line 2</Label>
          <Input
            id="addressLine2"
            value={formData.registeredOffice.addressLine2 || ''}
            onChange={(e) => handleAddressChange('addressLine2', e.target.value)}
            placeholder="Apartment, suite, etc. (optional)"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">City/Town *</Label>
            <Input
              id="city"
              value={formData.registeredOffice.city}
              onChange={(e) => handleAddressChange('city', e.target.value)}
              placeholder="Enter city"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="county">County</Label>
            <Input
              id="county"
              value={formData.registeredOffice.county || ''}
              onChange={(e) => handleAddressChange('county', e.target.value)}
              placeholder="Enter county"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="postcode">Postcode *</Label>
            <Input
              id="postcode"
              value={formData.registeredOffice.postcode}
              onChange={(e) => handleAddressChange('postcode', e.target.value)}
              placeholder="SW1A 1AA"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              value={formData.registeredOffice.country}
              onChange={(e) => handleAddressChange('country', e.target.value)}
              disabled
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-6 border-t">
        <Button onClick={onPrevious} variant="outline" disabled={!canGoPrevious}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        <Button onClick={onNext} disabled={!canGoNext || !isValid}>
          Next: Directors & Shareholders
        </Button>
      </div>
    </div>
  );
};
