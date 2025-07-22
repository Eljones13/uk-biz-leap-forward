
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, CheckCircle, Clock, AlertTriangle, FileText, Users } from "lucide-react";
import { CompanyRegistrationWizard } from "@/components/CompanyRegistrationWizard";

const Dashboard = () => {
  const [showWizard, setShowWizard] = useState(false);
  
  // Mock data - will be replaced with real data from Supabase
  const registrationProgress = 25;
  const currentStep = "Company Details";
  
  const milestones = [
    { id: 1, title: "Company Type Selection", status: "completed", description: "Limited company selected" },
    { id: 2, title: "Company Name & Details", status: "in-progress", description: "Basic information collection" },
    { id: 3, title: "Directors & Shareholders", status: "pending", description: "Add company officers" },
    { id: 4, title: "Registered Office", status: "pending", description: "Set official address" },
    { id: 5, title: "Submit to Companies House", status: "pending", description: "Final registration submission" },
  ];

  const nextActions = [
    { id: 1, title: "Complete company name check", priority: "high", deadline: "Today" },
    { id: 2, title: "Add director information", priority: "medium", deadline: "Tomorrow" },
    { id: 3, title: "Upload identity documents", priority: "low", deadline: "This week" },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "in-progress":
        return <Clock className="h-5 w-5 text-blue-600" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive";
      case "medium":
        return "secondary";
      default:
        return "outline";
    }
  };

  if (showWizard) {
    return <CompanyRegistrationWizard onClose={() => setShowWizard(false)} />;
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">BusinessBuilder Pro</h1>
            <p className="text-muted-foreground">Your UK business formation journey</p>
          </div>
          <Button onClick={() => setShowWizard(true)} className="bg-primary hover:bg-primary/90">
            <Building2 className="mr-2 h-4 w-4" />
            Continue Registration
          </Button>
        </div>

        {/* Progress Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Company Registration Progress
            </CardTitle>
            <CardDescription>
              Currently on: {currentStep}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Overall Progress</span>
                <span>{registrationProgress}% Complete</span>
              </div>
              <Progress value={registrationProgress} className="h-2" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{registrationProgress}%</div>
                <div className="text-sm text-muted-foreground">Registration Complete</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">5</div>
                <div className="text-sm text-muted-foreground">Steps Remaining</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">7-10</div>
                <div className="text-sm text-muted-foreground">Days to Complete</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Milestones */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Registration Milestones
              </CardTitle>
              <CardDescription>
                Track your progress through each required step
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {milestones.map((milestone) => (
                  <div key={milestone.id} className="flex items-center gap-3 p-3 rounded-lg border">
                    {getStatusIcon(milestone.status)}
                    <div className="flex-1">
                      <div className="font-medium">{milestone.title}</div>
                      <div className="text-sm text-muted-foreground">{milestone.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Next Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Next Actions Required
              </CardTitle>
              <CardDescription>
                Priority tasks to keep your registration on track
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {nextActions.map((action) => (
                  <div key={action.id} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex-1">
                      <div className="font-medium">{action.title}</div>
                      <div className="text-sm text-muted-foreground">Due: {action.deadline}</div>
                    </div>
                    <Badge variant={getPriorityColor(action.priority)}>
                      {action.priority}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-2xl font-bold">0</div>
                  <div className="text-sm text-muted-foreground">Companies Registered</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold">3</div>
                  <div className="text-sm text-muted-foreground">Documents Generated</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <div className="text-2xl font-bold">2</div>
                  <div className="text-sm text-muted-foreground">Milestones Completed</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-600" />
                <div>
                  <div className="text-2xl font-bold">1</div>
                  <div className="text-sm text-muted-foreground">Team Members</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
