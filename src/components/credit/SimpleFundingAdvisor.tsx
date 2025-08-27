
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, AlertTriangle, Brain, Target } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

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
  const { user } = useAuth();
  const [profile, setProfile] = useState<BusinessProfile>({
    companyAgeMonths: 0,
    hasBankAccount: false,
    hasCleanStatements: false,
    monthlyRevenue: 0
  });
  const [session, setSession] = useState<AdvisorSession | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      loadSession();
    }
  }, [user]);

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
    } else if (score >= 50) {
      recommendations.push("Consider waiting 1-2 more months to strengthen your profile");
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
    
    const score = calculateReadinessScore(profile);
    const recommendations = generateRecommendations(profile, score);
    const checklist = generateChecklist(profile);
    
    const newSession: AdvisorSession = {
      readinessScore: score,
      recommendations,
      checklist
    };
    
    setSession(newSession);
    
    // Save session to database
    if (user) {
      try {
        const { error } = await supabase
          .from('ai_advisor_sessions')
          .upsert({
            user_id: user.id,
            session_data: profile,
            readiness_score: score,
            recommendations: recommendations,
            updated_at: new Date().toISOString()
          });
          
        if (error) {
          console.error('Error saving session:', error);
        }
      } catch (error) {
        console.error('Error saving session:', error);
      }
    }
    
    setLoading(false);
  };

  const loadSession = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('ai_advisor_sessions')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })
        .limit(1)
        .maybeSingle();
        
      if (error) {
        console.error('Error loading session:', error);
        return;
      }
      
      if (data) {
        setProfile(data.session_data as BusinessProfile);
        setSession({
          readinessScore: data.readiness_score || 0,
          recommendations: data.recommendations || [],
          checklist: generateChecklist(data.session_data as BusinessProfile)
        });
      }
    } catch (error) {
      console.error('Error loading session:', error);
    }
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
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Company Age (months)</label>
              <input
                type="number"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                value={profile.companyAgeMonths}
                onChange={(e) => setProfile({ ...profile, companyAgeMonths: parseInt(e.target.value) || 0 })}
                placeholder="e.g., 6"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Monthly Revenue (£)</label>
              <input
                type="number"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                value={profile.monthlyRevenue}
                onChange={(e) => setProfile({ ...profile, monthlyRevenue: parseInt(e.target.value) || 0 })}
                placeholder="e.g., 5000"
              />
            </div>
          </div>
          
          <div className="space-y-3">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={profile.hasBankAccount}
                onChange={(e) => setProfile({ ...profile, hasBankAccount: e.target.checked })}
                className="rounded border-gray-300"
              />
              <span className="text-sm">I have a business bank account open</span>
            </label>
            
            <label className="flex items-center space-x-2">
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
