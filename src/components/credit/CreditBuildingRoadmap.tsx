
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Building2, 
  Banknote, 
  FileText, 
  CreditCard, 
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react";

interface CreditStep {
  id: number;
  title: string;
  description: string;
  timeframe: string;
  requirements: string[];
  actions: string[];
  tips: string[];
  icon: any;
  status: "completed" | "current" | "pending";
  category: "foundation" | "credit" | "funding";
}

const creditSteps: CreditStep[] = [
  {
    id: 1,
    title: "Company Registration & Banking",
    description: "Establish your legal business entity and separate business banking",
    timeframe: "Week 1-2",
    requirements: [
      "Choose company name and check availability",
      "Register with Companies House",
      "Obtain Certificate of Incorporation"
    ],
    actions: [
      "Complete Ltd company registration (£12 online)",
      "Open dedicated business bank account",
      "Set up separate business address if working from home",
      "Apply for business insurance"
    ],
    tips: [
      "Use your business address consistently across all applications",
      "Keep business and personal finances completely separate",
      "Choose a bank account with good credit-building features"
    ],
    icon: Building2,
    status: "current",
    category: "foundation"
  },
  {
    id: 2,
    title: "Credit Bureau Registration",
    description: "Register your business with UK credit reference agencies",
    timeframe: "Week 3-4",
    requirements: [
      "Active business bank account for 30+ days",
      "Business address and phone number",
      "Companies House registration number"
    ],
    actions: [
      "Register with Experian Business (free basic profile)",
      "Set up Equifax Business profile",
      "Create Creditsafe business listing",
      "Verify all business details are consistent"
    ],
    tips: [
      "Use the same business name, address, and phone across all bureaus",
      "Monitor your credit reports monthly for accuracy",
      "Dispute any incorrect information immediately"
    ],
    icon: FileText,
    status: "pending",
    category: "foundation"
  },
  {
    id: 3,
    title: "First Trade Credit Line",
    description: "Establish your first business-to-business credit relationship",
    timeframe: "Month 2",
    requirements: [
      "Established business bank account",
      "Business phone and website",
      "3 trade references (can be suppliers you pay)"
    ],
    actions: [
      "Apply for trade credit with office supplies (Staples, Office Depot)",
      "Set up accounts with telecoms provider",
      "Establish utility accounts in business name",
      "Make all payments on time and in full"
    ],
    tips: [
      "Start with small credit limits (£500-£1,000)",
      "Always pay early or on time",
      "Ask suppliers to report payments to credit bureaus"
    ],
    icon: Banknote,
    status: "pending",
    category: "credit"
  },
  {
    id: 4,
    title: "Business Credit Card",
    description: "Apply for your first business credit card to build payment history",
    timeframe: "Month 3-4",
    requirements: [
      "3 months of business bank statements",
      "Established trade credit line",
      "Regular business income/activity"
    ],
    actions: [
      "Research starter business credit cards (Capital on Tap, Barclaycard)",
      "Apply for secured card if necessary",
      "Use for small business expenses only",
      "Pay off balance in full each month"
    ],
    tips: [
      "Keep utilization under 30% of credit limit",
      "Set up automatic payments to avoid late fees",
      "Use the card regularly but responsibly"
    ],
    icon: CreditCard,
    status: "pending",
    category: "credit"
  },
  {
    id: 5,
    title: "Business Loan or Line of Credit",
    description: "Apply for additional credit facilities to strengthen your profile",
    timeframe: "Month 6-9",
    requirements: [
      "6 months of successful credit card payments",
      "Solid business bank account history",
      "Business financial statements"
    ],
    actions: [
      "Apply for small business loan or overdraft",
      "Consider asset-based lending if appropriate",
      "Maintain excellent payment history",
      "Gradually increase credit limits"
    ],
    tips: [
      "Wait 3-6 months between credit applications",
      "Only borrow what you can comfortably repay",
      "Keep detailed financial records"
    ],
    icon: TrendingUp,
    status: "pending",
    category: "funding"
  }
];

interface CreditBuildingRoadmapProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

export const CreditBuildingRoadmap = ({ currentStep, setCurrentStep }: CreditBuildingRoadmapProps) => {
  const completedSteps = creditSteps.filter(step => step.status === "completed").length;
  const progressPercentage = (completedSteps / creditSteps.length) * 100;

  return (
    <div className="space-y-8">
      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Credit Building Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Overall Progress</span>
              <span>{completedSteps} of {creditSteps.length} steps completed</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
            <div className="flex flex-wrap gap-2 mt-4">
              <Badge variant="outline">Foundation: {creditSteps.filter(s => s.category === "foundation").length} steps</Badge>
              <Badge variant="outline">Credit: {creditSteps.filter(s => s.category === "credit").length} steps</Badge>
              <Badge variant="outline">Funding: {creditSteps.filter(s => s.category === "funding").length} steps</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Steps */}
      <div className="space-y-6">
        {creditSteps.map((step, index) => {
          const Icon = step.icon;
          const isActive = step.id === currentStep;
          
          return (
            <Card key={step.id} className={isActive ? "ring-2 ring-primary" : ""}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-lg ${
                      step.status === "completed" ? "bg-green-100 text-green-600" :
                      step.status === "current" ? "bg-primary/10 text-primary" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      {step.status === "completed" ? (
                        <CheckCircle className="h-6 w-6" />
                      ) : (
                        <Icon className="h-6 w-6" />
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-xl">Step {step.id}: {step.title}</CardTitle>
                      <p className="text-muted-foreground mt-1">{step.description}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <Badge variant="secondary">{step.timeframe}</Badge>
                        <Badge variant={
                          step.status === "completed" ? "default" :
                          step.status === "current" ? "destructive" :
                          "outline"
                        }>
                          {step.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-3">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-2 text-orange-500" />
                      Requirements
                    </h4>
                    <ul className="space-y-2 text-sm">
                      {step.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-blue-500" />
                      Actions
                    </h4>
                    <ul className="space-y-2 text-sm">
                      {step.actions.map((action, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 flex items-center">
                      <TrendingUp className="h-4 w-4 mr-2 text-green-500" />
                      Expert Tips
                    </h4>
                    <ul className="space-y-2 text-sm">
                      {step.tips.map((tip, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex justify-between pt-4 border-t">
                  <Button 
                    variant="outline"
                    disabled={step.id === 1}
                    onClick={() => setCurrentStep(step.id - 1)}
                  >
                    Previous Step
                  </Button>
                  
                  <div className="space-x-2">
                    {step.status === "current" && (
                      <Button>
                        Mark as Complete
                      </Button>
                    )}
                    <Button 
                      variant="outline"
                      disabled={step.id === creditSteps.length}
                      onClick={() => setCurrentStep(step.id + 1)}
                    >
                      Next Step
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
