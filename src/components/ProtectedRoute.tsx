import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiresSubscription?: "starter" | "growth" | "scale";
}

const ProtectedRoute = ({ children, requiresSubscription }: ProtectedRouteProps) => {
  const { user, profile, loading } = useAuth();
  const [redirectPath, setRedirectPath] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      // Store the current path to redirect back after login
      const currentPath = window.location.pathname + window.location.search;
      localStorage.setItem('authRedirectPath', currentPath);
      setRedirectPath('/auth');
    } else if (!loading && user && requiresSubscription && profile) {
      // Check subscription level
      const tierHierarchy = { free: 0, starter: 1, growth: 2, scale: 3 };
      const userTierLevel = tierHierarchy[profile.subscription_tier];
      const requiredTierLevel = tierHierarchy[requiresSubscription];
      
      if (userTierLevel < requiredTierLevel) {
        setRedirectPath('/pricing');
      }
    }
  }, [user, profile, loading, requiresSubscription]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (redirectPath) {
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;