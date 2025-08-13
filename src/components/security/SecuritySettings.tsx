
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Shield, Lock, Eye, AlertTriangle } from "lucide-react";

export const SecuritySettings = () => {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const handlePasswordChange = async () => {
    if (!user?.email) return;
    
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
        redirectTo: `${window.location.origin}/auth`,
      });
      
      if (error) throw error;
      
      toast({
        title: "Password reset sent",
        description: "Check your email for password reset instructions.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const securityScore = () => {
    let score = 0;
    if (user?.email_confirmed_at) score += 25;
    if (twoFactorEnabled) score += 25;
    if (profile?.phone) score += 25;
    if (user?.updated_at !== user?.created_at) score += 25;
    return score;
  };

  const getScoreColor = (score: number) => {
    if (score >= 75) return "bg-green-500";
    if (score >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Overview
              </CardTitle>
              <CardDescription>
                Your account security status and recommendations
              </CardDescription>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{securityScore()}%</div>
              <div className={`h-2 w-20 rounded-full ${getScoreColor(securityScore())}`} />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span className="text-sm">Email Verified</span>
              </div>
              <Badge variant={user?.email_confirmed_at ? "default" : "secondary"}>
                {user?.email_confirmed_at ? "Verified" : "Pending"}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                <span className="text-sm">Two-Factor Auth</span>
              </div>
              <Badge variant={twoFactorEnabled ? "default" : "secondary"}>
                {twoFactorEnabled ? "Enabled" : "Disabled"}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-sm">Phone Number</span>
              </div>
              <Badge variant={profile?.phone ? "default" : "secondary"}>
                {profile?.phone ? "Added" : "Missing"}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                <span className="text-sm">Password Updated</span>
              </div>
              <Badge variant={user?.updated_at !== user?.created_at ? "default" : "secondary"}>
                {user?.updated_at !== user?.created_at ? "Recent" : "Default"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Security Actions</CardTitle>
          <CardDescription>
            Manage your account security settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="2fa">Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground">
                Add an extra layer of security to your account
              </p>
            </div>
            <Switch
              id="2fa"
              checked={twoFactorEnabled}
              onCheckedChange={setTwoFactorEnabled}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label>Password Management</Label>
              <p className="text-sm text-muted-foreground">
                Update your password regularly for better security
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={handlePasswordChange}
              disabled={loading}
            >
              {loading ? "Sending..." : "Reset Password"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
