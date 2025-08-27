
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useCookieConsent } from "@/hooks/useCookieConsent";
import { Mail, CheckCircle, AlertCircle } from "lucide-react";

export const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { toast } = useToast();
  const { consent } = useCookieConsent();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setStatus('idle');

    try {
      const { error } = await supabase
        .from('newsletter_signups')
        .insert([{ email }]);

      if (error) {
        if (error.code === '23505') { // Unique violation
          setStatus('success');
          toast({
            title: "Already subscribed",
            description: "This email is already subscribed to our newsletter.",
          });
        } else {
          throw error;
        }
      } else {
        setStatus('success');
        toast({
          title: "Successfully subscribed!",
          description: "Thank you for subscribing to our newsletter.",
        });
        setEmail("");
      }
    } catch (error) {
      console.error('Newsletter signup error:', error);
      setStatus('error');
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-8 p-6 bg-muted/50 rounded-2xl">
      <div className="text-center mb-4">
        <Mail className="h-8 w-8 text-primary mx-auto mb-2" />
        <h3 className="text-xl font-semibold mb-2">Stay Updated</h3>
        <p className="text-muted-foreground">
          Get the latest insights on UK business formation and growth strategies.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1"
          aria-describedby="newsletter-status"
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Subscribing..." : "Subscribe"}
        </Button>
      </form>
      
      {/* Accessible status messages */}
      <div 
        id="newsletter-status" 
        role="status" 
        aria-live="polite" 
        className="text-center mt-4"
      >
        {status === 'success' && (
          <div className="flex items-center justify-center gap-2 text-green-600">
            <CheckCircle className="h-4 w-4" />
            <span>Successfully subscribed!</span>
          </div>
        )}
        {status === 'error' && (
          <div className="flex items-center justify-center gap-2 text-red-600">
            <AlertCircle className="h-4 w-4" />
            <span>Failed to subscribe. Please try again.</span>
          </div>
        )}
      </div>
      
      {(!consent?.analytics || !consent?.marketing) && (
        <p className="text-xs text-muted-foreground text-center mt-2">
          Newsletter signup respects your cookie preferences.
        </p>
      )}
    </div>
  );
};
