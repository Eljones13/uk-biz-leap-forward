
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { X, ArrowLeft, ArrowRight, Building2 } from "lucide-react";
import { CompanyTypeStep } from "@/components/wizard/CompanyTypeStep";
import { CompanyDetailsStep } from "@/components/wizard/CompanyDetailsStep";
import { DirectorsStep } from "@/components/wizard/DirectorsStep";
import { AddressStep } from "@/components/wizard/AddressStep";
import { ReviewStep } from "@/components/wizard/ReviewStep";

interface CompanyRegistrationWizardProps {
  onClose: () => void;
}

export const CompanyRegistrationWizard = ({ onClose }: CompanyRegistrationWizardProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    companyType: "",
    companyName: "",
    sicCodes: [] as string[],
    directors: [] as any[],
    shareholders: [] as any[],
    registeredOffice: {
      line1: "",
      line2: "",
      city: "",
      county: "",
      postcode: "",
      country: "England"
    },
    shareCapital: {
      totalShares: 100,
      shareValue: 1,
      currency: "GBP"
    }
  });

  const steps = [
    { title: "Company Type", description: "Choose your business structure" },
    { title: "Company Details", description: "Name and business activities" },
    { title: "Directors & Shareholders", description: "Add company officers" },
    { title: "Registered Office", description: "Official company address" },
    { title: "Review & Submit", description: "Confirm details and submit" }
  ];

  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (stepData: any) => {
    setFormData(prev => ({ ...prev, ...stepData }));
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <CompanyTypeStep 
            data={formData} 
            onUpdate={updateFormData}
            onNext={handleNext}
          />
        );
      case 1:
        return (
          <CompanyDetailsStep 
            data={formData} 
            onUpdate={updateFormData}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <DirectorsStep 
            data={formData} 
            onUpdate={updateFormData}
            onNext={handleNext}
          />
        );
      case 3:
        return (
          <AddressStep 
            data={formData} 
            onUpdate={updateFormData}
            onNext={handleNext}
          />
        );
      case 4:
        return (
          <ReviewStep 
            data={formData} 
            onSubmit={() => {
              console.log("Submitting registration:", formData);
              // Here we'll integrate with Companies House API
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-3">
              <Building2 className="h-6 w-6 text-primary" />
              <div>
                <CardTitle>Company Registration</CardTitle>
                <CardDescription>
                  Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
                </CardDescription>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between text-sm text-muted-foreground">
                {steps.map((step, index) => (
                  <div 
                    key={index} 
                    className={`flex-1 text-center ${index === currentStep ? 'text-primary font-medium' : ''}`}
                  >
                    {step.title}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{steps[currentStep].title}</CardTitle>
            <CardDescription>{steps[currentStep].description}</CardDescription>
          </CardHeader>
          <CardContent>
            {renderCurrentStep()}
            
            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button 
                variant="outline" 
                onClick={handlePrevious}
                disabled={currentStep === 0}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              
              {currentStep < steps.length - 1 && (
                <Button onClick={handleNext}>
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
