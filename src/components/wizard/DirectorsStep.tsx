
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

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

export interface DirectorsStepProps {
  formData: CompanyRegistrationData;
  onUpdate: (data: Partial<CompanyRegistrationData>) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  isLastStep?: boolean;
  isLoading?: boolean;
  onSubmit?: () => void;
  onSaveProgress?: () => Promise<void>;
}

export const DirectorsStep = ({ 
  formData, 
  onUpdate, 
  onNext, 
  onPrevious, 
  canGoNext, 
  canGoPrevious 
}: DirectorsStepProps) => {
  const addDirector = () => {
    const newDirector = {
      id: crypto.randomUUID(),
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      nationality: 'British',
      occupation: '',
      address: {
        addressLine1: '',
        addressLine2: '',
        city: '',
        county: '',
        postcode: '',
        country: 'United Kingdom'
      }
    };
    onUpdate({ directors: [...formData.directors, newDirector] });
  };

  const updateDirector = (id: string, field: string, value: string) => {
    const updatedDirectors = formData.directors.map(director => {
      if (director.id === id) {
        if (field.startsWith('address.')) {
          const addressField = field.replace('address.', '');
          return {
            ...director,
            address: { ...director.address, [addressField]: value }
          };
        }
        return { ...director, [field]: value };
      }
      return director;
    });
    onUpdate({ directors: updatedDirectors });
  };

  const removeDirector = (id: string) => {
    onUpdate({ directors: formData.directors.filter(d => d.id !== id) });
  };

  const isValid = formData.directors.length > 0 && 
    formData.directors.every(d => d.firstName && d.lastName && d.dateOfBirth && d.occupation);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Directors & Officers</h3>
        <p className="text-sm text-muted-foreground">
          Add the people who will manage your company. At least one director is required.
        </p>
      </div>

      <div className="space-y-4">
        {formData.directors.map((director, index) => (
          <Card key={director.id}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-base">Director {index + 1}</CardTitle>
                {formData.directors.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeDirector(director.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>First Name *</Label>
                  <Input
                    value={director.firstName}
                    onChange={(e) => updateDirector(director.id, 'firstName', e.target.value)}
                    placeholder="Enter first name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Last Name *</Label>
                  <Input
                    value={director.lastName}
                    onChange={(e) => updateDirector(director.id, 'lastName', e.target.value)}
                    placeholder="Enter last name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Date of Birth *</Label>
                  <Input
                    type="date"
                    value={director.dateOfBirth}
                    onChange={(e) => updateDirector(director.id, 'dateOfBirth', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Nationality</Label>
                  <Input
                    value={director.nationality}
                    onChange={(e) => updateDirector(director.id, 'nationality', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Occupation *</Label>
                  <Input
                    value={director.occupation}
                    onChange={(e) => updateDirector(director.id, 'occupation', e.target.value)}
                    placeholder="e.g., Company Director"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        <Button onClick={addDirector} variant="outline" className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Add Director
        </Button>
      </div>

      <div className="flex justify-between pt-6 border-t">
        <Button onClick={onPrevious} variant="outline" disabled={!canGoPrevious}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        <Button onClick={onNext} disabled={!canGoNext || !isValid}>
          Next: Review & Submit
        </Button>
      </div>
    </div>
  );
};
