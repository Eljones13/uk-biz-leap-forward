
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowRight, AlertTriangle, CheckCircle, DollarSign } from "lucide-react";

interface Task {
  id: number;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  estimatedTime: string;
  completionValue: string;
  category: string;
  deadline: string;
}

interface PriorityTaskCardProps {
  task: Task;
  userPersona: string;
}

export const PriorityTaskCard = ({ task, userPersona }: PriorityTaskCardProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive";
      case "medium": return "secondary";
      default: return "outline";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high": return AlertTriangle;
      case "medium": return Clock;
      default: return CheckCircle;
    }
  };

  const getPersonaSpecificCTA = () => {
    switch (userPersona) {
      case "sarah":
        return "Let's do this step by step";
      case "marcus":
        return "Complete task";
      case "priya":
        return "Optimize & complete";
      default:
        return "Start task";
    }
  };

  const PriorityIcon = getPriorityIcon(task.priority);

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg ${
                task.priority === "high" ? "bg-red-100" :
                task.priority === "medium" ? "bg-yellow-100" : "bg-green-100"
              }`}>
                <PriorityIcon className={`h-4 w-4 ${
                  task.priority === "high" ? "text-red-600" :
                  task.priority === "medium" ? "text-yellow-600" : "text-green-600"
                }`} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-sm">{task.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
              </div>
            </div>
            <Badge variant={getPriorityColor(task.priority)} className="text-xs">
              {task.priority}
            </Badge>
          </div>

          {/* Task Details */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="flex items-center space-x-2">
              <Clock className="h-3 w-3 text-muted-foreground" />
              <span className="text-muted-foreground">{task.estimatedTime}</span>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className="h-3 w-3 text-green-600" />
              <span className="text-green-600 font-medium">{task.completionValue}</span>
            </div>
          </div>

          {/* Deadline */}
          <div className="text-xs text-muted-foreground">
            Due: {task.deadline}
          </div>

          {/* Action Button */}
          <Button size="sm" className="w-full group">
            {getPersonaSpecificCTA()}
            <ArrowRight className="ml-2 h-3 w-3 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
