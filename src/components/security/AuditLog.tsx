
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { formatDistanceToNow } from "date-fns";
import { Shield, User, Database, Settings } from "lucide-react";

interface AuditEvent {
  id: string;
  action_type: string;
  table_name?: string;
  created_at: string;
  ip_address?: string;
  user_agent?: string;
}

export const AuditLog = () => {
  const { user } = useAuth();
  const [auditEvents, setAuditEvents] = useState<AuditEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuditEvents = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from("audit_logs")
          .select("id, action_type, table_name, created_at, ip_address, user_agent")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(50);
          
        if (error) throw error;
        setAuditEvents(data || []);
      } catch (error) {
        console.error("Error fetching audit events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuditEvents();
  }, [user]);

  const getActionIcon = (actionType: string) => {
    switch (actionType.toLowerCase()) {
      case "login":
      case "logout":
        return <User className="h-4 w-4" />;
      case "create":
      case "update":
      case "delete":
        return <Database className="h-4 w-4" />;
      case "settings":
        return <Settings className="h-4 w-4" />;
      default:
        return <Shield className="h-4 w-4" />;
    }
  };

  const getActionColor = (actionType: string) => {
    switch (actionType.toLowerCase()) {
      case "login":
        return "bg-green-500";
      case "logout":
        return "bg-blue-500";
      case "delete":
        return "bg-red-500";
      case "create":
        return "bg-green-500";
      case "update":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Activity Log</CardTitle>
          <CardDescription>Loading your recent security events...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-muted animate-pulse rounded" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Log</CardTitle>
        <CardDescription>
          Recent security-related activities on your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          <div className="space-y-3">
            {auditEvents.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No recent activity to display
              </p>
            ) : (
              auditEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center gap-3 p-3 border rounded-lg"
                >
                  <div className={`p-2 rounded-full ${getActionColor(event.action_type)}`}>
                    {getActionIcon(event.action_type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">
                        {event.action_type.charAt(0).toUpperCase() + event.action_type.slice(1)}
                      </span>
                      {event.table_name && (
                        <Badge variant="outline" className="text-xs">
                          {event.table_name}
                        </Badge>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(event.created_at))} ago
                      {event.ip_address && (
                        <span className="ml-2">• {event.ip_address}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
