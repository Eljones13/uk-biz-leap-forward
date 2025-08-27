
import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const AdviceDisclaimer = () => {
  return (
    <Alert className="my-6">
      <AlertTriangle className="h-4 w-4" />
      <AlertDescription>
        <strong>Disclaimer:</strong> Information on this site is for general guidance only and does not constitute legal, tax, or financial advice.
      </AlertDescription>
    </Alert>
  );
};
