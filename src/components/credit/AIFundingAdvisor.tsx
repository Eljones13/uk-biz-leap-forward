import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  Target,
  Lightbulb
} from "lucide-react";

interface BusinessProfile {
  companyAge: number;
  monthlyRevenue: number;
  industry: string;
  bankAccountHistory: number;
  existingCredit: boolean;
  creditScore: number | null;
}

export const AIFundingAdvisor = () => {
  const [profile, setProfile] = useState<BusinessProfile>({
    companyAge: 6,
    monthlyRevenue: 8500,
    industry: "Technology",
    bankAccountHistory: 6,
    existingCredit: false,
    creditScore: null
  });

  // AI Analysis Logic
  const getApprovalLikelihood = (fundingType: string): number => {
    let score = 50; // Base score

    // Company age factor
    if (profile.companyAge >= 12) score += 20;
    else if (profile.companyAge >= 6) score += 10;
    else if (profile.companyAge >= 3) score += 5;

    // Revenue factor
    if (profile.monthlyRevenue >= 10000) score += 20;
    else if (profile.monthlyRevenue >= 5000) score += 15;
    else if (profile.monthlyRevenue >= 2000) score += 10;

    // Banking history
    if (profile.bankAccountHistory >= 6) score += 15;
    else if (profile.bankAccountHistory >= 3) score += 10;

    // Industry factor (Tech generally favorable)
    if (profile.industry === "Technology") score += 5;

    // Existing credit
    if (profile.existingCredit) score += 10;

    // Funding type adjustments
    if (fundingType === "credit-card" && profile.companyAge < 3) score -= 15;
    if (fundingType === "loan" && profile.companyAge < 6) score -= 20;

    return Math.min(Math.max(score, 10), 95);
  };

  const getRecommendations = () => {
    const recommendations = [];

    if (profile.companyAge < 3) {
      recommendations.push({
        type: "timing",
        message: "Wait until you have 3+ months trading before applying for credit cards",
        priority: "high"
      });
    }

    if (profile.monthlyRevenue < 2000) {
      recommendations.push({
        type: "revenue",
        message: "Focus on increasing monthly revenue above £2,000 for better approval odds",
        priority: "medium"
      });
    }

    if (profile.bankAccountHistory < 3) {
      recommendations.push({
        type: "banking",
        message: "Establish 3+ months of clean banking history before applying",
        priority: "high"
      });
    }

    if (!profile.existingCredit && profile.companyAge >= 3) {
      recommendations.push({
        type: "credit",
        message: "Start with a business credit card to build your credit history",
        priority: "medium"
      });
    }

    return recommendations;
  };

  const fundingOptions = [
    {
      name: "Business Credit Card",
      type: "credit-card",
      optimalTiming: profile.companyAge >= 3 ? "Apply now" : `Wait ${3 - profile.companyAge} more months`,
      approvalLikelihood: getApprovalLikelihood("credit-card"),
      recommendedLimit: profile.monthlyRevenue * 0.5,
      nextSteps: ["Gather 3 months bank statements", "Compare credit card providers", "Submit application"]
    },
    {
      name: "Business Loan",
      type: "loan", 
      optimalTiming: profile.companyAge >= 6 ? "Apply now" : `Wait ${6 - profile.companyAge} more months`,
      approvalLikelihood: getApprovalLikelihood("loan"),
      recommendedLimit: profile.monthlyRevenue * 3,
      nextSteps: ["Prepare business plan", "Gather financial statements", "Research loan providers"]
    },
    {
      name: "Business Overdraft",
      type: "overdraft",
      optimalTiming: profile.bankAccountHistory >= 3 ? "Apply now" : "Build banking relationship first",
      approvalLikelihood: getApprovalLikelihood("overdraft"),
      recommendedLimit: profile.monthlyRevenue * 1,
      nextSteps: ["Contact your bank", "Provide financial forecasts", "Set up facility"]
    }
  ];

  const recommendations = getRecommendations();

  return (
    <div className="space-y-8">
      {/* Business Profile */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="h-5 w-5 mr-2" />
            AI Funding Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="text-sm font-medium">Company Age (months)</label>
              <div className="text-2xl font-bold">{profile.companyAge}</div>
            </div>
            <div>
              <label className="text-sm font-medium">Monthly Revenue</label>
              <div className="text-2xl font-bold">£{profile.monthlyRevenue.toLocaleString()}</div>
            </div>
            <div>
              <label className="text-sm font-medium">Industry</label>
              <div className="text-lg font-semibold">{profile.industry}</div>
            </div>
            <div>
              <label className="text-sm font-medium">Bank History (months)</label>
              <div className="text-2xl font-bold">{profile.bankAccountHistory}</div>
            </div>
          </div>
          
          <Button variant="outline" size="sm">
            Update Business Profile
          </Button>
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      {recommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lightbulb className="h-5 w-5 mr-2" />
              AI Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 border rounded-lg">
                  <div className={`p-2 rounded-lg ${
                    rec.priority === "high" ? "bg-red-100 text-red-600" :
                    rec.priority === "medium" ? "bg-yellow-100 text-yellow-600" :
                    "bg-blue-100 text-blue-600"
                  }`}>
                    <AlertTriangle className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium capitalize">{rec.type} Optimization</p>
                    <p className="text-sm text-muted-foreground mt-1">{rec.message}</p>
                  </div>
                  <Badge variant={rec.priority === "high" ? "destructive" : "secondary"}>
                    {rec.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Funding Options Analysis */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Personalized Funding Strategy</h2>
        
        {fundingOptions.map((option, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{option.name}</CardTitle>
                <Badge variant={option.approvalLikelihood >= 70 ? "default" : option.approvalLikelihood >= 50 ? "secondary" : "outline"}>
                  {option.approvalLikelihood}% approval likelihood
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Approval Likelihood</span>
                  <span className="text-sm">{option.approvalLikelihood}%</span>
                </div>
                <Progress value={option.approvalLikelihood} className="h-2" />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    Optimal Timing
                  </h4>
                  <p className="text-sm text-muted-foreground">{option.optimalTiming}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Target className="h-4 w-4 mr-2" />
                    Recommended Limit
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    £{option.recommendedLimit.toLocaleString()}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Next Steps</h4>
                <div className="space-y-2">
                  {option.nextSteps.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex items-center space-x-2">
                      <div className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-medium">
                        {stepIndex + 1}
                      </div>
                      <span className="text-sm">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button 
                className="w-full" 
                disabled={option.approvalLikelihood < 40}
                variant={option.approvalLikelihood >= 70 ? "default" : "outline"}
              >
                {option.approvalLikelihood >= 70 ? "Start Application" : 
                 option.approvalLikelihood >= 40 ? "Prepare Application" : "Improve Profile First"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
