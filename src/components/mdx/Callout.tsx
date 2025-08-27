
import { AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface CalloutProps {
  type: "info" | "success" | "warning" | "error";
  children: React.ReactNode;
}

const iconMap = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertCircle,
};

const colorMap = {
  info: "border-blue-200 bg-blue-50 text-blue-900",
  success: "border-green-200 bg-green-50 text-green-900",
  warning: "border-yellow-200 bg-yellow-50 text-yellow-900",
  error: "border-red-200 bg-red-50 text-red-900",
};

export const Callout = ({ type, children }: CalloutProps) => {
  const Icon = iconMap[type];
  
  return (
    <div className={cn("border-l-4 p-4 my-4 rounded-r-lg", colorMap[type])}>
      <div className="flex items-start gap-3">
        <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
        <div className="prose prose-sm max-w-none">{children}</div>
      </div>
    </div>
  );
};
