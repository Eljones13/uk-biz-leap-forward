
import { Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { SITE } from "@/config/site";

export const AffiliateDisclosure = () => {
  return (
    <Alert className="my-6">
      <Info className="h-4 w-4" />
      <AlertDescription>
        <strong>Disclosure:</strong> {SITE.affiliateDisclosure}
      </AlertDescription>
    </Alert>
  );
};
