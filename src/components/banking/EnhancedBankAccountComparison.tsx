
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star, ExternalLink } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useSecurityMonitoring } from "@/hooks/useSecurityMonitoring";

interface BankAccount {
  id: string;
  name: string;
  bank: string;
  logo: string;
  monthlyFee: string;
  features: string[];
  rating: number;
  applicationTime: string;
  minDeposit: string;
  recommended?: boolean;
  bestFor: string;
  affiliateLink: string;
  commissionRate: string;
}

const bankAccounts: BankAccount[] = [
  {
    id: "starling",
    name: "Business Current Account",
    bank: "Starling Bank",
    logo: "⭐",
    monthlyFee: "£0",
    features: [
      "Real-time notifications",
      "Built-in accounting tools",
      "Receipt capture",
      "Tax pot savings",
      "Invoice creation",
      "24/7 customer support"
    ],
    rating: 4.8,
    applicationTime: "5-10 minutes",
    minDeposit: "£0",
    recommended: true,
    bestFor: "Startups & Small Businesses",
    affiliateLink: "https://mock-affiliate.starlingbank.com/ref=businessbuilder",
    commissionRate: "£50"
  },
  {
    id: "tide",
    name: "Business Account",
    bank: "Tide",
    logo: "🌊",
    monthlyFee: "£0",
    features: [
      "Free business account",
      "Instant notifications",
      "Expense categorization",
      "Receipt capture",
      "VAT calculations",
      "Accounting integrations"
    ],
    rating: 4.5,
    applicationTime: "5 minutes",
    minDeposit: "£0",
    bestFor: "Cost-conscious startups",
    affiliateLink: "https://mock-affiliate.tide.co/ref=businessbuilder",
    commissionRate: "£75"
  },
  {
    id: "monzo",
    name: "Business Account",
    bank: "Monzo Business",
    logo: "🌟",
    monthlyFee: "£5",
    features: [
      "Instant spending notifications",
      "Tax savings pots",
      "Receipt storage",
      "Expense categorization",
      "VAT tracking",
      "Beautiful app interface"
    ],
    rating: 4.6,
    applicationTime: "10-15 minutes",
    minDeposit: "£0",
    bestFor: "Digital-first businesses",
    affiliateLink: "https://mock-affiliate.monzo.com/ref=businessbuilder",
    commissionRate: "£40"
  },
  {
    id: "hsbc",
    name: "Business Bank Account",
    bank: "HSBC",
    logo: "🏦",
    monthlyFee: "£5.50",
    features: [
      "18 months free banking",
      "Business credit card",
      "Overdraft facilities",
      "International payments",
      "Branch network access",
      "Business manager support"
    ],
    rating: 4.2,
    applicationTime: "Branch visit required",
    minDeposit: "£5",
    bestFor: "Traditional businesses & international trade",
    affiliateLink: "https://mock-affiliate.hsbc.co.uk/ref=businessbuilder",
    commissionRate: "£30"
  },
  {
    id: "lloyds",
    name: "Business Current Account",
    bank: "Lloyds Bank",
    logo: "🐎",
    monthlyFee: "£7.50",
    features: [
      "18 months free banking",
      "Business debit card",
      "Online and mobile banking",
      "Telephone banking",
      "Business credit facilities",
      "Local branch support"
    ],
    rating: 4.1,
    applicationTime: "Online or branch",
    minDeposit: "£10",
    bestFor: "Established SMEs",
    affiliateLink: "https://mock-affiliate.lloydsbank.com/ref=businessbuilder",
    commissionRate: "£25"
  },
  {
    id: "revolut",
    name: "Business Account",
    bank: "Revolut Business",
    logo: "💫",
    monthlyFee: "£0-£25",
    features: [
      "Multi-currency accounts",
      "Expense management",
      "Corporate cards",
      "Global transfers",
      "Budget controls",
      "Real-time analytics"
    ],
    rating: 4.3,
    applicationTime: "10 minutes",
    minDeposit: "£0",
    bestFor: "International businesses",
    affiliateLink: "https://mock-affiliate.revolut.com/ref=businessbuilder",
    commissionRate: "£60"
  }
];

export const EnhancedBankAccountComparison = () => {
  const { user } = useAuth();
  const { logSecurityEvent } = useSecurityMonitoring();

  const handleAffiliateClick = async (bank: BankAccount) => {
    try {
      // Log the affiliate click in audit_logs table
      const { error } = await supabase
        .from('audit_logs')
        .insert({
          user_id: user?.id || null,
          event_type: 'affiliate_click',
          event_data: {
            bank_name: bank.bank,
            affiliate_link: bank.affiliateLink,
            commission_rate: bank.commissionRate,
            clicked_at: new Date().toISOString()
          },
          user_agent: navigator.userAgent
        });

      if (error) {
        console.error('Error logging affiliate click:', error);
      }

      // Log security event
      await logSecurityEvent('affiliate_click', user?.id, undefined, {
        bank_name: bank.bank,
        commission_rate: bank.commissionRate
      });

      // Open affiliate link in new tab (mock mode)
      window.open(bank.affiliateLink, '_blank');
    } catch (error) {
      console.error('Error handling affiliate click:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Choose Your Business Bank Account</h2>
        <p className="text-muted-foreground">
          Compare the UK's leading business banking options with our affiliate partnerships
        </p>
        <Badge variant="secondary" className="mt-2">
          Mock Mode - Test affiliate tracking safely
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {bankAccounts.map((account) => (
          <Card key={account.id} className={`relative ${account.recommended ? 'ring-2 ring-primary' : ''}`}>
            {account.recommended && (
              <Badge className="absolute -top-2 left-4 bg-primary">
                <Star className="h-3 w-3 mr-1" />
                Recommended
              </Badge>
            )}
            
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="text-2xl">{account.logo}</div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{account.rating}</span>
                </div>
              </div>
              <CardTitle className="text-lg">{account.bank}</CardTitle>
              <p className="text-sm text-muted-foreground">{account.name}</p>
              
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold">{account.monthlyFee}</span>
                <span className="text-sm text-muted-foreground">/month</span>
              </div>
              
              <Badge variant="secondary" className="w-fit">
                {account.bestFor}
              </Badge>
              
              <Badge variant="outline" className="w-fit text-xs">
                Commission: {account.commissionRate}
              </Badge>
            </CardHeader>

            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Key Features:</h4>
                <ul className="space-y-1 text-sm">
                  {account.features.slice(0, 4).map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <Check className="h-3 w-3 text-green-600 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 border-t">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Setup time:</span>
                  <span className="font-medium">{account.applicationTime}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Min deposit:</span>
                  <span className="font-medium">{account.minDeposit}</span>
                </div>
              </div>

              <Button 
                className="w-full group" 
                variant={account.recommended ? "default" : "outline"}
                onClick={() => handleAffiliateClick(account)}
              >
                Apply Now
                <ExternalLink className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
