
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, Save, Wifi, WifiOff } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface MobileOptimizedFormProps {
  formData: any;
  onUpdate: (data: any) => void;
  onSave: () => void;
  isOnline?: boolean;
}

export const MobileOptimizedForm = ({ 
  formData, 
  onUpdate, 
  onSave, 
  isOnline = true 
}: MobileOptimizedFormProps) => {
  const isMobile = useIsMobile();
  const [currentSection, setCurrentSection] = useState(0);
  const [localChanges, setLocalChanges] = useState(false);

  const sections = [
    {
      title: "Company Basics",
      fields: ["companyName", "companyType"],
      description: "Essential information about your company"
    },
    {
      title: "Business Details", 
      fields: ["sicCodes", "description"],
      description: "What your business does"
    },
    {
      title: "Contact Info",
      fields: ["email", "phone"],
      description: "How we can reach you"
    }
  ];

  const handleFieldChange = (field: string, value: string) => {
    const updatedData = { ...formData, [field]: value };
    onUpdate(updatedData);
    setLocalChanges(true);
    
    // Auto-save after 2 seconds of inactivity (mobile UX)
    if (isMobile) {
      setTimeout(() => {
        onSave();
        setLocalChanges(false);
      }, 2000);
    }
  };

  const progress = ((currentSection + 1) / sections.length) * 100;
  const currentSectionData = sections[currentSection];

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b z-10">
        <div className="flex items-center justify-between p-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
            disabled={currentSection === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex-1 mx-4">
            <div className="text-center">
              <div className="text-sm font-medium">
                {currentSectionData.title}
              </div>
              <div className="text-xs text-muted-foreground">
                Step {currentSection + 1} of {sections.length}
              </div>
            </div>
            <Progress value={progress} className="h-1 mt-2" />
          </div>

          <div className="flex items-center space-x-2">
            {/* Online/Offline Indicator */}
            <div className={`p-1 rounded-full ${isOnline ? "bg-green-100" : "bg-red-100"}`}>
              {isOnline ? (
                <Wifi className="h-3 w-3 text-green-600" />
              ) : (
                <WifiOff className="h-3 w-3 text-red-600" />
              )}
            </div>
            
            {/* Save Indicator */}
            {localChanges && (
              <Button variant="ghost" size="sm" onClick={onSave}>
                <Save className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-4 space-y-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">{currentSectionData.title}</CardTitle>
            <p className="text-sm text-muted-foreground">
              {currentSectionData.description}
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentSectionData.fields.map((field) => (
              <div key={field} className="space-y-2">
                <Label htmlFor={field} className="text-sm font-medium">
                  {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                </Label>
                <Input
                  id={field}
                  value={formData[field] || ""}
                  onChange={(e) => handleFieldChange(field, e.target.value)}
                  className="text-base" // Better mobile input experience
                  placeholder={`Enter ${field.toLowerCase()}`}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Mobile Navigation */}
        <div className="flex space-x-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
            disabled={currentSection === 0}
          >
            Previous
          </Button>
          
          {currentSection < sections.length - 1 ? (
            <Button
              className="flex-1"
              onClick={() => setCurrentSection(currentSection + 1)}
            >
              Next
            </Button>
          ) : (
            <Button
              className="flex-1"
              onClick={onSave}
            >
              Complete Section
            </Button>
          )}
        </div>

        {/* Offline Notice */}
        {!isOnline && (
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <WifiOff className="h-4 w-4 text-yellow-600" />
              <span className="text-sm text-yellow-800">
                Working offline. Changes will sync when connected.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
