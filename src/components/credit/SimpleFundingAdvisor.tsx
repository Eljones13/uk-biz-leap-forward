
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, AlertTriangle, Brain, Target } from "lucide-react";

interface BusinessProfile {
  companyAgeMonths: number;
  hasBankAccount: boolean;
  hasCleanStatements: boolean;
  monthlyRevenue: number;
}

interface AdvisorSession {
  readinessScore: number;
  recommendations: string[];
  checklist: Array<{ task: string; completed: boolean; timing: string }>;
}

export const SimpleFundingAdvisor = () => {
  const [profile, setProfile] = useState<BusinessProfile>({
    companyAgeMonths: 0,
    hasBankAccount: false,
    hasCleanStatements: false,
    monthlyRevenue: 0
  });
  const [session, setSession] = useState<AdvisorSession | null>(null);
  const [loading, setLoading] = useState(false);

  const calculateReadinessScore = (profile: BusinessProfile): number => {
    let score = 0;
    
    // Company age scoring (0-40 points)
    if (profile.companyAgeMonths >= 6) score += 40;
    else if (profile.companyAgeMonths >= 3) score += 25;
    else if (profile.companyAgeMonths >= 1) score += 10;
    
    // Bank account (0-30 points)
    if (profile.hasBankAccount) score += 30;
    
    // Clean statements (0-20 points)
    if (profile.hasCleanStatements) score += 20;
    
    // Revenue (0-10 points)
    if (profile.monthlyRevenue >= 2000) score += 10;
    else if (profile.monthlyRevenue >= 1000) score += 5;
    
    return Math.min(score, 100);
  };

  const generateRecommendations = (profile: BusinessProfile, score: number): string[] => {
    const recommendations = [];
    
    if (!profile.hasBankAccount) {
      recommendations.push("Open a business bank account immediately - this is your foundation for credit building");
    }
    
    if (profile.companyAgeMonths < 3) {
      recommendations.push("Wait until you have 3+ months of trading history before applying for credit");
    }
    
    if (!profile.hasCleanStatements) {
      recommendations.push("Maintain clean bank statements with regular income for 3+ months");
    }
    
    if (profile.monthlyRevenue < 1000) {
      recommendations.push("Focus on increasing monthly revenue above £1,000 for better approval odds");
    }
    
    if (score >= 70) {
      recommendations.push("You're ready to start applying for business credit cards");
      recommendations.push("Consider applying to Starling Bank or Tide for your first business credit card");
    } else if (score >= 50) {
      recommendations.push("Consider waiting 1-2 more months to strengthen your profile");
    } else {
      recommendations.push("Focus on building your business foundations first before applying for credit");
    }
    
    return recommendations;
  };

  const generateChecklist = (profile: BusinessProfile) => [
    {
      task: "Open business bank account",
      completed: profile.hasBankAccount,
      timing: "Immediate - Foundation step"
    },
    {
      task: "Maintain clean statements (3+ months)",
      completed: profile.hasCleanStatements && profile.companyAgeMonths >= 3,
      timing: "3-6 months after bank opening"
    },
    {
      task: "Apply for business credit card",
      completed: false,
      timing: "After 3+ months of clean banking"
    },
    {
      task: "Build credit history (6+ months)",
      completed: false,
      timing: "6+ months of responsible usage"
    },
    {
      task: "Apply for business loan/line of credit",
      completed: false,
      timing: "12+ months with established credit"
    }
  ];

  const analyzeProfile = async () => {
    setLoading(true);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const score = calculateReadinessScore(profile);
    const recommendations = generateRecommendations(profile, score);
    const checklist = generateChecklist(profile);
    
    const newSession: AdvisorSession = {
      readinessScore: score,
      recommendations,
      checklist
    };
    
    setSession(newSession);
    setLoading(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-green-600";
    if (score >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreMessage = (score: number) => {
    if (score >= 70) return "Ready for credit applications";
    if (score >= 50) return "Nearly ready - improve a few areas";
    return "Focus on building foundations first";
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="h-5 w-5 mr-2" />
            Simple Funding Readiness Check
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Get instant feedback on your business credit readiness with our rule-based assessment
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Company Age (months)</label>
              <input
                type="number"
                className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={profile.companyAgeMonths}
                onChange={(e) => setProfile({ ...profile, companyAgeMonths: parseInt(e.target.value) || 0 })}
                placeholder="e.g., 6"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Monthly Revenue (£)</label>
              <input
                type="number"
                className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={profile.monthlyRevenue}
                onChange={(e) => setProfile({ ...profile, monthlyRevenue: parseInt(e.target.value) || 0 })}
                placeholder="e.g., 5000"
              />
            </div>
          </div>
          
          <div className="space-y-3">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={profile.hasBankAccount}
                onChange={(e) => setProfile({ ...profile, hasBankAccount: e.target.checked })}
                className="rounded border-gray-300"
              />
              <span className="text-sm">I have a business bank account open</span>
            </label>
            
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={profile.hasCleanStatements}
                onChange={(e) => setProfile({ ...profile, hasCleanStatements: e.target.checked })}
                className="rounded border-gray-300"
              />
              <span className="text-sm">I have clean bank statements (no overdrafts, regular income)</span>
            </label>
          </div>
          
          <Button onClick={analyzeProfile} disabled={loading} className="w-full">
            {loading ? "Analyzing..." : "Analyze My Readiness"}
          </Button>
        </CardContent>
      </Card>

      {session && (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Funding Readiness Score</span>
                <Badge variant={session.readinessScore >= 70 ? "default" : "secondary"}>
                  {session.readinessScore}/100
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Overall Readiness</span>
                  <span className={`text-sm font-medium ${getScoreColor(session.readinessScore)}`}>
                    {getScoreMessage(session.readinessScore)}
                  </span>
                </div>
                <Progress value={session.readinessScore} className="h-2" />
              </div>
              
              {session.recommendations.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Target className="h-4 w-4 mr-2" />
                    Recommendations
                  </h4>
                  <ul className="space-y-2">
                    {session.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Credit Building Checklist</CardTitle>
              <p className="text-sm text-muted-foreground">
                Follow this step-by-step roadmap to build business credit in the UK
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {session.checklist.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 border rounded-lg">
                    <div className={`p-1 rounded-full ${item.completed ? 'bg-green-100' : 'bg-gray-100'}`}>
                      {item.completed ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <Clock className="h-4 w-4 text-gray-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{item.task}</h4>
                      <p className="text-sm text-muted-foreground">{item.timing}</p>
                    </div>
                    <Badge variant={item.completed ? "default" : "outline"}>
                      {item.completed ? "Complete" : "Pending"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};
