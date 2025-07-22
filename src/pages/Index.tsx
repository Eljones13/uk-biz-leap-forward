
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, CheckCircle, ArrowRight, Users, Shield, Clock, FileText, TrendingUp, Star } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      icon: Building2,
      title: "Company Registration",
      description: "Complete Companies House integration with real-time status tracking"
    },
    {
      icon: Shield,
      title: "Compliance Automation",
      description: "Automated HMRC integration and deadline monitoring"
    },
    {
      icon: TrendingUp,
      title: "Credit Building", 
      description: "Business credit monitoring and improvement recommendations"
    },
    {
      icon: FileText,
      title: "Document Generation",
      description: "Smart templates for all your business documentation needs"
    }
  ];

  const benefits = [
    "Save £1000s in legal fees",
    "Register your company in 24 hours", 
    "UK GDPR compliant platform",
    "Expert guidance every step"
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      company: "TechStart Ltd",
      text: "BusinessBuilder Pro made company formation incredibly simple. Everything was handled seamlessly."
    },
    {
      name: "James Wilson", 
      company: "Creative Solutions CIC",
      text: "The compliance automation saved me hours of work. Highly recommend for any UK entrepreneur."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">BusinessBuilder Pro</span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost">How it Works</Button>
              <Button variant="ghost">Pricing</Button>
              <Link to="/dashboard">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <Badge variant="secondary" className="mb-4">
            UK's #1 Business Formation Platform
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Build Your UK Business
            <br />
            The Smart Way
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            From company registration at Companies House to building business credit and securing funding. 
            We guide UK entrepreneurs through every step of business formation and growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button size="lg" className="px-8">
                Start Your Company
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              Watch Demo
            </Button>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 mt-12 text-sm text-muted-foreground">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Everything You Need to Build & Scale</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our platform combines business formation, compliance automation, and growth tools in one integrated solution.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Your Journey to Business Success</h2>
            <p className="text-xl text-muted-foreground">
              Follow our proven step-by-step process to build a successful UK business.
            </p>
          </div>
          
          <div className="space-y-8">
            {[
              {
                step: "01",
                title: "Foundation Phase",
                description: "Register your company, set up compliance, and establish your business identity.",
                features: ["Companies House registration", "HMRC setup", "Bank account guidance"]
              },
              {
                step: "02", 
                title: "Growth Phase",
                description: "Build business credit, establish processes, and prepare for scaling.",
                features: ["Credit building program", "Financial systems", "Legal documentation"]
              },
              {
                step: "03",
                title: "Scale & Fund Phase", 
                description: "Access funding opportunities and accelerate your business growth.",
                features: ["Funding readiness", "Investor connections", "Growth strategies"]
              }
            ].map((phase, index) => (
              <div key={index} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg">
                    {phase.step}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{phase.title}</h3>
                  <p className="text-muted-foreground mb-4">{phase.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {phase.features.map((feature, featureIndex) => (
                      <Badge key={featureIndex} variant="secondary">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Trusted by UK Entrepreneurs</h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of successful businesses built with BusinessBuilder Pro.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">"{testimonial.text}"</p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.company}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Business?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join the thousands of entrepreneurs who have successfully launched their UK businesses with BusinessBuilder Pro.
          </p>
          <Link to="/dashboard">
            <Button size="lg" className="px-8">
              Start Your Company Today
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="h-5 w-5 text-primary" />
                <span className="font-bold">BusinessBuilder Pro</span>
              </div>
              <p className="text-sm text-muted-foreground">
                The UK's leading platform for business formation and growth.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Company Registration</li>
                <li>Compliance Tools</li>
                <li>Credit Building</li>
                <li>Document Generation</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Help Center</li>
                <li>Live Chat</li>
                <li>Email Support</li>
                <li>Phone Support</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>GDPR Compliance</li>
                <li>Cookie Policy</li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2024 BusinessBuilder Pro. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
