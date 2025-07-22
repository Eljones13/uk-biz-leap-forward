
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BankAccountComparison } from "@/components/banking/BankAccountComparison";
import { BankApplicationForm } from "@/components/banking/BankApplicationForm";
import { FinancialManagementTools } from "@/components/banking/FinancialManagementTools";
import { 
  Building2, 
  CreditCard, 
  PiggyBank, 
  TrendingUp, 
  Shield, 
  Clock,
  CheckCircle,
  ArrowRight
} from "lucide-react";

const BankingPage = () => {
  const [selectedBank, setSelectedBank] = useState<string>("");
  const [showApplication, setShowApplication] = useState(false);

  const bankingMilestones = [
    {
      id: 1,
      title: "Choose Business Bank Account",
      description: "Compare and select the best account for your business needs",
      completed: false,
      current: true,
      icon: Building2
    },
    {
      id: 2,
      title: "Submit Application",
      description: "Complete the online application with required documents",
      completed: false,
      current: false,
      icon: CreditCard
    },
    {
      id: 3,
      title: "Set Up Financial Management",
      description: "Create savings pots and organize direct debits",
      completed: false,
      current: false,
      icon: PiggyBank
    },
    {
      id: 4,
      title: "Configure Automation",
      description: "Set up automatic transfers and bill payments",
      completed: false,
      current: false,
      icon: TrendingUp
    }
  ];

  const features = [
    {
      icon: Shield,
      title: "FSCS Protected",
      description: "All recommended banks are FSCS protected up to £85,000"
    },
    {
      icon: Clock,
      title: "Quick Setup",
      description: "Most applications can be completed in under 15 minutes"
    },
    {
      icon: CheckCircle,
      title: "Expert Guidance",
      description: "Get personalized recommendations based on your business type"
    }
  ];

  if (showApplication) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <Button 
              variant="ghost" 
              onClick={() => setShowApplication(false)}
              className="mb-4"
            >
              ← Back to Banking Setup
            </Button>
          </div>
          <BankApplicationForm selectedBank={selectedBank} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Business Banking Setup</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Set up your business bank account with the UK's leading providers and organize your finances for success
          </p>
        </div>

        {/* Progress Milestones */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building2 className="h-5 w-5 mr-2" />
              Banking Setup Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {bankingMilestones.map((milestone, index) => {
                const Icon = milestone.icon;
                return (
                  <div key={milestone.id} className="flex items-center space-x-4">
                    <div className={`p-2 rounded-full ${
                      milestone.completed ? 'bg-green-100 text-green-600' :
                      milestone.current ? 'bg-primary/10 text-primary' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {milestone.completed ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <Icon className="h-5 w-5" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{milestone.title}</h3>
                      <p className="text-sm text-muted-foreground">{milestone.description}</p>
                    </div>
                    {milestone.current && (
                      <Badge>Current Step</Badge>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Key Features */}
        <div className="grid gap-6 md:grid-cols-3 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold">{feature.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="comparison" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="comparison">Compare Accounts</TabsTrigger>
            <TabsTrigger value="application">Application Process</TabsTrigger>
            <TabsTrigger value="management">Financial Management</TabsTrigger>
          </TabsList>

          <TabsContent value="comparison" className="space-y-8">
            <BankAccountComparison />
            
            <div className="text-center">
              <Button 
                size="lg" 
                onClick={() => setShowApplication(true)}
                className="group"
              >
                Continue to Application
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="application" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Application Process Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="font-semibold mb-3">Required Documents</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>Certificate of Incorporation</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>Memorandum & Articles of Association</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>Director ID (Passport/Driving License)</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>Proof of Address (Utility Bill)</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3">Application Timeline</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-blue-600" />
                        <span>Application: 5-15 minutes</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-blue-600" />
                        <span>Review: 1-3 business days</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-blue-600" />
                        <span>Account opening: 3-5 business days</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-blue-600" />
                        <span>Debit card delivery: 5-7 business days</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <Button 
                  size="lg" 
                  onClick={() => setShowApplication(true)}
                  className="w-full group"
                >
                  Start Application Now
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="management" className="space-y-8">
            <FinancialManagementTools />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BankingPage;
