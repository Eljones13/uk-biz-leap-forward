
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { 
  Shield, Calendar, AlertTriangle, CheckCircle, 
  Clock, TrendingUp, FileText, Bell
} from "lucide-react";

const CompliancePage = () => {
  const navigate = useNavigate();

  const upcomingDeadlines = [
    {
      id: 1,
      title: "Annual Confirmation Statement",
      description: "Submit your annual confirmation to Companies House",
      dueDate: "2024-02-15",
      daysUntil: 25,
      priority: "high" as const,
      status: "pending" as const
    },
    {
      id: 2,
      title: "Corporation Tax Return",
      description: "File your corporation tax return with HMRC",
      dueDate: "2024-03-01",
      daysUntil: 39,
      priority: "medium" as const,
      status: "pending" as const
    },
    {
      id: 3,
      title: "VAT Return Q4 2023",
      description: "Submit quarterly VAT return",
      dueDate: "2024-01-31",
      daysUntil: 9,
      priority: "high" as const,
      status: "overdue" as const
    }
  ];

  const complianceChecks = [
    {
      category: "Company Registration",
      items: [
        { name: "Articles of Association filed", completed: true },
        { name: "Directors registered", completed: true },
        { name: "Share capital confirmed", completed: true },
        { name: "Registered address verified", completed: false }
      ]
    },
    {
      category: "Tax Registration", 
      items: [
        { name: "Corporation Tax registered", completed: true },
        { name: "PAYE setup (if required)", completed: false },
        { name: "VAT registration", completed: true },
        { name: "Tax advisor appointed", completed: false }
      ]
    },
    {
      category: "Ongoing Compliance",
      items: [
        { name: "Statutory books maintained", completed: true },
        { name: "Annual return system setup", completed: false },
        { name: "Insurance policies active", completed: false },
        { name: "Data protection compliance", completed: false }
      ]
    }
  ];

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High Priority</Badge>;
      case "medium":
        return <Badge className="bg-yellow-500">Medium Priority</Badge>;
      case "low":
        return <Badge variant="secondary">Low Priority</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500"><CheckCircle className="h-3 w-3 mr-1" />Complete</Badge>;
      case "pending":
        return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case "overdue":
        return <Badge variant="destructive"><AlertTriangle className="h-3 w-3 mr-1" />Overdue</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const calculateCategoryProgress = (items: any[]) => {
    const completed = items.filter(item => item.completed).length;
    return (completed / items.length) * 100;
  };

  const overallProgress = complianceChecks.reduce((acc, category) => {
    return acc + calculateCategoryProgress(category.items);
  }, 0) / complianceChecks.length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Compliance Dashboard</h1>
              <p className="text-muted-foreground">Stay on top of your legal and regulatory requirements</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => navigate("/dashboard")}>
                Back to Dashboard
              </Button>
              <Button>
                <Bell className="h-4 w-4 mr-2" />
                Set Alerts
              </Button>
            </div>
          </div>

          {/* Overall Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Overall Compliance Progress</span>
              <span className="text-muted-foreground">{Math.round(overallProgress)}% complete</span>
            </div>
            <Progress value={overallProgress} className="h-3" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Shield className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{Math.round(overallProgress)}%</div>
                  <div className="text-sm text-muted-foreground">Compliance Score</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {upcomingDeadlines.filter(d => d.status === "overdue").length}
                  </div>
                  <div className="text-sm text-muted-foreground">Overdue Items</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Clock className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {upcomingDeadlines.filter(d => d.daysUntil <= 30).length}
                  </div>
                  <div className="text-sm text-muted-foreground">Due This Month</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">95%</div>
                  <div className="text-sm text-muted-foreground">On-Time Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Deadlines */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Upcoming Deadlines</span>
              </CardTitle>
              <CardDescription>
                Important filings and submissions coming up
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingDeadlines.map((deadline) => (
                <div key={deadline.id} className="p-4 border rounded-lg space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium">{deadline.title}</h3>
                      <p className="text-sm text-muted-foreground">{deadline.description}</p>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      {getPriorityBadge(deadline.priority)}
                      {getStatusBadge(deadline.status)}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Due: {deadline.dueDate}</span>
                    <span className={`font-medium ${
                      deadline.daysUntil < 0 ? "text-red-600" : 
                      deadline.daysUntil <= 7 ? "text-yellow-600" : "text-green-600"
                    }`}>
                      {deadline.daysUntil < 0 ? 
                        `${Math.abs(deadline.daysUntil)} days overdue` : 
                        `${deadline.daysUntil} days remaining`
                      }
                    </span>
                  </div>
                  <Button size="sm" className="w-full">
                    <FileText className="h-4 w-4 mr-2" />
                    Take Action
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Compliance Checklist */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5" />
                <span>Compliance Checklist</span>
              </CardTitle>
              <CardDescription>
                Track your compliance requirements by category
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {complianceChecks.map((category, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{category.category}</h3>
                    <span className="text-sm text-muted-foreground">
                      {category.items.filter(item => item.completed).length}/{category.items.length} complete
                    </span>
                  </div>
                  <Progress value={calculateCategoryProgress(category.items)} className="h-2" />
                  <div className="space-y-2">
                    {category.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center space-x-2 text-sm">
                        {item.completed ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <div className="h-4 w-4 rounded-full border-2 border-muted" />
                        )}
                        <span className={item.completed ? "text-muted-foreground line-through" : ""}>
                          {item.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CompliancePage;
