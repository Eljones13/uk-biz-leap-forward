
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, CheckCircle, Clock, AlertTriangle, Trophy, 
  TrendingUp, Users, FileText, Calendar, Zap, Target
} from "lucide-react";
import { SuccessCelebration } from "./SuccessCelebration";
import { PriorityTaskCard } from "./PriorityTaskCard";
import { ProgressMilestones } from "./ProgressMilestones";

interface EnhancedDashboardProps {
  userPersona: string;
  customizations: any;
}

export const EnhancedDashboard = ({ userPersona, customizations }: EnhancedDashboardProps) => {
  const [showCelebration, setShowCelebration] = useState(false);
  const [completedMilestones, setCompletedMilestones] = useState<string[]>([]);

  // Mock data - will be replaced with real data
  const overallProgress = 35;
  const completionStreak = 3;
  
  const priorityTasks = [
    {
      id: 1,
      title: "Complete company name verification",
      description: "Verify your chosen name is available with Companies House",
      priority: "high",
      estimatedTime: "5 minutes",
      completionValue: "£12 saved in resubmission fees",
      category: "legal",
      deadline: "Today"
    },
    {
      id: 2,
      title: "Add director information",
      description: "Complete details for all company directors",
      priority: "medium",
      estimatedTime: "10 minutes",
      completionValue: "Move 25% closer to incorporation",
      category: "legal",
      deadline: "Tomorrow"
    },
    {
      id: 3,
      title: "Set up business bank account preparation",
      description: "Gather documents needed for business banking",
      priority: userPersona === "priya" ? "high" : "low",
      estimatedTime: "15 minutes",
      completionValue: "Fast-track banking once incorporated",
      category: "financial",
      deadline: "This week"
    }
  ];

  const milestones = [
    { id: 1, title: "Business Structure Chosen", progress: 100, status: "completed" },
    { id: 2, title: "Company Details", progress: 75, status: "in-progress" },
    { id: 3, title: "Legal Documentation", progress: 20, status: "pending" },
    { id: 4, title: "Financial Setup", progress: 0, status: "pending" },
    { id: 5, title: "Compliance Ready", progress: 0, status: "pending" }
  ];

  const achievements = [
    { name: "First Steps", icon: Trophy, earned: true },
    { name: "Detail Oriented", icon: Target, earned: true },
    { name: "Speed Demon", icon: Zap, earned: false }
  ];

  useEffect(() => {
    // Check for new completions and trigger celebrations
    if (overallProgress > 30 && !showCelebration) {
      setTimeout(() => setShowCelebration(true), 1000);
    }
  }, [overallProgress]);

  const getPersonaMessage = () => {
    switch (userPersona) {
      case "sarah":
        return "Great progress! You're doing everything right. Each step gets you closer to your business goals.";
      case "marcus":
        return "You're efficiently moving through the setup. Your experience shows in your progress.";
      case "priya":
        return "Excellent progress on your incorporation. Investors love to see well-structured businesses.";
      default:
        return "You're making great progress on your business formation journey.";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary/5 to-blue-50 border-b">
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Welcome back! 👋
              </h1>
              <p className="text-muted-foreground">{getPersonaMessage()}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">{overallProgress}%</div>
              <div className="text-sm text-muted-foreground">Complete</div>
            </div>
          </div>

          {/* Progress Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{overallProgress}%</div>
                    <div className="text-sm text-muted-foreground">Overall Progress</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{completionStreak}</div>
                    <div className="text-sm text-muted-foreground">Day Streak</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">7-10</div>
                    <div className="text-sm text-muted-foreground">Days to Complete</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Trophy className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{achievements.filter(a => a.earned).length}</div>
                    <div className="text-sm text-muted-foreground">Achievements</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Overall Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Company Formation Progress</span>
              <span className="text-muted-foreground">{overallProgress}% complete</span>
            </div>
            <Progress value={overallProgress} className="h-3" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Priority Tasks */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Your Priority Tasks</h2>
              <Badge variant="secondary">
                {priorityTasks.filter(t => t.priority === "high").length} urgent
              </Badge>
            </div>
            
            {priorityTasks.map((task) => (
              <PriorityTaskCard key={task.id} task={task} userPersona={userPersona} />
            ))}
          </div>

          {/* Progress Milestones */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Progress Milestones</h2>
            <ProgressMilestones milestones={milestones} />
          </div>
        </div>

        {/* Achievements Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Achievements & Motivation
            </CardTitle>
            <CardDescription>
              Celebrating your entrepreneurial journey milestones
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${
                      achievement.earned
                        ? "bg-primary/5 border-primary/20"
                        : "bg-muted/50 border-muted"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        achievement.earned ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-medium">{achievement.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {achievement.earned ? "Earned!" : "In Progress"}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Success Celebration Modal */}
      {showCelebration && (
        <SuccessCelebration
          onClose={() => setShowCelebration(false)}
          achievement="Reached 35% completion"
          message="You're making excellent progress! Keep up the momentum."
        />
      )}
    </div>
  );
};
