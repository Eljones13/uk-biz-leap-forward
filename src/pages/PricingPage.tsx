
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useNavigate } from "react-router-dom";
import { 
  Check, Star, Zap, Crown, ArrowRight, 
  Building2, Users, FileText, Shield, Lock,
  Banknote, MessageSquare, Brain
} from "lucide-react";

const PricingPage = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const navigate = useNavigate();

  const plans = [
    {
      name: "Free",
      description: "Perfect for exploring business formation basics",
      price: { monthly: 0, annual: 0 },
      badge: null,
      icon: Building2,
      features: {
        formation: ["Basic company name checks", "Essential guides"],
        documents: ["Basic templates access"],
        banking: ["Bank comparison tool"],
        ai: [],
        support: ["Community support", "Knowledge base access"]
      },
      cta: "Get Started Free",
      popular: false
    },
    {
      name: "Starter", 
      description: "Complete company registration with professional guidance",
      price: { monthly: 29, annual: 290 },
      badge: null,
      icon: Zap,
      features: {
        formation: ["Companies House registration", "Director management", "Basic compliance calendar"],
        documents: ["Standard document generation", "Basic e-signature"],
        banking: ["Priority bank introductions", "Account setup guidance"],
        ai: ["Basic business advisor"],
        support: ["Email support", "Setup assistance"]
      },
      cta: "Start Your Company",
      popular: false
    },
    {
      name: "Growth",
      description: "Advanced features for scaling businesses",
      price: { monthly: 99, annual: 990 },
      badge: "Most Popular",
      icon: Users,
      features: {
        formation: ["Everything in Starter", "Advanced compliance monitoring", "Multi-entity management"],
        documents: ["Advanced templates", "Bulk document generation", "Advanced e-signature"],
        banking: ["Business credit building", "Bookkeeping integration", "VAT registration"],
        ai: ["Advanced AI advisor", "Funding readiness analysis"],
        support: ["Priority phone support", "Dedicated onboarding"]
      },
      cta: "Scale Your Business",
      popular: true
    },
    {
      name: "Scale",
      description: "Enterprise features with dedicated support",
      price: { monthly: 299, annual: 2990 },
      badge: "Enterprise",
      icon: Crown,
      features: {
        formation: ["Everything in Growth", "White-label options", "Custom compliance solutions"],
        documents: ["Custom document templates", "API access", "Workflow automation"],
        banking: ["Premium banking partnerships", "Advanced analytics", "Custom integrations"],
        ai: ["Dedicated AI advisor", "Custom AI training", "Advanced analytics"],
        support: ["Dedicated success manager", "24/7 priority support", "Custom SLAs"]
      },
      cta: "Contact Sales",
      popular: false
    }
  ];

  const featureCategories = [
    { key: "formation", title: "Formation & Compliance", icon: Building2 },
    { key: "documents", title: "Documents & e-Sign", icon: FileText },
    { key: "banking", title: "Banking & Credit", icon: Banknote },
    { key: "ai", title: "AI Advisor", icon: Brain },
    { key: "support", title: "Support & SLAs", icon: MessageSquare }
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

  const trustLogos = [
    "Companies House", "HMRC", "Stripe", "Barclays", "Tide", "Starling"
  ];

  const faqItems = [
    {
      question: "How does billing work?",
      answer: "You'll be charged monthly or annually based on your chosen plan. Annual subscriptions receive approximately 2 months free. You can upgrade, downgrade, or cancel at any time."
    },
    {
      question: "Can I cancel anytime?",
      answer: "Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period."
    },
    {
      question: "Do you offer refunds?",
      answer: "We offer a 30-day money-back guarantee on all paid plans. If you're not satisfied, contact our support team for a full refund."
    },
    {
      question: "Are Companies House fees included?",
      answer: "No, official Companies House registration fees (£12-£40) and other government fees are not included in our pricing. These are paid directly to the relevant authorities."
    },
    {
      question: "What happens to my data if I cancel?",
      answer: "Your data remains accessible for 90 days after cancellation. You can export your documents and information during this period."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/5 to-blue-50 border-b">
        <div className="container mx-auto max-w-6xl p-6">
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
                aria-label="Toggle annual billing"
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
                  ~2 months free
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="container mx-auto max-w-6xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const savings = getSavings(plan);
            
            return (
              <Card key={index} className={`relative rounded-2xl shadow-md hover:shadow-lg transition-all ${
                plan.popular ? "border-primary shadow-lg scale-105 ring-2 ring-primary/20" : ""
              }`}>
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className={
                      plan.popular ? "bg-primary" : 
                      plan.badge === "Enterprise" ? "bg-purple-600" : "bg-green-600"
                    }>
                      {plan.badge}
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center space-y-4 pb-4">
                  <div className="flex justify-center">
                    <div className={`p-3 rounded-2xl ${
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

                  <Button 
                    className={`w-full ${
                      plan.popular ? "" : "variant-outline"
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.cta}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardHeader>

                <CardContent className="space-y-4 pt-0">
                  {featureCategories.map((category) => {
                    const features = plan.features[category.key as keyof typeof plan.features];
                    if (!features || features.length === 0) {
                      return (
                        <div key={category.key} className="space-y-2">
                          <div className="flex items-center gap-2">
                            <category.icon className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium text-sm text-muted-foreground">{category.title}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground ml-6">
                            <Lock className="h-3 w-3" />
                            <span>Available in higher tiers</span>
                          </div>
                        </div>
                      );
                    }

                    return (
                      <div key={category.key} className="space-y-2">
                        <div className="flex items-center gap-2">
                          <category.icon className="h-4 w-4 text-primary" />
                          <span className="font-medium text-sm">{category.title}</span>
                        </div>
                        <ul className="space-y-1 ml-6">
                          {features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start space-x-2 text-sm">
                              <Check className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Trust Bar */}
        <div className="mt-16">
          <p className="text-center text-sm text-muted-foreground mb-6">
            Trusted by thousands of UK entrepreneurs
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {trustLogos.map((logo, index) => (
              <div key={index} className="text-lg font-semibold text-muted-foreground">
                {logo}
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get answers to common questions about our pricing and billing.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border rounded-2xl px-6">
                  <AccordionTrigger className="text-left font-medium hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-16 space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Why Choose BusinessBuilder Pro?</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Save thousands compared to traditional legal services while getting expert guidance 
              throughout your business formation journey. Our platform guides you through every 
              step with UK-specific compliance and best practices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="rounded-2xl">
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

            <Card className="rounded-2xl">
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

            <Card className="rounded-2xl">
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
