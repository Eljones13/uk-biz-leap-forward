
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  CreditCard, 
  Banknote, 
  TrendingUp,
  Clock,
  CheckCircle,
  Download,
  ExternalLink
} from "lucide-react";

const fundingTypes = [
  {
    id: "starter-card",
    name: "Business Credit Card",
    minRequirements: "3 months trading, £1k+ monthly revenue",
    typicalLimit: "£500 - £5,000",
    timeframe: "7-14 days",
    bestFor: "Building credit history, managing cash flow",
    documents: [
      "3 months business bank statements",
      "Companies House certificate",
      "Director's ID and proof of address",
      "VAT registration (if applicable)"
    ],
    providers: ["Capital on Tap", "Barclaycard", "American Express", "Starling Bank"],
    tips: [
      "Apply when you have 3+ months of consistent income",
      "Start with secured cards if unsure about approval",
      "Keep utilization under 30% for best credit building"
    ]
  },
  {
    id: "business-loan",
    name: "Small Business Loan",
    minRequirements: "6 months trading, £5k+ monthly revenue",
    typicalLimit: "£1,000 - £50,000",
    timeframe: "1-4 weeks",
    bestFor: "Equipment, working capital, expansion",
    documents: [
      "12 months business bank statements",
      "Business plan with financial projections",
      "Management accounts",
      "Personal and business credit reports",
      "Asset details (if secured)"
    ],
    providers: ["Start Up Loans", "Funding Circle", "Iwoca", "Metro Bank"],
    tips: [
      "Prepare detailed business plan showing loan purpose",
      "Wait 6 months between credit applications",
      "Consider asset-based lending for better rates"
    ]
  },
  {
    id: "overdraft",
    name: "Business Overdraft",
    minRequirements: "Established banking relationship",
    typicalLimit: "£500 - £10,000",
    timeframe: "Same day - 1 week",
    bestFor: "Short-term cash flow management",
    documents: [
      "6 months business bank statements",
      "Recent management accounts",
      "Business forecast/budget",
      "Security documents (if required)"
    ],
    providers: ["Your existing bank", "Tide", "Starling", "HSBC"],
    tips: [
      "Apply with your existing bank first",
      "Use sparingly to avoid high interest costs",
      "Set up only when needed, not 'just in case'"
    ]
  }
];

const applicationScripts = {
  phone: `
"Hello, I'd like to enquire about business credit options for my limited company.

About my business:
- Company: [Your Company Name]
- Incorporated: [Date]
- Industry: [Your Industry]
- Monthly revenue: [Amount]
- Looking for: [Credit card/loan/overdraft]

I have all required documents ready including bank statements, company registration, and financial projections. What's the best next step?"
  `,
  email: `
Subject: Business Credit Application - [Your Company Name]

Dear [Lender Name],

I am writing to enquire about [specific product] for my limited company, [Company Name], incorporated on [date].

Business Overview:
• Industry: [Your sector]
• Monthly revenue: [Amount]
• Time trading: [Months/years]
• Purpose: [How you'll use the credit]

I have prepared all supporting documents including:
✓ Bank statements (last 6-12 months)
✓ Financial projections
✓ Company registration documents
✓ Management accounts

I would appreciate the opportunity to discuss our application. I'm available for a call at your convenience.

Best regards,
[Your name]
[Title]
[Contact details]
  `
};

export const FundingApplicationGuide = () => {
  return (
    <div className="space-y-8">
      {/* Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Funding Application Strategy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">3-6</div>
              <p className="text-sm text-muted-foreground">Months between applications</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">85%</div>
              <p className="text-sm text-muted-foreground">Success rate with proper timing</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">7-30</div>
              <p className="text-sm text-muted-foreground">Days typical processing</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Funding Types */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Choose Your Funding Type</h2>
        
        {fundingTypes.map((funding) => (
          <Card key={funding.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">{funding.name}</CardTitle>
                <Badge variant="outline">{funding.timeframe}</Badge>
              </div>
              <p className="text-muted-foreground">{funding.bestFor}</p>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold mb-3">Requirements & Limits</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Minimum requirements:</span>
                      <span className="text-right">{funding.minRequirements}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Typical credit limit:</span>
                      <span className="text-right font-medium">{funding.typicalLimit}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Top Providers</h4>
                  <div className="flex flex-wrap gap-2">
                    {funding.providers.map((provider, idx) => (
                      <Badge key={idx} variant="secondary">{provider}</Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Required Documents</h4>
                <div className="grid gap-2 md:grid-cols-2">
                  {funding.documents.map((doc, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">{doc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Expert Tips</h4>
                <ul className="space-y-2">
                  {funding.tips.map((tip, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-sm">
                      <TrendingUp className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button className="w-full">
                Start {funding.name} Application
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Application Scripts */}
      <Card>
        <CardHeader>
          <CardTitle>Application Scripts & Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="phone">
            <TabsList>
              <TabsTrigger value="phone">Phone Script</TabsTrigger>
              <TabsTrigger value="email">Email Template</TabsTrigger>
              <TabsTrigger value="documents">Document Checklist</TabsTrigger>
            </TabsList>
            
            <TabsContent value="phone" className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <pre className="whitespace-pre-wrap text-sm">{applicationScripts.phone}</pre>
              </div>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download Phone Script
              </Button>
            </TabsContent>
            
            <TabsContent value="email" className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <pre className="whitespace-pre-wrap text-sm">{applicationScripts.email}</pre>
              </div>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download Email Template
              </Button>
            </TabsContent>
            
            <TabsContent value="documents" className="space-y-4">
              <div className="space-y-4">
                <h4 className="font-semibold">Universal Document Checklist</h4>
                {[
                  "Companies House Certificate of Incorporation",
                  "Business bank statements (last 6-12 months)",
                  "Management accounts or bookkeeping records",
                  "Business plan with financial projections",
                  "Director's passport or driving license",
                  "Proof of business address",
                  "VAT registration certificate (if applicable)",
                  "Business insurance certificate"
                ].map((doc, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">{doc}</span>
                  </div>
                ))}
              </div>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download Complete Checklist
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
