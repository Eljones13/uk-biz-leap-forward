
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, Circle } from "lucide-react";

interface Milestone {
  id: number;
  title: string;
  progress: number;
  status: "completed" | "in-progress" | "pending";
}

interface ProgressMilestonesProps {
  milestones: Milestone[];
}

export const ProgressMilestones = ({ milestones }: ProgressMilestonesProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "in-progress":
        return <Clock className="h-5 w-5 text-blue-600" />;
      default:
        return <Circle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "border-green-200 bg-green-50";
      case "in-progress":
        return "border-blue-200 bg-blue-50";
      default:
        return "border-gray-200 bg-gray-50";
    }
  };

  return (
    <div className="space-y-3">
      {milestones.map((milestone, index) => (
        <Card key={milestone.id} className={`${getStatusColor(milestone.status)} transition-colors`}>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              {getStatusIcon(milestone.status)}
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-sm">{milestone.title}</h3>
                  <span className="text-xs text-muted-foreground">
                    {milestone.progress}%
                  </span>
                </div>
                <Progress value={milestone.progress} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
