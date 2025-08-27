
import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useSecurityMonitoring = () => {
  const logSecurityEvent = useCallback(async (
    eventType: string,
    userId?: string,
    ipAddress?: string,
    additionalData?: Record<string, any>
  ) => {
    try {
      const { error } = await supabase
        .from('audit_logs')
        .insert({
          user_id: userId,
          event_type: eventType,
          event_data: additionalData || {},
          ip_address: ipAddress,
          user_agent: navigator.userAgent
        });

      if (error) {
        console.error('Error logging security event:', error);
      }
    } catch (error) {
      console.error('Error logging security event:', error);
    }
  }, []);

  return { logSecurityEvent };
};
