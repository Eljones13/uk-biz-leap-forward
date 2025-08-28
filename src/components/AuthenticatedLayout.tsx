
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useSecurityMonitoring } from "@/hooks/useSecurityMonitoring";
import { Navigate, Outlet } from "react-router-dom";

interface AuthenticatedLayoutProps {
  children?: React.ReactNode;
  requireAuth?: boolean;
}

export const AuthenticatedLayout = ({ 
  children, 
  requireAuth = true 
}: AuthenticatedLayoutProps) => {
  const { user, loading } = useAuth();
  const { logSecurityEvent } = useSecurityMonitoring();

  useEffect(() => {
    // Log page access for security monitoring
    if (user && requireAuth) {
      logSecurityEvent("page_access", undefined, undefined, {
        path: window.location.pathname,
        timestamp: new Date().toISOString()
      });
    }
  }, [user, requireAuth, logSecurityEvent]);

  // Show loading while auth state is being determined
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Redirect to auth if authentication is required but user is not logged in
  if (requireAuth && !user) {
    return <Navigate to="/auth" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default AuthenticatedLayout;
