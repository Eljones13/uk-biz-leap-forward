
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

interface ApplicationData {
  // Company Details
  companyName: string;
  companyNumber: string;
  companyAddress: string;
  businessType: string;
  industryType: string;
  
  // Director Details
  directorName: string;
  directorEmail: string;
  directorPhone: string;
  directorAddress: string;
  
  // Business Information
  expectedMonthlyTurnover: string;
  numberOfEmployees: string;
  businessDescription: string;
  
  // Banking Preferences
  selectedBank: string;
  accountType: string;
  initialDeposit: string;
  needsOverdraft: boolean;
  needsCard: boolean;
}

interface BankApplicationFormProps {
  selectedBank?: string;
}

export const BankApplicationForm = ({ selectedBank }: BankApplicationFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ApplicationData>({
    companyName: "",
    companyNumber: "",
    companyAddress: "",
    businessType: "",
    industryType: "",
    directorName: "",
    directorEmail: "",
    directorPhone: "",
    directorAddress: "",
    expectedMonthlyTurnover: "",
    numberOfEmployees: "",
    businessDescription: "",
    selectedBank: selectedBank || "",
    accountType: "",
    initialDeposit: "",
    needsOverdraft: false,
    needsCard: true
  });
  
  const { toast } = useToast();
  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const handleInputChange = (field: keyof ApplicationData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    toast({
      title: "Application Submitted",
      description: "Your business bank account application has been submitted successfully. You'll receive an email confirmation shortly.",
    });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Company Information</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange("companyName", e.target.value)}
                  placeholder="Your Company Ltd"
                />
              </div>
              
              <div>
                <Label htmlFor="companyNumber">Company Registration Number</Label>
                <Input
                  id="companyNumber"
                  value={formData.companyNumber}
                  onChange={(e) => handleInputChange("companyNumber", e.target.value)}
                  placeholder="12345678"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="companyAddress">Registered Address</Label>
              <Textarea
                id="companyAddress"
                value={formData.companyAddress}
                onChange={(e) => handleInputChange("companyAddress", e.target.value)}
                placeholder="123 Business Street, London, SW1A 1AA"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="businessType">Business Type</Label>
                <Select value={formData.businessType} onValueChange={(value) => handleInputChange("businessType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="limited">Private Limited Company</SelectItem>
                    <SelectItem value="partnership">Partnership</SelectItem>
                    <SelectItem value="sole-trader">Sole Trader</SelectItem>
                    <SelectItem value="llp">Limited Liability Partnership</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="industryType">Industry</Label>
                <Select value={formData.industryType} onValueChange={(value) => handleInputChange("industryType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="consulting">Consulting</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Director Information</h3>
            
            <div>
              <Label htmlFor="directorName">Full Name</Label>
              <Input
                id="directorName"
                value={formData.directorName}
                onChange={(e) => handleInputChange("directorName", e.target.value)}
                placeholder="John Smith"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="directorEmail">Email Address</Label>
                <Input
                  id="directorEmail"
                  type="email"
                  value={formData.directorEmail}
                  onChange={(e) => handleInputChange("directorEmail", e.target.value)}
                  placeholder="john@company.com"
                />
              </div>
              
              <div>
                <Label htmlFor="directorPhone">Phone Number</Label>
                <Input
                  id="directorPhone"
                  value={formData.directorPhone}
                  onChange={(e) => handleInputChange("directorPhone", e.target.value)}
                  placeholder="07700 900000"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="directorAddress">Director's Address</Label>
              <Textarea
                id="directorAddress"
                value={formData.directorAddress}
                onChange={(e) => handleInputChange("directorAddress", e.target.value)}
                placeholder="123 Home Street, London, SW1A 1AA"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Business Details</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expectedMonthlyTurnover">Expected Monthly Turnover</Label>
                <Select value={formData.expectedMonthlyTurnover} onValueChange={(value) => handleInputChange("expectedMonthlyTurnover", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-1000">£0 - £1,000</SelectItem>
                    <SelectItem value="1000-5000">£1,000 - £5,000</SelectItem>
                    <SelectItem value="5000-10000">£5,000 - £10,000</SelectItem>
                    <SelectItem value="10000-25000">£10,000 - £25,000</SelectItem>
                    <SelectItem value="25000+">£25,000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="numberOfEmployees">Number of Employees</Label>
                <Select value={formData.numberOfEmployees} onValueChange={(value) => handleInputChange("numberOfEmployees", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select number" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Just me</SelectItem>
                    <SelectItem value="2-5">2-5 employees</SelectItem>
                    <SelectItem value="6-10">6-10 employees</SelectItem>
                    <SelectItem value="11-20">11-20 employees</SelectItem>
                    <SelectItem value="20+">20+ employees</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="businessDescription">Business Description</Label>
              <Textarea
                id="businessDescription"
                value={formData.businessDescription}
                onChange={(e) => handleInputChange("businessDescription", e.target.value)}
                placeholder="Describe what your business does..."
                rows={4}
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Banking Preferences</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="selectedBank">Preferred Bank</Label>
                <Select value={formData.selectedBank} onValueChange={(value) => handleInputChange("selectedBank", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select bank" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="starling">Starling Bank</SelectItem>
                    <SelectItem value="monzo">Monzo Business</SelectItem>
                    <SelectItem value="hsbc">HSBC</SelectItem>
                    <SelectItem value="lloyds">Lloyds Bank</SelectItem>
                    <SelectItem value="tide">Tide</SelectItem>
                    <SelectItem value="revolut">Revolut Business</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="initialDeposit">Initial Deposit Amount</Label>
                <Input
                  id="initialDeposit"
                  value={formData.initialDeposit}
                  onChange={(e) => handleInputChange("initialDeposit", e.target.value)}
                  placeholder="£1000"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="needsOverdraft">Overdraft Facility</Label>
                  <p className="text-sm text-muted-foreground">Do you need an overdraft facility?</p>
                </div>
                <Switch
                  id="needsOverdraft"
                  checked={formData.needsOverdraft}
                  onCheckedChange={(checked) => handleInputChange("needsOverdraft", checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="needsCard">Business Debit Card</Label>
                  <p className="text-sm text-muted-foreground">Do you need a business debit card?</p>
                </div>
                <Switch
                  id="needsCard"
                  checked={formData.needsCard}
                  onCheckedChange={(checked) => handleInputChange("needsCard", checked)}
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Business Bank Account Application</CardTitle>
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Step {currentStep} of {totalSteps}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {renderStep()}

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          
          {currentStep === totalSteps ? (
            <Button onClick={handleSubmit}>
              Submit Application
            </Button>
          ) : (
            <Button onClick={handleNext}>
              Next
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
