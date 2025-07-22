import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Users, CheckCircle, TrendingUp, Building2, Clock } from "lucide-react";

export const SocialProofSection = () => {
  const testimonials = [
    {
      name: "Sarah Mitchell",
      role: "First-time Entrepreneur",
      company: "GreenTech Solutions Ltd",
      quote: "BusinessBuilder Pro made incorporation so simple. I went from idea to registered company in 3 days!",
      rating: 5,
      timeToComplete: "3 days"
    },
    {
      name: "Marcus Chen", 
      role: "Serial Entrepreneur",
      company: "Digital Ventures Ltd",
      quote: "The efficiency tools saved me hours. Perfect for experienced founders who want speed.",
      rating: 5,
      timeToComplete: "1 day"
    },
    {
      name: "Priya Patel",
      role: "Investment-Ready Founder", 
      company: "FinTech Innovations Ltd",
      quote: "Investors were impressed with the professional setup. The compliance tracking is excellent.",
      rating: 5,
      timeToComplete: "2 days"
    }
  ];

  const stats = [
    { number: "15,000+", label: "Companies Formed", icon: Building2 },
    { number: "98%", label: "Success Rate", icon: CheckCircle },
    { number: "24 hrs", label: "Average Time", icon: Clock },
    { number: "4.9/5", label: "User Rating", icon: Star }
  ];

  return (
    <div className="space-y-8">
      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-4 text-center">
                <Icon className="h-6 w-6 mx-auto text-primary mb-2" />
                <div className="text-2xl font-bold">{stat.number}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Testimonials */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-center">What entrepreneurs say</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-gradient-to-br from-primary/5 to-blue-50">
              <CardContent className="p-4">
                <div className="space-y-3">
                  {/* Rating */}
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  
                  {/* Quote */}
                  <p className="text-sm italic">"{testimonial.quote}"</p>
                  
                  {/* Author */}
                  <div className="space-y-1">
                    <div className="font-medium text-sm">{testimonial.name}</div>
                    <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                    <div className="text-xs text-primary font-medium">{testimonial.company}</div>
                  </div>
                  
                  {/* Completion Badge */}
                  <Badge variant="secondary" className="text-xs">
                    Completed in {testimonial.timeToComplete}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Live Activity Feed */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Live Activity</span>
          </div>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div>✅ TechStart Solutions Ltd just completed incorporation</div>
            <div>🚀 3 companies formed in the last hour</div>
            <div>📊 GrowthCorp Ltd started their funding preparation</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
