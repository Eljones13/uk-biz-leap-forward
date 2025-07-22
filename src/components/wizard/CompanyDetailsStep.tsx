
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Loader2, Search } from "lucide-react";

interface CompanyDetailsStepProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
}

export const CompanyDetailsStep = ({ data, onUpdate, onNext }: CompanyDetailsStepProps) => {
  const [companyName, setCompanyName] = useState(data.companyName || "");
  const [nameCheckStatus, setNameCheckStatus] = useState<"idle" | "checking" | "available" | "unavailable">("idle");
  const [sicCodes, setSicCodes] = useState<string[]>(data.sicCodes || []);
  const [selectedSicCodes, setSelectedSicCodes] = useState<string[]>(data.sicCodes || []);

  // Mock SIC codes - in real implementation, this would come from Companies House API
  const popularSicCodes = [
    { code: "62020", description: "Information technology consultancy activities" },
    { code: "70220", description: "Business and other management consultancy activities" },
    { code: "82990", description: "Other business support service activities n.e.c." },
    { code: "47910", description: "Retail sale via mail order houses or via Internet" },
    { code: "58290", description: "Other software publishing" },
    { code: "63110", description: "Data processing, hosting and related activities" },
    { code: "73110", description: "Advertising agencies" },
    { code: "74300", description: "Translation and interpretation activities" },
  ];

  const checkCompanyName = async (name: string) => {
    if (name.length < 3) return;
    
    setNameCheckStatus("checking");
    
    // Mock API call - replace with actual Companies House API integration
    setTimeout(() => {
      // Simple mock logic - names with "test" are unavailable
      const isAvailable = !name.toLowerCase().includes("test");
      setNameCheckStatus(isAvailable ? "available" : "unavailable");
    }, 1500);
  };

  useEffect(() => {
    if (companyName) {
      const debounceTimer = setTimeout(() => {
        checkCompanyName(companyName);
      }, 500);
      return () => clearTimeout(debounceTimer);
    } else {
      setNameCheckStatus("idle");
    }
  }, [companyName]);

  const handleNameChange = (value: string) => {
    setCompanyName(value);
    onUpdate({ companyName: value });
  };

  const toggleSicCode = (code: string) => {
    const newCodes = selectedSicCodes.includes(code)
      ? selectedSicCodes.filter(c => c !== code)
      : [...selectedSicCodes, code];
    
    setSelectedSicCodes(newCodes);
    onUpdate({ sicCodes: newCodes });
  };

  const canContinue = companyName && nameCheckStatus === "available" && selectedSicCodes.length > 0;

  const getNameCheckIcon = () => {
    switch (nameCheckStatus) {
      case "checking":
        return <Loader2 className="h-4 w-4 animate-spin text-blue-600" />;
      case "available":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "unavailable":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getNameCheckMessage = () => {
    switch (nameCheckStatus) {
      case "checking":
        return "Checking availability...";
      case "available":
        return "Name is available!";
      case "unavailable":
        return "Name is not available. Try a different variation.";
      default:
        return "Enter a company name to check availability";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Company Details</h3>
        <p className="text-muted-foreground">
          Choose your company name and select the business activities that best describe what your company will do.
        </p>
      </div>

      {/* Company Name */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Company Name</CardTitle>
          <CardDescription>
            Your company name must be unique and cannot be the same as any existing company.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="companyName">Proposed Company Name</Label>
            <div className="relative">
              <Input
                id="companyName"
                value={companyName}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g., Innovative Solutions Ltd"
                className="pr-10"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {getNameCheckIcon()}
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              {getNameCheckIcon()}
              <span className={`${
                nameCheckStatus === "available" ? "text-green-600" :
                nameCheckStatus === "unavailable" ? "text-red-600" :
                "text-muted-foreground"
              }`}>
                {getNameCheckMessage()}
              </span>
            </div>
          </div>
          
          {nameCheckStatus === "unavailable" && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-800">
                <strong>Suggestions:</strong> Try adding words like "Ltd", "Limited", "Solutions", or your location.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* SIC Codes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Business Activities (SIC Codes)</CardTitle>
          <CardDescription>
            Select the activities that best describe your business. You can choose up to 4 activities.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {popularSicCodes.map((sic) => (
              <div key={sic.code} className="relative">
                <Button
                  variant={selectedSicCodes.includes(sic.code) ? "default" : "outline"}
                  className="w-full justify-start text-left h-auto p-4"
                  onClick={() => toggleSicCode(sic.code)}
                  disabled={selectedSicCodes.length >= 4 && !selectedSicCodes.includes(sic.code)}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm">{sic.code}</span>
                      {selectedSicCodes.includes(sic.code) && (
                        <CheckCircle className="h-4 w-4" />
                      )}
                    </div>
                    <div className="text-sm opacity-90">{sic.description}</div>
                  </div>
                </Button>
              </div>
            ))}
          </div>
          
          {selectedSicCodes.length > 0 && (
            <div className="space-y-2">
              <Label>Selected Activities ({selectedSicCodes.length}/4):</Label>
              <div className="flex flex-wrap gap-2">
                {selectedSicCodes.map((code) => {
                  const sic = popularSicCodes.find(s => s.code === code);
                  return (
                    <Badge key={code} variant="secondary" className="text-xs">
                      {code}: {sic?.description}
                    </Badge>
                  );
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {canContinue && (
        <div className="flex justify-center pt-4">
          <Button onClick={onNext} size="lg">
            Continue to Directors & Shareholders
          </Button>
        </div>
      )}
    </div>
  );
};
