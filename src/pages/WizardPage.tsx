
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  Building2, ArrowRight, ArrowLeft, CheckCircle, 
  FileText, Users, MapPin, CreditCard 
} from "lucide-react";

const WizardPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const steps = [
    {
      id: 1,
      title: "Company Type",
      description: "Choose your business structure",
      icon: Building2,
      status: "completed" as const
    },
    {
      id: 2,
      title: "Company Details",
      description: "Name, address, and basic information",
      icon: FileText,
      status: "current" as const
    },
    {
      id: 3,
      title: "Directors & Shareholders",
      description: "Add company officers",
      icon: Users,
      status: "pending" as const
    },
    {
      id: 4,
      title: "Registered Address",
      description: "Confirm company address",
      icon: MapPin,
      status: "pending" as const
    },
    {
      id: 5,
      title: "Review & Submit",
      description: "Final review and payment",
      icon: CreditCard,
      status: "pending" as const
    }
  ];

  const currentStepData = steps.find(step => step.id === currentStep);
  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

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

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Company Registration Wizard</h1>
              <p className="text-muted-foreground">Step {currentStep} of {steps.length}</p>
            </div>
            <Button variant="outline" onClick={handleBackToDashboard}>
              Back to Dashboard
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Overall Progress</span>
              <span className="text-muted-foreground">{Math.round(progress)}% complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Steps Sidebar */}
          <div className="space-y-4">
            <h2 className="font-semibold text-lg">Registration Steps</h2>
            {steps.map((step) => {
              const Icon = step.icon;
              const isActive = step.id === currentStep;
              const isCompleted = step.status === "completed";
              
              return (
                <div
                  key={step.id}
                  className={`p-4 rounded-lg border ${
                    isActive 
                      ? "border-primary bg-primary/5" 
                      : isCompleted 
                        ? "border-green-200 bg-green-50" 
                        : "border-muted bg-muted/30"
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${
                      isActive 
                        ? "bg-primary text-primary-foreground" 
                        : isCompleted 
                          ? "bg-green-500 text-white" 
                          : "bg-muted"
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <Icon className="h-4 w-4" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium">{step.title}</h3>
                        {isActive && <Badge variant="secondary">Current</Badge>}
                        {isCompleted && <Badge variant="default" className="bg-green-500">Complete</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Current Step Content */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  {currentStepData && <currentStepData.icon className="h-5 w-5" />}
                  <span>{currentStepData?.title}</span>
                </CardTitle>
                <CardDescription>
                  {currentStepData?.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Step Content Placeholder */}
                <div className="min-h-[400px] flex items-center justify-center border-2 border-dashed border-muted rounded-lg">
                  <div className="text-center space-y-4">
                    <div className="text-4xl">🚀</div>
                    <h3 className="text-lg font-medium">Step {currentStep} Implementation</h3>
                    <p className="text-muted-foreground max-w-md">
                      This step will contain the specific form fields and guidance for {currentStepData?.title.toLowerCase()}.
                      Each step will be implemented with proper validation and UK-specific requirements.
                    </p>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-between pt-6 border-t">
                  <Button 
                    variant="outline" 
                    onClick={handlePrevious}
                    disabled={currentStep === 1}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                  
                  <Button 
                    onClick={handleNext}
                    disabled={currentStep === steps.length}
                  >
                    {currentStep === steps.length ? "Submit Application" : "Next Step"}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WizardPage;
