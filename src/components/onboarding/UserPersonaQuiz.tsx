
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { User, Briefcase, TrendingUp, BookOpen, Users, Target } from "lucide-react";

interface UserPersonaQuizProps {
  onComplete: (persona: string, customizations: any) => void;
}

export const UserPersonaQuiz = ({ onComplete }: UserPersonaQuizProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const questions = [
    {
      id: "experience",
      title: "What's your business experience level?",
      description: "This helps us customize your journey",
      options: [
        { value: "first-time", label: "First-time entrepreneur", description: "This is my first business venture", persona: "sarah" },
        { value: "some-experience", label: "Some business experience", description: "I've run or helped run a business before", persona: "marcus" },
        { value: "experienced", label: "Experienced entrepreneur", description: "I've started multiple businesses", persona: "marcus" },
        { value: "investor-ready", label: "Seeking investment", description: "I'm preparing to raise funds", persona: "priya" }
      ]
    },
    {
      id: "business-stage",
      title: "What stage is your business idea?",
      description: "We'll prioritize the right next steps",
      options: [
        { value: "idea", label: "Just an idea", description: "Still developing the concept" },
        { value: "planning", label: "Business plan ready", description: "I have a clear business plan" },
        { value: "mvp", label: "MVP/prototype built", description: "I have a working prototype" },
        { value: "revenue", label: "Already generating revenue", description: "Customers are paying" }
      ]
    },
    {
      id: "priority",
      title: "What's your biggest priority right now?",
      description: "We'll fast-track your most important goals",
      options: [
        { value: "legal-setup", label: "Legal business setup", description: "Company registration and compliance" },
        { value: "funding", label: "Securing funding", description: "Investment or loans" },
        { value: "operations", label: "Business operations", description: "Banking, accounting, processes" },
        { value: "growth", label: "Growth and scaling", description: "Marketing, hiring, expansion" }
      ]
    },
    {
      id: "timeline",
      title: "What's your target timeline?",
      description: "We'll set realistic milestones",
      options: [
        { value: "asap", label: "As soon as possible", description: "I need this done urgently" },
        { value: "month", label: "Within a month", description: "I have some flexibility" },
        { value: "quarter", label: "Next 3 months", description: "I'm planning ahead" },
        { value: "flexible", label: "No rush", description: "I want to do this right" }
      ]
    }
  ];

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Determine persona based on answers
      const persona = determinePersona();
      const customizations = generateCustomizations();
      onComplete(persona, customizations);
    }
  };

  const determinePersona = () => {
    const experience = answers.experience;
    if (experience === "first-time") return "sarah";
    if (experience === "investor-ready") return "priya";
    return "marcus";
  };

  const generateCustomizations = () => {
    return {
      showDetailedHelp: answers.experience === "first-time",
      prioritizeFunding: answers.priority === "funding" || answers.experience === "investor-ready",
      urgentTimeline: answers.timeline === "asap",
      businessStage: answers["business-stage"],
      primaryGoal: answers.priority
    };
  };

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;
  const canProceed = answers[currentQuestion.id];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-2xl w-full space-y-6">
        {/* Progress Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <User className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">Let's personalize your journey</h1>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Question {currentStep + 1} of {questions.length}</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* Question Card */}
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">{currentQuestion.title}</CardTitle>
            <CardDescription>{currentQuestion.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={answers[currentQuestion.id] || ""}
              onValueChange={(value) => handleAnswer(currentQuestion.id, value)}
              className="space-y-3"
            >
              {currentQuestion.options.map((option) => (
                <div key={option.value} className="relative">
                  <RadioGroupItem
                    value={option.value}
                    id={option.value}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={option.value}
                    className="cursor-pointer block"
                  >
                    <div className="p-4 border rounded-lg peer-checked:border-primary peer-checked:bg-primary/5 hover:border-primary/50 transition-colors">
                      <div className="font-medium mb-1">{option.label}</div>
                      <div className="text-sm text-muted-foreground">{option.description}</div>
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
          >
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={!canProceed}
            className="min-w-[120px]"
          >
            {currentStep === questions.length - 1 ? "Get Started" : "Next"}
          </Button>
        </div>

        {/* Trust Signals */}
        <div className="text-center text-sm text-muted-foreground">
          <div className="flex items-center justify-center space-x-4">
            <span>✓ GDPR Compliant</span>
            <span>✓ Bank-level Security</span>
            <span>✓ Companies House Approved</span>
          </div>
        </div>
      </div>
    </div>
  );
};
