
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, FileText } from "lucide-react";

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

export interface ReviewStepProps {
  formData: CompanyRegistrationData;
  onSubmit: () => void;
  onPrevious: () => void;
  isLoading: boolean;
  canGoPrevious: boolean;
  onUpdate?: (data: Partial<CompanyRegistrationData>) => void;
  onNext?: () => void;
  canGoNext?: boolean;
  isLastStep?: boolean;
  onSaveProgress?: () => Promise<void>;
}

export const ReviewStep = ({ 
  formData, 
  onSubmit, 
  onPrevious, 
  isLoading, 
  canGoPrevious 
}: ReviewStepProps) => {
  const companyTypeDisplay = {
    limited: 'Private Limited Company',
    cic: 'Community Interest Company (CIC)',
    partnership: 'Limited Liability Partnership'
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Review & Submit</h3>
        <p className="text-sm text-muted-foreground">
          Please review all information before submitting your company registration.
        </p>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Company Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Company Name</p>
                <p>{formData.companyName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Company Type</p>
                <p>{companyTypeDisplay[formData.companyType]}</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">SIC Codes</p>
              <div className="flex flex-wrap gap-1">
                {formData.sicCodes.map((code) => (
                  <Badge key={code} variant="secondary">{code}</Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Registered Office</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <p>{formData.registeredOffice.addressLine1}</p>
              {formData.registeredOffice.addressLine2 && (
                <p>{formData.registeredOffice.addressLine2}</p>
              )}
              <p>{formData.registeredOffice.city}</p>
              {formData.registeredOffice.county && (
                <p>{formData.registeredOffice.county}</p>
              )}
              <p>{formData.registeredOffice.postcode}</p>
              <p>{formData.registeredOffice.country}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Directors ({formData.directors.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {formData.directors.map((director, index) => (
                <div key={director.id} className="p-3 border rounded-lg">
                  <p className="font-medium">
                    {director.firstName} {director.lastName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {director.occupation} • {director.nationality}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="p-4 bg-muted/50 rounded-lg">
          <div className="flex items-start space-x-3">
            <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-sm font-medium">Next Steps</p>
              <p className="text-sm text-muted-foreground">
                After submission, you'll receive a confirmation reference. Processing typically takes 8-10 working days.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-6 border-t">
        <Button onClick={onPrevious} variant="outline" disabled={!canGoPrevious}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        <Button onClick={onSubmit} disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit Registration"}
        </Button>
      </div>
    </div>
  );
};
