
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MapPin, Building, Home } from "lucide-react";

interface AddressStepProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
}

export const AddressStep = ({ data, onUpdate, onNext }: AddressStepProps) => {
  const [addressType, setAddressType] = useState<"home" | "office" | "service">("home");
  const [address, setAddress] = useState(data.registeredOffice || {
    line1: "",
    line2: "",
    city: "",
    county: "",
    postcode: "",
    country: "England"
  });

  const handleAddressChange = (field: string, value: string) => {
    const updatedAddress = { ...address, [field]: value };
    setAddress(updatedAddress);
    onUpdate({ registeredOffice: updatedAddress });
  };

  const isAddressComplete = () => {
    return address.line1 && address.city && address.postcode;
  };

  const addressOptions = [
    {
      id: "home",
      title: "Use Home Address",
      description: "Use your personal address as the registered office",
      icon: Home,
      note: "Most cost-effective option. Your address will be publicly visible."
    },
    {
      id: "office",
      title: "Business Premises",
      description: "Use your business location as the registered office",
      icon: Building,
      note: "Good for established businesses with dedicated premises."
    },
    {
      id: "service",
      title: "Registered Office Service",
      description: "Use a professional service address (additional cost)",
      icon: MapPin,
      note: "Keeps your personal address private. £50-100 per year."
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Registered Office Address</h3>
        <p className="text-muted-foreground">
          Every company must have a registered office address in the UK. This address will be publicly available on Companies House records.
        </p>
      </div>

      {/* Address Type Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Choose Address Type</CardTitle>
          <CardDescription>
            Select how you want to handle your registered office address.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={addressType} onValueChange={(value: "home" | "office" | "service") => setAddressType(value)}>
            <div className="space-y-3">
              {addressOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <div key={option.id} className="relative">
                    <RadioGroupItem
                      value={option.id}
                      id={option.id}
                      className="peer sr-only"
                    />
                    <Label htmlFor={option.id} className="cursor-pointer">
                      <div className="flex items-start gap-3 p-4 border rounded-lg peer-checked:border-primary peer-checked:bg-primary/5 hover:border-primary/50 transition-colors">
                        <div className="p-2 rounded-lg bg-primary/10 mt-1">
                          <Icon className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="font-medium">{option.title}</div>
                          <div className="text-sm text-muted-foreground">{option.description}</div>
                          <div className="text-xs text-blue-600">{option.note}</div>
                        </div>
                      </div>
                    </Label>
                  </div>
                );
              })}
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Address Form */}
      {addressType !== "service" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              {addressType === "home" ? "Home Address" : "Business Address"}
            </CardTitle>
            <CardDescription>
              Enter the full UK address that will be used as your registered office.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="line1">Address Line 1 *</Label>
              <Input
                id="line1"
                value={address.line1}
                onChange={(e) => handleAddressChange("line1", e.target.value)}
                placeholder="Building number and street name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="line2">Address Line 2</Label>
              <Input
                id="line2"
                value={address.line2}
                onChange={(e) => handleAddressChange("line2", e.target.value)}
                placeholder="Additional address information (optional)"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City/Town *</Label>
                <Input
                  id="city"
                  value={address.city}
                  onChange={(e) => handleAddressChange("city", e.target.value)}
                  placeholder="e.g., London"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="county">County</Label>
                <Input
                  id="county"
                  value={address.county}
                  onChange={(e) => handleAddressChange("county", e.target.value)}
                  placeholder="e.g., Greater London"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="postcode">Postcode *</Label>
                <Input
                  id="postcode"
                  value={address.postcode}
                  onChange={(e) => handleAddressChange("postcode", e.target.value.toUpperCase())}
                  placeholder="e.g., SW1A 1AA"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country *</Label>
                <Input
                  id="country"
                  value={address.country}
                  onChange={(e) => handleAddressChange("country", e.target.value)}
                  placeholder="England"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Service Address Option */}
      {addressType === "service" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Registered Office Service</CardTitle>
            <CardDescription>
              We'll connect you with a registered office service provider.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">Service Benefits:</h4>
                <ul className="space-y-1 text-sm text-blue-700">
                  <li>• Keep your personal address private</li>
                  <li>• Professional business address</li>
                  <li>• Mail forwarding service included</li>
                  <li>• Compliance notifications handling</li>
                </ul>
              </div>
              
              <div className="p-4 border border-amber-200 bg-amber-50 rounded-lg">
                <h4 className="font-medium text-amber-800 mb-1">Additional Cost</h4>
                <p className="text-sm text-amber-700">
                  Registered office services typically cost £50-100 per year. We'll show you options from trusted providers.
                </p>
              </div>

              <Button variant="outline" className="w-full">
                View Service Providers
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Important Notice */}
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h4 className="font-medium text-yellow-800 mb-2">Important Notice</h4>
        <p className="text-sm text-yellow-700">
          Your registered office address will be publicly available on the Companies House register and can be viewed by anyone. 
          All official correspondence from Companies House and HMRC will be sent to this address.
        </p>
      </div>

      {(addressType === "service" || isAddressComplete()) && (
        <div className="flex justify-center pt-4">
          <Button onClick={onNext} size="lg">
            Continue to Review & Submit
          </Button>
        </div>
      )}
    </div>
  );
};
