
import { useState, useEffect } from "react";
import { EnhancedDashboard } from "@/components/dashboard/EnhancedDashboard";
import { UserPersonaQuiz } from "@/components/onboarding/UserPersonaQuiz";
import { CompanyRegistrationWizard } from "@/components/CompanyRegistrationWizard";

const Dashboard = () => {
  const [userPersona, setUserPersona] = useState<string | null>(null);
  const [customizations, setCustomizations] = useState<any>(null);
  const [showWizard, setShowWizard] = useState(false);

  // Check if user has completed onboarding
  useEffect(() => {
    const savedPersona = localStorage.getItem("userPersona");
    const savedCustomizations = localStorage.getItem("userCustomizations");
    
    if (savedPersona && savedCustomizations) {
      setUserPersona(savedPersona);
      setCustomizations(JSON.parse(savedCustomizations));
    }
  }, []);

  const handleQuizComplete = (persona: string, customizations: any) => {
    setUserPersona(persona);
    setCustomizations(customizations);
    
    // Save to localStorage for persistence
    localStorage.setItem("userPersona", persona);
    localStorage.setItem("userCustomizations", JSON.stringify(customizations));
  };

  // Show onboarding quiz if user hasn't completed it
  if (!userPersona || !customizations) {
    return <UserPersonaQuiz onComplete={handleQuizComplete} />;
  }

  // Show wizard if requested
  if (showWizard) {
    return <CompanyRegistrationWizard onClose={() => setShowWizard(false)} />;
  }

  // Show main dashboard
  return (
    <EnhancedDashboard 
      userPersona={userPersona} 
      customizations={customizations}
    />
  );
};

export default Dashboard;
