import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Brain, TrendingUp, Target, AlertCircle, CheckCircle } from "lucide-react";

const AIBusinessAdvisor = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [businessData, setBusinessData] = useState({
    industry: "",
    monthlyRevenue: "",
    businessAge: "",
    employees: "",
    goals: "",
    challenges: ""
  });
  const [recommendations, setRecommendations] = useState<any>(null);

  const analyzeBusinessProfile = async () => {
    if (!user) return;
    setLoading(true);

    try {
      // Generate AI recommendations based on business data
      const aiResponse = {
        creditReadiness: calculateCreditReadiness(),
        fundingRecommendations: generateFundingRecommendations(),
        nextSteps: generateNextSteps(),
        riskFactors: identifyRiskFactors(),
        opportunities: identifyOpportunities()
      };

      // Save to database
      await supabase.from("ai_advisor_sessions").insert({
        user_id: user.id,
        session_type: "business_analysis",
        input_data: businessData,
        ai_response: aiResponse,
        recommendations: aiResponse.nextSteps,
        status: "completed"
      });

      setRecommendations(aiResponse);
      toast({
        title: "Analysis Complete",
        description: "Your personalized business recommendations are ready!",
      });
    } catch (error: any) {
      toast({
        title: "Analysis Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateCreditReadiness = () => {
    const revenue = parseInt(businessData.monthlyRevenue) || 0;
    const age = parseInt(businessData.businessAge) || 0;
    
    let score = 0;
    if (revenue > 5000) score += 30;
    else if (revenue > 2000) score += 20;
    else if (revenue > 1000) score += 10;
    
    if (age >= 12) score += 40;
    else if (age >= 6) score += 25;
    else if (age >= 3) score += 15;
    
    score += Math.min(30, Object.values(businessData).filter(v => v).length * 5);
    
    return Math.min(100, score);
  };

  const generateFundingRecommendations = () => {
    const revenue = parseInt(businessData.monthlyRevenue) || 0;
    const age = parseInt(businessData.businessAge) || 0;

    if (revenue < 1000 || age < 3) {
      return [
        { type: "Business Credit Card", amount: "£1,000-£5,000", likelihood: "High", timing: "Now" },
        { type: "Startup Loan", amount: "£500-£25,000", likelihood: "Medium", timing: "3-6 months" }
      ];
    } else if (revenue < 5000) {
      return [
        { type: "Business Credit Card", amount: "£5,000-£15,000", likelihood: "High", timing: "Now" },
        { type: "Asset Finance", amount: "£10,000-£50,000", likelihood: "Medium", timing: "Now" },
        { type: "Term Loan", amount: "£10,000-£100,000", likelihood: "Medium", timing: "6-12 months" }
      ];
    } else {
      return [
        { type: "Business Credit Card", amount: "£10,000-£50,000", likelihood: "High", timing: "Now" },
        { type: "Invoice Finance", amount: "Up to 90% of invoices", likelihood: "High", timing: "Now" },
        { type: "Term Loan", amount: "£25,000-£500,000", likelihood: "High", timing: "Now" }
      ];
    }
  };

  const generateNextSteps = () => [
    "Set up business bank account with proper financial segregation",
    "Register with Experian, Equifax, and Creditsafe business credit bureaus",
    "Establish trade credit lines with 2-3 suppliers",
    "Apply for starter business credit card",
    "Maintain 6 months of clean banking history before major applications"
  ];

  const identifyRiskFactors = () => [
    "Limited business trading history",
    "Insufficient cash flow documentation",
    "Personal credit may impact business applications"
  ];

  const identifyOpportunities = () => [
    "Strong industry growth potential",
    "Government funding schemes available",
    "Partnership opportunities for growth"
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Brain className="h-12 w-12 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">AI Business Advisor</h2>
        <p className="text-muted-foreground">
          Get personalized funding recommendations and business growth strategies
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Business Profile</CardTitle>
            <CardDescription>Tell us about your business for personalized advice</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Industry</Label>
                <Input 
                  value={businessData.industry}
                  onChange={(e) => setBusinessData(prev => ({...prev, industry: e.target.value}))}
                  placeholder="e.g., Technology, Retail"
                />
              </div>
              <div className="space-y-2">
                <Label>Monthly Revenue (£)</Label>
                <Input 
                  type="number"
                  value={businessData.monthlyRevenue}
                  onChange={(e) => setBusinessData(prev => ({...prev, monthlyRevenue: e.target.value}))}
                  placeholder="0"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Business Age (months)</Label>
                <Input 
                  type="number"
                  value={businessData.businessAge}
                  onChange={(e) => setBusinessData(prev => ({...prev, businessAge: e.target.value}))}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label>Number of Employees</Label>
                <Input 
                  type="number"
                  value={businessData.employees}
                  onChange={(e) => setBusinessData(prev => ({...prev, employees: e.target.value}))}
                  placeholder="0"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Business Goals</Label>
              <Textarea 
                value={businessData.goals}
                onChange={(e) => setBusinessData(prev => ({...prev, goals: e.target.value}))}
                placeholder="What are your main business objectives?"
              />
            </div>

            <div className="space-y-2">
              <Label>Current Challenges</Label>
              <Textarea 
                value={businessData.challenges}
                onChange={(e) => setBusinessData(prev => ({...prev, challenges: e.target.value}))}
                placeholder="What obstacles are you facing?"
              />
            </div>

            <Button onClick={analyzeBusinessProfile} disabled={loading} className="w-full">
              {loading ? "Analyzing..." : "Get AI Recommendations"}
            </Button>
          </CardContent>
        </Card>

        {recommendations && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Credit Readiness Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {recommendations.creditReadiness}%
                  </div>
                  <Badge variant={recommendations.creditReadiness > 70 ? "default" : "secondary"}>
                    {recommendations.creditReadiness > 70 ? "Ready" : "Building"}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recommended Funding Options</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recommendations.fundingRecommendations.map((option: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{option.type}</p>
                        <p className="text-sm text-muted-foreground">{option.amount}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={option.likelihood === "High" ? "default" : "secondary"}>
                          {option.likelihood}
                        </Badge>
                        <p className="text-sm text-muted-foreground mt-1">{option.timing}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  Next Steps
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {recommendations.nextSteps.map((step: string, index: number) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                      <p className="text-sm">{step}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIBusinessAdvisor;