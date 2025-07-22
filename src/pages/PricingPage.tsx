
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  Check, Star, Zap, Crown, ArrowRight, 
  Building2, Users, FileText, Shield
} from "lucide-react";

const PricingPage = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const navigate = useNavigate();

  const plans = [
    {
      name: "Foundation",
      description: "Perfect for getting started with basic business formation",
      price: { monthly: 0, annual: 0 },
      badge: null,
      icon: Building2,
      features: [
        "Basic company name checks",
        "Essential document templates",
        "Educational content library",
        "Community forum access",
        "Email support"
      ],
      limitations: [
        "Limited to 3 name checks per month",
        "Basic templates only",
        "Community support only"
      ],
      cta: "Start Free",
      popular: false
    },
    {
      name: "Launch", 
      description: "Complete company registration with professional guidance",
      price: { monthly: 29, annual: 290 },
      badge: "Most Popular",
      icon: Zap,
      features: [
        "Everything in Foundation",
        "Complete Companies House registration",
        "Director and shareholder management", 
        "Basic compliance calendar",
        "Standard document generation",
        "Priority email support",
        "Save £200+ vs solicitor fees"
      ],
      limitations: [],
      cta: "Start Launch Plan",
      popular: true
    },
    {
      name: "Scale",
      description: "Advanced features for growing businesses",
      price: { monthly: 99, annual: 990 },
      badge: "Best Value",
      icon: Users,
      features: [
        "Everything in Launch",
        "Business credit building roadmap",
        "Bookkeeping integration (Xero, QuickBooks)",
        "VAT registration automation",
        "Compliance monitoring & alerts",
        "Priority phone support",
        "Advanced document templates"
      ],
      limitations: [],
      cta: "Upgrade to Scale",
      popular: false
    },
    {
      name: "Enterprise",
      description: "Premium features with dedicated support",
      price: { monthly: 299, annual: 2990 },
      badge: "Premium",
      icon: Crown,
      features: [
        "Everything in Scale",
        "Funding preparation toolkit",
        "Advanced analytics & reporting",
        "Dedicated success manager",
        "Custom compliance solutions",
        "API access for integrations",
        "White-label options available"
      ],
      limitations: [],
      cta: "Contact Sales",
      popular: false
    }
  ];

  const getPrice = (plan: any) => {
    const price = isAnnual ? plan.price.annual : plan.price.monthly;
    if (price === 0) return "Free";
    if (isAnnual) return `£${price}/year`;
    return `£${price}/month`;
  };

  const getSavings = (plan: any) => {
    if (plan.price.monthly === 0) return null;
    const monthlyCost = plan.price.monthly * 12;
    const savings = monthlyCost - plan.price.annual;
    return savings > 0 ? `Save £${savings}/year` : null;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/5 to-blue-50 border-b">
        <div className="max-w-6xl mx-auto p-6">
          <div className="text-center space-y-4">
            <Button 
              variant="outline" 
              onClick={() => navigate("/dashboard")}
              className="mb-4"
            >
              ← Back to Dashboard
            </Button>
            <h1 className="text-3xl font-bold text-foreground">
              Choose Your Business Formation Plan
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              From free resources to comprehensive business formation and growth support. 
              Choose the plan that fits your entrepreneurial journey.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center space-x-4 mt-6">
              <span className={`text-sm ${!isAnnual ? "font-medium" : "text-muted-foreground"}`}>
                Monthly
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isAnnual ? "bg-primary" : "bg-muted"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isAnnual ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
              <span className={`text-sm ${isAnnual ? "font-medium" : "text-muted-foreground"}`}>
                Annual
              </span>
              {isAnnual && (
                <Badge variant="secondary" className="ml-2">
                  Save up to 17%
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const savings = getSavings(plan);
            
            return (
              <Card key={index} className={`relative ${
                plan.popular ? "border-primary shadow-lg scale-105" : ""
              }`}>
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className={
                      plan.popular ? "bg-primary" : 
                      plan.badge === "Premium" ? "bg-purple-600" : "bg-green-600"
                    }>
                      {plan.badge}
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center space-y-4">
                  <div className="flex justify-center">
                    <div className={`p-3 rounded-lg ${
                      plan.popular ? "bg-primary/10" : "bg-muted"
                    }`}>
                      <Icon className={`h-6 w-6 ${
                        plan.popular ? "text-primary" : "text-muted-foreground"
                      }`} />
                    </div>
                  </div>
                  
                  <div>
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <CardDescription className="mt-2">
                      {plan.description}
                    </CardDescription>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="text-3xl font-bold">
                      {getPrice(plan)}
                    </div>
                    {savings && isAnnual && (
                      <div className="text-sm text-green-600 font-medium">
                        {savings}
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <Button 
                    className={`w-full ${
                      plan.popular ? "" : "variant-outline"
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.cta}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>

                  <div className="space-y-3">
                    <h4 className="font-medium text-sm">Features included:</h4>
                    <ul className="space-y-2">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start space-x-2 text-sm">
                          <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {plan.limitations.length > 0 && (
                    <div className="space-y-3 pt-3 border-t">
                      <h4 className="font-medium text-sm text-muted-foreground">Limitations:</h4>
                      <ul className="space-y-2">
                        {plan.limitations.map((limitation, limitIndex) => (
                          <li key={limitIndex} className="text-sm text-muted-foreground">
                            • {limitation}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional Information */}
        <div className="mt-12 space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Why Choose BusinessBuilder Pro?</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Save thousands compared to traditional legal services while getting expert guidance 
              throughout your business formation journey. Our platform guides you through every 
              step with UK-specific compliance and best practices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="text-center">
                <FileText className="h-8 w-8 mx-auto text-primary mb-2" />
                <CardTitle className="text-lg">Save Time & Money</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Complete company formation in days, not weeks. Save £1,500+ compared to traditional legal services.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Shield className="h-8 w-8 mx-auto text-primary mb-2" />
                <CardTitle className="text-lg">UK Compliance Expert</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Built specifically for UK regulations with automatic updates for Companies House and HMRC requirements.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Star className="h-8 w-8 mx-auto text-primary mb-2" />
                <CardTitle className="text-lg">Ongoing Support</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  From formation to funding readiness, we support your business growth journey every step of the way.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
