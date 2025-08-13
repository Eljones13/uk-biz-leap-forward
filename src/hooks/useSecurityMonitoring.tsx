
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

export const useSecurityMonitoring = () => {
  const { user } = useAuth();

  const logSecurityEvent = async (
    actionType: string,
    tableName?: string,
    recordId?: string,
    metadata?: any
  ) => {
    if (!user) return;

    try {
      // Get client IP and user agent
      const userAgent = navigator.userAgent;
      
      await supabase.rpc("log_audit_event", {
        p_user_id: user.id,
        p_action_type: actionType,
        p_table_name: tableName,
        p_record_id: recordId,
        p_new_values: metadata ? JSON.stringify(metadata) : null,
        p_user_agent: userAgent,
      });
    } catch (error) {
      console.error("Error logging security event:", error);
    }
  };

  useEffect(() => {
    if (!user) return;

    // Log session start
    logSecurityEvent("session_start");

    // Set up visibility change listener for security monitoring
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        logSecurityEvent("session_resume");
      } else {
        logSecurityEvent("session_pause");
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Log page navigation
    const handleBeforeUnload = () => {
      logSecurityEvent("session_end");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [user]);

  return {
    logSecurityEvent,
  };
};
