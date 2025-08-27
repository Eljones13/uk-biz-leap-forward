
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EnhancedBankAccountComparison } from "@/components/banking/EnhancedBankAccountComparison";
import { RevenueDashboard } from "@/components/banking/RevenueDashboard";
import { SimpleFundingAdvisor } from "@/components/credit/SimpleFundingAdvisor";
import { SecurityEnhancement } from "@/components/security/SecurityEnhancement";
import { AuditLog } from "@/components/security/AuditLog";
import { AffiliateDisclosure } from "@/components/legal/AffiliateDisclosure";
import { AdviceDisclaimer } from "@/components/legal/AdviceDisclaimer";
import { 
  Building2, 
  TrendingUp, 
  Brain, 
  Shield,
  DollarSign,
  MousePointer
} from "lucide-react";

export const EnhancedBankingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Business Banking & Growth Hub</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Compare banking options with affiliate tracking, get AI funding advice, and monitor security
          </p>
          <div className="flex justify-center gap-2 mt-4">
            <Badge variant="secondary">Affiliate Tracking</Badge>
            <Badge variant="secondary">AI Advisor</Badge>
            <Badge variant="secondary">GDPR Ready</Badge>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="banking" className="space-y-8">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="banking" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Banking
            </TabsTrigger>
            <TabsTrigger value="revenue" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Revenue
            </TabsTrigger>
            <TabsTrigger value="advisor" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              AI Advisor
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="audit" className="flex items-center gap-2">
              <MousePointer className="h-4 w-4" />
              Audit
            </TabsTrigger>
          </TabsList>

          <TabsContent value="banking" className="space-y-8">
            <AffiliateDisclosure />
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building2 className="h-5 w-5 mr-2" />
                  Business Banking Comparison (Affiliate Mode)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <EnhancedBankAccountComparison />
              </CardContent>
            </Card>
            <AdviceDisclaimer />
          </TabsContent>

          <TabsContent value="revenue" className="space-y-8">
            <RevenueDashboard />
          </TabsContent>

          <TabsContent value="advisor" className="space-y-8">
            <SimpleFundingAdvisor />
            <AdviceDisclaimer />
          </TabsContent>

          <TabsContent value="security" className="space-y-8">
            <SecurityEnhancement />
          </TabsContent>

          <TabsContent value="audit" className="space-y-8">
            <AuditLog />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EnhancedBankingPage;
