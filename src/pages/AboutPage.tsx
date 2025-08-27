
import { SEO } from "@/components/seo/SEO";
import { SITE } from "@/config/site";
import { Building2, Mail, MapPin, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AboutPage = () => {
  return (
    <>
      <SEO 
        title="About Us"
        description="Who we are and how to reach us."
        url="/about"
      />
      
      <div className="min-h-screen bg-background">
        <div className="container mx-auto max-w-4xl py-16 px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">About {SITE.name}</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We help UK founders go from idea to trading: guided Companies House filing, 
              auto-generated legal docs, and a clear path to banking and business credit.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Company Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <strong>Legal name:</strong> {SITE.legalName}
                </div>
                <div>
                  <strong>Company number:</strong> {SITE.companyNumber} ({SITE.jurisdiction})
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                  <div>
                    <strong>Registered office:</strong><br />
                    {SITE.registeredOffice}
                  </div>
                </div>
                {SITE.icoNumber && (
                  <div>
                    <strong>ICO registration:</strong> {SITE.icoNumber}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Get in Touch
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <strong>Support:</strong><br />
                  <a href={`mailto:${SITE.supportEmail}`} className="text-primary hover:underline">
                    {SITE.supportEmail}
                  </a>
                </div>
                <div className="text-sm text-muted-foreground">
                  For partnerships, support queries, or general inquiries.
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Our Approach
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">1</div>
                  <h3 className="font-semibold mb-2">Clarity</h3>
                  <p className="text-sm text-muted-foreground">Plain-English guidance</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">2</div>
                  <h3 className="font-semibold mb-2">Compliance-first</h3>
                  <p className="text-sm text-muted-foreground">Filings, registers, and reminders</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">3</div>
                  <h3 className="font-semibold mb-2">Growth path</h3>
                  <p className="text-sm text-muted-foreground">Banking setup and credit readiness</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground">
              If you'd like to partner with us, please reach out at{" "}
              <a href={`mailto:${SITE.supportEmail}`} className="text-primary hover:underline">
                {SITE.supportEmail}
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
