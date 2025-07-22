
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Building2, Users, Heart } from "lucide-react";

interface CompanyTypeStepProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
}

export const CompanyTypeStep = ({ data, onUpdate, onNext }: CompanyTypeStepProps) => {
  const [selectedType, setSelectedType] = useState(data.companyType || "");

  const companyTypes = [
    {
      id: "limited",
      title: "Private Limited Company (Ltd)",
      description: "Most popular choice for businesses. Limited liability protection with flexible ownership structure.",
      icon: Building2,
      benefits: [
        "Limited liability protection",
        "Flexible ownership structure", 
        "Professional credibility",
        "Easy to raise investment"
      ],
      suitableFor: "Most businesses, startups, and growing companies"
    },
    {
      id: "cic",
      title: "Community Interest Company (CIC)",
      description: "For businesses with social or environmental purposes. Asset lock ensures community benefit.",
      icon: Heart,
      benefits: [
        "Social/environmental focus",
        "Asset lock protection",
        "Community credibility",
        "Access to social funding"
      ],
      suitableFor: "Social enterprises and community-focused businesses"
    },
    {
      id: "partnership",
      title: "Limited Liability Partnership (LLP)",
      description: "Partnership structure with limited liability. Popular with professional services.",
      icon: Users,
      benefits: [
        "Partnership flexibility",
        "Limited liability protection",
        "Tax transparency",
        "Professional structure"
      ],
      suitableFor: "Professional services, consultancies, and partnerships"
    }
  ];

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
    onUpdate({ companyType: type });
  };

  const handleContinue = () => {
    if (selectedType) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Choose Your Business Structure</h3>
        <p className="text-muted-foreground">
          Select the most appropriate legal structure for your business. You can always change this later during the setup process.
        </p>
      </div>

      <RadioGroup value={selectedType} onValueChange={handleTypeSelect}>
        <div className="space-y-4">
          {companyTypes.map((type) => {
            const Icon = type.icon;
            return (
              <div key={type.id} className="relative">
                <RadioGroupItem
                  value={type.id}
                  id={type.id}
                  className="peer sr-only"
                />
                <Label
                  htmlFor={type.id}
                  className="cursor-pointer"
                >
                  <Card className="peer-checked:border-primary peer-checked:ring-2 peer-checked:ring-primary/20 hover:border-primary/50 transition-colors">
                    <CardHeader className="pb-3">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-base">{type.title}</CardTitle>
                          <CardDescription className="mt-1">
                            {type.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-sm mb-2">Key Benefits:</h4>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            {type.benefits.map((benefit, index) => (
                              <li key={index} className="flex items-center gap-1">
                                <div className="w-1 h-1 bg-primary rounded-full" />
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm mb-2">Best For:</h4>
                          <p className="text-sm text-muted-foreground">{type.suitableFor}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Label>
              </div>
            );
          })}
        </div>
      </RadioGroup>

      {selectedType && (
        <div className="flex justify-center pt-4">
          <Button onClick={handleContinue} size="lg">
            Continue with {companyTypes.find(t => t.id === selectedType)?.title}
          </Button>
        </div>
      )}
    </div>
  );
};
