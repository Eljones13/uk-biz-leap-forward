
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { CompanyTypeStep } from "@/components/wizard/CompanyTypeStep";
import { CompanyDetailsStep } from "@/components/wizard/CompanyDetailsStep";
import { AddressStep } from "@/components/wizard/AddressStep";
import { DirectorsStep } from "@/components/wizard/DirectorsStep";
import { ReviewStep } from "@/components/wizard/ReviewStep";
import { X } from "lucide-react";

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

interface CompanyRegistrationWizardProps {
  onClose: () => void;
}

export const CompanyRegistrationWizard = ({ onClose }: CompanyRegistrationWizardProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const [formData, setFormData] = useState<CompanyRegistrationData>({
    companyName: '',
    companyType: '',
    sicCodes: [],
    registeredOffice: {
      addressLine1: '',
      addressLine2: '',
      city: '',
      county: '',
      postcode: '',
      country: 'United Kingdom'
    },
    directors: [],
    shareholders: [],
    shareCapital: {
      totalShares: 100,
      shareValue: 1,
      currency: 'GBP'
    }
  });

  const steps = [
    { title: "Company Type", component: CompanyTypeStep },
    { title: "Company Details", component: CompanyDetailsStep },
    { title: "Registered Address", component: AddressStep },
    { title: "Directors & Shareholders", component: DirectorsStep },
    { title: "Review & Submit", component: ReviewStep }
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleDataUpdate = (stepData: Partial<CompanyRegistrationData>) => {
    setFormData(prev => ({ ...prev, ...stepData }));
  };

  const saveProgress = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('company_registrations')
        .upsert({
          user_id: user.id,
          company_name: formData.companyName,
          company_type: formData.companyType,
          sic_codes: formData.sicCodes,
          registered_office: formData.registeredOffice,
          directors: formData.directors,
          shareholders: formData.shareholders,
          share_capital: formData.shareCapital,
          status: 'draft'
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  const handleSubmit = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      // Generate mock submission reference
      const submissionRef = `CH${Date.now().toString().slice(-8)}`;
      
      const { error } = await supabase
        .from('company_registrations')
        .upsert({
          user_id: user.id,
          company_name: formData.companyName,
          company_type: formData.companyType,
          sic_codes: formData.sicCodes,
          registered_office: formData.registeredOffice,
          directors: formData.directors,
          shareholders: formData.shareholders,
          share_capital: formData.shareCapital,
          status: 'submitted',
          submission_reference: submissionRef
        });

      if (error) throw error;

      toast({
        title: "Registration Submitted",
        description: `Your company registration has been submitted with reference: ${submissionRef}`,
      });

      onClose();
    } catch (error: any) {
      toast({
        title: "Submission Failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const CurrentStepComponent = steps[currentStep - 1].component;
  const progress = (currentStep / steps.length) * 100;

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="absolute right-4 top-4"
            >
              <X className="h-4 w-4" />
            </Button>
            <CardTitle>Company Registration</CardTitle>
            <CardDescription>
              Complete your UK company registration step by step
            </CardDescription>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Step {currentStep} of {steps.length}: {steps[currentStep - 1].title}</span>
                <span>{Math.round(progress)}% complete</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <CurrentStepComponent 
              formData={formData}
              onUpdate={handleDataUpdate}
              onNext={handleNext}
              onPrevious={handlePrevious}
              onSubmit={handleSubmit}
              isLoading={isLoading}
              canGoNext={currentStep < steps.length}
              canGoPrevious={currentStep > 1}
              isLastStep={currentStep === steps.length}
              onSaveProgress={saveProgress}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
