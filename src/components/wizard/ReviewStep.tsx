
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Building2, Users, MapPin, FileText, CheckCircle, CreditCard } from "lucide-react";

interface ReviewStepProps {
  data: any;
  onSubmit: () => void;
}

export const ReviewStep = ({ data, onSubmit }: ReviewStepProps) => {
  const getCompanyTypeDisplay = (type: string) => {
    switch (type) {
      case "limited":
        return "Private Limited Company (Ltd)";
      case "cic":
        return "Community Interest Company (CIC)";
      case "partnership":
        return "Limited Liability Partnership (LLP)";
      default:
        return type;
    }
  };

  const totalFees = 12; // Companies House fee for online incorporation

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Review Your Company Details</h3>
        <p className="text-muted-foreground">
          Please review all information carefully before submitting your incorporation application to Companies House.
        </p>
      </div>

      {/* Company Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Company Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Company Type</Label>
              <p className="font-medium">{getCompanyTypeDisplay(data.companyType)}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Company Name</Label>
              <p className="font-medium">{data.companyName}</p>
            </div>
          </div>
          
          <div>
            <Label className="text-sm font-medium text-muted-foreground">Business Activities</Label>
            <div className="flex flex-wrap gap-2 mt-1">
              {data.sicCodes?.map((code: string) => (
                <Badge key={code} variant="secondary" className="text-xs">
                  {code}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Directors & Shareholders */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Directors & Shareholders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.directors?.map((director: any, index: number) => (
              <div key={director.id} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">
                    {director.firstName} {director.lastName}
                  </div>
                  {director.isSignificantControl && (
                    <Badge variant="secondary">Significant Control</Badge>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                  <div>Occupation: {director.occupation}</div>
                  <div>Nationality: {director.nationality}</div>
                  <div className="md:col-span-2">
                    Address: {director.address.line1}, {director.address.city}, {director.address.postcode}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Registered Office */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Registered Office Address
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-3 border rounded-lg">
            <p className="font-medium">{data.registeredOffice?.line1}</p>
            {data.registeredOffice?.line2 && <p>{data.registeredOffice.line2}</p>}
            <p>{data.registeredOffice?.city}, {data.registeredOffice?.county}</p>
            <p>{data.registeredOffice?.postcode}</p>
            <p>{data.registeredOffice?.country}</p>
          </div>
        </CardContent>
      </Card>

      {/* Fees Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Fees Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Companies House incorporation fee</span>
              <span>£{totalFees}</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>BusinessBuilder Pro service</span>
              <span>Free</span>
            </div>
            <Separator />
            <div className="flex justify-between font-medium text-lg">
              <span>Total</span>
              <span>£{totalFees}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            What Happens Next
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">1</div>
              <div>
                <p className="font-medium">Application Submitted</p>
                <p className="text-sm text-muted-foreground">Your application will be submitted to Companies House immediately</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-muted text-muted-foreground text-xs flex items-center justify-center font-medium">2</div>
              <div>
                <p className="font-medium">Processing (24 hours)</p>
                <p className="text-sm text-muted-foreground">Companies House will review and process your application</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-muted text-muted-foreground text-xs flex items-center justify-center font-medium">3</div>
              <div>
                <p className="font-medium">Company Formed</p>
                <p className="text-sm text-muted-foreground">You'll receive your Certificate of Incorporation and company number</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex justify-center pt-6">
        <Button onClick={onSubmit} size="lg" className="px-8">
          <CheckCircle className="mr-2 h-4 w-4" />
          Submit Application (£{totalFees})
        </Button>
      </div>

      {/* Legal Notice */}
      <div className="text-xs text-muted-foreground text-center max-w-2xl mx-auto">
        By submitting this application, you confirm that all information provided is accurate and complete. 
        You understand that providing false information is a criminal offence. Your company will be subject to UK law and Companies House regulations.
      </div>
    </div>
  );
};

const Label = ({ className, children, ...props }: any) => (
  <div className={className} {...props}>{children}</div>
);
