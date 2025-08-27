
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Video, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface BetaFeatureGateProps {
  title: string;
  description: string;
  demoUrl?: string;
}

export const BetaFeatureGate = ({ title, description, demoUrl }: BetaFeatureGateProps) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('waitlist_emails')
        .insert([{ email, feature: title }]);

      if (error) throw error;

      toast({
        title: "Added to waitlist!",
        description: "We'll notify you when this feature is available.",
      });
      setEmail("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to join waitlist. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{title}</CardTitle>
          <p className="text-muted-foreground">{description}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-sm font-medium mb-4">
              Private Beta
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              This feature is currently in private beta. Watch our demo or join the waitlist to get early access.
            </p>
          </div>

          <div className="space-y-3">
            {demoUrl && (
              <Button 
                className="w-full" 
                variant="outline"
                onClick={() => window.open(demoUrl, '_blank')}
              >
                <Video className="h-4 w-4 mr-2" />
                Watch 2-min Demo
              </Button>
            )}

            <form onSubmit={handleWaitlistSubmit} className="space-y-3">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                <Mail className="h-4 w-4 mr-2" />
                {isSubmitting ? "Joining..." : "Join Waitlist"}
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
