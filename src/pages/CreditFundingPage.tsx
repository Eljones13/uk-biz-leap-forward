
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CreditBuildingRoadmap } from "@/components/credit/CreditBuildingRoadmap";
import { FundingApplicationGuide } from "@/components/credit/FundingApplicationGuide";
import { AIFundingAdvisor } from "@/components/credit/AIFundingAdvisor";
import { LearningResources } from "@/components/credit/LearningResources";
import { 
  TrendingUp, 
  CreditCard, 
  Building2, 
  BookOpen,
  Target,
  Clock,
  CheckCircle,
  Lightbulb
} from "lucide-react";

const CreditFundingPage = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const features = [
    {
      icon: TrendingUp,
      title: "Build Credit from Scratch",
      description: "Step-by-step guide to establish strong business credit with UK bureaus"
    },
    {
      icon: CreditCard,
      title: "Smart Funding Strategy",
      description: "AI-powered timing and application guidance for maximum approval odds"
    },
    {
      icon: Target,
      title: "Personalized Roadmap",
      description: "Tailored advice based on your business type, age, and current credit status"
    },
    {
      icon: BookOpen,
      title: "Expert Resources",
      description: "Curated books, courses, and tools from UK business finance experts"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Business Credit & Funding Mastery</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Build unshakeable business credit and secure funding with our AI-powered, step-by-step roadmap designed specifically for UK entrepreneurs
          </p>
        </div>

        {/* Key Features */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="roadmap" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="roadmap">Credit Roadmap</TabsTrigger>
            <TabsTrigger value="applications">Funding Applications</TabsTrigger>
            <TabsTrigger value="ai-advisor">AI Advisor</TabsTrigger>
            <TabsTrigger value="resources">Learning Hub</TabsTrigger>
          </TabsList>

          <TabsContent value="roadmap" className="space-y-8">
            <CreditBuildingRoadmap currentStep={currentStep} setCurrentStep={setCurrentStep} />
          </TabsContent>

          <TabsContent value="applications" className="space-y-8">
            <FundingApplicationGuide />
          </TabsContent>

          <TabsContent value="ai-advisor" className="space-y-8">
            <AIFundingAdvisor />
          </TabsContent>

          <TabsContent value="resources" className="space-y-8">
            <LearningResources />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CreditFundingPage;
