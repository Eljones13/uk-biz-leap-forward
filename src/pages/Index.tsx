
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

  const trustLogos = [
    "Companies House", "HMRC", "Stripe", "Barclays", "Tide", "Starling"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Enhanced Hero Section with Background Image */}
      <section 
        className="relative py-20 px-4 min-h-[600px] lg:min-h-[700px] flex items-center"
        style={{
          backgroundImage: "url('/lovable-uploads/a0f74d28-b829-433c-903d-1c2c8e45ef5e.png'), linear-gradient(to bottom, #F3F5F8, #F3F5F8)",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat"
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40" />
        
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <Badge variant="secondary" className="mb-4 bg-white/90 text-primary">
            UK's #1 Business Formation Platform
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Build Your UK Business
            <br />
            The Smart Way
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-lg p-4">
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
            <Button variant="outline" size="lg" className="bg-white/90 hover:bg-white">
              Watch Demo
            </Button>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 mt-12 text-sm">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-8 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <p className="text-center text-sm text-muted-foreground mb-6">
            Trusted by founders across the UK
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {trustLogos.map((logo, index) => (
              <div key={index} className="text-lg font-semibold text-muted-foreground">
                {logo}
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
    </div>
  );
};

export default Index;
