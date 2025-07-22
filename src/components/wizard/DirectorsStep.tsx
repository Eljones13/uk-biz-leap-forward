import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, User, UserCheck } from "lucide-react";

interface DirectorsStepProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
}

interface Director {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  nationality: string;
  occupation: string;
  address: {
    line1: string;
    line2: string;
    city: string;
    postcode: string;
    country: string;
  };
  isSignificantControl: boolean;
  sharePercentage: number;
}

export const DirectorsStep = ({ data, onUpdate, onNext }: DirectorsStepProps) => {
  const [directors, setDirectors] = useState<Director[]>(data.directors || []);

  const addDirector = () => {
    const newDirector: Director = {
      id: Date.now().toString(),
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      nationality: "British",
      occupation: "",
      address: {
        line1: "",
        line2: "",
        city: "",
        postcode: "",
        country: "United Kingdom"
      },
      isSignificantControl: directors.length === 0, // First director has significant control by default
      sharePercentage: directors.length === 0 ? 100 : 0
    };
    
    const updatedDirectors = [...directors, newDirector];
    setDirectors(updatedDirectors);
    onUpdate({ directors: updatedDirectors });
  };

  const removeDirector = (id: string) => {
    const updatedDirectors = directors.filter(d => d.id !== id);
    setDirectors(updatedDirectors);
    onUpdate({ directors: updatedDirectors });
  };

  const updateDirector = (id: string, field: string, value: any) => {
    const updatedDirectors = directors.map(director => {
      if (director.id === id) {
        if (field.includes('.')) {
          const [parent, child] = field.split('.');
          if (parent === 'address') {
            return {
              ...director,
              address: {
                ...director.address,
                [child]: value
              }
            };
          }
        }
        return { ...director, [field]: value };
      }
      return director;
    });
    
    setDirectors(updatedDirectors);
    onUpdate({ directors: updatedDirectors });
  };

  const isDirectorComplete = (director: Director) => {
    return director.firstName && 
           director.lastName && 
           director.dateOfBirth && 
           director.occupation &&
           director.address.line1 &&
           director.address.city &&
           director.address.postcode;
  };

  const canContinue = directors.length > 0 && directors.every(isDirectorComplete);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Directors & Shareholders</h3>
        <p className="text-muted-foreground">
          Add the people who will be directors of your company. Every limited company must have at least one director.
        </p>
      </div>

      <div className="space-y-4">
        {directors.map((director, index) => (
          <Card key={director.id} className="relative">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  {isDirectorComplete(director) ? (
                    <UserCheck className="h-4 w-4 text-green-600" />
                  ) : (
                    <User className="h-4 w-4 text-muted-foreground" />
                  )}
                  Director {index + 1}
                  {director.isSignificantControl && (
                    <Badge variant="secondary" className="text-xs">
                      Significant Control
                    </Badge>
                  )}
                </CardTitle>
                {directors.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeDirector(director.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Personal Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`firstName-${director.id}`}>First Name *</Label>
                  <Input
                    id={`firstName-${director.id}`}
                    value={director.firstName}
                    onChange={(e) => updateDirector(director.id, "firstName", e.target.value)}
                    placeholder="John"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`lastName-${director.id}`}>Last Name *</Label>
                  <Input
                    id={`lastName-${director.id}`}
                    value={director.lastName}
                    onChange={(e) => updateDirector(director.id, "lastName", e.target.value)}
                    placeholder="Smith"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`dob-${director.id}`}>Date of Birth *</Label>
                  <Input
                    id={`dob-${director.id}`}
                    type="date"
                    value={director.dateOfBirth}
                    onChange={(e) => updateDirector(director.id, "dateOfBirth", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`nationality-${director.id}`}>Nationality *</Label>
                  <Input
                    id={`nationality-${director.id}`}
                    value={director.nationality}
                    onChange={(e) => updateDirector(director.id, "nationality", e.target.value)}
                    placeholder="British"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`occupation-${director.id}`}>Occupation *</Label>
                  <Input
                    id={`occupation-${director.id}`}
                    value={director.occupation}
                    onChange={(e) => updateDirector(director.id, "occupation", e.target.value)}
                    placeholder="Managing Director"
                  />
                </div>
              </div>

              {/* Address */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Residential Address *</Label>
                <div className="space-y-3">
                  <Input
                    value={director.address.line1}
                    onChange={(e) => updateDirector(director.id, "address.line1", e.target.value)}
                    placeholder="Address line 1"
                  />
                  <Input
                    value={director.address.line2}
                    onChange={(e) => updateDirector(director.id, "address.line2", e.target.value)}
                    placeholder="Address line 2 (optional)"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      value={director.address.city}
                      onChange={(e) => updateDirector(director.id, "address.city", e.target.value)}
                      placeholder="City"
                    />
                    <Input
                      value={director.address.postcode}
                      onChange={(e) => updateDirector(director.id, "address.postcode", e.target.value)}
                      placeholder="Postcode"
                    />
                  </div>
                </div>
              </div>

              {/* Share Information */}
              {director.isSignificantControl && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    <UserCheck className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">Person with Significant Control</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    This person will have {director.sharePercentage}% of shares and significant control over company decisions.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        <Button
          variant="outline"
          onClick={addDirector}
          className="w-full border-dashed"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Another Director
        </Button>
      </div>

      {directors.length > 0 && (
        <div className="p-4 bg-muted/50 rounded-lg">
          <h4 className="font-medium mb-2">Requirements Check:</h4>
          <div className="space-y-1 text-sm">
            <div className="flex items-center gap-2">
              {directors.length > 0 ? (
                <UserCheck className="h-4 w-4 text-green-600" />
              ) : (
                <User className="h-4 w-4 text-muted-foreground" />
              )}
              <span>At least one director: {directors.length > 0 ? "✓" : "Required"}</span>
            </div>
            <div className="flex items-center gap-2">
              {directors.some(d => d.isSignificantControl) ? (
                <UserCheck className="h-4 w-4 text-green-600" />
              ) : (
                <User className="h-4 w-4 text-muted-foreground" />
              )}
              <span>Person with significant control: {directors.some(d => d.isSignificantControl) ? "✓" : "Required"}</span>
            </div>
          </div>
        </div>
      )}

      {canContinue && (
        <div className="flex justify-center pt-4">
          <Button onClick={onNext} size="lg">
            Continue to Registered Office
          </Button>
        </div>
      )}
    </div>
  );
};
